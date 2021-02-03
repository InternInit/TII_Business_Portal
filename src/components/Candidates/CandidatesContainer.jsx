import React, { Component, PureComponent } from "react";
import "../../App.scss";
import {
  Route,
  Switch as ReactSwitch,
  Redirect,
  withRouter,
} from "react-router-dom";

import { Row as AntRow, Col as AntCol } from "antd";
import { Transition, config } from "react-spring/renderprops";

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
    companyId: state.companyInfo.id,
    candidates: state.companyInfo.candidates,
    loading: state.loadingStatuses.isCandidateLoading,
  };
};

const mapDispatchToProps = {
  updateCandidates,
  updateReduxCandidateStatus,
};

class CandidatesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPath: this.findPath(),
    };
  }

  componentWillUnmount() {
    console.log("CandidateContainer unmounted");
  }

  componentDidMount() {
    console.log("CandidateContainer mounted");
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      (nextProps.candidates === this.props.candidates ||
        nextProps.companyId === this.props.companyId) &&
      nextProps.loading
    ) {
      return false;
    } else {
      return true;
    }
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
        Authorization: "Bearer " + this.props.companyId,
      },
    };

    let index = this.props.candidates.findIndex(
      (item, i) => item.Id === internId
    );
    console.log(index);
    this.props.updateReduxCandidateStatus(index, status);

    axios
      .post("/api/update_student_status", { status: status }, headers)
      .then((response) => {
        console.log(JSON.parse(response.data));

        let index = this.props.candidates.findIndex(
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
    let candidate = this.props.candidates.find(
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
          this.state.currentPath === "manage-candidates"
            ? { minWidth: "1250px", position: "relative" }
            : null
        }
      >
        <AntRow style={{ width: "100%" }}>
          <NavSearch
            title="Internship Candidates"
            placeholder="Search Applicants"
            //@TODO implement functionality
            searchBar={false}
            style={
              this.state.currentPath === "manage-candidates"
                ? { minWidth: "1250px" }
                : null
            }
          />
        </AntRow>
        <CandidatesNavbar
          isReview={this.state.currentPath === "review-applicants"}
        />
        <ReactSwitch>
          <Route
            path="/applicants"
            exact
            render={() => <Redirect to="/applicants/review-applicants" />}
          />
          <Route
            path="/applicants/review-applicants"
            exact
            render={() => (
              <ReviewApplicants
                updateCandidateStatus={this.updateCandidateStatus}
              />
            )}
          />
          <Route
            path="/applicants/manage-candidates"
            exact
            render={(props) => (
              <HirePipeline
              {...props}
                updateCandidateStatus={this.updateCandidateStatus}
              />
            )}
          />
          <Route path={`/applicants/:id`} render={() => <StudentInfo />} />
        </ReactSwitch>
      </PageContainer>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CandidatesContainer)
);
