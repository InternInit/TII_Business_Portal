import React from "react";
import styled from "styled-components";
import { Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  min-height: 12vh;
  background-color: white;
  user-select: none;
  border-radius: 2px;

  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid #d9d9d9;
  box-shadow: 1px 1px 5px -4px;

  :hover {
    transition-duration: 0.35s;
    cursor: pointer;
    box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.1);
  }
  :active {
    box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.1);
  }
`;
const Position = styled.div`
  font-weight: 500;
  font-size: 14px;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-left: 2vh;
`;

const Date = styled.div`
  font-weight: 500;
  font-size: 12px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class DraggingCard extends React.Component {
  render() {
    let { name, date, position, avatar, id } = this.props;
    return (
      <Container>
        {/**
         *
         * Row Containing Name + Avatar
         *
         */}
        <Row style={{ marginTop: "2vh" }}>
          <Avatar src={avatar} size={30} icon={<UserOutlined />} />
          <Name>{name}</Name>
        </Row>
        <Col>
          {/**
           *
           * Position Name
           *
           */}
          <Position style={{ marginTop: "1vh" }}>{position}</Position>

          {/**
           *
           * Date Applied
           *
           */}
          <Date>Date Applied: {date}</Date>
        </Col>

        {/**
         *
         * View Details Button
         *
         */}
        <Button
          type="primary"
          style={{ marginTop: "2vh", width: "60%", marginBottom: "2vh" }}
        >
          <Link to={`/applicants/${id}`}>Details</Link>
        </Button>
      </Container>
    );
  }
}
export default DraggingCard;
