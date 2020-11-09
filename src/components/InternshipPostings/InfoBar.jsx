import React, { Component } from "react";
import styled from "styled-components";
import { Row as AntRow, Col as AntCol } from "antd";

const Info = styled.span`
  font-weight: 500;
  color: #b2b2b2;

  display: inline-block;
  justify-content: center;
  text-align: center;
`;

const Container = styled.div`
  width: 100%;
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
    <Container className="px-6 pb-point-5 internship-posting-responsive-tab-container">
      <AntRow>
        {/**
         *
         * Name
         *
         */}
         <AntCol className="universal-center" xs={24} sm={0}>
          <Info className="twentyFont">Postings</Info>
        </AntCol>
        <AntCol className="universal-left" xs={0} sm={9} lg={6}>
          <Info className="sixteenFont">Name</Info>
        </AntCol>
        <AntCol className="universal-center" xs={0} sm={3} lg={6}>
          <Info className="sixteenFont">Status</Info>
        </AntCol>
        <AntCol className="universal-center" xs={0} sm={6}>
          <Info className="sixteenFont">Applicants</Info>
        </AntCol>
        <AntCol className="universal-center" xs={0} sm={6}>
          <Info className="sixteenFont">Edit Details</Info>
        </AntCol>
      </AntRow>
    </Container>
  );
}
export default InfoBar;
