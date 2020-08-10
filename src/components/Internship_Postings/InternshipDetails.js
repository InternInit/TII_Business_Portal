import React from "react";
import styled from "styled-components";

import { Input, Button, Form } from "antd";

import NavSearch from "../NavSearch";

const { TextArea } = Input;

const Header = styled.div`
  font-size: 36px;
  font-weight: bold;

  margin-top: 8vh;

  color: #000000;
`;

const InfoHeader = styled.div`
  font-size: 24px;
  font-weight: bold;

  margin-top: 4vh;

  color: #434343;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:space-evenly;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

//CSS Constants
const pageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    float: "center",
    backgroundColor: '#eceff9'
}

const buttonStyle = {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "6vh",
    marginBottom: "6vh"
}

//Form Props
const FormProps = {
    TotalForm: {
        name: "Internship Post"
    },
    Title: {
        key: "title",
        name: "Title",
    },
    Description: {
        key: "description",
        name: "Description",
    },
    Address: {
        key: "address",
        name: "Address",
    },
    City: {
        key: "city",
        name: "City",
    },
    State: {
        key: "state",
        name: "State",
    },
    Zipcode: {
        key: "zipcode",
        name: "Zipecode"
    },
    Industries: {
        key: "industries",
        name: "Industries"
    },
    Additional: {
        key: "additional",
        name: "additional"
    }
}



class InternshipDetails extends React.Component {
    render() {
        let { buttonText, title } = this.props;
        return (
            <React.Fragment>
                <NavSearch title={title} searchBar={false} />
                <div
                    style={pageStyle}
                >
                    <div
                        style={{
                            backgroundColor: "#eceff9",
                            width: "80%"
                        }}
                    >


                        {/**
             *
             * Listing Name
             *
             */}
                        <Form {...FormProps.TotalForm}>
                            <Header>Post Title</Header>
                            <Form.Item {...FormProps.Title}>
                                <Input
                                    placeholder="Edit Posting Name"
                                    style={{ marginTop: "2vh" }}
                                />
                            </Form.Item>

                            {/**
             *
             * Post Description
             *
             */}
                            <InfoHeader>Post Description</InfoHeader>
                            <Form.Item {...FormProps.Description}>
                                <TextArea
                                    placeholder="Post Description"
                                    autoSize={{ minRows: 5, maxRows: 10 }}
                                    style={{ marginTop: "2vh" }}
                                />
                            </Form.Item>

                            {/**
             *
             * Location and Industries
             *
             */}
                            <Row style={{ justifyContent: 'space-between' }}>
                                <Col style={{ width: '47%' }}>
                                    <InfoHeader>Location</InfoHeader>
                                    <Form.Item {...FormProps.Address}>
                                        <Input
                                            placeholder="Location here"
                                            style={{ marginTop: "2vh" }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col style={{ width: '47%' }}>
                                    <Form.Item {...FormProps.Industries}>
                                        <InfoHeader>Relevant Industries</InfoHeader>
                                        <Input
                                            placeholder=""
                                            style={{ marginTop: "2vh" }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            {/**
             *
             * Additional Information
             *
             */}
                            <InfoHeader>Additional Information</InfoHeader>
                            <Form.Item {...FormProps.Additional}>
                                <TextArea
                                    autoSize={{ minRows: 5, maxRows: 10 }}
                                    style={{ marginTop: "2vh" }}
                                />
                            </Form.Item>
                            {/**
             *
             * Save Changes Button
             *
             */}
                            <div
                                style={buttonStyle}
                            >
                                <Button type="primary" size="medium" style={{ width: "36vh" }}>
                                    {buttonText}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default InternshipDetails;
