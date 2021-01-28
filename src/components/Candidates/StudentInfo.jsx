import React, { useState } from "react";
import { Row as AntRow, Col as AntCol, Breadcrumb } from "antd";
import { Transition, config } from "react-spring/renderprops";

import {
  InnerContainer,
  TabContainer,
  TabOutlineContainer,
  Header,
  Caption,
  BorderlessTag,
} from "../Styled/FundamentalComponents.jsx";
import _ from "underscore";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FaChalkboardTeacher, FaRegMap } from "react-icons/fa";
import { RiSuitcaseLine } from "react-icons/ri";
import { GrDocumentText } from "react-icons/gr";
import { BiBook, BiBuildings, BiPhone } from "react-icons/bi";
import { FiUsers, FiMail } from "react-icons/fi";
import { AiOutlineFileText } from "react-icons/ai";
import { Link } from "react-router-dom";
import SmartAvatar from "../General/SmartAvatar";

const mapStateToProps = (state) => {
  return {
    companyInfo: state.companyInfo,
    loadingStatuses: state.loadingStatuses,
  };
};

const StudentInfo = (props) => {
  const { id } = props.match.params;

  const [loadStudent, changeStudent] = useState(
    _.find(props.companyInfo.candidates, (student) => student.Id === id)
  );

  if (!props.loadingStatuses.isCandidateLoading) {
    //Loading logic is now handled with redux ^^^

    const student = loadStudent.formData;

    return (
      <AntRow className="py-2" justify="center" style={{ width: "100%" }}>
        <Transition
          items={props.location.pathname}
          from={{ opacity: 0.5, transform: "translateY(20px)" }}
          enter={{ opacity: 1, transform: "translateY(0px)" }}
          leave={{ opacity: 1 }}
          config={config.stiff}
        >
          {(location) => (props) => (
            <InnerContainer key="studentInfoContainer" style={{ ...props }}>
              <Breadcrumb style={{ paddingBottom: "1em" }}>
                <Breadcrumb.Item className="twentyFont">
                  <Link to="/applicants/review-applicants">
                    Review Applicants
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item className="twentyFont">
                  {student[0]["First Name"]}'s Application
                </Breadcrumb.Item>
              </Breadcrumb>
              <TabContainer className="px-6 py-3 student-info-responsive-tab-container">
                <AntRow gutter={[48, 0]}>
                  <AntCol className="px-2" sm={8} lg={6}>
                    <AntRow justify="center">
                      <SmartAvatar
                        fontSize={"sixtyFourFont"}
                        size={300}
                        name={student[0]["First Name"]}
                      />
                    </AntRow>
                    <AntRow justify="center">
                      <Header
                        className="twentyEightFont mt-1 mb-point-5"
                        color="#002766"
                        bolded
                      >
                        Contact
                      </Header>
                    </AntRow>
                    <AntRow className="mb-point-5">
                      <Header className="sixteenFont" bolded>
                        Full Name:{" "}
                        <Caption className="sixteenFont">
                          {student[0]["First Name"]} {student[0]["Last Name"]}
                        </Caption>
                      </Header>
                    </AntRow>
                    <AntRow className="mb-point-5">
                      <Header className="sixteenFont" bolded>
                        Phone:{" "}
                        <Caption className="sixteenFont">
                          {student[0]["Phone Number"]}
                        </Caption>
                      </Header>
                    </AntRow>
                    <AntRow className="mb-point-5">
                      <Header className="sixteenFont" bolded>
                        Email:{" "}
                        <Caption className="sixteenFont">
                          {student[0]["Email"]}
                        </Caption>
                      </Header>
                    </AntRow>
                    <AntRow className="mb-point-5">
                      <Header className="sixteenFont" bolded>
                        Address:{" "}
                        <Caption className="sixteenFont">
                          {student[0]["Address"]}
                        </Caption>
                      </Header>
                    </AntRow>
                    <AntRow className="mb-point-5">
                      <Header className="sixteenFont" bolded>
                        City:{" "}
                        <Caption className="sixteenFont">
                          {student[0]["City"]}
                        </Caption>
                      </Header>
                    </AntRow>
                    <AntRow className="mb-point-5">
                      <Header className="sixteenFont" bolded>
                        State:{" "}
                        <Caption className="sixteenFont">
                          {student[0]["State"]}
                        </Caption>
                      </Header>
                    </AntRow>
                    <AntRow justify="center">
                      <Header
                        className="twentyEightFont mt-1 mb-point-5"
                        color="#002766"
                        bolded
                      >
                        Personal
                      </Header>
                    </AntRow>
                    <AntRow className="mb-point-5">
                      <Header className="sixteenFont" bolded>
                        Age:{" "}
                        <Caption className="sixteenFont">
                          {student[1]["Age"]}
                        </Caption>
                      </Header>
                    </AntRow>
                    <AntRow className="mb-point-5">
                      <Header className="sixteenFont" bolded>
                        Gender:{" "}
                        <Caption className="sixteenFont">
                          {student[1]["Gender"]}
                        </Caption>
                      </Header>
                    </AntRow>
                    <AntRow className="mb-point-5">
                      <Header className="sixteenFont" bolded>
                        Race:{" "}
                        <Caption className="sixteenFont">
                          {student[0]["race"]
                            ? student[0]["race"]
                            : "Not filled"}
                        </Caption>
                      </Header>
                    </AntRow>
                    <AntRow className="mb-point-5">
                      <Header className="sixteenFont" bolded>
                        Grade:{" "}
                        <Caption className="sixteenFont">
                          {student[0]["Grade"]
                            ? student[0]["Grade"]
                            : "Not filled"}
                        </Caption>
                      </Header>
                    </AntRow>
                    <AntRow className="mb-point-5">
                      <Header className="sixteenFont" bolded>
                        Year of Graduation:{" "}
                        <Caption className="sixteenFont">
                          {student[0]["Year of Graduation"]}
                        </Caption>
                      </Header>
                    </AntRow>
                    <AntRow justify="center">
                      <Header
                        className="twentyEightFont mt-1 mb-point-5"
                        color="#002766"
                        bolded
                      >
                        Files
                      </Header>
                    </AntRow>
                    <AntRow>
                      <AntCol span={8}>
                        <FileCard title="Resume" />
                      </AntCol>
                      <AntCol span={8}>
                        <FileCard title="Resume" />
                      </AntCol>
                    </AntRow>
                  </AntCol>
                  <AntCol sm={16} lg={18}>
                    <AntRow>
                      <Header className="thirtySixFont" color="#002766" bolded>
                        {student[0]["First Name"]} {student[0]["Last Name"]}
                      </Header>
                    </AntRow>
                    {/**
                     * @TODO
                     *  - Phase out negative margins
                     */}
                    <AntRow style={{ marginTop: "-5px" }}>
                      <Caption className="twentyFont" light thin>
                        {loadStudent.appliedFor
                          ? loadStudent.appliedFor
                          : "Social Media Intern Placeholder"}
                      </Caption>
                    </AntRow>
                    <AntRow className="pt-2 student-info-header" align="middle">
                      <RiSuitcaseLine className="student-info-icon" />
                      <Header className="twentyFourFont" color="#002766" bolded>
                        Internship Information
                      </Header>
                    </AntRow>
                    <AntRow className="mt-1">
                      <AntCol sm={8} lg={4}>
                        <Header className="sixteenFont" bolded>
                          Available Dates:
                        </Header>
                      </AntCol>
                      <AntCol sm={16} lg={20}>
                        <Caption className="sixteenFont" bolded>
                          {student[0]["Starting/Ending Dates Formatted"][0] +
                            " - " +
                            student[0]["Starting/Ending Dates Formatted"][1]}
                        </Caption>
                      </AntCol>
                    </AntRow>
                    <AntRow className="mt-1">
                      <AntCol sm={8} lg={4}>
                        <Header className="sixteenFont" bolded>
                          Available Days:
                        </Header>
                      </AntCol>
                      <AntCol sm={16} lg={20}>
                        <Caption className="sixteenFont" bolded>
                          {student[0]["Willing Work Days"].length > 1
                            ? student[0]["Willing Work Days"]
                                .slice(
                                  0,
                                  student[0]["Willing Work Days"].length - 1
                                )
                                .map((day) => ` ${day}`) +
                              ", " +
                              student[0]["Willing Work Days"][
                                student[0]["Willing Work Days"].length - 1
                              ]
                            : student[0]["Willing Work Days"]}
                        </Caption>
                      </AntCol>
                    </AntRow>
                    <AntRow className="mt-1">
                      <AntCol sm={8} lg={4}>
                        <Header className="sixteenFont" bolded>
                          Available Times:
                        </Header>
                      </AntCol>
                      <AntCol sm={16} lg={20}>
                        <Caption className="sixteenFont" bolded>
                          {student[0]["Willing Work Times"].length > 1
                            ? student[0]["Willing Work Times"]
                                .slice(
                                  0,
                                  student[0]["Willing Work Times"].length - 1
                                )
                                .map((time) => ` ${time}`) +
                              ", " +
                              student[0]["Willing Work Times"][
                                student[0]["Willing Work Times"].length - 1
                              ]
                            : student[0]["Willing Work Times"]}
                        </Caption>
                      </AntCol>
                    </AntRow>
                    <AntRow className="mt-1">
                      <AntCol sm={8} lg={4}>
                        <Header className="sixteenFont" bolded>
                          Applied For:
                        </Header>
                      </AntCol>
                      <AntCol sm={16} lg={20}>
                        <Caption className="sixteenFont" bolded>
                          {loadStudent.appliedFor
                            ? loadStudent.appliedFor
                            : "Placeholder"}
                        </Caption>
                      </AntCol>
                    </AntRow>
                    <AntRow className="mt-1">
                      <AntCol sm={8} lg={4}>
                        <Header className="sixteenFont" bolded>
                          Pay Preference:
                        </Header>
                      </AntCol>
                      <AntCol sm={16} lg={20}>
                        <Caption className="sixteenFont" bolded>
                          {student[0]["Paid/Unpaid Preference"] === "Yes"
                            ? "Paid"
                            : "No Preference"}
                        </Caption>
                      </AntCol>
                    </AntRow>
                    <AntRow
                      className="pt-2 mb-1 student-info-header"
                      align="middle"
                    >
                      <BiBook className="student-info-icon" />
                      <Header className="twentyFourFont" color="#002766" bolded>
                        Education
                      </Header>
                    </AntRow>
                    {student[1]["Education"].map((school) => (
                      <SchoolCard school={school} />
                    ))}
                    <AntRow
                      className="pt-2 mb-1 student-info-header"
                      align="middle"
                    >
                      <FaChalkboardTeacher className="student-info-icon" />
                      <Header className="twentyFourFont" color="#002766" bolded>
                        Relevant Courses
                      </Header>
                    </AntRow>
                    <AntRow>
                      <Header className="eighteenFont" color="#002766" bolded>
                        Course Title
                      </Header>
                    </AntRow>
                    {student[3]["Courses"].map((course) => (
                      <CourseRow
                        course={course.courseTitle}
                        level={course.courseLevel}
                      />
                    ))}
                    <AntRow
                      className="pt-2 mb-1 student-info-header"
                      align="middle"
                    >
                      <FaRegMap className="student-info-icon" />
                      <Header className="twentyFourFont" color="#002766" bolded>
                        Extracurricular Activities
                      </Header>
                    </AntRow>
                    {student[3]["Extracurriculars"].map((activity) => (
                      <ExtracurricularCard activity={activity} />
                    ))}
                    <AntRow
                      className="pt-2 mb-1 student-info-header"
                      align="middle"
                    >
                      <GrDocumentText className="student-info-icon" />
                      <Header className="twentyFourFont" color="#002766" bolded>
                        Essays
                      </Header>
                    </AntRow>
                    <AntRow>
                      <Header className="eighteenFont" color="#002766" bolded>
                        What industries are you interested in and why?
                      </Header>
                    </AntRow>
                    <AntRow className="mb-1">
                      <Caption className="fourteenFont" left>
                        {student[2]["Why This Industry Essay"]}
                      </Caption>
                    </AntRow>
                    <AntRow>
                      <Header className="eighteenFont" color="#002766" bolded>
                        What are your leadership roles in your extracurriculars
                        and what have they taught you?
                      </Header>
                    </AntRow>
                    <AntRow className="mb-1">
                      <Caption className="fourteenFont" left>
                        {student[2]["Leadership Roles Essay"]}
                      </Caption>
                    </AntRow>
                    {student[2]["Extra Essay"] && (
                      <>
                        <AntRow>
                          <Header
                            className="eighteenFont"
                            color="#002766"
                            bolded
                          >
                            Additional Information
                          </Header>
                        </AntRow>
                        <AntRow className="mb-1">
                          <Caption className="fourteenFont" left>
                            {student[2]["Extra Essay"]}
                          </Caption>
                        </AntRow>
                      </>
                    )}
                    <AntRow
                      className="pt-2 mb-1 student-info-header"
                      align="middle"
                    >
                      <FiUsers className="student-info-icon" />
                      <Header className="twentyFourFont" color="#002766" bolded>
                        References
                      </Header>
                    </AntRow>
                    {student[4].Reference.map((reference) => (
                      <ReferenceCard reference={reference} />
                    ))}
                  </AntCol>
                </AntRow>
              </TabContainer>
            </InnerContainer>
          )}
        </Transition>
      </AntRow>
    );
  } else {
    return null;
  }
};

