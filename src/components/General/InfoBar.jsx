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
      <AntRow>
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
            className={
              props.fieldOne.align ? props.fieldOne.align : "universal-left"
            }
            xs={0}
            sm={props.fieldOne.sm && props.fieldOne.sm}
            lg={props.fieldOne.lg && props.fieldOne.lg}
          >
            <Info className="sixteenFont">{props.fieldOne.name}</Info>
          </AntCol>
        )}
        {props.fieldTwo && (
          <AntCol
            className={
              props.fieldTwo.align ? props.fieldTwo.align : "universal-center"
            }
            xs={0}
            sm={props.fieldTwo.sm && props.fieldTwo.sm}
            lg={props.fieldTwo.lg && props.fieldTwo.lg}
          >
            <Info className="sixteenFont">{props.fieldTwo.name}</Info>
          </AntCol>
        )}
        {props.fieldThree && (
          <AntCol
            className={
              props.fieldThree.align
                ? props.fieldThree.align
                : "universal-center"
            }
            xs={0}
            sm={props.fieldThree.sm && props.fieldThree.sm}
            lg={props.fieldThree.lg && props.fieldThree.lg}
          >
            <Info className="sixteenFont">{props.fieldThree.name}</Info>
          </AntCol>
        )}
        {props.fieldFour && (
          <AntCol
            className={
              props.fieldFour.align ? props.fieldFour.align : "universal-center"
            }
            xs={0}
            sm={props.fieldFour.sm && props.fieldFour.sm}
            lg={props.fieldFour.lg && props.fieldFour.lg}
          >
            <Info className="sixteenFont">{props.fieldFour.name}</Info>
          </AntCol>
        )}
        {props.fieldFive && (
          <AntCol
            className={
              props.fieldFive.align ? props.fieldFive.align : "universal-center"
            }
            xs={0}
            sm={props.fieldFive.sm && props.fieldFive.sm}
            lg={props.fieldFive.lg && props.fieldFive.lg}
          >
            <Info className="sixteenFont">{props.fieldFive.name}</Info>
          </AntCol>
        )}
      </AntRow>
    </Container>
  );
};
export default InfoBar;
