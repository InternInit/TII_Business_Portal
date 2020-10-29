import React, { Component } from "react";
import "../../App.scss";
import "./candidates.css";
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

import { Menu } from "antd";

import { connect } from "react-redux";
import {
  updateCandidates,
  updateReduxCandidateStatus,
} from "../../redux/actions";

//axios
import axios from "axios";

import NavSearch from "../NavSearch";
import CandidatesNavbar from "./candidatesNavbar";
import HirePipeline from "./HirePipeline";
import ReviewApplicants from "./reviewApplicants";
import StudentInfo from "./StudentInfo";

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
    if (this.props.location.pathname.includes("review-applicants")) {
      return "review-applicants";
    } else {
      return "manage-candidates";
    }
  };

  updateCandidateStatus = (studentId, status) => {
    const headers = {
      headers: {
        StudentId: studentId,
        Authorization: "Bearer " + this.props.companyInfo.id,
      },
    };

    axios
      .post("/api/update_student_status", { status: status }, headers)
      .then((response) => {
        console.log(JSON.parse(response.data));

        let index = this.props.companyInfo.candidates.findIndex(
          (item, i) => item.studentId === studentId
        );
        console.log(index);
        this.props.updateReduxCandidateStatus(index, status);
      });
  };

  render() {
    return (
      <div style={{ backgroundColor: "#eceff9" }}>
        <NavSearch title="Internship Candidates" />
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
          <Route path={`/applicants/:id`} component={StudentInfo} />
        </ReactSwitch>
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CandidatesContainer)
);
