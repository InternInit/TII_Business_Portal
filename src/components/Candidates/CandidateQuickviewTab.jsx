import React, { Component } from "react";
import styled from "styled-components";
import { Tooltip, Row as AntRow, Col as AntCol } from "antd";
import { Icon } from "react-icons-kit";
import { box } from "react-icons-kit/iconic/box";
import { check } from "react-icons-kit/fa/check";
import { remove } from "react-icons-kit/fa/remove";
import { AiOutlineRight } from "react-icons/ai";
import { TabContainer, Header, Caption } from "../Styled/FundamentalComponents";
import { Link } from "react-router-dom";

const CheckIcon = styled(Icon)`
  color: #bfbfbf;

  :hover {
    transition-duration: 0.35s;
    color: #52c41a;
    cursor: pointer;
  }
`;
const ReviewIcon = styled(Icon)`
  color: #bfbfbf;

  :hover {
    transition-duration: 0.35s;
    color: #fa8c16;
    cursor: pointer;
  }
`;
const RemoveIcon = styled(Icon)`
  color: #bfbfbf;

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
    <Link
      to={`/applicants/${props.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <TabContainer className="py-2 px-6 my-1 responsive-tab-container">
        {/**
         *
         * Name
         *
         */}
        <AntRow justify="center" align="middle">
          <AntCol span={4}>
            <Header className="twentyFont" bolded>
              {name}
            </Header>
          </AntCol>

          {/**School and Region */}
          <AntCol span={8}>
            <AntRow className="universal-center">
              <Header className="sixteenFont">{school.Name}</Header>
            </AntRow>
            <AntRow className="universal-center">
              <Caption className="twelveFont" light thin>
                {school.Address}, {school.State}
              </Caption>
            </AntRow>
          </AntCol>

          {/**GPA */}
          <AntCol className="universal-center" span={3}>
            {props.GPA >= props.cutOffGPA ? (
              <Caption className="sixteenFont" style={{ color: "green" }}>
                {props.GPA.toFixed(1)}
              </Caption>
            ) : (
              <Caption className="sixteenFont" style={{ color: "red" }}>
                {props.GPA.toFixed(1)}
              </Caption>
            )}
          </AntCol>

          {/**Applied For*/}
          <AntCol span={6}>
            <AntRow className="universal-center">
              <Header className="sixteenFont" color="#722ed1">
                {props.appliedFor}
              </Header>
            </AntRow>
          </AntCol>

          {/**Mark*/}
          <AntCol className="universal-center" span={3}>
            <Tooltip title="Interview">
              <CheckIcon
                icon={check}
                style={{ marginLeft: "1vh", marginRight: "1vh" }}
                onClick={(e) => {
                  e.preventDefault();
                  props.onInterview();
                }}
              />
            </Tooltip>
            <Tooltip title="Review Later">
              <ReviewIcon
                icon={box}
                style={{ marginLeft: "1vh", marginRight: "1vh" }}
                onClick={(e) => {
                  e.preventDefault();
                  props.onReview();
                }}
              />
            </Tooltip>
            <Tooltip title="Remove">
              <RemoveIcon
                icon={remove}
                style={{ marginLeft: "1vh", marginRight: "1vh" }}
                onClick={(e) => {
                  e.preventDefault();
                  props.onReject();
                }}
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
    </Link>
  );
};

CandidateQuickviewTab.defaultProps = {
  GPA: 4.0,
  cutOffGPA: 0,
};

export default CandidateQuickviewTab;
