import React from "react";
import styled from "styled-components";
import { Row as AntRow, Col as AntCol } from "antd";

const TabContainer = styled.div`
  width: 100%;
  background-color: white;
  min-width: 325px;
  border-radius: 4px;
  margin-bottom: 12px;
  border: 1px solid #d8def3;
  box-shadow: 1px 1px 5px -4px;
  :hover {
    transition-duration: 0.35s;
    cursor: pointer;
    box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.1);
  }
`;
const ListingName = styled.span`
  font-weight: bold;
`;
const Industry = styled.span`
  margin-top: -1vh;
  font-size: 14px;
  color: #8c8c8c;
  font-weight: 500;
`;

const StatNum = styled.span`
  font-weight: bold;
  font-size: 14px;
`;
const StatLabel = styled.span`
  margin-top: -4%;
  font-size: 14px;
  color: #8c8c8c;
  font-weight: 500;
`;

const PageListings = (props) => {
  let { name, interns, accepted, total } = props;
  return (
    <TabContainer className="px-3 py-1">
      {/**
       *
       * Listing name + Industry
       *
       */}
      <AntRow align="middle" gutter={[16, 0]}>
        <AntCol lg={15}>
          <AntRow>
            <ListingName className="eighteenFont mb-point-5">
              {name}
            </ListingName>
          </AntRow>
          <AntRow>
            <Industry>Data Science</Industry>
          </AntRow>
        </AntCol>
        <AntCol lg={3} style={{backgroundColor: "yellow"}}>
          <AntRow justify="center">
            <StatNum>{interns}</StatNum>
          </AntRow>
          <AntRow justify="center">
            <StatLabel>Applicants</StatLabel>
          </AntRow>
        </AntCol>

        <AntCol lg={3}>
          <AntRow justify="center">
            <StatNum>{accepted}</StatNum>
          </AntRow>
          <AntRow justify="center">
            <StatLabel>Accepted</StatLabel>
          </AntRow>
        </AntCol>

        <AntCol lg={3} style={{backgroundColor: "yellow"}}>
          <AntRow justify="center">
            <StatNum>{total}</StatNum>
          </AntRow>
          <AntRow justify="center">
            <StatLabel>Total</StatLabel>
          </AntRow>
        </AntCol>
      </AntRow>
    </TabContainer>
  );
};
export default PageListings;
