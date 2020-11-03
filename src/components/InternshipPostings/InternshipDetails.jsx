import React from "react";
import styled from "styled-components";

import { Input, Button, Form } from "antd";

import NavSearch from "../NavSearch.jsx";

import axios from "axios";

import { v4 as uuidv4 } from "uuid";

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
  justify-content: space-evenly;
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
  backgroundColor: "#eceff9",
};

const buttonStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "6vh",
  marginBottom: "6vh",
};

//Validation Rules (Required questions)
const validationRules = (required, inputName, type, pattern) => [
  {
    required: required,
    message: "Please input your " + inputName,
    type: type,
    pattern: pattern,
  },
];

//Form Props
const FormProps = {
  TotalForm: {
    name: "Internship Post",
  },
  Title: {
    key: "title",
    name: "Title",
    rules: validationRules(true, "listing title", "string"),
  },
  Description: {
    key: "description",
    name: "Description",
    rules: validationRules(true, "listing description", "string"),
  },
  Address: {
    key: "address",
    name: "Address",
    rules: validationRules(true, "listing location", "string"),
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
    name: "Zip Code",
  },
  Industries: {
    key: "industries",
    name: "Industries",
    rules: validationRules(true, "relevant industries", "string"),
  },
  AdditionalInfo: {
    key: "additionalInfo",
    name: "Additional Info",
  },
};

class InternshipDetails extends React.Component {
  formRef = React.createRef();

  onFinish = (values) => {
    let uuid = uuidv4();
    values.Id = uuid;
    console.log(uuid);
    const headers = {
      headers: {
        Authorization: "Bearer 6aa19690-d874-4fdd-a1d8-a1168a7b632c",
        ListingId: uuid,
      },
    };
    axios
      .post("/api/update_internship_listings", values, headers)
      .then((response) => {
        console.log(JSON.parse(response.data));
        this.props.addListing(JSON.parse(response.data));
      });
  };
  render() {
    let { buttonText, title } = this.props;
    return (
      <React.Fragment>
        <NavSearch title={title} searchBar={false} />
        <div style={pageStyle}>
          <div
             className="global-container px-8"
             style={{width: "100%"}}
          >
            {/**
             *
             * Listing Name
             *
             */}
            <Form
              {...FormProps.TotalForm}
              onFinish={this.onFinish}
              ref={this.formRef}
            >
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
              <Row style={{ justifyContent: "space-between" }}>
                <Col style={{ width: "47%" }}>
                  <InfoHeader>Location</InfoHeader>
                  <Form.Item {...FormProps.Address}>
                    <Input
                      placeholder="Location here"
                      style={{ marginTop: "2vh" }}
                    />
                  </Form.Item>
                </Col>
                <Col style={{ width: "47%" }}>
                  <InfoHeader>Relevant Industries</InfoHeader>
                  <Form.Item {...FormProps.Industries}>
                    <Input placeholder="" style={{ marginTop: "2vh" }} />
                  </Form.Item>
                </Col>
              </Row>

              {/**
               *
               * Additional Information
               *
               */}
              <InfoHeader>Additional Information</InfoHeader>
              <Form.Item {...FormProps.AdditionalInfo}>
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
              <div style={buttonStyle}>
                <Button
                  type="primary"
                  size="medium"
                  style={{ width: "36vh" }}
                  htmlType="submit"
                >
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
