import React from "react";
import styled from "styled-components";

const FeedbackContainer = styled.div`
  width: 100%;
  border-radius: 4px;
  min-width: 325px;
  border: 1px solid #d8def3;
  box-shadow: 1px 1px 5px -4px;

  :hover {
    transition-duration: 0.35s;
    cursor: pointer;
    box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.1);
  }
`;
const Banner = styled.div`
  width: 100%;
  background-color: #fffbe6;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;
const Student = styled.span`
  font-size: 12px;
  margin-left:2vh;
`;
const Position = styled.span`
  font-weight: 500;
`;
const Feedback = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  font-size: 13px;
`;

//CSS Constants
const feedbackStyle = {
  width: "90%",
  marginTop: "10px",
  minHeight: "12vh",
  maxHeight: "20vh"
}
class PageFeedback extends React.Component {
  render() {
    return (
      <FeedbackContainer>
        <Banner>
          {/**
           *
           * Intern Name and Job Name
           *
           */}
          <div style={{ padding: "4px", marginLeft: "12px" }}>
            <Position>Position Name</Position>
            <Student>Oscar Hong (18)</Student>
          </div>
        </Banner>
        {/**
         *
         * Intern Feedback
         *
         */}
        <Feedback>
          <div
            style={feedbackStyle}
          >
            Feedback goes here
          </div>
        </Feedback>
      </FeedbackContainer>
    );
  }
}
export default PageFeedback;
