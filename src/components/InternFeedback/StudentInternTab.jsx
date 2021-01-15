import React from "react";
import { Row as AntRow, Col as AntCol, Grid, Avatar, Tooltip } from "antd";
import { Link } from "react-router-dom";
import {
  TabContainer,
  Header,
  Caption,
  TypeTag,
} from "../Styled/FundamentalComponents.jsx";
import { AiOutlineRight } from "react-icons/ai";
import { BiMessageSquareDetail, BiTime, BiNotepad } from "react-icons/bi";
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
    <Link
      to={`/my-interns/${props.id}/dashboard`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
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
                <Avatar size={56} src={props.avatar} />
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
                      <Caption className="fourteenFont" thin light>
                        {props.position}
                      </Caption>
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
                      <Caption className="fourteenFont" thin light>
                        {props.position}
                      </Caption>
                    </AntRow>
                  </>
                )}
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
            <Caption className="sixteenFont">{props.school.name}</Caption>
          </AntCol>

          <AntCol className="universal-left universal-middle" sm={4}>
            <TypeTag
              className="sixteenFont universal-center universal-middle"
              color={props.type}
            >
              {props.type}
            </TypeTag>
          </AntCol>

          {/**Applicants */}
          <AntCol className="universal-middle" xs={0} sm={5} lg={6}>
            <AntRow justify="center" align="middle">
              <Tooltip title="No Timesheets Due">
                <Link to={`/my-interns/${props.id}/attendance`}>
                  <BiTime className="thirtyTwoFont ml-point-25 mr-point-25 student-intern-tab-action-icon student-intern-tab-timesheet" />
                </Link>
              </Tooltip>
              <Tooltip title="No Recent Feedback">
                <Link to={`/my-interns/${props.id}/feedback`}>
                  <BiMessageSquareDetail className="thirtyTwoFont ml-point-25 mr-point-25 student-intern-tab-action-icon student-intern-tab-feedback" />
                </Link>
              </Tooltip>
              <Tooltip title="No Grades Due">
                <Link to={`/my-interns/${props.id}/grades`}>
                  <BiNotepad className="thirtyTwoFont ml-point-25 mr-point-25 student-intern-tab-action-icon student-intern-tab-grades" />
                </Link>
              </Tooltip>
            </AntRow>
          </AntCol>

          {/**Details */}
          <AiOutlineRight
            className="click-more-icon"
            style={{ fontSize: "24px" }}
          />
        </AntRow>
      </TabContainer>
    </Link>
  );
};

export default StudentInternTab;
