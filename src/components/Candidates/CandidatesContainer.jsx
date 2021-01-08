import React, { Component } from "react";
import "../../App.scss";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch as ReactSwitch,
  Redirect,
  useRouteMatch as match,
  useParams,
  withRouter,
} from "react-router-dom";

import { Row as AntRow, Col as AntCol } from "antd";

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
  };
};

const mapDispatchToProps = {
  updateCandidates,
  updateReduxCandidateStatus,
};

class CandidatesContainer extends Component {
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
  };

  render() {
    return (
      <PageContainer
        style={
          this.findPath() === "manage-candidates"
            ? { minWidth: "1500px", position: "relative" }
            : null
        }
      >
        <AntRow style={{ width: "100%" }}>
          <NavSearch
            title="Internship Candidates"
            placeholder="Search Applicants"
            style={
              this.findPath() === "manage-candidates"
                ? { minWidth: "1500px" }
                : null
            }
          />
        </AntRow>
        <CandidatesNavbar defaultSelectedKey={this.findPath()} />
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
