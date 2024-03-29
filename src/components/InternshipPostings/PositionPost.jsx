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
import { Transition, config, animated } from "react-spring/renderprops";

import { Link } from "react-router-dom";

import axios from "axios";
import _ from "underscore";

//Redux
import { connect } from "react-redux";
import {
  addListing,
  batchUpdateListings,
  startListingLoading,
  finishListingLoading,
  startCandidateLoading,
  startInternLoading,
  finishCandidateLoading,
  finishInternLoading,
  updateCandidates,
  updateInterns,
} from "../../redux/actions";

import gql from "graphql-tag";
import { print } from "graphql";

// prettier-ignore
const MUTATION = gql`
mutation MyMutation ($Id:String!, $listings:AWSJSON){
  updateBusinessInfo(input: {Id: $Id, listings: $listings}) {
    listings {
      Id
      additionalInfo
      address
      availableWorkDays
      availableWorkTimes
      description
      filters
      industries
      internshipDates
      isPaid
      title
    }
  }
}
`

const DELETE_ASSOCS_MUTATION = gql`
  mutation MyMutation($assocIds: [String]!) {
    batchDeleteInternAssoc(input: { assocIds: $assocIds }) {
      internId
    }
  }
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
    loadingStatuses: state.loadingStatuses,
    candidates: state.companyInfo.candidates,
    interns: state.interns.currentInterns,
    companyInfo: state.companyInfo,
  };
};

const mapDispatchToProps = {
  addListing,
  batchUpdateListings,
  startListingLoading,
  finishListingLoading,
  updateCandidates,
  updateInterns,
  startCandidateLoading,
  startInternLoading,
  finishCandidateLoading,
  finishInternLoading,
};

const AnimatedInner = animated(InnerContainer);

class PositionPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "5",
    };
  }

  removeListing = async (id) => {
    this.props.startListingLoading();
    let newListings = this.props.listings.filter(
      (listing) => listing.Id !== id
    );
    let access = await this.props.getAccess();

    this.props.batchUpdateListings(newListings);

    axios({
      url: "/api/update_internship_listings",
      method: "post",
      headers: {
        Authorization: access,
      },
      data: {
        query: print(MUTATION),
        variables: {
          Id: this.props.companyInfo.id,
          listings: JSON.stringify(newListings),
        },
      },
    })
      .then((result) => {
        this.props.startCandidateLoading();
        this.props.startInternLoading();
        console.log(result.data);
        let candidatesToRemove = this.props.candidates.filter(
          (candidate) => candidate.appliedFor === id
        );
        //Ik this is terrible, its just a stopgap
        //Fix after demo @Tejas
        let newReduxCand = this.props.candidates.filter(
          (candidate) => candidate.appliedFor !== id
        );
        this.props.updateCandidates(newReduxCand);
        let internsToRemove = this.props.interns.filter(
          (intern) => intern.appliedFor === id
        );
        let newReduxInt = this.props.interns.filter(
          (intern) => intern.appliedFor !== id
        );
        this.props.updateInterns(newReduxInt);
        this.props.finishCandidateLoading();
        this.props.finishInternLoading();

        let assocIds = [];

        candidatesToRemove.forEach((candidate) =>
          assocIds.push(candidate.assocId)
        );

        internsToRemove.forEach((intern) => assocIds.push(intern.assocId));
        console.log(assocIds);
        //this.props.startCandidateLoading();
        //this.props.startInternLoading();
        axios({
          url: "/api/batch_delete_intern_assocs",
          method: "post",
          headers: {
            Authorization: access,
          },
          data: {
            query: print(DELETE_ASSOCS_MUTATION),
            variables: {
              assocIds: assocIds,
            },
          },
        })
          .then((response) => {
            console.log(response.data);
            /*
            setTimeout(() => {
              this.props.getFullCandidates();
              this.props.finishCandidateLoading();
              this.props.finishInternLoading();
            }, 1000);
            */
            this.props.finishListingLoading();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

          <Transition
            native
            items={this.props.location.pathname}
            from={{ opacity: 0.5, transform: "translateY(20px)" }}
            enter={{ opacity: 1, transform: "translateY(0px)" }}
            leave={{ opacity: 1 }}
            config={config.stiff}
          >
            {(location) => (props) => (
              <AnimatedInner
                key="positionPostContainer"
                className="mt-2 mb-4"
                style={{ ...props }}
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
                this.props.loadingStatuses.isCandidateLoading ||
                this.props.loadingStatuses.isInternLoading ? (
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
                      removeListing={this.removeListing}
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
              </AnimatedInner>
            )}
          </Transition>
        </PageContainer>
      </>
    );
  }
  componentDidMount() {
    console.log(this.props);
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PositionPost);