const SchoolCard = (props) => {
  return (
    <AntRow>
      <TabOutlineContainer className="px-4 py-1 my-point-5">
        <AntRow justify="space-between">
          <AntCol>
            <Header className="eighteenFont" color="#002766">
              {props.school.Name}
            </Header>
          </AntCol>
          {/**
           * @TODO
           * - Replace the years completed with the actual timeline of how long they were at the school
           */}
          <AntCol>
            <Header className="eighteenFont" color="#002766">
              {props.school["Years Completed"]} Years
            </Header>
          </AntCol>
        </AntRow>
        <AntRow className="mb-point-5" style={{ marginTop: "-5px" }}>
          <Caption className="fourteenFont" light>
            {props.school.City}, {props.school.State}
          </Caption>
        </AntRow>
        <AntRow>
          <Header className="fourteenFont" bolded>
            Course Interests:{" "}
            <Caption className="fourteenFont">
              {props.school["Course Concentration"]}
            </Caption>
          </Header>
        </AntRow>
      </TabOutlineContainer>
    </AntRow>
  );
};

const ExtracurricularCard = (props) => {
  const mapColors = (activity) => {
    switch (activity.charAt(0)) {
      case "A":
        return { background: "#fff2e8", text: "#fa541c" };
      case "C":
        return { background: "#fffbe6", text: "#faad14" };
      case "D":
      case "E":
      case "F":
        return { background: "#fcffe6", text: "#a0d911" };
      case "J":
      case "L":
      case "M":
        return { background: "#e6fffb", text: "#13c2c2" };
      case "R":
        return { background: "#f0f5ff", text: "#2f54eb" };
      case "S":
        return { background: "#f9f0ff", text: "#722ed1" };
      default:
        return { background: "#fff0f6", text: "#eb2f96" };
    }
  };

  return (
    <AntRow>
      <TabOutlineContainer className="px-4 py-1-5 my-point-5">
        <AntRow justify="space-between">
          <AntCol>
            <Header className="eighteenFont" color="#002766">
              {props.activity.activityName}
            </Header>
          </AntCol>
          {/**
           * @TODO
           * - Replace the years completed with the actual timeline of how long they were at the school
           */}
          <AntCol>
            <Header className="eighteenFont" color="#002766">
              {props.activity.yearsInvolved} Years
            </Header>
          </AntCol>
        </AntRow>
        <AntRow className="mb-point-5" style={{ marginTop: "-5px" }}>
          <Caption className="fourteenFont" light>
            {props.activity["Position/Title"]}
          </Caption>
        </AntRow>
        <AntRow>
          <Caption className="fourteenFont" left>
            {props.activity.Description}
          </Caption>
        </AntRow>
        <AntRow>
          <BorderlessTag
            className="px-1-5 mt-1"
            color={mapColors(props.activity.activityType).text}
            background={mapColors(props.activity.activityType).background}
          >
            {props.activity.activityType}
          </BorderlessTag>
        </AntRow>
      </TabOutlineContainer>
    </AntRow>
  );
};

