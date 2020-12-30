import React, { useState } from "react";
import { Row as AntRow, Col as AntCol, Avatar } from "antd";
import {
  InnerContainer,
  TabContainer,
  Header,
  Caption,
} from "../Styled/FundamentalComponents.jsx";
import _ from "underscore";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { RiSuitcaseLine } from "react-icons/ri";

const mapStateToProps = (state) => {
  return {
    companyInfo: state.companyInfo,
  };
};

const StudentInfo = (props) => {
  const { id } = props.match.params;

  /**
   * @TejasMaraliga
   *
   * TODO: UseState find function needs to be replaced with an API Call
   * TODO: Student objects don't have a grade or race field for the personal information section
   */

  const [student, changeStudent] = useState(
    _.find(props.companyInfo.candidates, (student) => student.Id === id)
  );

  if (student) {
    return (
      <AntRow className="py-2" justify="center" style={{ width: "100%" }}>
        <InnerContainer>
          <TabContainer className="px-6 py-3">
            <AntRow gutter={[32, 0]}>
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
                    {student.info["First Name"]} {student.info["Last Name"]}
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
                      : "Social Media Intern"}
                  </Caption>
                </AntRow>
                <AntRow className="pt-2 student-info-header" align="middle">
                  <RiSuitcaseLine className="student-info-icon" />
                  <Header className="twentyFourFont" color="#002766" bolded>
                    Internship Information
                  </Header>
                </AntRow>
                <AntRow className="mt-1 mb-point-5">
                  <AntCol span={4}>
                    <Header className="sixteenFont" bolded>
                      Available Dates:
                    </Header>
                  </AntCol>
                  <AntCol span={20}>
                    <Caption className="sixteenFont" bolded>
                      {new Date(
                        student.info["Starting/Ending Dates"][0]
                      ).getMonth()}
                      /
                      {new Date(
                        student.info["Starting/Ending Dates"][0]
                      ).getDate()}
                      /
                      {new Date(
                        student.info["Starting/Ending Dates"][0]
                      ).getFullYear()}{" "}
                      -{" "}
                      {new Date(
                        student.info["Starting/Ending Dates"][1]
                      ).getMonth()}
                      /
                      {new Date(
                        student.info["Starting/Ending Dates"][1]
                      ).getDate()}
                      /
                      {new Date(
                        student.info["Starting/Ending Dates"][1]
                      ).getFullYear()}
                    </Caption>
                  </AntCol>
                </AntRow>
                <AntRow className="mt-1 mb-point-5">
                  <AntCol span={4}>
                    <Header className="sixteenFont" bolded>
                      Available Days:
                    </Header>
                  </AntCol>
                  <AntCol span={20}>
                    <Caption className="sixteenFont" bolded>
                      {student.info["Willing Work Days"].length > 1
                        ? student.info["Willing Work Days"]
                            .slice(
                              0,
                              student.info["Willing Work Days"].length - 1
                            )
                            .map((day) => ` ${day}`) + ", " +
                          student.info["Willing Work Days"][
                            student.info["Willing Work Days"].length - 1
                          ]
                        : student.info["Willing Work Days"]}
                    </Caption>
                  </AntCol>
                </AntRow>
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

export default withRouter(connect(mapStateToProps)(StudentInfo));
