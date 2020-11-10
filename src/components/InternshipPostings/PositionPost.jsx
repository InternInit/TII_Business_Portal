import React, { Component } from "react";
import styled from "styled-components";
import PostingTab from "./PostingTab.jsx";
import { Button, Row as AntRow, Col as AntCol } from "antd";
import NavSearch from "../General/NavSearch.jsx";
import InfoBar from "./InfoBar.jsx";
import { PageContainer, InnerContainer } from "../Styled/FundamentalComponents";

import { Link } from "react-router-dom";

import axios from "axios";

//Redux
import { connect } from "react-redux";
import { addListing, batchUpdateListings } from "../../redux/actions";
import { actionRow } from "aws-amplify";

const Row = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 4vh;
  margin-bottom: 4vh;

  width: 85vh;
  justify-content: space-between;
  align-self: flex-start;
`;

//CSS Constants

//Ant Design Styles
const ButtonStyle = {
  width: "100%",
  minWidth: "170px",
  height: "40px",
  fontFamily: "roboto",
  fontColor: "#13C2C2",
  align: "inline-block",
};

const ButtonText = styled.span`
  font-family: roboto;
  color: #13c2c2;
  font-size: 18px;
`;

const mapStateToProps = (state) => {
  return {
    listings: state.listings,
  };
};

const mapDispatchToProps = {
  addListing,
  batchUpdateListings,
};

class PositionPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "5",
    };
  }

  render() {
    return (
      <PageContainer className="global-container">
        <NavSearch title="My Internship Postings" />

        <InnerContainer className="mt-2 mb-4">
          <AntRow gutter={[32, 16]}>
            <AntCol xs={24} md={8} lg={5}>
              <Link to="/internship-listings/add-listing">
                <Button style={ButtonStyle}>
                  <ButtonText>New Internship</ButtonText>
                </Button>
              </Link>
            </AntCol>
            <AntCol xs={24} md={8} lg={5}>
              <Button style={ButtonStyle}>
                <ButtonText>Edit Filter</ButtonText>
              </Button>
            </AntCol>
          </AntRow>
          {/**
           * Info Bar
           */}
          <InfoBar />

          {this.props.listings.map((post, index) => (
            <PostingTab
              status="Active"
              name={post.Title}
              interns="0"
              id={post.Id}
            />
          ))}
        </InnerContainer>
      </PageContainer>
    );
  }
  componentDidMount() {
    console.log(this.props);
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PositionPost);
