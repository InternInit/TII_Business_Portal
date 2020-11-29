import React, { Component } from "react";
import styled from "styled-components";
import PostingTab from "./PostingTab.jsx";
import { Button, Row as AntRow, Col as AntCol } from "antd";
import NavSearch from "../General/NavSearch.jsx";
import InfoBar from "../General/InfoBar.jsx";
import {
  PageContainer,
  InnerContainer,
  TabContainer,
  Header,
} from "../Styled/FundamentalComponents";

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
};

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
        <NavSearch
          title="My Internship Postings"
          placeholder="Search Postings"
        />

        <InnerContainer className="mt-2 mb-4">
          <AntRow gutter={[32, 16]}>
            <AntCol xs={24} md={8} lg={5}>
              <Link to="/internship-listings/add-listing">
                <Button type="default" style={ButtonStyle}>
                  <span className="sixteenFont">New Internship</span>
                </Button>
              </Link>
            </AntCol>
            <AntCol xs={24} md={6} lg={4}>
              <Button type="text" style={ButtonStyle}>
                <span className="sixteenFont">Sort By</span>
              </Button>
            </AntCol>
          </AntRow>
          {/**
           * Info Bar
           */}
          <InfoBar
            mobileHeader="Postings"
            fieldOne={{ name: "Name", sm: 9, lg: 7 }}
            fieldTwo={{ name: "Status",  sm: 3, lg: 5 }}
            fieldThree={{ name: "Applicants", sm: 6, lg: 6 }}
            fieldFour={{ name: "Edit Details", sm: 6, lg: 6 }}
          />

          {this.props.listings.length !== 0 ? (
            this.props.listings.map((post, index) => (
              <PostingTab
                status="Active"
                name={post.Title}
                interns="0"
                id={post.Id}
              />
            ))
          ) : (
            <TabContainer className="mt-1-5 py-2 px-6 universal-center">
              <AntRow justify="center" align="middle">
                <Header className="twentyFourFont">
                  You Don't Currently Have Any Internship Postings
                </Header>
              </AntRow>
            </TabContainer>
          )}
        </InnerContainer>
      </PageContainer>
    );
  }
  componentDidMount() {
    console.log(this.props);
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PositionPost);
