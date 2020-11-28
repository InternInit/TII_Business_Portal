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

const InfoBar = (props) => {
  return (
    <Container className="px-6 pb-point-5 internship-posting-responsive-tab-container">
      <AntRow 
            style={{backgroundColor: "red"}}
            >
        {/**
         *
         * Name
         *
         */}
        <AntCol className="universal-center" xs={24} sm={0}>
          <Info className="twentyFont">{props.mobileHeader}</Info>
        </AntCol>
        {props.fieldOne && (
          <AntCol
            className="universal-left"
            xs={0}
            sm={props.fieldOne.sm ? props.fieldOne.sm : 9}
            lg={props.fieldOne.lg ? props.fieldOne.lg : 7}
            style={{backgroundColor: "blue"}}
          >
            <Info className="sixteenFont">{props.fieldOne.name}</Info>
          </AntCol>
        )}
        {props.fieldTwo && (
          <AntCol
            className="universal-center"
            xs={0}
            sm={props.fieldTwo.sm ? props.fieldTwo.sm : 3}
            lg={props.fieldTwo.lg ? props.fieldTwo.lg : 5}
          >
            <Info className="sixteenFont">{props.fieldTwo.name}</Info>
          </AntCol>
        )}
        {props.fieldThree && (
          <AntCol
            className="universal-center"
            xs={0}
            sm={props.fieldThree.sm ? props.fieldThree.sm : 6}
            lg={props.fieldThree.lg ? props.fieldThree.lg : 6}
          >
            <Info className="sixteenFont">{props.fieldThree.name}</Info>
          </AntCol>
        )}
        {props.fieldFour && (
          <AntCol
            className="universal-center"
            xs={0}
            sm={props.fieldFour.sm ? props.fieldFour.sm : 6}
            lg={props.fieldFour.lg ? props.fieldFour.lg : 6}
            style={{backgroundColor: "blue"}}
          >
            <Info className="sixteenFont">{props.fieldFour.name}</Info>
          </AntCol>
        )}
      </AntRow>
    </Container>
  );
};
export default InfoBar;
