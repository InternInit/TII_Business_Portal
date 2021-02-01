import React, { Component } from "react";
import styled from "styled-components";
import StudentInternTab from "./StudentInternTab.jsx";
import NavSearch from "../General/NavSearch.jsx";
import InfoBar from "../General/InfoBar.jsx";
import { InnerContainer } from "../Styled/FundamentalComponents";
import StudentInternPageSkeleton from "./StudentInternPageSkeleton";
import { Button, Row as AntRow, Col as AntCol } from "antd";

import { connect } from "react-redux";

import _ from "underscore";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-width: 600px;
`;

const ButtonStyle = {
  width: "100%",
  minWidth: "170px",
  height: "40px",
  fontFamily: "roboto",
};

const mapStateToProps = (state) => {
  return {
    interns: state.interns.currentInterns,
    loadingStatuses: state.loadingStatuses,
  };
};

class InternFeedback extends Component {
  render() {
    return this.props.loadingStatuses.isInternLoading ? (
      <StudentInternPageSkeleton />
    ) : (
      <>
        <Container className="global-container">
          <NavSearch
            title="My Interns"
            placeholder="Search Interns"
            //@TODO implement functionality
            searchBar={false}
          />
          <InnerContainer className="mt-2 mb-4">
            <AntRow gutter={[32, 16]}>
              <AntCol xs={24} md={8} lg={5}>
                <Button type="default" style={ButtonStyle}>
                  <span className="sixteenFont">Sort By</span>
                </Button>
              </AntCol>
            </AntRow>

            <InfoBar
              mobileHeader="Interns"
              fieldOne={{
                name: "Name",
                sm: 10,
                lg: 6,
                align: "universal-left",
              }}
              fieldTwo={{
                name: "School",
                sm: 5,
                lg: 8,
                align: "universal-left",
              }}
              fieldThree={{
                name: "Internship Type",
                sm: 4,
                lg: 4,
                align: "universal-left",
              }}
              fieldFour={{
                name: "Action",
                sm: 5,
                lg: 6,
                align: "universal-center",
              }}
            />

            {this.props.interns.map((student) => (
              <StudentInternTab
                firstName={student.formData["0"]["First Name"]}
                lastName={student.formData["0"]["Last Name"]}
                age={student.formData["1"]["Age"]}
                type="Hybrid"
                id={student.Id}
                attendanceDue={
                  student.hours
                    ? _.filter(student.hours, (hour) => !hour.isApproved).length
                    : 0
                }
                feedbackDue={
                  student.feedback
                    ? _.filter(student.feedback, (feedback) => !feedback.isRead)
                        .length
                    : 0
                }
                gradesDue={
                  student.grades
                    ? _.filter(student.grades, (grade) => !grade.isFinished)
                        .length
                    : 0
                }
                position={student.appliedFor}
                school={student.school ? student.school.name : "N/A"}
                /**
                 * @TODO
                 * Replace with actual profile picture
                 */
                //avatar={`https://tii-intern-media.s3.amazonaws.com/${student.Id}/profile_picture`}
              />
            ))}
          </InnerContainer>
        </Container>
      </>
    );
  }
}
export default connect(mapStateToProps)(InternFeedback);
