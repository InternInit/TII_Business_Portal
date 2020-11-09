import React, { Component } from "react";
import styled from "styled-components";
import { Button, Row as AntRow, Col as AntCol } from "antd";
import { Link } from "react-router-dom";
import { TabContainer } from "../Styled/FundamentalComponents";

const Header = styled.span`
  font-weight: bold;
  text-align: center;
`;

const Caption = styled.span`
  text-align: center;
`;

const Status = styled.span`
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
      <TabContainer className="mt-1-5 py-2 px-6 internship-posting-responsive-tab-container">
        {/**
         *
         * Listing Name + Industry
         *
         */}
        <AntRow justify="center">
          <AntCol xs={9} md={6}>
            <AntRow justify="start">
              <Header className="eighteenFont">{name}</Header>
            </AntRow>
            <AntRow justify="start">
              <Caption className="fourteenFont">Data Science</Caption>
            </AntRow>
          </AntCol>

          {/**Status */}
          <AntCol className="universal-center universal-middle" xs={3} md={6}>
            <Status className="eighteenFont" style={{ color: statusColor }}>
              {status}
            </Status>
          </AntCol>

          {/**Applicants */}
          <AntCol xs={6} md={6}>
            <AntRow justify="center">
              <Header className="eighteenFont">{interns}</Header>
            </AntRow>
            <AntRow justify="center">
              <Caption className="fourteenFont" style={{ color: "#BFBFBF" }}>
                Applicants
              </Caption>
            </AntRow>
          </AntCol>

          {/**Details */}
          <AntCol className="universal-center universal-middle" xs={6} md={6}>
            <Button
              type="primary"
              style={{
                width: "80%",
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
