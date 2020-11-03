import React, { Component } from "react";
import styled from "styled-components";
import FeedbackBox from "./FeedbackBox.jsx";
import NavSearch from "../General/NavSearch.jsx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-width: 600px;
`;

//CSS Constants
const pageStyle = {
  display: "flex",
  width: "90%",
  flexDirection: "column",
  justifySelf: "center",
};

class InternFeedback extends Component {
  render() {
    return (
      <Container className="global-container">
        <NavSearch title="Intern Feedback" />
        <div style={pageStyle}>
          <FeedbackBox style={{ marginTop: "12vh" }} />
          <FeedbackBox style={{ marginTop: "12vh" }} />
        </div>
      </Container>
    );
  }
}
export default InternFeedback;
