import React, { Component } from "react";
import "../../App.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch as ReactSwitch,
  Redirect,
  useRouteMatch as match,
  withRouter,
} from "react-router-dom";

import { Row as AntRow, Col as AntCol } from "antd";
import ClipLoader from "react-spinners/ClipLoader";

import { connect } from "react-redux";
import {
  updateCandidates,
  updateReduxCandidateStatus,
} from "../../redux/actions";

//axios
import axios from "axios";

import NavSearch from "../General/NavSearch.jsx";
import CandidatesNavbar from "./CandidatesNavbar.jsx";
import HirePipeline from "./HirePipeline.jsx";
import ReviewApplicants from "./ReviewApplicants.jsx";
import StudentInfo from "./StudentInfo.jsx";

import { PageContainer } from "../Styled/FundamentalComponents.jsx";

const mapStateToProps = (state) => {
  return {
    companyInfo: state.companyInfo,
    loadingStatuses: state.loadingStatuses
  };
};

const mapDispatchToProps = {
  updateCandidates,
  updateReduxCandidateStatus,
};

class CandidatesContainer extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps == this.props) {
      return false;
    }
  }

  componentWillUnmount() {
    console.log("CandidateContainer unmounted");
  }

  componentDidMount() {
    console.log("CandidateContainer mounted");
  }

  findPath = () => {
    if (this.props.location.pathname.includes("manage-candidates")) {
      return "manage-candidates";
    } else {
      return "review-applicants";
    }
  };

  updateCandidateStatus = (internId, status) => {
    const headers = {
      headers: {
        InternId: internId,
        Authorization: "Bearer " + this.props.companyInfo.id,
      },
    };

    axios
      .post("/api/update_student_status", { status: status }, headers)
      .then((response) => {
        console.log(JSON.parse(response.data));

        let index = this.props.companyInfo.candidates.findIndex(
          (item, i) => item.Id === internId
        );
        console.log(index);
        this.props.updateReduxCandidateStatus(index, status);
      });

    if (status === "Accepted") {
      this.mutateCandidateAssoc(internId);
    }
  };

  mutateCandidateAssoc = async (internId) => {
    let candidate = this.props.companyInfo.candidates.find(
      (candidate) => candidate.Id === internId
    );

    let access = await this.props.getAccess();
    axios({
      url: "/api/mutate_candidate_assoc",
      method: "post",
      headers: {
        Authorization: access,
      },
      data: {
        query: `mutation MyMutation {
          updateInternAssoc(input: {assocId: "${candidate.assocId}", feedback: [], grades: [], hours: []}) {
            assocId
          }
        }                 
        `,
      },
    }).then((result) => {
      console.log(result.data);
    });
  };

  render() {
    return (
      <PageContainer
        style={
          this.findPath() === "manage-candidates"
            ? { minWidth: "1250px", position: "relative" }
            : null
        }
      >
        <AntRow style={{ width: "100%" }}>
          <NavSearch
            title="Internship Candidates"
            placeholder="Search Applicants"
            style={
              this.findPath() === "manage-candidates"
                ? { minWidth: "1250px" }
                : null
            }
          />
        </AntRow>
        <CandidatesNavbar isReview={this.findPath() === "review-applicants"} />
        <ReactSwitch>
          <Route
            path="/applicants"
            exact
            render={() => <Redirect to="/applicants/review-applicants" />}
          />
          <Route
            path="/applicants/review-applicants"
            exact
            component={() => (
              <ReviewApplicants
                updateCandidateStatus={this.updateCandidateStatus}
              />
            )}
          />
          <Route
            path="/applicants/manage-candidates"
            exact
            component={() => (
              <HirePipeline
                candidates={this.props.companyInfo.candidates}
                loading={this.props.loadingStatuses}
                updateCandidateStatus={this.updateCandidateStatus}
              />
            )}
          />
          <Route path={`/applicants/:id`} component={() => <StudentInfo />} />
        </ReactSwitch>
      </PageContainer>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CandidatesContainer)
);
