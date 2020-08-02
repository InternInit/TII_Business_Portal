import React from "react";
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


function SchoolInfoBar() {
  return (
    <Container>
      {/**
       *
       * Name
       *
       */}
      <Info style={{ width: "40vh", justifyContent: 'flex-start', marginLeft: '3vh' }}>School</Info>
      <Info style={{ width: '20vh', paddingLeft: '2vh' }}>Interns</Info>
      <Info style={{ width: '40vh', paddingLeft: '25vh' }}>Contact Info</Info>
      <Info style={{ width: "40vh", paddingLeft: '20vh' }}>Send E-Mail</Info>
    </Container >
  );
}
export default SchoolInfoBar;
