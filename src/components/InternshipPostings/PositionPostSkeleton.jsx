import React from "react";
import { Button, Row as AntRow, Col as AntCol, Skeleton, Grid } from "antd";
import NavSearch from "../General/NavSearch.jsx";
import InfoBar from "../General/InfoBar.jsx";
import {
  PageContainer,
  InnerContainer,
  TabContainer,
  Caption,
} from "../Styled/FundamentalComponents";

import { Link } from "react-router-dom";

const { useBreakpoint } = Grid;

//Ant Design Styles
const ButtonStyle = {
  width: "100%",
  minWidth: "170px",
  height: "40px",
  fontFamily: "roboto",
};

const PositionPostSkeleton = (props) => {
  return (
    <PageContainer className="global-container">
      <NavSearch title="My Internship Postings" placeholder="Search Postings" />

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
        {/**
         * Info Bar
         */}
        <InfoBar
          mobileHeader="Postings"
          fieldOne={{ name: "Name", sm: 9, lg: 7 }}
          fieldTwo={{ name: "Status", sm: 3, lg: 5 }}
          fieldThree={{ name: "Applicants", sm: 6, lg: 6 }}
          fieldFour={{ name: "Edit Details", sm: 6, lg: 6 }}
        />
        <PostingTabSkeleton />
        <PostingTabSkeleton />
      </InnerContainer>
    </PageContainer>
  );
};

const PostingTabSkeleton = (props) => {
  const screens = useBreakpoint();

  const isXs = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((breakpoint) => breakpoint[0])
    .includes("xs");

  return (
    <TabContainer className="mt-1-5 py-1-5 px-6 internship-posting-responsive-tab-container">
      {/**
       *
       * Listing Name + Industry
       *
       */}
      <AntRow gutter={[32, 0]} justify="center">
        <AntCol className="universal-middle" xs={24} sm={9} lg={7}>
          {isXs ? (
            <>
              <AntRow justify="center">
                <Skeleton
                  className="internship-posting-skeleton-header"
                  paragraph={false}
                  active
                />
              </AntRow>
              <AntRow className="mb-1-5" justify="center">
                <Skeleton
                  className="internship-posting-skeleton-industry"
                  paragraph={false}
                  active
                />
              </AntRow>
            </>
          ) : (
            <>
              <AntRow justify="start">
                <Skeleton
                  className="internship-posting-skeleton-header"
                  paragraph={false}
                  active
                />
              </AntRow>
              <AntRow justify="start">
              <Skeleton
                  className="internship-posting-skeleton-industry"
                  paragraph={false}
                  active
                />
              </AntRow>
            </>
          )}
        </AntCol>

        {/**Status */}
        <AntCol
          className="universal-center universal-middle"
          xs={12}
          sm={3}
          lg={5}
        >
          <Skeleton
            className="universal-center internship-posting-skeleton-status"
            paragraph={false}
            active
          />
        </AntCol>

        {/**Applicants */}
        <AntCol xs={12} sm={6}>
          <AntRow justify="center">
            <Skeleton
              className="internship-posting-skeleton-applicants"
              paragraph={false}
              active
            />
          </AntRow>
          <AntRow justify="center">
            <Caption className="fourteenFont" style={{ color: "#BFBFBF" }}>
              Applicants
            </Caption>
          </AntRow>
        </AntCol>

        {/**Details */}
        <AntCol xs={24} className="universal-center universal-middle" sm={6}>
          {isXs ? (
            <Button
              className="mt-1-5"
              type="primary"
              style={{
                width: "100%",
              }}
              size="large"
            >
              Details
            </Button>
          ) : (
            <Button
              type="primary"
              style={{
                width: "90%",
              }}
            >
              Details
            </Button>
          )}
        </AntCol>
      </AntRow>
    </TabContainer>
  );
};
export default PositionPostSkeleton;
