import React from "react";
import styled from "styled-components";
import { Tooltip, Row as AntRow, Col as AntCol, Skeleton } from "antd";
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

export const CandidateQuickviewTabSkeleton = (props) => {

  return (
    <TabContainer className="py-2 px-6 my-1 responsive-tab-container">
      {/**
       *
       * Name
       *
       */}
      <AntRow justify="center" align="middle">
        <AntCol span={4}>
          <Skeleton
            paragraph={false}
            className="quickview-tab-skeleton-name"
            active
          />
        </AntCol>

        {/**School and Region */}
        <AntCol span={8}>
          <AntRow className="universal-center">
            <Skeleton
              paragraph={false}
              className="quickview-tab-skeleton-school"
              active
            />
          </AntRow>
          <AntRow className="universal-center">
            <Skeleton
              paragraph={false}
              className="quickview-tab-skeleton-location"
              active
            />
          </AntRow>
        </AntCol>

        {/**GPA */}
        <AntCol className="universal-center" span={3}>
          <Skeleton
            paragraph={false}
            className="quickview-tab-skeleton-gpa"
            active
          />
        </AntCol>

        {/**Applied For*/}
        <AntCol span={6}>
          <AntRow className="universal-center">
            <Skeleton
              paragraph={false}
              className="quickview-tab-skeleton-applied-for"
              active
            />
          </AntRow>
        </AntCol>

        {/**Mark */}
        <AntCol className="universal-center" span={3}>
          <Tooltip title="Interview">
            <CheckIcon
              icon={check}
              style={{ marginLeft: "1vh", marginRight: "1vh" }}
            />
          </Tooltip>
          <Tooltip title="Review Later">
            {!props.review && <ReviewIcon
              icon={box}
              style={{ marginLeft: "1vh", marginRight: "1vh" }}
            />}
          </Tooltip>
          <Tooltip title="Remove">
            <RemoveIcon
              icon={remove}
              style={{ marginLeft: "1vh", marginRight: "1vh" }}
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