const ReferenceCard = (props) => {
  return (
    <AntRow>
      <TabOutlineContainer className="px-4 py-1-5 my-point-5">
        <AntRow>
          <AntCol className="universal-middle" span={7}>
            <AntRow>
              <Header className="eighteenFont" color="#002766">
                {props.reference["First Name"]} {props.reference["Last Name"]}
              </Header>
            </AntRow>
            <AntRow>
              <Caption className="fourteenFont" light thin>
                {props.reference.Title}
              </Caption>
            </AntRow>
          </AntCol>
          <AntCol
            className="pl-3"
            span={17}
            style={{ borderLeft: "2px solid #F0F0F0" }}
          >
            <AntRow className="mb-point-5">
              <BiBuildings className="reference-card-icon" />{" "}
              <Caption className="fourteenFont">
                {props.reference["School/Company"]}
              </Caption>
            </AntRow>
            <AntRow className="mb-point-5">
              <BiPhone className="reference-card-icon" />
              <Caption className="fourteenFont">
                {props.reference["Phone Number"]}
              </Caption>
            </AntRow>
            <AntRow className="mb-point-5">
              <FiMail className="reference-card-icon" />
              <Caption className="fourteenFont">
                {props.reference.Email}
              </Caption>
            </AntRow>
          </AntCol>
        </AntRow>
      </TabOutlineContainer>
    </AntRow>
  );
};

const FileCard = (props) => {
  return (
    <a
      href={`http://tii-intern-media.s3-website-us-east-1.amazonaws.com/fake-resume/fake-resume.pdf`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="file-card">
        <AntRow className="mb-point-25" justify="center">
          <div className="file-card-container">
            <AntRow className="py-point-5 px-1">
              <AiOutlineFileText className="file-card-icon" />
            </AntRow>
          </div>
        </AntRow>
        <AntRow justify="center">
          <Caption className="twelveFont file-card-title">
            {props.title}
          </Caption>
        </AntRow>
      </div>
    </a>
  );
};

const CourseRow = (props) => {
  return (
    <AntRow style={{ borderBottom: "1px solid #F5F5F5" }}>
      <Caption className="py-point-5 sixteenFont">
        {props.course} ({props.level})
      </Caption>
    </AntRow>
  );
};

export default withRouter(connect(mapStateToProps)(StudentInfo));
