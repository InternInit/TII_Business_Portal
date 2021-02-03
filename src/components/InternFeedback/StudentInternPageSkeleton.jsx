import React from "react";
import styled from "styled-components";
import NavSearch from "../General/NavSearch.jsx";
import InfoBar from "../General/InfoBar.jsx";
import { InnerContainer, TabContainer } from "../Styled/FundamentalComponents";
import { Button, Row as AntRow, Col as AntCol, Skeleton } from "antd";

import { BiMessageSquareDetail, BiTime, BiCheckSquare } from "react-icons/bi";
import { AiOutlineRight } from "react-icons/ai";

import _ from "underscore";

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

const StudentInternPageSkeleton = (props) => {
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
          fieldOne={{
            name: "Name",
            sm: 10,
            lg: 6,
            align: "universal-left",
          }}
          fieldTwo={{
            name: "School",
            sm: 5,
            lg: 8,
            align: "universal-left",
          }}
          fieldThree={{
            name: "Internship Type",
            sm: 4,
            lg: 4,
            align: "universal-left",
          }}
          fieldFour={{
            name: "Action",
            sm: 5,
            lg: 6,
            align: "universal-center",
          }}
        />
        {_.times(localStorage.getItem("NumInterns"), () => (
          <StudentInternTabSkeleton />
        ))}
      </InnerContainer>
    </Container>
  );
};

export const StudentInternTabSkeleton = (props) => {
  return (
    <TabContainer className="mt-1-5 py-1-5 px-6 responsive-tab-container">
      {/**
       *
       * Listing Name + Industry
       *
       */}
      <AntRow justify="center">
        <AntCol className="universal-middle" xs={24} sm={10} lg={6}>
          <AntRow>
            <AntCol>
              <Skeleton.Avatar size={56} active />
            </AntCol>
            <AntCol flex="auto" offset={1}>
              <Skeleton
                paragraph={false}
                className="student-intern-tab-skeleton-name"
                active
              />
              <Skeleton
                paragraph={false}
                className="student-intern-tab-skeleton-position"
                active
              />
            </AntCol>
          </AntRow>
        </AntCol>

        {/**Status */}
        <AntCol
          className="universal-left universal-middle"
          xs={24}
          sm={5}
          lg={8}
        >
          <Skeleton
            paragraph={false}
            className="student-intern-tab-skeleton-school"
            active
          />
        </AntCol>

        <AntCol className="universal-left universal-middle" sm={4}>
          <Skeleton
            paragraph={false}
            className="student-intern-tab-skeleton-tag"
            active
          />
        </AntCol>

        {/**Applicants */}
        <AntCol className="universal-middle" xs={0} sm={5} lg={6}>
          <AntRow justify="center" align="middle">
            <BiTime className="thirtyTwoFont ml-point-25 mr-point-25 student-intern-tab-action-icon student-intern-tab-timesheet" />
            <BiMessageSquareDetail className="thirtyTwoFont ml-point-25 mr-point-25 student-intern-tab-action-icon student-intern-tab-feedback" />
            <BiCheckSquare className="thirtyTwoFont ml-point-25 mr-point-25 student-intern-tab-action-icon student-intern-tab-grades" />
          </AntRow>
        </AntCol>

        {/**Details */}
        <AiOutlineRight
          className="click-more-icon"
          style={{ fontSize: "24px" }}
        />
      </AntRow>
    </TabContainer>
  );
};

export default StudentInternPageSkeleton;
