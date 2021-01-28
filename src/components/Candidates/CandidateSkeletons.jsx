import React from "react";
import styled from "styled-components";
import { Tooltip, Row as AntRow, Col as AntCol, Skeleton, Button } from "antd";
import { Icon } from "react-icons-kit";
import { box } from "react-icons-kit/iconic/box";
import { check } from "react-icons-kit/fa/check";
import { remove } from "react-icons-kit/fa/remove";
import { AiOutlineRight } from "react-icons/ai";
import { FaChalkboardTeacher, FaRegMap } from "react-icons/fa";
import { RiSuitcaseLine } from "react-icons/ri";
import { GrDocumentText } from "react-icons/gr";
import { BiBook } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { TabContainer } from "../Styled/FundamentalComponents";

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

const ActionButton = styled(Button)`
  width: 100%;

  :hover {
    background-color: #1890ff;
    color: white;
    transition: 0.3s ease;
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
            {!props.review && (
              <ReviewIcon
                icon={box}
                style={{ marginLeft: "1vh", marginRight: "1vh" }}
              />
            )}
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

export const CandidateDetailedviewSkeleton = (props) => {
  return (
    <TabContainer className="py-3 px-6 my-1 responsive-tab-container">
      <AntRow gutter={[16, 16]}>
        <AntCol className="universal-left">
          <Skeleton.Avatar size={48} />
        </AntCol>
        <AntCol flex="1">
          <Skeleton
            paragraph={false}
            className="detailedview-tab-skeleton-name"
            active
          />
          <Skeleton
            paragraph={false}
            className="detailedview-tab-skeleton-city"
            active
          />
        </AntCol>
        <AntCol className="universal-right" flex="1">
          <Skeleton
            paragraph={false}
            className="detailedview-tab-skeleton-school"
            active
          />
          <Skeleton
            paragraph={false}
            className="detailedview-tab-skeleton-school-address"
            active
          />
        </AntCol>
      </AntRow>
      <AntRow gutter={[16, 16]}>
        <AntCol span={3} style={{ textAlign: "right" }}>
          <Skeleton
            paragraph={false}
            className="detailedview-tab-skeleton-label"
            active
          />
          <Skeleton
            paragraph={false}
            className="detailedview-tab-skeleton-label"
            active
          />
          <Skeleton
            paragraph={false}
            className="detailedview-tab-skeleton-label"
            active
          />
          <Skeleton
            paragraph={false}
            className="detailedview-tab-skeleton-label"
            active
          />
          <Skeleton
            paragraph={false}
            className="detailedview-tab-skeleton-label"
            active
          />
        </AntCol>
        <AntCol span={9}>
          <AntRow>
            <Skeleton
              paragraph={false}
              className="detailedview-tab-skeleton-caption"
              active
            />
          </AntRow>
          <AntRow>
            <Skeleton
              paragraph={false}
              className="detailedview-tab-skeleton-caption"
              active
            />
          </AntRow>
          <AntRow>
            <Skeleton
              paragraph={false}
              className="detailedview-tab-skeleton-caption"
              active
            />
          </AntRow>
          <AntRow>
            <Skeleton
              paragraph={false}
              className="detailedview-tab-skeleton-caption"
              active
            />
          </AntRow>
          <AntRow>
            <Skeleton
              paragraph={false}
              className="detailedview-tab-skeleton-caption"
              active
            />
          </AntRow>
        </AntCol>

        {/**
         * This col has been split into two rows to make the categorization
         * easier to design without having to rely on complex margins and
         * padding
         */}
        <AntCol span={12}>
          <AntRow gutter={[16, 16]}>
            <AntCol span={6} style={{ textAlign: "right" }}>
              <Skeleton
                paragraph={false}
                className="detailedview-tab-skeleton-label"
                active
              />
            </AntCol>
            <AntCol span={18}>
              <Skeleton
                paragraph={false}
                className="detailedview-tab-skeleton-list"
                active
              />
              <Skeleton
                paragraph={false}
                className="detailedview-tab-skeleton-list"
                active
              />
              <Skeleton
                paragraph={false}
                className="detailedview-tab-skeleton-list"
                active
              />
            </AntCol>
          </AntRow>

          <AntRow gutter={[16, 16]}>
            <AntCol span={6} style={{ textAlign: "right" }}>
              <Skeleton
                paragraph={false}
                className="detailedview-tab-skeleton-label"
                active
              />
            </AntCol>
            <AntCol span={18}>
              <Skeleton
                paragraph={false}
                className="detailedview-tab-skeleton-list"
                active
              />
              <Skeleton
                paragraph={false}
                className="detailedview-tab-skeleton-list"
                active
              />
              <Skeleton
                paragraph={false}
                className="detailedview-tab-skeleton-list"
                active
              />
            </AntCol>
          </AntRow>
        </AntCol>
      </AntRow>

      {props.review ? (
        <AntRow gutter={[32, 0]} justify="space-between">
          <AntCol span={10}>
            <ActionButton size="large">Read Full Application</ActionButton>
          </AntCol>
          <AntCol span={10}>
            <ActionButton size="large" onClick={props.onInterview}>
              Move to Interview
            </ActionButton>
          </AntCol>
          <AntCol span={4}>
            <Button size="large" type="danger" block onClick={props.onReject}>
              Not a fit
            </Button>
          </AntCol>
        </AntRow>
      ) : (
        <AntRow gutter={[32, 0]} justify="space-between">
          <AntCol span={7}>
            <ActionButton size="large">Read Full Application</ActionButton>
          </AntCol>
          <AntCol span={7}>
            <ActionButton size="large" onClick={props.onReview}>
              Review for Later
            </ActionButton>
          </AntCol>
          <AntCol span={7}>
            <ActionButton size="large" onClick={props.onInterview}>
              Move to Interview
            </ActionButton>
          </AntCol>
          <AntCol span={3}>
            <Button size="large" type="danger" block onClick={props.onReject}>
              Not a fit
            </Button>
          </AntCol>
        </AntRow>
      )}
    </TabContainer>
  );
};

