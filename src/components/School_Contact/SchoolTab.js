import React, { Component } from "react";
import styled from "styled-components";
import { Button, Modal, Input } from "antd";

const { TextArea } = Input;

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  background-color: white;

  width: 100%;
  min-height: 9vh;
  min-width: 600px;

  margin-top: 2vh;

  border-radius: 4px;
  border: 1px solid #d8def3;
  box-shadow: 1px 1px 5px -4px;
`;

const Header = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Caption = styled.span`
  font-size: 12px;
  margin-top: -0.5vh;
`;

const Contact = styled.span`
  font-size: 13px;
  margin-top: -0.5vh;
  color:#722ED1;
`;

const EMailHeader = styled.span`
font-size: 14px;
font-weight: 500;
color:black;

`

class SchoolTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    render() {
        let { visible } = this.state;
        let { name } = this.props;
        return (
            <TabContainer>
                {/**
         *
         * School name and Country
         *
         */}
                <Col style={{ width: "42vh" }}>
                    <Header>Algonquin Regional High School</Header>
                    <Caption>Northborough, Worester County</Caption>
                </Col>

                {/**Interns */}
                <Col style={{ alignItems: "center", width: '8vh' }}>
                    <Header>12</Header>
                    <Caption style={{ color: "#BFBFBF" }}>Interns</Caption>
                </Col>

                {/**Contact Info */}
                <Col style={{ alignItems: "center", width: '50vh' }}>
                    <Contact>E-Mail: 21212121</Contact>
                    <Contact>Phone Number: 774 415 4004</Contact>
                </Col>

                {/**E-Mail */}
                <Button
                    type="primary"
                    style={{
                        width: "30vh",
                    }}
                    onClick={this.showModal}
                >
                    E-Mail
                </Button>



                {/**E-Mail Modal */}

                <Modal
                    title={"To " + name}
                    okText="Send"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width='100vh'
                >
                    <EMailHeader>Subject Line</EMailHeader>
                    <Input />

                    <EMailHeader>Body</EMailHeader>
                    <TextArea autoSize={{ minRows: 5, maxRows: 10 }} />


                </Modal>


            </TabContainer>
        );
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
}
export default SchoolTab;
