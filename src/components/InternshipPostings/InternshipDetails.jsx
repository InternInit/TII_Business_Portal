import React from "react";
import styled from "styled-components";

import { Input, Button, Form, Row as AntRow, Col as AntCol, Grid } from "antd";

import NavSearch from "../General/NavSearch.jsx";

import axios from "axios";

import { v4 as uuidv4 } from "uuid";

const { TextArea } = Input;
const { useBreakpoint } = Grid;

const Header = styled.div`
  font-size: 36px;
  font-weight: bold;

  color: #000000;
`;

const InfoHeader = styled.div`
  font-size: 24px;
  font-weight: bold;

  color: #434343;
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
        <InternshipDetailForm
          buttonText={buttonText}
          title={title}
          onFinish={this.onFinish}
        />
      </React.Fragment>
    );
  }
}

/**
 * Still want to use React lifecycle functions and such so I will
 * temporarily plug in the functional component to a class-based container
 */
const InternshipDetailForm = (props) => {
  const { buttonText, title } = props;
  const screens = useBreakpoint();

  const isXs = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((breakpoint) => breakpoint[0])
    .includes("xs");

  const isLg = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((breakpoint) => breakpoint[0])
    .includes("lg");

  return (
    <div style={pageStyle}>
      <div className="global-container px-8 py-4" style={{ width: "100%" }}>
        {/**
         *
         * Listing Name
         *
         */}
        <Form {...FormProps.TotalForm} onFinish={props.onFinish}>
          <Header>Post Title</Header>
          <Form.Item {...FormProps.Title}>
            <Input
              size={isLg ? "large" : "middle"}
              placeholder="Edit Posting Name"
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
              size={isLg ? "large" : "middle"}
              placeholder="Post Description"
              autoSize={{ minRows: 5, maxRows: 10 }}
            />
          </Form.Item>

          {/**
           *
           * Location and Industries
           *
           */}
          <AntRow gutter={[32, 16]}>
            <AntCol span={12}>
              <InfoHeader>Location</InfoHeader>
              <Form.Item {...FormProps.Address}>
                <Input
                  size={isLg ? "large" : "middle"}
                  placeholder="Location here"
                />
              </Form.Item>
            </AntCol>
            <AntCol span={12}>
              <InfoHeader>Relevant Industries</InfoHeader>
              <Form.Item {...FormProps.Industries}>
                <Input size={isLg ? "large" : "middle"} placeholder="" />
              </Form.Item>
            </AntCol>
          </AntRow>

          {/**
           *
           * Additional Information
           *
           */}
          <InfoHeader>Additional Information</InfoHeader>
          <Form.Item {...FormProps.AdditionalInfo}>
            <TextArea
              size={isLg ? "large" : "middle"}
              autoSize={{ minRows: 5, maxRows: 10 }}
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
  );
};

export default InternshipDetails;
