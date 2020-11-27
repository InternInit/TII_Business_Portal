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
  Modal,
  Tooltip,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import NavSearch from "../General/NavSearch.jsx";
import {
  Header,
  FormContainer,
  FilterTag,
  RequiredAsterisk,
} from "../Styled/FundamentalComponents";

import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

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

const headerClassNames = "twentyFont mb-point-5";

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
    rules: [
      {
        required: true,
        message: "Please input your listing internship dates",
      },
    ],
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
  constructor(props) {
    super(props);

    this.state = { isNewListing: true };
  }
  formRef = React.createRef();

  componentDidMount() {
    if (!this.props.location.pathname.includes("add-listing")) {
      this.setState({ isNewListing: false });
      console.log(this.props);

      let listingData = this.props.listings.filter(
        (listing) => listing.Id === this.props.location.pathname.split("/")[2]
      )[0];
      try {
        listingData["Internship Dates"] = [
          moment(listingData["Internship Dates"][0]),
          moment(listingData["Internship Dates"][1]),
        ];
      } catch (e) {}
      this.formRef.current.setFieldsValue(listingData);
    }
  }

  onFinish = (values, allFilters) => {
    console.log(values);
    console.log(allFilters);
    values.Filters = allFilters;

    if (this.state.isNewListing === true) {
      let uuid = uuidv4();
      values.Id = uuid;
      this.props.addListing(JSON.parse(values));
    } else {
      values.Id = this.props.location.pathname.split("/")[2];
      this.props.updateListing(values.Id, values);
    }

    const headers = {
      headers: {
        Authorization: "Bearer " + this.props.id,
        ListingId: values.Id,
      },
    };

    axios
      .post("/api/update_internship_listings", values, headers)
      .then((response) => {
        console.log(JSON.parse(response.data));
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
              initialFilters={[
                {
                  "Filter By": "Age",
                  CriteriaRestriction: "Minimum",
                  Criteria: "12",
                  Priority: "High",
                },
              ]}
              buttonText={buttonText}
              title={title}
              formRef={this.formRef}
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
const InternshipDetailForm = ({
  buttonText,
  initialFilters,
  onFinish,
  title,
  formRef,
}) => {
  //Form Ref for the modal
  const [form] = Form.useForm();

  //Modal Toggle
  const [isModalOn, toggleModal] = useState(false);

  //Toggles customized input fields for each criteria
  const [isCriteriaOn, toggleCriteria] = useState({ on: false, criteria: "" });

  //Array of current filters
  const [postFilters, modifyPostFilters] = useState(initialFilters);

  //Hash table/Set of used options so that they won't re-appear
  const [trackFilled, updateFilled] = useState(new Set());

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
              <Form.Item name="CriteriaRestriction" key="criteriaRestriction">
                <Select
                  size="large"
                  className="universal-left"
                  style={{ width: "100%" }}
                >
                  <Option value="Minimum">Minimum</Option>
                  <Option value="Maximum">Maximum</Option>
                </Select>
              </Form.Item>
            </AntCol>
            <AntCol xs={24} md={12}>
              <Form.Item name="Criteria" key="criteria">
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
            name="Criteria"
            key="criteria"
            className="universal-left"
            extra="What types of courses would you want applicants to have participated in"
          >
            <Select mode="multiple" tokenSeparators={[" "]} size="large">
              {courseLevels.map((course) => (
                <Option value={course} disabled={trackFilled.has(course)}>
                  {course}
                </Option>
              ))}
            </Select>
          </Form.Item>
        );
      case "Extracurriculars":
        return (
          <Form.Item
            name="Criteria"
            key="criteria"
            className="universal-left"
            extra="What extracurricular activities would you want applicants to have participated in"
          >
            <Select mode="multiple" tokenSeparators={[" "]} size="large">
              {activityCategories.map((activity) => (
                <Option value={activity} disabled={trackFilled.has(activity)}>
                  {activity}
                </Option>
              ))}
            </Select>
          </Form.Item>
        );
      case "GPA (Unweighted)":
        return (
          <Form.Item
            name="Criteria"
            key="criteria"
            className="universal-left"
            extra="Minimum GPA"
          >
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
              <Form.Item name="CriteriaRestriction" key="criteriaRestriction">
                <Select
                  size="large"
                  className="universal-left"
                  style={{ width: "100%" }}
                >
                  <Option value="Minimum">Minimum</Option>
                  <Option value="Maximum">Maximum</Option>
                </Select>
              </Form.Item>
            </AntCol>
            <AntCol xs={24} md={12}>
              <Form.Item name="Criteria" key="criteria">
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
          <Form.Item name="Criteria" key="criteria">
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

  //Runs when the user adds a new filter
  const modalFinish = (values) => {
    console.log(values);
    form.resetFields();

    /**
     * If the user made a filter submission based on Extracurriculars
     * or Course Levels, the @var trackFilled in state will update
     * with whatever options were selected so it won't show them
     * to the user again
     */
    toggleCriteria({ on: false, criteria: "" });
    if (
      values["Filter By"] === "Extracurriculars" ||
      values["Filter By"] === "Course Levels"
    ) {
      updateFilled(new Set([...trackFilled, ...values.Criteria]));
    }

    //Adds the filter
    modifyPostFilters(() => [...postFilters, values]);
  };

  const removeItem = (removalIndex) => {
    /**
     * If the user removed a filter based on Extracurriculars
     * or Course Levels, the @var trackFilled in state will update
     * with whatever options were removed so it can show them
     * to the user again
     */
    if (
      postFilters[removalIndex]["Filter By"] === "Extracurriculars" ||
      postFilters[removalIndex]["Filter By"] === "Course Levels"
    ) {
      const itemsToReplace = postFilters[removalIndex].Criteria;
      const copyOfFilled = new Set([...trackFilled]);
      itemsToReplace.forEach((item) => copyOfFilled.delete(item));
      updateFilled(copyOfFilled);
    }

    //Removes the fiven filter
    modifyPostFilters(
      postFilters.filter((filter, index) => index !== removalIndex)
    );
  };

  return (
    <FormContainer>
      <PageHeader
        onBack={() => window.history.back()}
        style={{ position: "absolute", left: "3.5em", top: "1em" }}
        title={
          <Link
            to="/internship-listings"
            style={{ fontWeight: "normal", color: "#262626" }}
          >
            Back to Postings
          </Link>
        }
      />
      {/**
       *
       * Listing Name
       *
       */}
      <Form
        {...FormProps.TotalForm}
        ref={formRef}
        onFinish={(values) => onFinish(values, postFilters)}
      >
        <Header className="twentyEightFont universal-center mb-1" bolded>
          Create an Internship Posting
        </Header>

        <Header className={headerClassNames} subheading>
          Job Title <RequiredAsterisk>*</RequiredAsterisk>
        </Header>
        <Form.Item {...FormProps.Title}>
          <Input size="large" placeholder="Edit Posting Name" />
        </Form.Item>

        {/**
         *
         * Post Description
         *
         */}
        <Header className={headerClassNames} subheading>
          Job Description <RequiredAsterisk>*</RequiredAsterisk>
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
            <Header className={headerClassNames} subheading>
              Location <RequiredAsterisk>*</RequiredAsterisk>
            </Header>
            <Form.Item {...FormProps.Address}>
              <Input size="large" placeholder="City, State" />
            </Form.Item>
          </AntCol>

          <AntCol xs={24} md={12}>
            <Header className={headerClassNames} subheading>
              Relevant Industry <RequiredAsterisk>*</RequiredAsterisk>
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
            <Header className={headerClassNames} subheading>
              Internship Dates <RequiredAsterisk>*</RequiredAsterisk>
            </Header>
            <Form.Item {...FormProps.InternshipDates}>
              <DatePicker.RangePicker size="large" style={{ width: "100%" }} />
            </Form.Item>
          </AntCol>
          <AntCol xs={24} lg={8}>
            <Header className={headerClassNames} subheading>
              Available Work Days <RequiredAsterisk>*</RequiredAsterisk>
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
            <Header className={headerClassNames} subheading>
              Available Work Times <RequiredAsterisk>*</RequiredAsterisk>
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
        <Header className={headerClassNames} subheading>
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
              Paid or Unpaid? <RequiredAsterisk>*</RequiredAsterisk>
            </Header>
            <Form.Item>
              <Checkbox size="large">
                <span className="sixteenFont">This Internship is Paid</span>
              </Checkbox>
            </Form.Item>
          </AntCol>
        </AntRow>

        <AntRow gutter={[16, 16]}>
          <AntCol span={24}>
            <Header className="twentyFont" subheading>
              Add Candidate Filters
            </Header>
          </AntCol>
          {postFilters.length > 0 &&
            postFilters.map((filter, index) => (
              <AntCol>
                <Tooltip
                  title={
                    filter.Criteria.length >= 4
                      ? filter.Criteria.map((val, index) =>
                          index !== filter.Criteria.length - 1
                            ? " " + val
                            : null
                        ) +
                        " " +
                        filter.Criteria[filter.Criteria.length - 1]
                      : null
                  }
                >
                  <FilterTag
                    className="fourteenFont pl-1-5 pr-point-75 universal-middle universal-center"
                    color={filter.Priority}
                  >
                    {filter["Filter By"]} -
                    {filter.CriteriaRestriction
                      ? " " + filter.CriteriaRestriction
                      : filter["Filter By"] === "GPA (Unweighted)"
                      ? " Minimum"
                      : null}{" "}
                    {Array.isArray(filter.Criteria)
                      ? filter.Criteria.length < 4
                        ? filter.Criteria.map((val, index) =>
                            index !== filter.Criteria.length - 1
                              ? " " + val
                              : null
                          ) +
                          " " +
                          filter.Criteria[filter.Criteria.length - 1]
                        : filter.Criteria.slice(0, 2).map((val) => ` ${val}`) +
                          ", " +
                          filter.Criteria[2] +
                          "..."
                      : " " + filter.Criteria}
                    <CloseOutlined
                      className="ml-1-2"
                      style={{ fontSize: "10px" }}
                      onClick={() => removeItem(index)}
                    />
                  </FilterTag>
                </Tooltip>
              </AntCol>
            ))}
          <AntCol>
            <Button type="dashed" onClick={() => toggleModal(!isModalOn)}>
              Add a New Filter
            </Button>
          </AntCol>
        </AntRow>

        {/**
         *
         * Edit Filter Modal
         *
         */}

        <Modal
          width="45%"
          onCancel={() => {
            form.resetFields();
            toggleModal(false);
          }}
          onOk={() => {
            form.submit();
            toggleModal(false);
          }}
          okText="Create"
          okButtonProps={{ htmlType: "submit" }}
          visible={isModalOn}
          className="px-4 py-2 universal-center"
        >
          <Header className="twentyFourFont mb-2"> Edit Filter </Header>
          <Form name="edit-filters" form={form} onFinish={modalFinish}>
            <AntRow gutter={[32, 16]}>
              <AntCol xs={24} lg={6} xl={5}>
                <Header className="twentyFont universal-left" subheading>
                  Filter by:
                </Header>
              </AntCol>
              <AntCol xs={24} lg={18} xl={19}>
                <Form.Item name="Filter By" key="filterBy">
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
                  <Form.Item name="Priority" key="priority">
                    <Select
                      className="universal-left"
                      size="large"
                      style={{ width: "100%" }}
                    >
                      <Option value="High">High</Option>
                      <Option value="Medium">Medium</Option>
                      <Option value="Low">Low</Option>
                    </Select>
                  </Form.Item>
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
