import React, { Component } from "react";
import PostingTab from "./PostingTab.jsx";
import { Button, Row as AntRow, Col as AntCol } from "antd";
import NavSearch from "../General/NavSearch.jsx";
import InfoBar from "../General/InfoBar.jsx";
import { PostingTabSkeleton } from "./PositionPostSkeleton.jsx";
import {
  PageContainer,
  InnerContainer,
  Header,
} from "../Styled/FundamentalComponents";
import { AiOutlineDatabase } from "react-icons/ai";
import { Transition, config } from "react-spring/renderprops";

import { Link } from "react-router-dom";

import axios from "axios";
import _ from "underscore";

//Redux
import { connect } from "react-redux";
import { addListing, batchUpdateListings } from "../../redux/actions";

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
    loadingStatuses: state.loadingStatuses,
    candidates: state.companyInfo.candidates,
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

  helloWorld = "";

  render() {
    return (
      <>
        <PageContainer className="global-container">
          <NavSearch
            title="My Internship Postings"
            placeholder="Search Postings"
            //@TODO implement functionality
            searchBar={false}
          />

          
              <InnerContainer
                key="positionPostContainer"
                className="mt-2 mb-4"
                //style={{ ...props }}
              >
                <AntRow gutter={[32, 16]}>
                  <AntCol xs={24} md={8} lg={5} className="mb-1">
                    <Link to="/internship-listings/add-listing">
                      <Button type="default" style={ButtonStyle}>
                        <span className="sixteenFont">New Internship</span>
                      </Button>
                    </Link>
                  </AntCol>
                  {/**<AntCol xs={24} md={6} lg={4}>
                    <Button type="text" style={ButtonStyle}>
                      <span className="sixteenFont">Sort By</span>
                    </Button>
            </AntCol>*/}
                </AntRow>
                {/**
                 * Info Bar
                 */}
                <InfoBar
                  mobileHeader="Postings"
                  fieldOne={{ name: "Name", sm: 9, lg: 7 }}
                  fieldTwo={{ name: "Status", sm: 3, lg: 5 }}
                  fieldThree={{ name: "Applicants", sm: 6, lg: 6 }}
                  fieldFour={{ name: "Edit Details", sm: 6, lg: 6 }}
                />

                {this.props.loadingStatuses.isListingLoading ||
                this.props.loadingStatuses.isCandidateLoading ? (
                  <>
                    {_.times(localStorage.getItem("NumListings"), () => (
                      <PostingTabSkeleton />
                    ))}
                  </>
                ) : this.props.listings.length !== 0 ? (
                  this.props.listings.map((post, index) => (
                    <PostingTab
                      status="Active"
                      name={post.title}
                      interns={
                        this.props.candidates.filter(
                          (candidate) => candidate.appliedFor === post.Id
                        ).length
                      }
                      id={post.Id}
                      industry={post.industries}
                    />
                  ))
                ) : (
                  <div className="py-2-5 universal-center ">
                    <AntRow justify="center" align="middle">
                      <AiOutlineDatabase className="internship-posting-no-content-icon" />
                    </AntRow>
                    <AntRow justify="center" align="middle">
                      <Header className="twentyFourFont" color="#bfbfbf">
                        No Listings
                      </Header>
                    </AntRow>
                    <AntRow className="mt-1" justify="center" align="middle">
                      <Link to="/internship-listings/add-listing">
                        <Button
                          size="large"
                          type="primary"
                          style={{
                            width: "10%",
                            minWidth: "125px",
                            boxShadow: "1px 1px 5px 0px #bfbfbf",
                          }}
                        >
                          Get Started
                        </Button>
                      </Link>
                    </AntRow>
                  </div>
                )}
              </InnerContainer>
            
        </PageContainer>
      </>
    );
  }
  componentDidMount() {
    console.log(this.props);
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PositionPost);
