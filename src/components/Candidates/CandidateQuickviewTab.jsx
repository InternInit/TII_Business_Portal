import React, { Component } from "react";
import styled from "styled-components";
import { Tooltip, Row as AntRow, Col as AntCol } from "antd";
import { Icon } from "react-icons-kit";
import { box } from "react-icons-kit/iconic/box";
import { check } from "react-icons-kit/fa/check";
import { remove } from "react-icons-kit/fa/remove";
import { AiOutlineRight } from "react-icons/ai";
import { TabContainer } from "../Styled/FundamentalComponents";

/**
const TabContainer = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  background-color: white;

  padding: 1vh;

  width: 100%;
  min-height: 11vh;
  min-width: 600px;

  margin-top: 2vh;

  border-radius: 4px;
  border: 1px solid #d8def3;
  box-shadow: 1px 1px 5px -4px;

  :hover {
    transition-duration: 0.35s;
    box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.1);
  }
`;
 */

const Header = styled.span`
  font-family: roboto;
  font-size: 16px;
  font-weight: 500;
  color: black;
`;

const Caption = styled.span`
  font-size: 12px;
`;

const GPA = styled.span`
  font-size: 16px;
`;

const AppliedFor = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #722ed1;
`;

const Industries = styled.span`
  font-size: 12px;
  font-weight: 300;
  color: black;
`;

const CheckIcon = styled(Icon)`
  :hover {
    transition-duration: 0.35s;
    color: #52c41a;
    cursor: pointer;
  }
`;
const ReviewIcon = styled(Icon)`
  :hover {
    transition-duration: 0.35s;
    color: #fa8c16;
    cursor: pointer;
  }
`;
const RemoveIcon = styled(Icon)`
  :hover {
    transition-duration: 0.35s;
    color: #f5222d;
    cursor: pointer;
  }
`;

const CandidateQuickviewTab = (props) => {
  let { name, school, industry } = props;

  console.log(props);

  return (
    <TabContainer className="py-2 px-4 my-1 responsive-tab-container">
      {/**
       *
       * Name
       *
       */}
      <AntRow justify="center" align="middle">
        <AntCol span={5}>
          <Header>{name}</Header>
        </AntCol>

        {/**School and Region */}
        <AntCol span={7}>
          <AntRow className="universal-center" >
            <Header>{school.Name}</Header>
          </AntRow>
          <AntRow className="universal-center" >
            <Caption style={{ color: "#BFBFBF" }}>
              {school.Address}, {school.State}
            </Caption>
          </AntRow>
        </AntCol>

        {/**GPA */}
        <AntCol span={2}>
          {props.GPA >= props.cutOffGPA ? (
            <GPA style={{ color: "green" }}>{props.GPA.toFixed(1)}</GPA>
          ) : (
            <GPA style={{ color: "red" }}>{props.GPA.toFixed(1)}</GPA>
          )}
        </AntCol>

        {/**Applied For*/}
        <AntCol span={7}>
          <AntRow className="universal-center">
            <AppliedFor>Front End React Intern</AppliedFor>
          </AntRow>
          <AntRow>
            <Industries>Industries: {industry}</Industries>
          </AntRow>
        </AntCol>

        {/**Mark */}
        <AntCol className="universal-center"  span={3}>
          <Tooltip title="Interview">
            <CheckIcon
              icon={check}
              style={{ marginLeft: "1vh", marginRight: "1vh" }}
              onClick={props.onInterview}
            />
          </Tooltip>
          <Tooltip title="Review Later">
            <ReviewIcon
              icon={box}
              style={{ marginLeft: "1vh", marginRight: "1vh" }}
              onClick={props.onReview}
            />
          </Tooltip>
          <Tooltip title="Remove">
            <RemoveIcon
              icon={remove}
              style={{ marginLeft: "1vh", marginRight: "1vh" }}
              onClick={props.onReject}
            />
          </Tooltip>
        </AntCol>

        {/**Contact Info */}
        <AiOutlineRight
          className="click-more-icon"
          style={{ fontSize: "24px" }}
        />
      </AntRow>
    </TabContainer>
  );
};

CandidateQuickviewTab.defaultProps = {
  GPA: 4.0,
  cutOffGPA: 0,
};

export default CandidateQuickviewTab;
