import React from "react";
import styled from "styled-components";

import { Layout, Skeleton, Row as AntRow, Col as AntCol } from "antd";
import BusinessNavBar from "../General/BusinessNavBar.jsx";
import PageListings from "./PageListings.jsx";
import PageFeedback from "./PageFeedback.jsx";
import MainPercentages from "./MainPercentages.jsx";
import StudentCard from "./StudentCard.jsx";
import NavSearch from "../General/NavSearch.jsx";

import axios from "axios";

const Header = styled.h1`
  font-weight: 500;
  color: #262626;
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

        <div style={{height: "90vh", display: "flex", flexDirection: "column"}}  className="px-4 py-2">
          <AntRow gutter={[32, 16]} style={{flex: 1}}>
            <AntCol xs={24} sm={{span: 24, order: 1}} lg={16}>
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
            <AntCol xs={24} sm={{span: 12, order: 2}} lg={8}>
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
            <AntCol xs={24} sm={{ span: 12, order: 2 }} lg={0}>
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

          <AntRow gutter={[32, 16]} style={{flex: 1}}>
            <AntCol xs={24} sm={24} lg={16}>
              <Header className="twentyFont mb-point-5">Current Interns</Header>
              <PageFeedback />
            </AntCol>
            <AntCol xs={0} lg={8}>
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

          <AntRow gutter={[32, 16]} style={{flex: 1}}>
            <MainPercentages />
          </AntRow>
        </div>
      </div>
    );
  }
}
export default MainPage;
