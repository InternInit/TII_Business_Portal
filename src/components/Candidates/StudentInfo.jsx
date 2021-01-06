import React, { useState } from "react";
import { Row as AntRow, Col as AntCol, Avatar } from "antd";
import {
  InnerContainer,
  TabContainer,
  TabOutlineContainer,
  Header,
  Caption,
} from "../Styled/FundamentalComponents.jsx";
import _ from "underscore";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RiSuitcaseLine } from "react-icons/ri";
import { BiBook } from "react-icons/bi";

const mapStateToProps = (state) => {
  return {
    companyInfo: state.companyInfo,
  };
};

const StudentInfo = (props) => {
  const { id } = props.match.params;
  
  const [student, changeStudent] = useState(
    _.find(props.companyInfo.candidates, (student) => student.Id === id)
  );

  if (student) {
    return (
      <AntRow className="py-2" justify="center" style={{ width: "100%" }}>
        <InnerContainer>
          <TabContainer className="px-6 py-3">
            <AntRow gutter={[48, 0]}>
              <AntCol className="px-2" span={6}>
                <AntRow justify="center">
                  <Avatar
                    size={225}
                    src="https://i.kym-cdn.com/entries/icons/original/000/016/546/hidethepainharold.jpg"
                  ></Avatar>
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
                      {student.formData["0"]["First Name"]} {student.formData["0"]["Last Name"]}
                    </Caption>
                  </Header>
                </AntRow>
                <AntRow className="mb-point-5">
                  <Header className="sixteenFont" bolded>
                    Phone:{" "}
                    <Caption className="sixteenFont">
                      {student.formData["0"]["Phone Number"]}
                    </Caption>
                  </Header>
                </AntRow>
                <AntRow className="mb-point-5">
                  <Header className="sixteenFont" bolded>
                    Email:{" "}
                    <Caption className="sixteenFont">
                      {student.formData["0"].Email}
                    </Caption>
                  </Header>
                </AntRow>
                <AntRow className="mb-point-5">
                  <Header className="sixteenFont" bolded>
                    Address:{" "}
                    <Caption className="sixteenFont">
                      {student.formData["0"].Address}
                    </Caption>
                  </Header>
                </AntRow>
                <AntRow className="mb-point-5">
                  <Header className="sixteenFont" bolded>
                    City:{" "}
                    <Caption className="sixteenFont">
                      {student.formData["0"].City}
                    </Caption>
                  </Header>
                </AntRow>
                <AntRow className="mb-point-5">
                  <Header className="sixteenFont" bolded>
                    State:{" "}
                    <Caption className="sixteenFont">
                      {student.formData["0"].State}
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
                    State:{" "}
                    <Caption className="sixteenFont">
                      {student.formData["1"].Age}
                    </Caption>
                  </Header>
                </AntRow>
                <AntRow className="mb-point-5">
                  <Header className="sixteenFont" bolded>
                    Gender:{" "}
                    <Caption className="sixteenFont">
                      {student.formData["1"].Gender}
                    </Caption>
                  </Header>
                </AntRow>
                <AntRow className="mb-point-5">
                  <Header className="sixteenFont" bolded>
                    Race:{" "}
                    <Caption className="sixteenFont">
                      {student.formData["1"].Race ? student.formData["1"].Race : "Not filled"}
                    </Caption>
                  </Header>
                </AntRow>
                <AntRow className="mb-point-5">
                  <Header className="sixteenFont" bolded>
                    Grade:{" "}
                    <Caption className="sixteenFont">
                      {student.formData.Grade ? student.formData.Grade : "Not filled"}
                    </Caption>
                  </Header>
                </AntRow>
                <AntRow className="mb-point-5">
                  <Header className="sixteenFont" bolded>
                    Year of Graduation:{" "}
                    <Caption className="sixteenFont">
                      {student.formData["0"]["Year of Graduation"]}
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
              </AntCol>
              <AntCol span={18}>
                <AntRow>
                  <Header className="thirtySixFont" color="#002766" bolded>
                    {student.formData["0"]["First Name"]} {student.formData["0"]["Last Name"]}
                  </Header>
                </AntRow>
                {/**
                 * @TODO
                 *  - Phase out negative margins
                 */}
                <AntRow style={{ marginTop: "-5px" }}>
                  <Caption className="twentyFont" light thin>
                    {student.position
                      ? student.position
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
                  <AntCol span={4}>
                    <Header className="sixteenFont" bolded>
                      Available Dates:
                    </Header>
                  </AntCol>
                  <AntCol span={20}>
                    {/*TODO: @Tejas iterate through formdata to transform datetime like how it is with assoc data */}
                    <Caption className="sixteenFont" bolded>
                      {new Date(
                        student.formData["0"]["Starting/Ending Dates"][0]
                      ).getMonth()}
                      /
                      {new Date(
                        student.formData["0"]["Starting/Ending Dates"][0]
                      ).getDate()}
                      /
                      {new Date(
                        student.formData["0"]["Starting/Ending Dates"][0]
                      ).getFullYear()}{" "}
                      -{" "}
                      {new Date(
                        student.formData["0"]["Starting/Ending Dates"][1]
                      ).getMonth()}
                      /
                      {new Date(
                        student.formData["0"]["Starting/Ending Dates"][1]
                      ).getDate()}
                      /
                      {new Date(
                        student.formData["0"]["Starting/Ending Dates"][1]
                      ).getFullYear()}
                    </Caption>
                  </AntCol>
                </AntRow>
                <AntRow className="mt-1">
                  <AntCol span={4}>
                    <Header className="sixteenFont" bolded>
                      Available Days:
                    </Header>
                  </AntCol>
                  <AntCol span={20}>
                    <Caption className="sixteenFont" bolded>
                      {student.formData["0"]["Willing Work Days"].length > 1
                        ? student.formData["0"]["Willing Work Days"]
                            .slice(
                              0,
                              student.formData["0"]["Willing Work Days"].length - 1
                            )
                            .map((day) => ` ${day}`) + ", " +
                          student.formData["0"]["Willing Work Days"][
                            student.formData["0"]["Willing Work Days"].length - 1
                          ]
                        : student.formData["0"]["Willing Work Days"]}
                    </Caption>
                  </AntCol>
                </AntRow>
                <AntRow className="mt-1">
                  <AntCol span={4}>
                    <Header className="sixteenFont" bolded>
                      Available Times:
                    </Header>
                  </AntCol>
                  <AntCol span={20}>
                    <Caption className="sixteenFont" bolded>
                      {student.info["Willing Work Times"].length > 1
                        ? student.info["Willing Work Times"]
                            .slice(
                              0,
                              student.info["Willing Work Times"].length - 1
                            )
                            .map((time) => ` ${time}`) +
                          ", " +
                          student.info["Willing Work Times"][
                            student.info["Willing Work Times"].length - 1
                          ]
                        : student.info["Willing Work Times"]}
                    </Caption>
                  </AntCol>
                </AntRow>
                <AntRow className="mt-1">
                  <AntCol span={4}>
                    <Header className="sixteenFont" bolded>
                      Applied For:
                    </Header>
                  </AntCol>
                  <AntCol span={20}>
                    <Caption className="sixteenFont" bolded>
                      {student.info["Applied For"]
                        ? student.info["Applied For"]
                        : "Placeholder"}
                    </Caption>
                  </AntCol>
                </AntRow>
                <AntRow className="mt-1">
                  <AntCol span={4}>
                    <Header className="sixteenFont" bolded>
                      Pay Preference:
                    </Header>
                  </AntCol>
                  <AntCol span={20}>
                    <Caption className="sixteenFont" bolded>
                      {student.info["Paid/Unpaid Preference"] === "Yes"
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
                {student.info.Education.map((school) => (
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
                {student.info.Courses.map((course) => (
                  <CourseRow
                    course={course.courseTitle}
                    level={course.courseLevel}
                  />
                ))}
              </AntCol>
            </AntRow>
          </TabContainer>
        </InnerContainer>
      </AntRow>
    );
  } else {
    return <h1> LOADING! </h1>;
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
