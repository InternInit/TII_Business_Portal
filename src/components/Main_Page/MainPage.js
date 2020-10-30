import React from "react";
import styled from "styled-components";

import { Layout, Skeleton, Row as AntRow, Col as AntCol } from "antd";
import BusinessNavBar from "../BusinessNavBar";
import PageListings from "./PageListings";
import PageFeedback from "./PageFeedback";
import MainPercentages from "./MainPercentages";
import StudentCard from "./StudentCard";
import NavSearch from "../NavSearch";
import "./main_page.scss";

import axios from "axios";

const Header = styled.h1`
  font-weight: 500;
  color: #262626;
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
      <div className="global-container">
        <NavSearch title="Overview" searchBar={false} />

        <div className="dashboard-container px-4 py-2">
          <AntRow gutter={[32, 16]}>
            <AntCol lg={16}>
              <Header className="twentyFont mb-point-5"> Listings</Header>
              {listings.slice(0, 5).map((post) => (
                <PageListings
                  name={post.Title}
                  interns={0}
                  accepted={0}
                  total={post.interns + post.interns}
                />
              ))}
            </AntCol>
            <AntCol lg={8}>
              <Header className="twentyFont mb-point-5">
                Incoming Applicants
              </Header>
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
            </AntCol>
          </AntRow>

          <AntRow gutter={[32, 16]}>
            <AntCol lg={16}>
              <Header className="twentyFont mb-point-5">Current Interns</Header>
              <PageFeedback />
            </AntCol>
            <AntCol lg={8}>
              <Header className="twentyFont mb-point-5">
                To be Interviewed
              </Header>
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
            </AntCol>
          </AntRow>

          <AntRow gutter={[32, 16]}>
            <MainPercentages />
          </AntRow>
        </div>
      </div>
    );
  }
}
export default MainPage;
