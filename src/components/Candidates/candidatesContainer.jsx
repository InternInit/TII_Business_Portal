import React, { Component } from "react";
import "../../App.css";
import "./candidates.css";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import NavSearch from "../NavSearch";

/*
 ========================================================================
                              Heading Styles
 ========================================================================
*/
const HeadingContainer = styled.div`
  height: 90px;
  background-color: white;
`;

const CandidateHeading = styled.h1`
  font-family: lato;
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  margin-left: 5%;
`;

class CandidatesContainer extends Component {
  render() {
    return (
      <div>
        <NavSearch title="Internship Candidates" />
      </div>
    );
  }
}

export default withRouter(CandidatesContainer);
