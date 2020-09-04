import React from "react";
import styled from "styled-components";

import { Layout, Skeleton } from "antd";
import BusinessNavBar from "../BusinessNavBar";
import PageListings from "./PageListings";
import PageFeedback from "./PageFeedback";
import MainPercentages from "./MainPercentages";
import StudentCard from "./StudentCard";

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

  componentDidMount() {
    fetch("http://localhost:8000/business?_page=1&_limit=1")
      .then((response) => response.json())
      .then((json) => this.setState({ business: json }));
  }

  render() {
    let { students, business } = this.state;
    let { candidates } = this.props;

    if (business === null) {
      return null;
    }
    return (
      <div
        style={{
          backgroundColor: "#eceff9",
          minHeight: "100vh",
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
            {business[0].listings.slice(0, 3).map((post) => (
              <PageListings
                name={post.name}
                interns={post.interns}
                accepted={post.interns}
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
                  avatar={
                    "https://previews.123rf.com/images/aquir/aquir1504/aquir150401107/39120040-example-grunge-retro-red-isolated-ribbon-stamp.jpg"
                  }
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
                  avatar={
                    "https://previews.123rf.com/images/aquir/aquir1504/aquir150401107/39120040-example-grunge-retro-red-isolated-ribbon-stamp.jpg"
                  }
                />
              ))}
          </Col>
        </Row>
      </div>
    );
  }
}
export default MainPage;
