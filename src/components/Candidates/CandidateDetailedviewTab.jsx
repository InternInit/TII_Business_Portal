import React, { Component } from "react";
import styled from "styled-components";
import { Button, Col as AntCol, Row as AntRow, Avatar } from "antd";
import { TabContainer, Header, Caption } from "../Styled/FundamentalComponents";

const Response = styled.p`
  font-family: Roboto;
  font-weight: normal;
  font-size: 16px;
  color: #434343;
`;

const ActionButton = styled(Button)`
  width: 100%;

  :hover {
    background-color: #1890ff;
    color: white;
    transition: .3s ease;
  }
`;

class CandidateDetailedviewTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  render() {
    return (
      <TabContainer className="py-3 px-6 my-1 responsive-tab-container">
        <AntRow gutter={[16, 16]}>
          <AntCol className="universal-left">
            <Avatar
              stlye={{ backgroundColor: "#fa541c" }}
              size={48}
              src={this.props.avatar}
            />
          </AntCol>
          <AntCol flex="1">
            <Header
              className="twentyFourFont"
              bolded
              style={{ marginBottom: "-5px", marginTop: "-5px" }}
            >
              {this.props.name}
            </Header>
            <Caption className="fourteenFont" thin light>
              {this.props.city}
            </Caption>
          </AntCol>
          <AntCol className="universal-right" flex="1">
            <Header
              className="eighteenFont"
              style={{ marginBottom: "-5px", marginTop: "-5px" }}
            >
              {this.props.school}
            </Header>
            <Caption className="fourteenFont" thin light>
              {this.props.schoolAddress}
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
                React Front End Intern
              </Caption>
            </AntRow>
            <AntRow>
              <Caption className="sixteenFont my-point-5">
                {this.props.GPA}
              </Caption>
            </AntRow>
            <AntRow>
              <Caption className="sixteenFont my-point-5">
                {this.props.age}
              </Caption>
            </AntRow>
            <AntRow>
              <Caption className="sixteenFont my-point-5">
                {this.props.workDate}
              </Caption>
            </AntRow>
            <AntRow>
              <Caption className="sixteenFont my-point-5" left>
                {this.props.workTimes.length > 1
                  ? this.props.workTimes
                      .slice(0, this.props.workTimes.length - 1)
                      .map((val) => ` ${val}`) +
                    ", " +
                    this.props.workTimes[this.props.workTimes.length - 1]
                  : this.props.workTimes}
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
                {this.props.activities.slice(0,3).map((activity, index) => (
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
              {this.props.courses.slice(0,3).map((activity, index) => (
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
            <ActionButton size="large">Read Full Application</ActionButton>
          </AntCol>
          <AntCol span={7}>
            <ActionButton size="large" onClick={this.props.onReview}>
              Review for Later
            </ActionButton>
          </AntCol>
          <AntCol span={7}>
            <ActionButton size="large" onClick={this.props.onInterview}>
              Move to Interview
            </ActionButton>
          </AntCol>
          <AntCol span={3}>
            <Button size="large" type="danger" onClick={this.props.onReject}>
              Not a fit
            </Button>
          </AntCol>
        </AntRow>
      </TabContainer>
    );
  }
}

CandidateDetailedviewTab.defaultProps = {
  GPA: 4.0,
  cutOffGPA: 3.5,
};
export default CandidateDetailedviewTab;
