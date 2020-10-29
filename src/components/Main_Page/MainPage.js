import React from "react";
import styled from "styled-components";

import { Layout, Skeleton } from "antd";
import BusinessNavBar from "../BusinessNavBar";
import PageListings from "./PageListings";
import PageFeedback from "./PageFeedback";
import MainPercentages from "./MainPercentages";
import StudentCard from "./StudentCard";
import NavSearch from "../NavSearch";

import axios from "axios";

const PageHeader = styled.h1`
  font-size: 36px;
  font-weight: 500;
  margin-left: 25px;
`;

const PageHeaderContainer = styled.div`
  background-color: white;
  height: 60px;
  border-bottom: 1px solid #bfbfbf;
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
  state = {
    students: [],
    business: null,
  };

  render() {
    let { candidates, listings } = this.props;

    return (
      <div
        style={{
          backgroundColor: "#eceff9",
          minHeight: "100vh",
        }}
      >
        <NavSearch title="Overview" searchBar={false} />

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
            {listings.slice(0, 5).map((post) => (
              <PageListings
                name={post.Title}
                interns={0}
                accepted={0}
                total={post.interns + post.interns}
              />
            ))}

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
            {candidates
              .filter((candidate) => candidate.status === "Pending")
              .map((student) => (
                <StudentCard
                  firstName={student.info["First Name"]}
                  lastName={student.info["Last Name"]}
                  age={" (" + student.info["Age"] + ")"}
                  avatar={`https://tii-intern-media.s3.amazonaws.com/${student.studentId}/profile_picture`}
                />
              ))}

            {/**
             *
             * To be Interviewed
             *
             */}
            <Header>To be Interviewed</Header>
            {candidates
              .filter((candidate) => candidate.status === "Review")
              .map((student) => (
                <StudentCard
                  firstName={student.info["First Name"]}
                  lastName={student.info["Last Name"]}
                  age={" (" + student.info["Age"] + ")"}
                  avatar={`https://tii-intern-media.s3.amazonaws.com/${student.studentId}/profile_picture`}
                />
              ))}
          </Col>
        </Row>
      </div>
    );
  }
}
export default MainPage;
