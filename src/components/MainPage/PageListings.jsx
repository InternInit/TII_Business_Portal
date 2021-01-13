import React from "react";
import styled from "styled-components";
import { Row as AntRow, Col as AntCol } from "antd";
import { Header, Caption } from "../Styled/FundamentalComponents.jsx";

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

const Industry = styled.span`
  margin-top: -1vh;
  color: #262626;
  font-weight: 400;
`;

const StatNum = styled.span`
  font-weight: bold;
  font-size: 14px;
`;

const PageListings = (props) => {
  let { name, interns, accepted } = props;
  return (
    <TabContainer className="px-3 py-1">
      {/**
       *
       * Listing name + Industry
       *
       */}
      <AntRow align="middle" gutter={[16, 0]}>
        <AntCol xs={12} md={12} xl={15}>
          <AntRow>
            <Header className="eighteenFont mb-point-25" bolded>
              {name}
            </Header>
          </AntRow>
          <AntRow>
            <Industry className="fourteenFont">Data Science</Industry>
          </AntRow>
        </AntCol>

        <AntCol xs={12} md={4} xl={3}>
          <AntRow justify="center">
            <StatNum>{interns}</StatNum>
          </AntRow>
          <AntRow justify="center">
            <Caption light>Applicants</Caption>
          </AntRow>
        </AntCol>

        <AntCol xs={0} md={4} xl={3}>
          <AntRow justify="center">
            <StatNum>{accepted}</StatNum>
          </AntRow>
          <AntRow justify="center">
            <Caption light>Accepted</Caption>
          </AntRow>
        </AntCol>

        <AntCol xs={0} md={4} xl={3}>
          <AntRow justify="center">
            <StatNum>{interns + accepted}</StatNum>
          </AntRow>
          <AntRow justify="center">
            <Caption light>Total</Caption>
          </AntRow>
        </AntCol>
      </AntRow>
    </TabContainer>
  );
};
export default PageListings;
