import React from "react";
import { Button, Row as AntRow, Col as AntCol, Grid, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  TabContainer,
  Header,
  Caption,
} from "../Styled/FundamentalComponents.jsx";
import { AiOutlineRight } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { GrScorecard, GrDocumentTime } from "react-icons/gr";

const { useBreakpoint } = Grid;

const StudentInternTab = (props) => {
  //Breakpoint calculator for extrasmall screen sizes
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
          <AntCol>
            <Avatar size={64} src={props.avatar} />
          </AntCol>
        <AntCol className="universal-middle" xs={24} sm={6}>
          {isXs ? (
            <>
              <AntRow justify="center">
                <Header className="twentyFont">
                  {props.firstName} {props.lastName}
                </Header>
              </AntRow>
              <AntRow className="mb-1-5" justify="center">
                <Caption className="fourteenFont">{props.position}</Caption>
              </AntRow>
            </>
          ) : (
            <>
              <AntRow justify="start">
                <Header className="eighteenFont">
                  {props.firstName} {props.lastName}
                </Header>
              </AntRow>
              <AntRow justify="start">
                <Caption className="fourteenFont">{props.position}</Caption>
              </AntRow>
            </>
          )}
        </AntCol>

        {/**Status */}
        <AntCol className="universal-center universal-middle" xs={24} sm={8}>
          <Header className="eighteenFont">{props.school.name}</Header>
        </AntCol>

        {/**Applicants */}
        <AntCol xs={0} sm={6}>
          <AntRow justify="center">
            <BiCommentDetail />
            <GrScorecard />
            <GrDocumentTime />
          </AntRow>
        </AntCol>

        {/**Details */}
        <AntCol className="universal-center universal-middle">
          <AiOutlineRight />
        </AntCol>
      </AntRow>
    </TabContainer>
  );
};

export default StudentInternTab;
