import React, { Component, useEffect } from "react";
import styled from "styled-components";
import { Button, Row as AntRow, Col as AntCol, Grid } from "antd";
import { Link } from "react-router-dom";
import { TabContainer } from "../Styled/FundamentalComponents";

const { useBreakpoint } = Grid;

const Header = styled.span`
  font-weight: bold;
  text-align: center;
`;

const Caption = styled.span`
  text-align: center;
`;

const Status = styled.span`
  font-weight: 500;
`;

const PostingTab = (props) => {
  //Breakpoint calculator for extrasmall screen sizes
  const screens = useBreakpoint();

  const isXs = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((breakpoint) => breakpoint[0])
    .includes("xs");

  let { status, name, interns } = props;
  let statusColor = "";

  let { id } = props;

  switch (status) {
    case "Active":
      statusColor = "#52c41a";
      break;
    case "Inactive":
      statusColor = "#f5222d";
      break;
    default:
      break;
  }
  return (
    <TabContainer className="mt-1-5 py-1-5 px-6 internship-posting-responsive-tab-container">
      {/**
       *
       * Listing Name + Industry
       *
       */}
      <AntRow gutter={[32, 0]} justify="center">
        <AntCol className="universal-middle" xs={24} sm={9} lg={6}>
          {isXs ? (
            <>
              <AntRow justify="center">
                <Header className="twentyFont">{name}</Header>
              </AntRow>
              <AntRow className="mb-1-5" justify="center">
                <Caption className="fourteenFont">Data Science</Caption>
              </AntRow>
            </>
          ) : (
            <>
              <AntRow justify="start">
                <Header className="eighteenFont">{name}</Header>
              </AntRow>
              <AntRow justify="start">
                <Caption className="fourteenFont">Data Science</Caption>
              </AntRow>
            </>
          )}
        </AntCol>

        {/**Status */}
        <AntCol
          className="universal-center universal-middle"
          xs={12}
          sm={3}
          lg={6}
        >
          <Status className="eighteenFont" style={{ color: statusColor }}>
            {status}
          </Status>
        </AntCol>

        {/**Applicants */}
        <AntCol xs={12} sm={6}>
          <AntRow justify="center">
            <Header className="eighteenFont">{interns}</Header>
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
              <Link to={`/internship-listings/${id}`}>Details</Link>
            </Button>
          ) : (
            <Button
              type="primary"
              style={{
                width: "100%",
              }}
            >
              <Link to={`/internship-listings/${id}`}>Details</Link>
            </Button>
          )}
        </AntCol>
      </AntRow>
    </TabContainer>
  );
};
export default PostingTab;
