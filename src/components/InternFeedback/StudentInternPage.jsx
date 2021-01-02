import React, { Component } from "react";
import styled from "styled-components";
import FeedbackBox from "./FeedbackBox.jsx";
import StudentInternTab from "./StudentInternTab.jsx";
import NavSearch from "../General/NavSearch.jsx";
import InfoBar from "../General/InfoBar.jsx";
import { InnerContainer } from "../Styled/FundamentalComponents";
import { Link } from "react-router-dom";
import { Button, Row as AntRow, Col as AntCol } from "antd";
import { students } from "../../Fake_Students.js";

import { connect } from "react-redux";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-width: 600px;
`;

const ButtonStyle = {
  width: "100%",
  minWidth: "170px",
  height: "40px",
  fontFamily: "roboto",
};

const mapStateToProps = (state) => {
  return {
    companyInfo: state.companyInfo,
    loadingStatuses: state.loadingStatuses,
  };
};

class InternFeedback extends Component {
  render() {
    return (this.props.loadingStatuses.isCandidateLoading) ? (
      <>
        <h1>IMPLEMENT SOME KIND ON LOADING SCREEN HERE</h1>
      </>
    ) : (
      <>
        <Container className="global-container">
          <NavSearch title="My Interns" placeholder="Search Interns" />
          <InnerContainer className="mt-2 mb-4">
            <AntRow gutter={[32, 16]}>
              <AntCol xs={24} md={8} lg={5}>
                <Button type="default" style={ButtonStyle}>
                  <span className="sixteenFont">Sort By</span>
                </Button>
              </AntCol>
            </AntRow>

            <InfoBar
              mobileHeader="Interns"
              fieldOne={{ name: "Name", sm: 10, lg: 6, align: "universal-left" }}
              fieldTwo={{ name: "School", sm: 5, lg: 8, align: "universal-left" }}
              fieldThree={{ name: "Internship Type", sm: 4, lg: 4, align: "universal-left" }}
              fieldFour={{ name: "Action", sm: 5, lg: 6, align: "universal-center" }}
            />

            {this.props.companyInfo.candidates.map((student) => (
              <StudentInternTab
                firstName={student.formData["0"]["First Name"]}
                lastName={student.formData["0"]["Last Name"]}
                age={student.formData["1"]["Age"]}
                type="Hybrid"
                id={student.Id}
                position="Position Placeholder"
                school={student.school.name}
                avatar={`https://tii-intern-media.s3.amazonaws.com/${student.Id}/profile_picture`}
              />
            ))}

            <FeedbackBox style={{ marginTop: "12vh" }} />
            <FeedbackBox style={{ marginTop: "12vh" }} />
          </InnerContainer>
        </Container>
      </>
    );
  }
}
export default connect(mapStateToProps)(InternFeedback);
