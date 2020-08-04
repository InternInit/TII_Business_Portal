import React, { Component } from "react";
import styled from "styled-components";
import { Button, Row, Col as AntCol, Avatar } from "antd";
import { Icon } from "react-icons-kit";
import { box } from "react-icons-kit/iconic/box";
import { check } from "react-icons-kit/fa/check";
import { remove } from "react-icons-kit/fa/remove";
import { ic_keyboard_arrow_right } from "react-icons-kit/md/ic_keyboard_arrow_right";

const TabContainer = styled.div`
  background-color: white;

  padding: 2%;

  width: 100%;
  min-height: 25vh;
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
      visible: false
    };
  }
  render() {
    return (
      <TabContainer>
        <Row gutter={[16, 16]} style={{ width: "100%", height: "75px" }}>
          <AntCol span={2} style={{ textAlign: "right", alignItems: "center" }}>
            <Avatar
              stlye={{ backgroundColor: "#fa541c" }}
              size={48}
              src={this.props.avatar}
            />
          </AntCol>
          <AntCol span={22}>
            <NameHeading>{this.props.name}</NameHeading>
            <Label style={{ display: "block" }}>{this.props.school}</Label>
            <MiniLabel>{this.props.schoolAddress}</MiniLabel>
          </AntCol>
        </Row>
        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          <AntCol span={3} style={{ textAlign: "right" }}>
            <Label>Applied For:</Label>
            <Label>GPA:</Label>
            <Label>Age:</Label>
            <Label>Work Dates:</Label>
            <Label>Industries:</Label>
          </AntCol>
          <AntCol span={9}>
            <Response>React Front End Intern</Response>
            <Response>{this.props.GPA}</Response>
            <Response>{this.props.age}</Response>
            <Response>{this.props.workDate}</Response>
            <Response>{this.props.industries}</Response>
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
        </Row>
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
            <Button type="danger">Not a fit</Button>
          </AntCol>
        </Row>
      </TabContainer>
    );
  }
}

CandidateDetailedviewTab.defaultProps = {
  GPA: 4.0,
  cutOffGPA: 3.5
};
export default CandidateDetailedviewTab;
