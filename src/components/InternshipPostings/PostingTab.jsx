import React, { Component } from "react";
import styled from "styled-components";
import { Button, Row as AntRow, Col as AntCol } from "antd";
import { Link } from "react-router-dom";
import { TabContainer } from "../Styled/FundamentalComponents";

const Header = styled.span`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
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
      <TabContainer className="mt-1-5 py-2">
        {/**
         *
         * Listing Name + Industry
         *
         */}
         <AntRow>
        <AntCol style={{ width: "40vh", alignItems: "center" }}>
          <Header>{name}</Header>
          <Caption>Data Science</Caption>
        </AntCol>

        {/**Status */}
        <AntCol style={{ width: "20vh", alignItems: "center" }}>
          <Status style={{ color: statusColor }}>{status}</Status>
        </AntCol>

        {/**Applicants */}
        <AntCol style={{ width: "40vh", alignItems: "center" }}>
          <Header>{interns}</Header>
          <Caption style={{ color: "#BFBFBF" }}>Applicants</Caption>
        </AntCol>

        {/**Details */}
        <AntCol style={{ width: "40vh", alignItems: "center" }}>
          <Button
            type="primary"
            style={{
              width: "30vh"
            }}
          >
            <Link to={`/internship-listings/${id}`}>Details</Link>
          </Button>
        </AntCol>
        </AntRow>
      </TabContainer>
    );
  }
}
export default PostingTab;
