import React from "react";
import {
  Row as AntRow,
  Col as AntCol,
  Grid,
  Avatar,
  Tooltip,
  Badge,
} from "antd";
import SmartAvatar from "../General/SmartAvatar";
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
                {props.avatar ? <Avatar size={56} src={props.avatar} /> : <SmartAvatar size={56} name={props.firstName} />}
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
            <Caption className="sixteenFont">{props.school}</Caption>
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
              <Tooltip
                title={
                  props.attendanceDue > 0
                    ? props.attendanceDue === 1
                      ? +"1 Timesheet Due"
                      : props.attendanceDue + " Timesheets Due"
                    : "No Timesheets Due"
                }
              >
                <Link to={`/my-interns/${props.id}/attendance`}>
                  <Badge
                    count={props.attendanceDue}
                    offset={[-12, 5]}
                    size="small"
                  >
                    <BiTime className="thirtyTwoFont ml-point-25 mr-point-25 student-intern-tab-action-icon student-intern-tab-timesheet" />
                  </Badge>
                </Link>
              </Tooltip>
              <Tooltip
                title={
                  props.feedbackDue > 0
                    ? props.feedbackDue + " Recent Student Feedback"
                    : "No Recent Feedback"
                }
              >
                <Link to={`/my-interns/${props.id}/feedback`}>
                  <Badge
                    count={props.feedbackDue}
                    offset={[-12, 5]}
                    size="small"
                  >
                    <BiMessageSquareDetail className="thirtyTwoFont ml-point-25 mr-point-25 student-intern-tab-action-icon student-intern-tab-feedback" />
                  </Badge>
                </Link>
              </Tooltip>
              <Tooltip
                title={
                  props.gradesDue > 0
                    ? props.gradesDue === 1
                      ? +"1 Grade Due"
                      : props.gradesDue + " Grades Due"
                    : "No Grades Due"
                }
              >
                <Link to={`/my-interns/${props.id}/grades`}>
                  <Badge count={props.gradesDue} offset={[-12, 5]} size="small">
                    <BiNotepad className="thirtyTwoFont ml-point-25 mr-point-25 student-intern-tab-action-icon student-intern-tab-grades" />
                  </Badge>
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
