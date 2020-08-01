import React from "react";
import styled from "styled-components";
import { Avatar } from "antd";

import { UserOutlined } from "@ant-design/icons";

const Container = styled.div`
  width: 100%;
  background-color: white;
  min-height: 7.4vh;
  margin-bottom: 10px;
  min-width: 325px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d8def3;

  box-shadow: 1px 1px 5px -4px;
  :hover {
    transition-duration: 0.35s;
    cursor: pointer;
    box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.1);
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 6px;
`;
const Name = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #434343;
`;
const Applying = styled.span`
  margin-top: -4px;
  font-size: 12px;
  font-weight: 500;
  color: #8c8c8c;
`;

class StudentCard extends React.Component {
  render() {
    return (
      <Container>
        <Avatar size={28} icon={<UserOutlined />} />
        <Col>
          <Name>Oscar Hong (18)</Name>
          <Applying>Coffee Grinder</Applying>
        </Col>
      </Container>
    );
  }
}
export default StudentCard;
