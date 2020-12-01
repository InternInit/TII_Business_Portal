import React from "react";
import {
  Button,
  Row as AntRow,
  Col as AntCol,
  Grid,
  Avatar,
  Tooltip,
} from "antd";
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

const states = {
  Alabama: "AL",
  Alaska: "AK",
  "American Samoa": "AS",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  "District Of Columbia": "DC",
  "Federated States Of Micronesia": "FM",
  Florida: "FL",
  Georgia: "GA",
  Guam: "GU",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  "Marshall Islands": "MH",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  "Northern Mariana Islands": "MP",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Palau: "PW",
  Pennsylvania: "PA",
  "Puerto Rico": "PR",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  "Virgin Islands": "VI",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
};

const StudentInternTab = (props) => {
  //Breakpoint calculator for extrasmall screen sizes
  const screens = useBreakpoint();

  const isXs = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((breakpoint) => breakpoint[0])
    .includes("xs");
  return (
    <Link to="/intern-feedback/1" style={{ textDecoration: 'none', color: "inherit" }}>
      <TabContainer className="mt-1-5 py-1-5 px-6 student-intern-tab-responsive-tab-container">
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
                      <Caption className="fourteenFont">
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
                      <Caption className="fourteenFont">
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
              <Tooltip title="No Recent Feedback">
                <BiMessageSquareDetail className="thirtyTwoFont ml-point-25 mr-point-25 student-intern-tab-action-icon student-intern-tab-feedback" />
              </Tooltip>
              <Tooltip title="No Grades Due">
                <BiNotepad className="thirtyTwoFont ml-point-25 mr-point-25 student-intern-tab-action-icon student-intern-tab-grades" />
              </Tooltip>
              <Tooltip title="No Timesheet Due">
                <BiTime className="thirtyTwoFont ml-point-25 mr-point-25 student-intern-tab-action-icon student-intern-tab-timesheet" />
              </Tooltip>
            </AntRow>
          </AntCol>

          {/**Details */}
          <AiOutlineRight
            className="student-intern-tab-click-more-icon"
            style={{ fontSize: "24px" }}
          />
        </AntRow>
      </TabContainer>
    </Link>
  );
};

export default StudentInternTab;
