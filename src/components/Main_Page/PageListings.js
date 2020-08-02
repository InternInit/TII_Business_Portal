import React from "react";
import styled from "styled-components";

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: white;
  min-height: 7.75vh;
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
  font-size: 18px;
  font-weight: bold;
`;
const Industry = styled.span`
  margin-top: -1vh;
  font-size: 14px;
  color: #8c8c8c;
  font-weight: 500;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const StatNum = styled.span`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
`;
const StatLabel = styled.span`
  margin-top: -4%;
  font-size: 14px;
  color: #8c8c8c;
  font-weight: 500;
`;


//CSS Constants
const dividerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  marginLeft: "5%",
  width: "65%"
}

class PageListings extends React.Component {
  render() {
    return (
      <TabContainer>
        {/**
         *
         * Listing name + Industry
         *
         */}
        <Col style={{ marginLeft: "5%" }}>
          <ListingName>Cheese Grator</ListingName>
          <Industry>Data Science</Industry>
        </Col>

        {/**
         *
         * Listing Details
         *
         */}
        <div
          style={dividerStyle}
        >
          <Col>
            <StatNum>12</StatNum>
            <StatLabel>Applicants</StatLabel>
          </Col>

          <Col>
            <StatNum>12</StatNum>
            <StatLabel>Accepted</StatLabel>
          </Col>

          <Col>
            <StatNum>24</StatNum>
            <StatLabel>Total</StatLabel>
          </Col>
        </div>
      </TabContainer>
    );
  }
}
export default PageListings;
