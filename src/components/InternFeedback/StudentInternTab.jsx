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
import "../../App.scss";

const { useBreakpoint } = Grid;

const StudentInternTab = (props) => {
  //Breakpoint calculator for extrasmall screen sizes
  const screens = useBreakpoint();

  const isXs = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((breakpoint) => breakpoint[0])
    .includes("xs");
  return (
    <TabContainer className="mt-1-5 student-intern-tab-responsive-tab-container">
      {/**
       *
       * Listing Name + Industry
       *
       */}
      <AntRow className="py-1-5 px-6" justify="center">
        <AntCol className="universal-middle" xs={24} sm={10} lg={8}>
          <AntRow>
            <AntCol>
              <Avatar size={64} src={props.avatar} />
            </AntCol>
            <AntCol offset={1}>
              {isXs ? (
                <>
                  <AntRow justify="center">
                    <Header className="twentyFont" bolded>
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
                    <Header className="twentyFont" bolded>
                      {props.firstName} {props.lastName}
                    </Header>
                  </AntRow>
                  <AntRow justify="start">
                    <Caption className="fourteenFont">{props.position}</Caption>
                  </AntRow>
                </>
              )}
            </AntCol>
          </AntRow>
        </AntCol>

        {/**Status */}
        <AntCol
          className="universal-center universal-middle"
          xs={24}
          sm={6}
          lg={8}
        >
          <Header className="eighteenFont">{props.school.name}</Header>
        </AntCol>

        {/**Applicants */}
        <AntCol
          className="universal-middle"
          xs={0}
          sm={6}
          lg={8}
        >
          <AntRow
            justify="center"
            align="middle"
          >
            <BiCommentDetail className="thirtySixFont ml-point-25 mr-point-25" />
            <GrScorecard className="thirtySixFont ml-point-25 mr-point-25" />
            <GrDocumentTime className="thirtySixFont ml-point-25 mr-point-25" />
          </AntRow>
        </AntCol>

        {/**Details */}
        <AiOutlineRight
          className="student-intern-tab-click-more-icon"
          style={{ fontSize: "24px" }}
        />
      </AntRow>
    </TabContainer>
  );
};

export default StudentInternTab;