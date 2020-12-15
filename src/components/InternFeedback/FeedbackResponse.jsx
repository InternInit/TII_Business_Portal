import React, { Component } from "react";
import styled from "styled-components";
import { Button, Modal, Input } from "antd";
import NavSearch from "../General/NavSearch.jsx";
const { TextArea } = Input;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 100vh;
  min-width: 600px;

  background-color: #eceff9;
`;

const Header = styled.span`
  font-size: 36px;
  font-weight: bold;

  margin-top: 7vh;

  color: #000000;
`;

const SubHeader = styled.span`
  font-size: 24px;

  color: #595959;
`;

const FeedbackHeader = styled.span`
  font-size: 24px;
  font-weight: 500;
  color: #000000;

  margin-top: 6vh;
`;
const Feedback = styled.span`
  width: 90%;
  font-size: 16px;
  margin: 3vh;
`;

const SubjectLine = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
`;

//CSS Constants
const pageStyle = {
  display: "flex",
  width: "80%",
  flexDirection: "column",
  justifySelf: "center",
  marginBottom: "4vh",
};

const buttonStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "6vh",
  marginBottom: "6vh",
};

class FeedbackResponse extends Component {
  state = {
    visible: false,
  };
  render() {
    let { visible } = this.state;
    return (
      <Container>
        <NavSearch title="Intern Feedback" />
        <div style={pageStyle}>
          {/**
           *
           * Intern Name
           *
           */}
          <Header>Intern Position</Header>
          <SubHeader>Intern Name</SubHeader>

          {/**
           *
           * Positive Feedback
           *
           */}
          <FeedbackHeader>
            "How did you feel about your internship?"
          </FeedbackHeader>
          <Feedback>
            Feedback about what I liked Feedback about what I liked Feedback
            about what I liked Feedback about what I liked Feedback about what I
            liked Feedback about what I liked Feedback about what I liked
            Feedback about what I liked Feedback about what I liked Feedback
            about what I liked Feedback about what I liked Feedback about what I
            liked Feedback about what I liked Feedback about what I liked
          </Feedback>

          {/**
           *
           * Constructive Criticism
           *
           */}
          <FeedbackHeader>
            "What would you change/improve about your internship?"
          </FeedbackHeader>
          <Feedback>
            Feedback about what I liked Feedback about what I liked Feedback
            about what I liked Feedback about what I liked Feedback about what I
            liked Feedback about what I liked Feedback about what I liked
            Feedback about what I liked Feedback about what I liked Feedback
            about what I liked Feedback about what I liked Feedback about what I
            liked Feedback about what I liked Feedback about what I liked
          </Feedback>

          {/**
           *
           * Additional Information
           *
           */}
          <FeedbackHeader>"Additional Comments"</FeedbackHeader>
          <Feedback>None</Feedback>

          <div style={buttonStyle}>
            {/**
             *
             * Send Response
             *
             */}
            <Button
              type="primary"
              size="medium"
              style={{ width: "36vh" }}
              onClick={this.showModal}
            >
              Send Response
            </Button>
          </div>
        </div>
        <Modal
          title={"To " + this.props.name}
          okText="Send"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="100vh"
        >
          <SubjectLine>Subject Line</SubjectLine>
          <Input placeholder="Thank you for your feedback!" />
          <h1></h1>
          <SubjectLine>Body</SubjectLine>
          <TextArea autoSize={{ minRows: 5, maxRows: 10 }} />
        </Modal>
      </Container>
    );
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
}
export default FeedbackResponse;
