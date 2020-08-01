import React, { Component } from "react";
import styled from "styled-components";

const Info = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #b2b2b2;
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
      <Info style={{ width: "40vh" }}>Name</Info>

      {/**
       *
       * Spacing
       *
       */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "90vh",
          marginLeft: "25vh"
        }}
      >
        {/**
         *
         * Name
         *
         */}
        <Info style={{ width: "20vh" }}>Name</Info>
      </div>

      {/**
       *
       * Spacing
       *
       */}
      <div style={dividerStyle}>
        {/**
         *
         * Status, Applicants, and Edit Details
         *
         */}
        <Info>Status</Info>
        <Info>Applicants</Info>
        <Info
          style={{ width: "30vh", justifyContent: "center", display: "flex" }}
        >
          Edit Details
        </Info>
      </div>
    </Container>
  );
}
export default InfoBar;
