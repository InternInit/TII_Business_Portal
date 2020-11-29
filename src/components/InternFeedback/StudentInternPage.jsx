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

class InternFeedback extends Component {
  render() {
    return (
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
            fieldOne={{ name: "Name", sm: 10, lg: 8 }}
            fieldTwo={{ name: "School", sm: 8, lg: 8 }}
            fieldThree={{ name: "Actions", sm: 6, lg: 8 }}
            fieldFour={{ name: "", sm: 0, lg: 0 }}
          />

          {students.map((student) => (
            <StudentInternTab
              firstName={student.firstName}
              lastName={student.lastName}
              id={student.id}
              position={student.position}
              school={student.school}
              avatar={student.image}
            />
          ))}

          <FeedbackBox style={{ marginTop: "12vh" }} />
          <FeedbackBox style={{ marginTop: "12vh" }} />
        </InnerContainer>
      </Container>
    );
  }
}
export default InternFeedback;