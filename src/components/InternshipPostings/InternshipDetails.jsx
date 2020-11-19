import React, { useEffect } from "react";
import styled from "styled-components";

import {
  Input,
  Select,
  Button,
  Form,
  Row as AntRow,
  Col as AntCol,
  Grid,
  Breadcrumb,
  PageHeader,
  DatePicker,
  Checkbox,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import NavSearch from "../General/NavSearch.jsx";
import { Header, FormContainer } from "../Styled/FundamentalComponents";

import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const { TextArea } = Input;
const { Option, OptGroup } = Select;
const { useBreakpoint } = Grid;

const industries = {
  Business: [
    "General Business",
    "Accounting",
    "Consulting",
    "Finance",
    "Hospitality/Tourism",
    "Insurance",
    "Marketing",
    "Operations",
    "Real Estate",
  ],
  "Science and Engineering": [
    "Computer Science",
    "Engineering",
    "Science Research",
  ],
  Healthcare: ["Medical", "Pharmaceutical"],
  "The Arts": ["Art", "Fashion", "Graphic Design"],
  Communications: ["Journalism", "Media"],
  "Law, Politics, and Education": [
    "Legal",
    "Nonprofit",
    "Politics",
    "Education",
  ],
  Vocational: ["Vocational"],
  Research: ["Research"],
};

const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const timesOfTheDay = ["Mornings", "Afternoons", "Evenings"];

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
const validationRules = (required, inputName, type = "string", pattern) => [
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
  Industries: {
    key: "industries",
    name: "Industries",
    rules: validationRules(true, "relevant industries", "string"),
  },
  InternshipDates: {
    key: "internshipDates",
    name: "Internship Dates",
    rules: validationRules(true, "internship dates"),
  },
  AvailableWorkDays: {
    key: "availableWorkDays",
    name: "Available Work Days",
  },
  AvailableWorkTimes: {
    key: "availableWorkTimes",
    name: "Available Work Times",
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
          <div className="global-container px-8 py-2" style={{ width: "100%" }}>
            <Breadcrumb style={{ paddingBottom: "1em" }}>
              <Breadcrumb.Item className="twentyFont">
                <Link to="/internship-listings">Internship Postings</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item className="twentyFont">
                {this.props.location.pathname.includes("add-listing")
                  ? "Create Posting"
                  : "My Post"}
              </Breadcrumb.Item>
            </Breadcrumb>

            <InternshipDetailForm
              buttonText={buttonText}
              title={title}
              onFinish={this.onFinish}
            />
          </div>
        </div>
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

  useEffect(() => {
    console.log("Rendered");
  });

  return (
    <FormContainer>
      <PageHeader
        onBack={() => window.history.back()}
        title="Back to Postings"
        style={{ position: "absolute", left: "1.5em", top: "1em" }}
      />
      {/**
       *
       * Listing Name
       *
       */}
      <Form {...FormProps.TotalForm} onFinish={props.onFinish}>
        <Header className="thirtySixFont universal-center mb-1">
          Post Title
        </Header>
        <Form.Item {...FormProps.Title}>
          <Input size="large" placeholder="Edit Posting Name" />
        </Form.Item>

        {/**
         *
         * Post Description
         *
         */}
        <Header className="twentyFont mb-point-5" subheading>
          Post Description
        </Header>
        <Form.Item {...FormProps.Description}>
          <TextArea
            size="large"
            placeholder="Post Description"
            autoSize={{ minRows: 5, maxRows: 10 }}
            style={{ fontSize: "16px" }}
          />
        </Form.Item>

        {/**
         *
         * Location and Industries
         *
         */}
        <AntRow gutter={[32, 16]}>
          <AntCol xs={24} md={12}>
            <Header className="twentyFont mb-point-5" subheading>
              Location
            </Header>
            <Form.Item {...FormProps.Address}>
              <Input size="large" placeholder="Location here" />
            </Form.Item>
          </AntCol>
          <AntCol xs={24} md={12}>
            <Header className="twentyFont mb-point-5" subheading>
              Relevant Industry
            </Header>
            <Form.Item {...FormProps.Industries}>
              <Select size="large" style={{ width: "100%" }}>
                {Object.keys(industries).map((key) => (
                  <OptGroup label={key}>
                    {industries[key].map((industry) => (
                      <Option value={industry}>{industry}</Option>
                    ))}
                  </OptGroup>
                ))}
              </Select>
            </Form.Item>
          </AntCol>
        </AntRow>

        <AntRow gutter={[32, 16]}>
          <AntCol xs={24} lg={8}>
            <Header className="twentyFont mb-point-5" subheading>
              Internship Dates
            </Header>
            <Form.Item {...FormProps.InternshipDates}>
              <DatePicker.RangePicker size="large" style={{ width: "100%" }} />
            </Form.Item>
          </AntCol>
          <AntCol xs={24} lg={8}>
            <Header className="twentyFont mb-point-5" subheading>
              Available Work Days
            </Header>
            <Form.Item
              {...FormProps.AvailableWorkDays}
              rules={[
                {
                  required: true,
                  message: "Please input your available work days",
                },
              ]}
            >
              <Select mode="multiple" size="large" style={{ width: "100%" }}>
                {daysOfTheWeek.map((day) => (
                  <Option value={day}>{day}</Option>
                ))}
              </Select>
            </Form.Item>
          </AntCol>
          <AntCol xs={24} lg={8}>
            <Header className="twentyFont mb-point-5" subheading>
              Available Work Times
            </Header>
            <Form.Item
              {...FormProps.AvailableWorkTimes}
              rules={[
                {
                  required: true,
                  message: "Please input your available work times",
                },
              ]}
            >
              <Select mode="multiple" size="large" style={{ width: "100%" }}>
                {timesOfTheDay.map((time) => (
                  <Option value={time}>{time}</Option>
                ))}
              </Select>
            </Form.Item>
          </AntCol>
        </AntRow>

        {/**
         *
         * Additional Information
         *
         */}
        <Header className="twentyFont mb-point-5" subheading>
          Additional Information
        </Header>
        <Form.Item {...FormProps.AdditionalInfo}>
          <TextArea
            size="large"
            autoSize={{ minRows: 3, maxRows: 10 }}
            style={{ fontSize: "16px" }}
          />
        </Form.Item>

        <AntRow gutter={[32, 16]}>
          <AntCol>
            <Checkbox size="large">
              <span className="sixteenFont">This Internship is Paid</span>
            </Checkbox>
          </AntCol>
        </AntRow>

        <AntRow gutter={[32, 16]}>
          <AntCol>
            <Header className="twentyFont mb-point-5 mt-point-5" subheading>
              Add Filters
            </Header>
          </AntCol>
        </AntRow>
        {/**
         *
         * Save Changes Button
         *
         */}
        <div style={buttonStyle}>
          <Button
            type="primary"
            size="large"
            style={{ width: "36vh" }}
            htmlType="submit"
          >
            {buttonText}
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default withRouter(InternshipDetails);
