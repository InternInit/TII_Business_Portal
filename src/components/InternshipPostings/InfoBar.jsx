import React, { Component } from "react";
import styled from "styled-components";
import { Row as AntRow, Col as AntCol } from "antd";

const Info = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #b2b2b2;

  display: inline-block;
  justify-content: center;
  text-align: center;
`;

const Container = styled.div`
  width: 100%;
  min-width: 600px;
  border-bottom: 1px solid #d1d1d1;
`;

//CSS Constants
const dividerStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "90vh",
  marginLeft: "25vh",
};

function InfoBar() {
  return (
    <Container>
      <AntRow>
        {/**
         *
         * Name
         *
         */}
        <AntCol lg={9}>
          <Info>Name</Info>
        </AntCol>
        <AntCol lg={3}>
          <Info>Status</Info>
        </AntCol>
        <AntCol lg={6}>
          <Info>Applicants</Info>
        </AntCol>
        <AntCol lg={6}>
          <Info>Edit Details</Info>
        </AntCol>
      </AntRow>
    </Container>
  );
}
export default InfoBar;
