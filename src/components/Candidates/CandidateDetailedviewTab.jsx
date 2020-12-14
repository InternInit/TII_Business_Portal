import React, { Component } from "react";
import styled from "styled-components";
import { Button, Row, Col as AntCol, Row as AntRow, Avatar } from "antd";
import { TabContainer, Header, Caption } from "../Styled/FundamentalComponents";

const NameHeading = styled.span`
  font-family: roboto;
  font-weight: bold;
  font-size: 20px;
  color: black;
  display: block;
  margin-top: -5px;
`;

const Label = styled.p`
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  color: black;
`;

const MiniLabel = styled.p`
  font-family: Roboto;
  font-weight: 300;
  font-size: 12px;
  color: black;
  margin-top: -20px;
`;

const Response = styled.p`
  font-family: Roboto;
  font-weight: normal;
  font-size: 16px;
  color: #434343;
`;

const ListResponse = styled(Response)`
  line-height: 8px;
`;

const ActionButton = styled(Button)`
  width: 100%;
  font-weight: 500;
  :hover {
    background-color: #1890ff;
    color: white;
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
              bolded
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
            <Header className="sixteenFont mb-1" subheading>
              Applied For:
            </Header>
            <Header className="sixteenFont my-1" subheading>
              GPA:
            </Header>
            <Header className="sixteenFont my-1" subheading>
              Age:
            </Header>
            <Header className="sixteenFont my-1" subheading>
              Work Dates:
            </Header>
            <Header className="sixteenFont my-1" subheading>
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
          <AntCol span={3} style={{ textAlign: "right" }}>
            <Label>Top 3 Activities:</Label>
            <Label style={{ marginTop: "60px" }}>Top 3 Classes:</Label>
          </AntCol>
          <AntCol span={9}>
            <ListResponse style={{ marginTop: "10px" }}>
              1. {this.props.activityOne}
            </ListResponse>
            <ListResponse>2. {this.props.activityTwo}</ListResponse>
            <ListResponse>3. {this.props.activityThree}</ListResponse>
            <ListResponse style={{ marginTop: "30px" }}>
              1. {this.props.classOne}
            </ListResponse>
            <ListResponse>2. {this.props.classTwo}</ListResponse>
            <ListResponse>3. {this.props.classThree}</ListResponse>
          </AntCol>
        </AntRow>
        <Row gutter={[32, 16]} style={{ width: "90%", margin: "auto" }}>
          <AntCol span={7}>
            <ActionButton>Read Full Application</ActionButton>
          </AntCol>
          <AntCol span={7}>
            <ActionButton onClick={this.props.onReview}>
              Review for Later
            </ActionButton>
          </AntCol>
          <AntCol span={7}>
            <ActionButton onClick={this.props.onInterview}>
              Move to Interview
            </ActionButton>
          </AntCol>
          <AntCol span={3}>
            <Button type="danger" onClick={this.props.onReject}>
              Not a fit
            </Button>
          </AntCol>
        </Row>
      </TabContainer>
    );
  }
}

CandidateDetailedviewTab.defaultProps = {
  GPA: 4.0,
  cutOffGPA: 3.5,
};
export default CandidateDetailedviewTab;
