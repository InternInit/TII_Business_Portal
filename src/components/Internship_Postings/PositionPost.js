import React, { Component } from "react";
import styled from "styled-components";
import PostingTab from "./PostingTab";
import { Button } from "antd";
import NavSearch from "../NavSearch";
import InfoBar from "./InfoBar";

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

  width: 60vh;
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

class PositionPost extends Component {
  state = {
    page: '1',
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
            <Button type="primary" style={{ width: "27vh" }}>
              New Internship
            </Button>
            <Button type="primary" style={{ width: "27vh" }}>
              Edit Filter
            </Button>
          </Row>

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
