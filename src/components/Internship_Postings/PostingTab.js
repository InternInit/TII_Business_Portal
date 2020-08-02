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
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Caption = styled.span`
  font-size: 14px;
  margin-top: -1vh;
`;

const Status = styled.span`
  font-size: 18px;
  font-weight: 500;
`;



class PostingTab extends Component {
  render() {
    let { status } = this.props;
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
        <Col style={{ width: "45vh", marginLeft: '-5vh', marginRight: '5vh' }}>
          <Header>Coffee Getter</Header>
          <Caption>Data Science</Caption>
        </Col>

        {/**Status */}
        <Status style={{ color: statusColor, width: '30vh' }}>{status}</Status>

        {/**Applicants */}
        <div style={{ width: '35vh', justifyContent: 'flex-start', display: 'flex' }}>
          <Col style={{ alignItems: "center" }}>
            <Header>12</Header>
            <Caption style={{ color: "#BFBFBF" }}>Applicants</Caption>
          </Col>
        </div>

        {/**Details */}
        <Button
          type="primary"
          style={{
            width: "30vh",
            marginLeft: '3vh',
            marginRight: '-3vh'
          }}
        >
          <Link to={`/internship-listings/${id}`}>Details</Link>
        </Button>
      </TabContainer>
    );
  }
}
export default PostingTab;
