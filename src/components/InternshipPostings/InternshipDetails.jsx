import React, { useEffect, useState } from "react";
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
  InputNumber,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import NavSearch from "../General/NavSearch.jsx";
import { Header, FormContainer } from "../Styled/FundamentalComponents";

import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Modal from "antd/lib/modal/Modal";

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

const filters = [
  "Age",
  "Course Levels",
  "Extracurriculars",
  "GPA (Unweighted)",
  "Grade",
  "Virtual or In Person",
];

const activityCategories = [
  "Academic",
  "Art",
  "Athletics-Club",
  "Athletics",
  "Career-Oriented",
  "Community Service",
  "Technology",
  "Cultural",
  "Dance",
  "Debate and Speech",
  "Environmental",
  "Family Responsibilities",
  "Foreign Exchange",
  "Journalism or Publication",
  "Junior R.O.T.C.",
  "LGBT",
  "Music-Instrumental",
  "Music-Vocal",
  "Religious",
  "Research",
  "Robotics",
  "School Spirit",
  "Science or Math",
  "Student Govt or Politics",
  "Theater or Drama",
  "Work (paid)",
  "Other Club/Activity",
];

const courseLevels = [
  "College Prep",
  "Standard",
  "Accelerated",
  "Advanced",
  "AP",
  "IB",
  "Enriched",
  "Gifted",
  "Honors",
  "High Honors",
  "College Level",
  "Other",
];

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
  const [isModalOn, toggleModal] = useState(false);
  const [isCriteriaOn, toggleCriteria] = useState({ on: false, criteria: "" });

  /**
   * Rerenders different inputs based on what criterias
   * the user is filtering by
   */
  const RenderCriteria = (props) => {
    switch (isCriteriaOn.criteria) {
      case "Age":
        return (
          <AntRow gutter={[32, 16]}>
            <AntCol xs={24} md={12}>
              <Form.Item>
                <Select
                  size="large"
                  className="universal-left"
                  style={{ width: "100%" }}
                >
                  <Option value="minimum">Minimum</Option>
                  <Option value="maximum">Maximum</Option>
                </Select>
              </Form.Item>
            </AntCol>
            <AntCol xs={24} md={12}>
              <Form.Item>
                <InputNumber
                  size="large"
                  style={{ width: "100%" }}
                  min={14}
                  max={100}
                />
              </Form.Item>
            </AntCol>
          </AntRow>
        );
      case "Course Levels":
        return (
          <Form.Item
            className="universal-left"
            extra="What types of courses would you want applicants to have participated in"
          >
            <Select mode="multiple" size="large">
              {courseLevels.map((activity) => (
                <Option value={activity}>{activity}</Option>
              ))}
            </Select>
          </Form.Item>
        );
      case "Extracurriculars":
        return (
          <Form.Item
            className="universal-left"
            extra="What extracurricular activities would you want applicants to have participated in"
          >
            <Select mode="multiple" size="large">
              {activityCategories.map((activity) => (
                <Option value={activity}>{activity}</Option>
              ))}
            </Select>
          </Form.Item>
        );
      case "GPA (Unweighted)":
        return (
          <Form.Item className="universal-left" extra="Minimum GPA">
            <InputNumber
              size="large"
              style={{ width: "100%" }}
              min={0}
              max={100}
            />
          </Form.Item>
        );
      case "Grade":
        return (
          <AntRow gutter={[32, 16]}>
            <AntCol xs={24} md={12}>
              <Form.Item>
                <Select
                  size="large"
                  className="universal-left"
                  style={{ width: "100%" }}
                >
                  <Option value="minimum">Minimum</Option>
                  <Option value="maximum">Maximum</Option>
                </Select>
              </Form.Item>
            </AntCol>
            <AntCol xs={24} md={12}>
              <Form.Item>
                <Select
                  size="large"
                  className="universal-left"
                  style={{ width: "100%" }}
                >
                  <Option value="9">Freshman</Option>
                  <Option value="10">Sophomore</Option>
                  <Option value="11">Junior</Option>
                  <Option value="12">Senior</Option>
                </Select>
              </Form.Item>
            </AntCol>
          </AntRow>
        );
      case "Virtual or In Person":
        return (
          <Form.Item>
            <Select
              size="large"
              className="universal-left"
              style={{ width: "100%" }}
            >
              <Option value="virtual">Virtual</Option>
              <Option value="in-person">In Person</Option>
              <Option value="both-virtual-and-in-person">
                Both Options Available
              </Option>
            </Select>
          </Form.Item>
        );
      default:
        return null;
    }
  };

  useEffect(() => {});

  return (
    <FormContainer>
      <PageHeader
        onBack={() => window.history.back()}
        title={
          <Link to="/internship-listings">
            <span style={{ fontWeight: "normal", color: "#262626" }}>
              Back to Postings
            </span>
          </Link>
        }
        style={{ position: "absolute", left: "3.5em", top: "1em" }}
      />
      {/**
       *
       * Listing Name
       *
       */}
      <Form {...FormProps.TotalForm} onFinish={props.onFinish}>
        <Header className="twentyEightFont universal-center mb-1" bolded>
          Create an Internship Posting
        </Header>

        <Header className="twentyFont mb-point-5" subheading>
          Job Title
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
          Job Description
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
              <Input size="large" placeholder="City, State" />
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
            <Header className="twentyFont mb-point-5 mt-point-5" subheading>
              Paid or Unpaid?
            </Header>
            <Form.Item>
              <Checkbox size="large">
                <span className="sixteenFont">This Internship is Paid</span>
              </Checkbox>
            </Form.Item>
          </AntCol>
        </AntRow>

        <AntRow gutter={[32, 16]}>
          <AntCol span={24}>
            <Header className="twentyFont" subheading>
              Add Candidate Filters
            </Header>
          </AntCol>
          <AntCol>
            <Button type="dashed" onClick={() => toggleModal(!isModalOn)}>
              Add a New Filter
            </Button>
          </AntCol>
        </AntRow>

        <Modal
          width="45%"
          onCancel={() => toggleModal(false)}
          visible={isModalOn}
          className="px-4 py-2 universal-center"
        >
          <Header className="twentyFourFont mb-2"> Edit Filter </Header>
          <Form>
            <AntRow gutter={[32, 16]}>
              <AntCol xs={24} lg={6} xl={5}>
                <Header className="twentyFont universal-left" subheading>
                  Filter by:
                </Header>
              </AntCol>
              <AntCol xs={24} lg={18} xl={19}>
                <Form.Item>
                  <Select
                    onChange={(value) =>
                      toggleCriteria({
                        ...isCriteriaOn,
                        on: true,
                        criteria: value,
                      })
                    }
                    className="universal-left"
                    size="large"
                    style={{ width: "100%" }}
                  >
                    {filters.map((criteria) => (
                      <Option value={criteria}>{criteria}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </AntCol>
            </AntRow>
            {isCriteriaOn.on && (
              <AntRow gutter={[32, 16]}>
                <AntCol xs={24} lg={6} xl={5}>
                  <Header className="twentyFont universal-left" subheading>
                    Criteria:
                  </Header>
                </AntCol>
                <AntCol xs={24} lg={18} xl={19}>
                  <RenderCriteria />
                </AntCol>
              </AntRow>
            )}
            {isCriteriaOn.on && (
              <AntRow gutter={[32, 16]}>
                <AntCol xs={24} lg={6} xl={5}>
                  <Header className="twentyFont universal-left" subheading>
                    Priority:
                  </Header>
                </AntCol>
                <AntCol xs={24} lg={18} xl={19}>
                  <Select
                    className="universal-left"
                    size="large"
                    style={{ width: "100%" }}
                  >
                    <Option value="high">High</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="low">Low</Option>
                  </Select>
                </AntCol>
              </AntRow>
            )}
          </Form>
        </Modal>
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
