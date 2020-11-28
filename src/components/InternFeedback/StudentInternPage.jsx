import React, { Component } from "react";
import styled from "styled-components";
import FeedbackBox from "./FeedbackBox.jsx";
import NavSearch from "../General/NavSearch.jsx";
import { Link } from "react-router-dom";
import { Button, Row as AntRow, Col as AntCol } from "antd";
import { InnerContainer } from "../Styled/FundamentalComponents";
import InfoBar from "../General/InfoBar.jsx";

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
              <Link to="/internship-listings/add-listing">
                <Button type="default" style={ButtonStyle}>
                  <span className="sixteenFont">New Internship</span>
                </Button>
              </Link>
            </AntCol>
            <AntCol xs={24} md={6} lg={4}>
              <Button type="text" style={ButtonStyle}>
                <span className="sixteenFont">Sort By</span>
              </Button>
            </AntCol>
          </AntRow>

          <InfoBar
            mobileHeader="Interns"
            fieldOne={{ name: "Name", sm: 8, lg: 8 }}
            fieldTwo={{ name: "School", sm: 8, lg: 8 }}
            fieldThree={{ name: "Actions", sm: 6, lg: 6 }}
            fieldFour={{ name: "", sm: 2, lg: 2 }}
          />

          <FeedbackBox style={{ marginTop: "12vh" }} />
          <FeedbackBox style={{ marginTop: "12vh" }} />
        </InnerContainer>
      </Container>
    );
  }
}
export default InternFeedback;
