import React, { Component } from "react";
import styled from "styled-components";
import {
  Button,
  Modal,
  Input,
  message
} from "antd";

const { TextArea } = Input;

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  background-color: white;

  padding:1vh;

  width: 100%;
  min-height: 11vh;
  min-width: 600px;

  margin-top: 2vh;

  border-radius: 4px;
  border: 1px solid #d8def3;
  box-shadow: 1px 1px 5px -4px;
`;

const Header = styled.span`
  font-size: 18px;
  font-weight: bold;

  text-align:center;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Caption = styled.span`
  font-size: 14px;
  margin-top: -0.5vh;
`;

const Contact = styled.span`
  font-size: 14px;
  margin-top: -0.5vh;
  color: #722ed1;
`;

const EMailHeader = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
`;

class SchoolTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,

      subjectLine: "",
      body: "",
      currentSubject: "",
      currentBody: "",

      okText: "Send",
      cancelText: "Save Draft"
    };
  }
  render() {
    let { visible,
      confirmLoading,

      currentSubject,
      currentBody,

      okText,
      cancelText } = this.state;

    //Props
    let { name, address, interns, email, phone } = this.props;
    return (
      <TabContainer>
        {/**
         *
         * School name and Country
         *
         */}
        <Col style={{ width: "45vh", alignItems: "center" }}>
          <Header>{name}</Header>
          <Caption>{address}</Caption>
        </Col>

        {/**Interns */}
        <Col style={{ width: "18vh", alignItems: "center", paddingRight: '4vh' }}>
          <Header>{interns}</Header>
          <Caption style={{ color: "#BFBFBF" }}>Interns</Caption>
        </Col>

        {/**Contact Info */}
        <Col style={{ alignItems: "center", width: "40vh" }}>
          <Contact>E-Mail: {email}</Contact>
          <Contact>Phone Number: {phone}</Contact>
        </Col>

        {/**E-Mail */}
        <Col style={{ alignItems: "center", width: "40vh" }}>
          <Button
            type="primary"
            style={{
              width: "30vh"
            }}
            onClick={this.showModal}
          >
            E-Mail
          </Button>
        </Col>

        {/**E-Mail Modal */}

        <Modal
          title={"To " + name}
          okText={okText}
          cancelText={cancelText}

          visible={visible}
          confirmLoading={confirmLoading}

          onOk={this.handleOk}
          onCancel={this.handleCancel}

          width="100vh"
        >
          <EMailHeader>Subject Line</EMailHeader>
          <Input value={currentSubject}
            onChange={this.changeSubject}
          />
          <h1></h1>
          <EMailHeader>Body</EMailHeader>
          <TextArea autoSize={{ minRows: 5, maxRows: 10 }}
            value={currentBody}
            onChange={this.changeBody} />
        </Modal>
      </TabContainer>
    );
  }
  /**
   * 
   * 
   * MODAL FUNCTIONS
   * 
   */
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    let { currentSubject, currentBody } = this.state;

    if (currentBody === "") {
      message.error("Body text is missing!")
    }
    else {
      //Lets loading to true
      this.setState({ confirmLoading: true, okText: "Sending" })

      //This is where the actual sending of the email would go 
      this.setState({ subject: this.state.currentSubject, body: this.state.currentBody })

      //Sets loading to false
      this.setState({
        visible: false,
        confirmLoading: false,
        okText: "Send",

        currentBody: "",
        currentSubject: ""
      })
      message.success("Sent Successfully!")
    }
  };

  handleCancel = e => {
    this.setState({ confirmLoading: true, })
    //Loadings for .5 second before closing
    this.setState({
      visible: false,
      confirmLoading: false
    })


  };


  /**
   * 
   * 
   * INPUT FUNCTIONS
   * 
   */
  changeSubject = (event) => {
    this.setState({ currentSubject: event.target.value })
  }

  changeBody = (event) => {
    this.setState({ currentBody: event.target.value })
  }

}
export default SchoolTab;
