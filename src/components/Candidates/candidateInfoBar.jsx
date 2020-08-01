import React, { Component } from "react";
import styled from "styled-components";

const Info = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #b2b2b2;
  text-align: center;
`;

const Container = styled.div`
  width: 100%;
  min-width: 600px;
  border-bottom: 1px solid #d1d1d1;
  margin-top: 2vh;

  display: flex;
  justify-content: center;
`;

function CandidateInfoBar() {
  return (
    <Container>
      {/**
       *
       * Name
       *
       */}
      <Info style={{ width: "40vh" }}>Name</Info>
      <Info style={{ width: "42vh" }}>School and Region</Info>
      <Info style={{ width: "15vh" }}>GPA</Info>
      <Info style={{ width: "50vh" }}>Applied For</Info>
      <Info style={{ width: "20vh" }}>Mark</Info>
      <Info style={{ width: "10vh" }}> </Info>
    </Container>
  );
}
export default CandidateInfoBar;
