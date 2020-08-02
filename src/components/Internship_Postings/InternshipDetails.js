import React from "react";
import styled from "styled-components";

import { Input, Button } from "antd";

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
    float: "center"
}

const buttonStyle = {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "6vh",
    marginBottom: "6vh"
}

class InternshipDetails extends React.Component {
    render() {
        return (
            <React.Fragment>
                <NavSearch title="Posting Information" searchBar={false} />
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
                        <Header>Post Title</Header>
                        <Input
                            placeholder="Edit Posting Name"
                            style={{ marginTop: "2vh" }}
                        />


                        {/**
             *
             * Post Description
             *
             */}
                        <InfoHeader>Post Description</InfoHeader>
                        <TextArea
                            placeholder="Post Description"
                            autoSize={{ minRows: 5, maxRows: 10 }}
                            style={{ marginTop: "2vh" }}
                        />


                        {/**
             *
             * Location and Industries
             *
             */}
                        <Row>
                            <Col style={{ width: '45%' }}>
                                <InfoHeader>Location</InfoHeader>
                                <Input
                                    placeholder="Location here"
                                    style={{ marginTop: "2vh" }}
                                />
                            </Col>
                            <Col style={{ width: '45%' }}>
                                <InfoHeader>Relevant Industries</InfoHeader>
                                <Input
                                    placeholder=""
                                    style={{ marginTop: "2vh" }}
                                />
                            </Col>
                        </Row>

                        {/**
             *
             * Additional Information
             *
             */}
                        <InfoHeader>Additional Information</InfoHeader>
                        <TextArea
                            autoSize={{ minRows: 5, maxRows: 10 }}
                            style={{ marginTop: "2vh" }}
                        />

                        {/**
             *
             * Save Changes Button
             *
             */}
                        <div
                            style={buttonStyle}
                        >
                            <Button type="primary" size="medium" style={{ width: "36vh" }}>
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default InternshipDetails;
