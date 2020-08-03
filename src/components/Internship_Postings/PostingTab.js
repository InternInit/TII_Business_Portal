import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { Link } from "react-router-dom";

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  background-color: white;

  width: 100%;
  min-height: 11vh;
  min-width: 600px;

  margin-top: 2vh;

  border-radius: 4px;
  border: 1px solid #d8def3;
  box-shadow: 1px 1px 5px -4px;
`;

const Header = styled.span`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Caption = styled.span`
  font-size: 14px;
  margin-top: -1vh;
  text-align: center;
`;

const Status = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

class PostingTab extends Component {
  render() {
    let { status, name, interns } = this.props;
    let statusColor = "";

    let { id } = this.props;

    switch (status) {
      case "Active":
        statusColor = "#52c41a";
        break;
      case "Inactive":
        statusColor = "#f5222d";
        break;
      default:
        break;
    }
    return (
      <TabContainer>
        {/**
         *
         * Listing Name + Industry
         *
         */}
        <Col style={{ width: "40vh", alignItems: "center" }}>
          <Header>{name}</Header>
          <Caption>Data Science</Caption>
        </Col>

        {/**Status */}
        <Col style={{ width: "20vh", alignItems: "center" }}>
          <Status style={{ color: statusColor }}>{status}</Status>
        </Col>

        {/**Applicants */}
        <Col style={{ width: "40vh", alignItems: "center" }}>
          <Header>{interns}</Header>
          <Caption style={{ color: "#BFBFBF" }}>Applicants</Caption>
        </Col>

        {/**Details */}
        <Col style={{ width: "40vh", alignItems: "center" }}>
          <Button
            type="primary"
            style={{
              width: "30vh"
            }}
          >
            <Link to={`/internship-listings/${id}`}>Details</Link>
          </Button>
        </Col>
      </TabContainer>
    );
  }
}
export default PostingTab;
