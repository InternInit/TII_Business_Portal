import React from "react";
import styled from "styled-components";
import { Button, Col as AntCol, Row as AntRow, Avatar } from "antd";
import { TabContainer, Header, Caption } from "../Styled/FundamentalComponents";
import { Link } from "react-router-dom";
import SmartAvatar from "../General/SmartAvatar";

const ActionButton = styled(Button)`
  width: 100%;

  :hover {
    background-color: #1890ff;
    color: white;
    transition: 0.3s ease;
  }
`;

const CandidateDetailedviewTab = (props) => {
  return (
    <TabContainer className="py-3 px-6 my-1 responsive-tab-container">
      <AntRow gutter={[16, 16]}>
        <AntCol className="universal-left">
          <SmartAvatar size={48} name={props.name} />
        </AntCol>
        <AntCol flex="1">
          <Header
            className="twentyFourFont"
            bolded
            style={{ marginBottom: "-5px", marginTop: "-5px" }}
          >
            {props.name}
          </Header>
          <Caption className="fourteenFont" thin light>
            {props.city}
          </Caption>
        </AntCol>
        <AntCol className="universal-right" flex="1">
          <Header
            className="eighteenFont"
            style={{ marginBottom: "-5px", marginTop: "-5px" }}
          >
            {props.school}
          </Header>
          <Caption className="fourteenFont" thin light>
            {props.schoolAddress}
          </Caption>
        </AntCol>
      </AntRow>
      <AntRow gutter={[16, 16]}>
        <AntCol span={3} style={{ textAlign: "right" }}>
          <Header className="sixteenFont mb-1" color="#bfbfbf">
            Applied For:
          </Header>
          <Header className="sixteenFont my-1" color="#bfbfbf">
            GPA:
          </Header>
          <Header className="sixteenFont my-1" color="#bfbfbf">
            Age:
          </Header>
          <Header className="sixteenFont my-1" color="#bfbfbf">
            Work Dates:
          </Header>
          <Header className="sixteenFont my-1" color="#bfbfbf">
            Availability:
          </Header>
        </AntCol>
        <AntCol span={9}>
          <AntRow>
            <Caption className="sixteenFont mb-point-5">
              {
                props.listings.find(
                  (listing) => listing.Id === props.appliedFor
                ).title
              }
            </Caption>
          </AntRow>
          <AntRow>
            <Caption className="sixteenFont my-point-5">{props.GPA}</Caption>
          </AntRow>
          <AntRow>
            <Caption className="sixteenFont my-point-5">{props.age}</Caption>
          </AntRow>
          <AntRow>
            <Caption className="sixteenFont my-point-5">
              {props.workDate}
            </Caption>
          </AntRow>
          <AntRow>
            <Caption className="sixteenFont my-point-5" left>
              {props.workTimes.length > 1
                ? props.workTimes
                    .slice(0, props.workTimes.length - 1)
                    .map((val) => ` ${val}`) +
                  ", " +
                  props.workTimes[props.workTimes.length - 1]
                : props.workTimes}
            </Caption>
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
              <Header className="sixteenFont" color="#bfbfbf">
                Top Activities:
              </Header>
            </AntCol>
            <AntCol span={18}>
              {props.activities.slice(0, 3).map((activity, index) => (
                <AntRow>
                  <Caption className="sixteenFont mb-point-25">
                    {index + 1}. {activity.activityType}
                  </Caption>
                </AntRow>
              ))}
            </AntCol>
          </AntRow>

          <AntRow gutter={[16, 16]}>
            <AntCol span={6} style={{ textAlign: "right" }}>
              <Header className="sixteenFont" color="#bfbfbf">
                Top Classes:
              </Header>
            </AntCol>
            <AntCol span={18}>
              {props.courses.slice(0, 3).map((activity, index) => (
                <AntRow>
                  <Caption className="sixteenFont mb-point-25">
                    {index + 1}. {activity.courseTitle}
                  </Caption>
                </AntRow>
              ))}
            </AntCol>
          </AntRow>
        </AntCol>
      </AntRow>

      <AntRow gutter={[32, 0]} justify="space-between">
        <AntCol span={7}>
          <Link
            to={`/applicants/${props.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ActionButton size="large">Read Full Application</ActionButton>
          </Link>
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
            Remove
          </Button>
        </AntCol>
      </AntRow>
    </TabContainer>
  );
};

CandidateDetailedviewTab.defaultProps = {
  GPA: 4.0,
  cutOffGPA: 3.5,
};
export default CandidateDetailedviewTab;
