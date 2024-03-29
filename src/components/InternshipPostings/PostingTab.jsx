import React from "react";
import styled from "styled-components";
import { Button, Row as AntRow, Col as AntCol, Grid } from "antd";
import { Link } from "react-router-dom";
import { TabContainer, Header, Caption } from "../Styled/FundamentalComponents";
import { AiOutlineClose } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";

const { useBreakpoint } = Grid;

const Status = styled.span`
  font-weight: 400;
`;

const PostingTab = (props) => {
  //Breakpoint calculator for extra small screen sizes
  const screens = useBreakpoint();

  const isXs = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((breakpoint) => breakpoint[0])
    .includes("xs");

  let { status, name, interns, industry, id } = props;
  let statusColor = "";

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
        <AntCol className="universal-middle" xs={24} sm={9} lg={7}>
          {isXs ? (
            <>
              <AntRow justify="center">
                <Header className="twentyFont" bolded>
                  {name}
                </Header>
              </AntRow>
              <AntRow className="mb-1-5" justify="center">
                <Caption className="fourteenFont">{industry}</Caption>
              </AntRow>
            </>
          ) : (
            <>
              <AntRow justify="start">
                <Header className="eighteenFont" bolded>
                  {name}
                </Header>
              </AntRow>
              <AntRow justify="start">
                <Caption className="fourteenFont">{industry}</Caption>
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
                width: "80%",
                minWidth: "150px",
              }}
            >
              <Link to={`/internship-listings/${id}`}>Details</Link>
            </Button>
          )}
          {/**<Button
            className="posting-tab-remove"
            danger
            shape="circle"
            type="primary"
            icon={
              <BiTrash
                className="twentyTwoFont"
                style={{ position: "relative", top: "1px" }}
              />
            }
          />*/}
        </AntCol>
      </AntRow>
      <IoIosClose
        onClick={() => props.removeListing(id)}
        className="posting-tab-cancel"
      />
    </TabContainer>
  );
};
export default PostingTab;
