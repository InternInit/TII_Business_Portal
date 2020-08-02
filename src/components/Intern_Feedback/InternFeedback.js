import React, { Component } from "react";
import styled from "styled-components";
import FeedbackBox from './FeedbackBox';
import NavSearch from "../NavSearch";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 100vh;
  min-width: 600px;

  background-color: #eceff9;
`;



//CSS Constants
const pageStyle = {
    display: "flex",
    width: "90%",
    flexDirection: "column",
    justifySelf: "center"
};



class InternFeedback extends Component {
    render() {
        return (
            <Container>
                <NavSearch title="Intern Feedback" />
                <div style={pageStyle}>
                    <FeedbackBox style={{ marginTop: '12vh' }} />
                    <FeedbackBox style={{ marginTop: '12vh' }} />

                </div>
            </Container>
        );
    }
}
export default InternFeedback;
