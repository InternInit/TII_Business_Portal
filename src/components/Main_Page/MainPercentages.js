import React from "react";
import styled from "styled-components";
import { Progress, Col as AntCol } from "antd";
const Header = styled.h1`
  font-weight: 500;
  color: #262626;
`;
const BoxContainer = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 22vh;
  box-shadow: 1px 1px 5px -4px;

  border: 1px solid #d8def3;
  border-radius: 4px;
`;

class MainPercentages extends React.Component {
  render() {
    return (
      <>
        <AntCol span={8}>
          <PercentageBox
            header="Applied to Industry"
            percentage="2"
            color="#F5222D"
          />
        </AntCol>
        <AntCol span={8}>
          <PercentageBox
            header="Applied to Company"
            percentage="24"
            color="#1890ff"
          />
        </AntCol>
        <AntCol span={8}>
          <PercentageBox
            header="Percentage Accepted"
            percentage="97"
            color="#52C41A"
          />
        </AntCol>
      </>
    );
  }
}
export default MainPercentages;

class PercentageBox extends React.Component {
  render() {
    let { header, percentage } = this.props;
    return (
      <div>
        <Header className="twentyFont mb-point-5">{header}</Header>
        <BoxContainer>
          <Progress
            type="circle"
            percent={percentage}
            strokeColor={{ "0%": this.props.color, "100%": this.props.color }}
          />
        </BoxContainer>
      </div>
    );
  }
}
