import React, { Component } from "react";
import "../../App.css";
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
  withRouter
} from "react-router-dom";

import { Menu } from "antd";

import NavSearch from "../NavSearch";
import CandidatesNavbar from "./candidatesNavbar";
import HirePipeline from "./HirePipeline";
import ReviewApplicants from "./reviewApplicants";
import StudentInfo from "./StudentInfo";

class CandidatesContainer extends Component {
  findPath = () => {
    if (this.props.location.pathname.includes("review-applicants")) {
      return "review-applicants";
    } else {
      return "manage-candidates";
    }
  };

  render() {
    return (
      <div style={{ backgroundColor: '#eceff9' }}>
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
            component={ReviewApplicants}
          />
          <Route
            path="/applicants/manage-candidates"
            exact
            component={HirePipeline}
          />
          <Route path={`/applicants/:id`} component={StudentInfo} />
        </ReactSwitch>
      </ div>
    );
  }
}

export default withRouter(CandidatesContainer);
