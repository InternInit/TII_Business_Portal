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

const InfoBar = (props) => {
  return (
    <Container className="px-6 pb-point-5 internship-posting-responsive-tab-container">
      <AntRow>
        {/**
         *
         * Name
         *
         */}
        <AntCol className="universal-center" xs={24} sm={0}>
          <Info className="twentyFont">{props.mobileHeader}</Info>
        </AntCol>
        <AntCol
          className="universal-left"
          xs={0}
          sm={props.fieldOne.sizeSm ? props.fieldOne.sizeSm : 9}
          lg={props.fieldOne.sizeLg ? props.fieldOne.sizeLg : 7}
        >
          <Info className="sixteenFont">{props.fieldOne.name}</Info>
        </AntCol>
        <AntCol
          className="universal-center"
          xs={0}
          sm={props.fieldTwo.sizeSm ? props.fieldTwo.sizeSm : 3}
          lg={props.fieldTwo.sizeLg ? props.fieldTwo.sizeLg : 5}
        >
          <Info className="sixteenFont">{props.fieldTwo.name}</Info>
        </AntCol>
        <AntCol
          className="universal-center"
          xs={0}
          sm={props.fieldThree.sizeSm ? props.fieldThree.sizeSm : 6}
          lg={props.fieldTwo.sizeLg ? props.fieldTwo.sizeLg : null}
        >
          <Info className="sixteenFont">{props.fieldThree.name}</Info>
        </AntCol>
        <AntCol
          className="universal-center"
          xs={0}
          sm={props.fieldFour.sizeSm ? props.fieldFour.sizeSm : 6}
          lg={props.fieldTwo.sizeLg ? props.fieldTwo.sizeLg : null}
        >
          <Info className="sixteenFont">{props.fieldFour.name}</Info>
        </AntCol>
      </AntRow>
    </Container>
  );
};
export default InfoBar;
