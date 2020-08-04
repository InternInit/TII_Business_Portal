import React, { Component } from "react";
import styled from "styled-components";
import PostingTab from "./PostingTab";
import { Button } from "antd";
import NavSearch from "../NavSearch";
import InfoBar from "./InfoBar";
import QueueAnim from "rc-queue-anim";


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
  justifySelf: "center"
};

//Ant Design Styles
const ButtonStyle = {
  width: "270px",
  height: "40px",
  fontFamily: "roboto",
  fontColor: "#13C2C2",
  marginTop: "33px",
  align: "inline-block"
};

const ButtonText = styled.span`
  font-family: roboto;
  color: #13c2c2;
  font-size: 18px;
`;


class PositionPost extends Component {
  state = {
    page: '5',
    business: null
  }
  render() {
    let { business } = this.state;

    if (business === null) {
      return null;
    }
    console.log("This is business: ", typeof business[0].listings)
    return (
      <Container>
        <NavSearch title="My Internship Postings" />

        <div style={pageStyle}>
          <Row>
            <Button style={ButtonStyle}><ButtonText>New Internship</ButtonText></Button>
            <Button style={ButtonStyle} ><ButtonText>Edit Filter</ButtonText></Button>
          </Row>
          {/**
           * Info Bar
           */}
          <InfoBar />

          {business[0].listings.map(post => (
            <PostingTab status="Active" name={post.name} interns={post.interns} />
          ))}
        </div>
      </Container>
    );
  }
  componentDidMount() {
    fetch(`http://localhost:8000/business?_page=${this.state.page}&_limit=2`)
      .then(response => response.json())
      .then(json =>
        this.setState({ business: json }))
  }
}
export default PositionPost;
