import React, { Component } from "react";
import styled from "styled-components";

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

  display: flex;
  justify-content: center;
`;

//CSS Constants
const dividerStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "90vh",
  marginLeft: "25vh"
};

function InfoBar() {
  return (
    <Container>
      {/**
       *
       * Name
       *
       */}
      <Info
        style={{
          width: "40vh"
        }}
      >
        Name
      </Info>
      <Info style={{ width: "20vh" }}>Status</Info>
      <Info style={{ width: "40vh" }}>Applicants</Info>
      <Info style={{ width: "40vh" }}>Edit Details</Info>
    </Container>
  );
}
export default InfoBar;
