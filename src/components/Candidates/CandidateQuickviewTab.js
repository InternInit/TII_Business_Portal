import React, { Component } from "react";
import styled from "styled-components";
import { Button, Tooltip } from "antd";
import { Icon } from "react-icons-kit";
import { box } from "react-icons-kit/iconic/box";
import { check } from "react-icons-kit/fa/check";
import { remove } from "react-icons-kit/fa/remove";
import { ic_keyboard_arrow_right } from "react-icons-kit/md/ic_keyboard_arrow_right";

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  background-color: white;

  padding:1vh;

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

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

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

class CandidateQuickviewTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  render() {
    let { visible } = this.state;
    let { name, school, industry, } = this.props;
    return (
      <TabContainer>
        {/**
         *
         * Name
         *
         */}
        <Col style={{ width: "40vh", alignItems: "center" }}>
          <Header>{name}</Header>
        </Col>

        {/**School and Region */}
        <Col style={{ alignItems: "center", width: "42vh" }}>
          <Header>{school.name}</Header>
          <Caption style={{ color: "#BFBFBF" }}>
            {school.address}, {school.state}
          </Caption>
        </Col>

        {/**GPA */}
        <Col style={{ alignItems: "center", width: "15vh" }}>
          {this.props.GPA > this.props.cutOffGPA ? (
            <GPA style={{ color: "green" }}>{this.props.GPA.toFixed(1)}</GPA>
          ) : (
              <GPA style={{ color: "red" }}>{this.props.GPA.toFixed(1)}</GPA>
            )}
        </Col>

        {/**Applied For*/}
        <Col style={{ alignItems: "center", width: "50vh" }}>
          <AppliedFor>Front End React Intern</AppliedFor>
          <Industries>
            Industries: {industry}
          </Industries>
        </Col>

        {/**Mark */}
        <Col
          style={{
            alignItems: "center",
            width: "20vh",
            display: "inline-block",
            textAlign: "center"
          }}
        >
          <Tooltip title="Interview">
            <CheckIcon
              icon={check}
              style={{ marginLeft: "1vh", marginRight: "1vh" }}
            />
          </Tooltip>
          <Tooltip title="Review Later">
            <ReviewIcon
              icon={box}
              style={{ marginLeft: "1vh", marginRight: "1vh" }}
            />
          </Tooltip>
          <Tooltip title="Remove">
            <RemoveIcon
              icon={remove}
              style={{ marginLeft: "1vh", marginRight: "1vh" }}
            />
          </Tooltip>
        </Col>

        {/**Contact Info */}
        <Col style={{ alignItems: "center", width: "10vh" }}>
          <Icon icon={ic_keyboard_arrow_right} size={48} />
        </Col>
      </TabContainer>
    );
  }
}

CandidateQuickviewTab.defaultProps = {
  GPA: 4.0,
  cutOffGPA: 3.5
};
export default CandidateQuickviewTab;
