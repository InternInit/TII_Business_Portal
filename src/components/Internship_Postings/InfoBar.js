import React, { Component } from "react";
import styled from "styled-components";

const Info = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #b2b2b2;

  display:flex;
  justify-content:center;
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
      <Info style={{ width: "40vh", justifyContent: 'flex-start', marginLeft: '3vh' }}>Name</Info>
      <Info style={{ width: '20vh', marginRight: '2vh' }}>Status</Info>
      <Info style={{ width: '40vh', marginRight: '2vh' }}>Applicants</Info>
      <Info style={{ width: "40vh", marginLeft: '2vh', paddingLeft: '6vh' }}>Edit Details</Info>
    </Container >
  );
}
export default InfoBar;
