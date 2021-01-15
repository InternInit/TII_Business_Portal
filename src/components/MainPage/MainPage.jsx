import React, { useState } from "react";
import styled from "styled-components";

import { Layout, Skeleton, Row as AntRow, Col as AntCol } from "antd";
import BusinessNavBar from "../General/BusinessNavBar.jsx";
import PageListings from "./PageListings.jsx";
import PageFeedback from "./PageFeedback.jsx";
import MainPercentages from "./MainPercentages.jsx";
import StudentCard from "./StudentCard.jsx";
import NavSearch from "../General/NavSearch.jsx";
import {
  PageContainer,
  InnerContainer,
  Header,
} from "../Styled/FundamentalComponents.jsx";

import axios from "axios";

const MainPage = (props) => {
  const [state, setState] = useState({
    students: [],
    business: null,
  });

  let { candidates, listings, interns } = props;
  console.log(candidates);

  const numberOfApplicants = (interviews, reviews) => {
    return interviews + reviews;
  };

  return (
    <PageContainer>
      <NavSearch title="Overview" searchBar={false} />

      <InnerContainer className="py-2">
        <AntRow gutter={[32, 16]} style={{ flex: 1 }}>
          <AntCol xs={24} sm={{ span: 24, order: 1 }} lg={16}>
            <Header className="twentyEightFont mb-point-5"> Listings</Header>
            {listings.slice(0, 3).map((post) => (
              <PageListings
                name={post.Title}
                interns={420}
                accepted={69}
                total={"Total?"}
                industry={post.Industries}
                id={post.Id}
              />
            ))}
          </AntCol>
          <AntCol xs={24} sm={{ span: 12, order: 2 }} lg={8}>
            <Header className="twentyEightFont mb-point-5">
              Incoming Applications
              {candidates.filter((candidate) => candidate.status === "Pending")
                .length !== 0
                ? " (" +
                  candidates.filter(
                    (candidate) => candidate.status === "Pending"
                  ).length +
                  ")"
                : null}
            </Header>
            {candidates
              .filter((candidate) => candidate.status === "Pending")
              .map((student) => (
                <StudentCard
                  firstName={student.formData["0"]["First Name"]}
                  lastName={student.formData["0"]["Last Name"]}
                  age={" (" + student.formData["1"]["Age"] + ")"}
                  avatar={`http://tii-intern-media.s3-website-us-east-1.amazonaws.com/${student.Id}/profile_picture`}
                  id={student.Id}
                  tag={false}
                  type={student.status}
                />
              ))}
          </AntCol>
          <AntCol xs={24} sm={{ span: 12, order: 2 }} lg={0}>
            <Header className="twentyEightFont mb-point-5">
              Applicants
              {candidates.filter(
                (candidate) =>
                  candidate.status.includes("Interview") ||
                  candidate.status.includes("Review")
              ).length !== 0
                ? " (" +
                  numberOfApplicants(
                    candidates.filter((candidate) =>
                      candidate.status.includes("Interview")
                    ).length,
                    candidates.filter((candidate) =>
                      candidate.status.includes("Review")
                    ).length
                  ) +
                  ")"
                : null}
            </Header>
            {candidates
              .filter(
                (candidate) =>
                  candidate.status.includes("Interview") ||
                  candidate.status.includes("Review")
              )
              .map((student) => (
                <StudentCard
                  firstName={student.formData["0"]["First Name"]}
                  lastName={student.formData["0"]["Last Name"]}
                  age={" (" + student.formData["1"]["Age"] + ")"}
                  avatar={`http://tii-intern-media.s3-website-us-east-1.amazonaws.com/${student.Id}/profile_picture`}
                  id={student.Id}
                  tag={true}
                  type={student.status}
                />
              ))}
          </AntCol>
        </AntRow>
        <AntRow gutter={[32, 16]} style={{ flex: 1 }}>
          <AntCol xs={24} sm={24} lg={16}>
            <Header className="twentyEightFont mb-point-5">
              Current Interns
            </Header>
            {interns.map((student) => (
              <PageFeedback
                firstName={student.formData["0"]["First Name"]}
                lastName={student.formData["0"]["Last Name"]}
                school={student.school.name}
                avatar={`http://tii-intern-media.s3-website-us-east-1.amazonaws.com/${student.Id}/profile_picture`}
                position={"Professional Gamer"}
                id={student.Id}
              />
            ))}
          </AntCol>
          <AntCol xs={0} lg={8}>
            <Header className="twentyEightFont mb-point-5">
              Applicants
              {candidates.filter(
                (candidate) =>
                  candidate.status.includes("Interview") ||
                  candidate.status.includes("Review")
              ).length !== 0
                ? " (" +
                  numberOfApplicants(
                    candidates.filter((candidate) =>
                      candidate.status.includes("Interview")
                    ).length,
                    candidates.filter((candidate) =>
                      candidate.status.includes("Review")
                    ).length
                  ) +
                  ")"
                : null}
            </Header>
            {candidates
              .filter(
                (candidate) =>
                  candidate.status.includes("Interview") ||
                  candidate.status.includes("Review")
              )
              .map((student) => (
                <StudentCard
                  firstName={student.formData["0"]["First Name"]}
                  lastName={student.formData["0"]["Last Name"]}
                  age={" (" + student.formData["1"]["Age"] + ")"}
                  avatar={`http://tii-intern-media.s3-website-us-east-1.amazonaws.com/${student.Id}/profile_picture`}
                  id={student.Id}
                  tag={true}
                  type={student.status}
                />
              ))}
          </AntCol>
        </AntRow>
        <AntRow gutter={[32, 16]} style={{ flex: 1 }}>
          <MainPercentages
            currentApplicantsReceived={candidates.length}
            internsTaken={interns.length}
          />
        </AntRow>
      </InnerContainer>
    </PageContainer>
  );
};

export default MainPage;
