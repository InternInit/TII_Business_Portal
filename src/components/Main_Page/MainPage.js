import React from "react";
import styled from "styled-components";

import { Layout } from "antd";
import BusinessNavBar from "../BusinessNavBar";
import PageListings from "./PageListings";
import PageFeedback from "./PageFeedback";
import MainPercentages from "./MainPercentages";
import StudentCard from "./StudentCard";

const PageHeader = styled.h1`
  font-size: 36px;
  font-weight: 500;
  margin-left: 25px;
  padding-top: 10px;
`;

const PageHeaderContainer = styled.div`
  background-color: white;
  height: 75px;
  border-bottom: 1px solid #bfbfbf;
  margin-bottom: 10px;
`;

const Header = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #262626;
  margin-bottom: 12px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

class MainPage extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "#ECEFF9",
          minHeight: "100vh"
        }}
      >
        <PageHeaderContainer>
          <PageHeader>Overview</PageHeader>
        </PageHeaderContainer>

        <Row style={{ minWidth: "550px" }}>
          {/**
           *
           * Column 1
           *
           */}
          <Col style={{ marginLeft: "2%", width: "60%" }}>
            {/**
             *
             * Listings
             *
             */}
            <Header> Listings</Header>
            <PageListings />
            <PageListings />
            <PageListings />

            {/**
             *
             * Intern Feedback
             *
             */}
            <Header>Intern Feedback</Header>
            <PageFeedback />

            {/**
             *
             * Industry Percentages
             *
             */}
            <div style={{ marginTop: "12px" }}>
              <MainPercentages />
            </div>
          </Col>

          {/**
           *
           * Column 2
           *
           */}
          <Col style={{ marginLeft: "2%", width: "32%" }}>
            {/**
             *
             * Incoming Applicants
             *
             */}
            <Header>Incoming Applicants</Header>
            <StudentCard />
            <StudentCard />
            <StudentCard />
            <StudentCard />
            <StudentCard />

            {/**
             *
             * To be Interviewed
             *
             */}
            <Header>Incoming Applicants</Header>
            <StudentCard />
            <StudentCard />
            <StudentCard />
          </Col>
        </Row>
      </div>
    );
  }
}
export default MainPage;
