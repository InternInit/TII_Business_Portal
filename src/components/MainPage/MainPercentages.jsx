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
  box-shadow: 1px 1px 5px -4px;

  border: 1px solid #d8def3;
  border-radius: 4px;
`;

const MainPercentages = (props) => {
  return (
    <>
      <AntCol xs={24} md={8}>
        <PercentageBox
          header="Applied to Industry"
          percentage="2"
          color="#F5222D"
        />
      </AntCol>
      <AntCol xs={24} md={8}>
        <PercentageBox
          header="Applied to Company"
          percentage="24"
          color="#1890ff"
        />
      </AntCol>
      <AntCol xs={24} md={8}>
        <PercentageBox
          header="Percentage Accepted"
          percentage="97"
          color="#52C41A"
        />
      </AntCol>
    </>
  );
};
export default MainPercentages;

const PercentageBox = (props) => {
  let { header, percentage, color } = props;

  return (
    <div>
      <Header className="twentyFont mb-point-5">{header}</Header>
      <BoxContainer className="py-2">
        <Progress
          type="circle"
          percent={percentage}
          strokeColor={{ "0%": color, "100%": color }}
        />
      </BoxContainer>
    </div>
  );
};