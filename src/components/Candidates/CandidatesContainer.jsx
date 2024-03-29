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
  updateInterns,
} from "../../redux/actions";

//axios
import axios from "axios";

import NavSearch from "../General/NavSearch.jsx";
import CandidatesNavbar from "./CandidatesNavbar.jsx";
import HirePipeline from "./HirePipeline.jsx";
import ReviewApplicants from "./ReviewApplicants.jsx";
import StudentInfo from "./StudentInfo.jsx";

import { PageContainer } from "../Styled/FundamentalComponents.jsx";

import gql from "graphql-tag";
import { print } from "graphql";

// prettier-ignore
const MUTATION = gql`
mutation MyMutation ($assocId:String!){
  updateInternAssoc(input: {assocId: $assocId, feedback: {}, grades: {}, hours: {}}) {
    assocId
  }
}                 
`
//prettier-ignore
const STATUS_MUTATION = gql`
  mutation MyStatusMutation($assocId: String!, $status: String!) {
    updateInternAssoc(input: { assocId: $assocId, status: $status }) {
      internId
    }
  }
`

const mapStateToProps = (state) => {
  return {
    companyId: state.companyInfo.id,
    candidates: state.companyInfo.candidates,
    loading: state.loadingStatuses.isCandidateLoading,
    listings: state.listings,
    interns: state.interns.currentInterns,
  };
};

const mapDispatchToProps = {
  updateCandidates,
  updateInterns,
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

  updateCandidateStatus = async (internId, status) => {
    let candidate = this.props.candidates.find(
      (candidate) => candidate.Id === internId
    );

    let index = this.props.candidates.findIndex(
      (item, i) => item.Id === internId
    );
    console.log(index);
    this.props.updateReduxCandidateStatus(index, status);

    let access = await this.props.getAccess();
    axios({
      url: "/api/mutate_candidate_assoc",
      method: "post",
      headers: {
        Authorization: access,
      },
      data: {
        query: print(STATUS_MUTATION),
        variables: {
          assocId: candidate.assocId,
          status: status,
        },
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    /*
    if (status === "Accepted") {
      this.mutateCandidateAssoc(internId);
      axios({
        url: "/api/gen_fake_assocs",
        method: "post",
        headers: {},
        data: {
          assoc_id: candidate.assocId,
          env: process.env.NODE_ENV === "development" ? "dev" : "prod",
        },
      }).then((response) => {
        console.log(response);
      });
    }
    */
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
        query: print(MUTATION),
        variables: {
          assocId: candidate.assocId,
        },
      },
    }).then((result) => {
      console.log(result.data);
      let newCandidates = this.props.candidates.filter(
        (eachCandidate) => eachCandidate.Id !== candidate.Id
      );
      this.props.updateCandidates(newCandidates);
      this.props.updateInterns([...this.props.interns, candidate]);
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
                listings={this.props.listings}
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
                listings={this.props.listings}
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
