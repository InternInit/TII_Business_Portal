import React, { Component } from "react";
import styled from "styled-components";
import PostingTab from "./PostingTab";
import { Button } from "antd";
import NavSearch from "../NavSearch";
import InfoBar from "./InfoBar";
import QueueAnim from "rc-queue-anim";

import { Link } from "react-router-dom";

import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 100vh;
  min-width: 600px;

  background-color: #eceff9;
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

class PositionPost extends Component {
  state = {
    page: "5",
    listings: null,
  };
  render() {
    let { listings } = this.state;

    if (listings === null) {
      return null;
    }
    return (
      <Container>
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

          {listings.map((post, index) => (
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
    fetch(`http://localhost:8000/business?_page=${this.state.page}&_limit=2`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });

    const headers = {
      headers: {
        Authorization: "Bearer e149eb67-8016-4d09-aa73-6bab85bdea1d",
      },
    };

    axios.get("/api/get_internship_listings", headers).then((response) => {
      console.log(response.data);
      this.setState({ listings: JSON.parse(response.data) });
    });
  }
}
export default PositionPost;
