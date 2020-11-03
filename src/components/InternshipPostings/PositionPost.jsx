import React, { Component } from "react";
import styled from "styled-components";
import PostingTab from "./PostingTab.jsx";
import { Button } from "antd";
import NavSearch from "../NavSearch";
import InfoBar from "./InfoBar.jsx";
import QueueAnim from "rc-queue-anim";

import { Link } from "react-router-dom";

import axios from "axios";

//Redux
import { connect } from "react-redux";
import { addListing, batchUpdateListings } from "../../redux/actions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 600px;
`;

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
const pageStyle = {
  display: "flex",
  width: "90%",
  flexDirection: "column",
  justifySelf: "center",
  marginBottom: "4vh",
};

//Ant Design Styles
const ButtonStyle = {
  width: "270px",
  height: "40px",
  fontFamily: "roboto",
  fontColor: "#13C2C2",
  marginTop: "33px",
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
      <Container className="global-container">
        <NavSearch title="My Internship Postings" />

        <div style={pageStyle}>
          <Row>
            <Link to="/internship-listings/add-listing">
              <Button style={ButtonStyle}>
                <ButtonText>New Internship</ButtonText>
              </Button>
            </Link>
            <Button style={ButtonStyle}>
              <ButtonText>Edit Filter</ButtonText>
            </Button>
          </Row>
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
        </div>
      </Container>
    );
  }
  componentDidMount() {
    console.log(this.props);
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PositionPost);
