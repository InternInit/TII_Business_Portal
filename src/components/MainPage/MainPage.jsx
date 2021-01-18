import React, { useState } from "react";
import styled from "styled-components";

import { Layout, Skeleton, Row as AntRow, Col as AntCol, Grid } from "antd";
import BusinessNavBar from "../General/BusinessNavBar.jsx";
import PageListings from "./PageListings.jsx";
import PageFeedback from "./PageFeedback.jsx";
import MainPercentages from "./MainPercentages.jsx";
import StudentCard from "./StudentCard.jsx";
import NoResults from "./NoResults.jsx";
import NavSearch from "../General/NavSearch.jsx";
import {
  PageContainer,
  InnerContainer,
  Header,
} from "../Styled/FundamentalComponents.jsx";

import axios from "axios";

const pageDots = {
  height: "25px",
  width: "25px",
  borderRadius: "50%",
  backgroundColor: "#d3d3d3",
};

const MainPage = (props) => {
  const [page, setPage] = useState({
    applicantPage: 0,
    listingPage: 0,
    incomingPage: 0,
    internPage: 0,
  });

  const CARD_PER_PAGE = 3;

  let pageIndex = {
    applicantPage: [],
    listingPage: [],
    incomingPage: [],
    internPage: [],
  };

  let applicantPage = 0;
  let listingPage = 0;
  let incomingPage = 0;
  let internPage = 0;

  let { candidates, listings, interns } = props;

  const numberOfApplicants = (props1, props2) => {
    return props1 + props2;
  };

  const getDotCount = (prop) => {
    let dotCount;

    switch (prop) {
      case "Applicants":
        dotCount = Math.round(
          candidates.filter(
            (candidate) =>
              candidate.status.includes("Interview") ||
              candidate.status.includes("Review")
          ).length /
            CARD_PER_PAGE +
            0.49
        );
        for (let i = 0; i < dotCount; i++) {
          pageIndex.applicantPage.push(i);
        }
        break;

      case "Listings":
        dotCount = Math.round(listings.length / CARD_PER_PAGE + 0.49);
        for (let i = 0; i < dotCount; i++) {
          pageIndex.listingPage.push(i);
        }
        break;
      case "Incoming Applicants":
        dotCount = Math.round(
          candidates.filter((candidate) => candidate.status === "Pending")
            .length /
            CARD_PER_PAGE +
            0.49
        );
        for (let i = 0; i < dotCount; i++) {
          pageIndex.incomingPage.push(i);
        }
        break;
      case "Interns":
        dotCount = Math.round(interns.length / CARD_PER_PAGE + 0.49);
        for (let i = 0; i < dotCount; i++) {
          pageIndex.internPage.push(i);
        }
        break;
      default:
        break;
    }

    // return dotCount;
  };

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const isLg = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((breakpoint) => breakpoint[0])
    .includes("lg");

  const findNumApplicants = (listing, dataPoint) => {
    let count = 0;

    switch (dataPoint) {
      case "Applicants":
        for (let i = 0; i < candidates.length; i++){
          if (candidates[i].appliedFor === listing){
            count = count + 1;
          }
        };
        break;
      case "Accepted":
        for (let i = 0; i < interns.length; i++){
          if (interns[i].appliedFor === listings){
            count = count + 1;
          };
        };
        break;
      default:
        count = 0;
        break;
    };

    return count;
  };

  return (
    <PageContainer>
      <NavSearch title="Overview" searchBar={false} />

      <InnerContainer className="py-2">
        <AntRow gutter={[32, 16]} style={{ flex: 1 }}>
          <AntCol xs={24} sm={{ span: 24, order: 1 }} lg={16}>
            <Header className="twentyTwoFont mb-point-5">
              Listings
              {listings.length > CARD_PER_PAGE
                ? " (" + listings.length + ")"
                : null}
            </Header>
            {listings.length === 0 ? (
              <NoResults
                message={"Oops, it looks like you don't have any listings"}
                isListing={true}
              />
            ) : (
              <>
                {listings
                  .slice(
                    page.listingPage * CARD_PER_PAGE,
                    (page.listingPage + 1) * CARD_PER_PAGE
                  )
                  .map((post) => (
                    <PageListings
                      name={post.Title}
                      interns={findNumApplicants(post.Title, "Applicants")}
                      accepted={findNumApplicants(post.Title, "Accepted")}
                      industry={post.Industries}
                      id={post.Id}
                    />
                  ))}
              </>
            )}
          </AntCol>
          <AntCol xs={24} sm={{ span: 12, order: 2 }} lg={8}>
            <Header className="twentyTwoFont mb-point-5">
              Incoming Applications
              {candidates.filter((candidate) => candidate.status === "Pending")
                .length > CARD_PER_PAGE
                ? " (" +
                  candidates.filter(
                    (candidate) => candidate.status === "Pending"
                  ).length +
                  ")"
                : null}
            </Header>
            {candidates.filter((candidate) => candidate.status === "Pending")
              .length !== 0 ? (
              <>
                {candidates
                  .filter((candidate) => candidate.status === "Pending")
                  .slice(
                    page.incomingPage * CARD_PER_PAGE,
                    (page.incomingPage + 1) * CARD_PER_PAGE
                  )
                  .map((student) => (
                    <StudentCard
                      firstName={student.formData["0"]["First Name"]}
                      lastName={student.formData["0"]["Last Name"]}
                      age={" (" + student.formData["1"]["Age"] + ")"}
                      avatar={`http://tii-intern-media.s3-website-us-east-1.amazonaws.com/${student.Id}/profile_picture`}
                      id={student.Id}
                      tag={false}
                      type={student.status}
                      position={student.appliedFor}
                    />
                  ))}
              </>
            ) : (
              <NoResults
                message={"You don't have any incoming applications"}
                isListing={false}
              />
            )}
          </AntCol>
          <AntCol xs={24} sm={{ span: 12, order: 2 }} lg={0}>
            <Header className="twentyTwoFont mb-point-5">
              Applicants
              {candidates.filter(
                (candidate) =>
                  candidate.status.includes("Interview") ||
                  candidate.status.includes("Review")
              ).length > CARD_PER_PAGE
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
            {candidates.filter(
              (candidate) =>
                candidate.status.includes("Interview") ||
                candidate.status.includes("Review")
            ).length !== 0 ? (
              <>
                {candidates
                  .filter(
                    (candidate) =>
                      candidate.status.includes("Interview") ||
                      candidate.status.includes("Review")
                  )
                  .slice(
                    page.applicantPage * CARD_PER_PAGE,
                    (page.applicantPage + 1) * CARD_PER_PAGE
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
                      position={student.appliedFor}
                    />
                  ))}
              </>
            ) : (
              <NoResults
                message={"Hooray! You've reviewed all of your applicants"}
                isListing={false}
              />
            )}
          </AntCol>
        </AntRow>

        <AntRow gutter={[32, 16]} style={{ flex: 1, marginTop: "-20px" }} >
          <AntCol xs={24} sm={{ span: 24, order: 1 }} lg={16}>
            {listings.length > CARD_PER_PAGE ? (
              <AntRow justify="center">
                {getDotCount("Listings")}
                {pageIndex.listingPage.map((number) => (
                  <div
                    onClick={() => {
                      setPage({
                        listingPage: number,
                        applicantPage: applicantPage,
                        incomingPage: incomingPage,
                        internPage: internPage,
                      });
                      listingPage = number;
                    }}
                    className={
                      page.listingPage === number
                        ? "dashboard-pagination-current-page"
                        : "dashboard-pagination"
                    }
                  />
                ))}
              </AntRow>
            ) : null}
          </AntCol>
          <AntCol xs={24} sm={{ span: 12, order: 2 }} lg={8}>
            {candidates.filter((candidate) => candidate.status === "Pending")
              .length > CARD_PER_PAGE ? (
              <AntRow justify="center">
                {getDotCount("Incoming Applicants")}
                {pageIndex.incomingPage.map((number) => (
                  <div
                    onClick={() => {
                      setPage({
                        incomingPage: number,
                        applicantPage: applicantPage,
                        internPage: internPage,
                        listingPage: listingPage,
                      });
                      incomingPage = number;
                    }}
                    className={
                      page.incomingPage === number
                        ? "dashboard-pagination-current-page"
                        : "dashboard-pagination"
                    }
                  />
                ))}
              </AntRow>
            ) : null}
          </AntCol>
          <AntCol xs={24} sm={{ span: 12, order: 2 }} lg={0}>
            {candidates.filter(
              (candidate) =>
                candidate.status.includes("Interview") ||
                candidate.status.includes("Review")
            ).length > CARD_PER_PAGE ? (
              isLg ? null : (
                <AntRow justify="center">
                  {getDotCount("Applicants")}
                  {pageIndex.applicantPage.map((number) => (
                    <div
                      onClick={() => {
                        setPage({
                          applicantPage: number,
                          listingPage: listingPage,
                          internPage: internPage,
                          incomingPage: incomingPage,
                        });
                        applicantPage = number;
                      }}
                      className={
                        page.applicantPage === number
                          ? "dashboard-pagination-current-page"
                          : "dashboard-pagination"
                      }
                    />
                  ))}
                </AntRow>
              )
            ) : null}
          </AntCol>
        </AntRow>

        <AntRow gutter={[32, 16]} style={{ flex: 1 }}>
          <AntCol xs={24} sm={24} lg={16}>
            <Header className="twentyTwoFont mb-point-5">
              Current Interns
              {interns.length > CARD_PER_PAGE
                ? " (" + interns.length + ")"
                : null}
            </Header>
            {interns.length !== 0 ? (
              <>
                {interns
                  .slice(
                    page.internPage * CARD_PER_PAGE,
                    (page.internPage + 1) * CARD_PER_PAGE
                  )
                  .map((student) => (
                    <PageFeedback
                      firstName={student.formData["0"]["First Name"]}
                      lastName={student.formData["0"]["Last Name"]}
                      school={student.school.name}
                      avatar={`http://tii-intern-media.s3-website-us-east-1.amazonaws.com/${student.Id}/profile_picture`}
                      position={student.appliedFor}
                      id={student.Id}
                    />
                  ))}
              </>
            ) : (
              <NoResults
                message={"You don't have any interns at the moment"}
                isListing={false}
              />
            )}
          </AntCol>
          <AntCol xs={0} lg={8}>
            <Header className="twentyTwoFont mb-point-5">
              Applicants
              {candidates.filter(
                (candidate) =>
                  candidate.status.includes("Interview") ||
                  candidate.status.includes("Review")
              ).length > CARD_PER_PAGE
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
            {candidates.filter(
              (candidate) =>
                candidate.status.includes("Interview") ||
                candidate.status.includes("Review")
            ).length !== 0 ? (
              <>
                {candidates
                  .filter(
                    (candidate) =>
                      candidate.status.includes("Interview") ||
                      candidate.status.includes("Review")
                  )
                  .slice(
                    page.applicantPage * CARD_PER_PAGE,
                    (page.applicantPage + 1) * CARD_PER_PAGE
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
                      position={student.appliedFor}
                    />
                  ))}
              </>
            ) : (
              <NoResults
                message={"Hooray! You've reviewed all of your applicants"}
                isListing={false}
              />
            )}
          </AntCol>
        </AntRow>
        <AntRow gutter={[32, 16]} style={{ flex: 1, marginTop: "-20px" }}>
          <AntCol xs={24} sm={24} lg={16}>
            {interns.length > CARD_PER_PAGE ? (
              <AntRow justify="center">
                {getDotCount("Interns")}
                {pageIndex.internPage.map((number) => (
                  <div
                    onClick={() => {
                      setPage({
                        applicantPage: applicantPage,
                        listingPage: listingPage,
                        internPage: number,
                        incomingPage: incomingPage,
                      });
                      internPage = number;
                    }}
                    className={
                      page.internPage === number
                        ? "dashboard-pagination-current-page"
                        : "dashboard-pagination"
                    }
                  />
                ))}
              </AntRow>
            ) : null}
          </AntCol>
          <AntCol xs={0} lg={8}>
            {candidates.filter(
              (candidate) =>
                candidate.status.includes("Interview") ||
                candidate.status.includes("Review")
            ).length > CARD_PER_PAGE ? (
              <AntRow justify="center">
                {getDotCount("Applicants")}
                {pageIndex.applicantPage.map((number) => (
                  <div
                    onClick={() => {
                      setPage({
                        applicantPage: number,
                        listingPage: listingPage,
                        incomingPage: incomingPage,
                        internPage: internPage,
                      });
                      applicantPage = number;
                    }}
                    className={
                      page.applicantPage === number
                        ? "dashboard-pagination-current-page"
                        : "dashboard-pagination"
                    }
                  />
                ))}
              </AntRow>
            ) : null}
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
