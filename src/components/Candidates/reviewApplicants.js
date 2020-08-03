import React, { Component } from "react";
import "../../App.css";
import "./candidates.css";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { Button, Switch, Divider } from "antd";

import CandidateInfoBar from "./candidateInfoBar";
import CandidateQuickviewTab from "./CandidateQuickviewTab";
import CandidateQuickviewReviewTab from "./CandidateQuickviewReviewTab";
import CandidateDetailedviewTab from "./CandidateDetailedviewTab";
import CandidateDetailedviewReviewTab from "./CandidateDetailedviewReviewTab";

//Ant Design Styles
const AddFilterStyle = {
  width: "270px",
  height: "40px",
  fontFamily: "roboto",
  fontColor: "#13C2C2",
  marginTop: "33px",
  align: "inline-block"
};

const ButtonText = styled.span`
  font-family: roboto;
  color: #13c2c2;
  font-size: 18px;
`;

const ViewText = styled.span`
  font-family: roboto;
  font-weight: 500;
  font-size: 18px;
  display: inline-block;
  margin-right: 10px;
  margin-left: 20px;
  width: 120px;
  color: black;
  text-align: center;
`;

const HeaderText = styled.span`
  font-family: lato;
  font-weight: bold;
  font-size: 36px;
  height: 51px;
  align-items: center;
  color: black;
  display: block;
  margin-top: 3vh;
`;

class ReviewApplicants extends Component {
  state = {
    quickview: true,
    page: "1",
    students: [],
    reviewStudents: [],
    review: true
  };

  handleReview = index => {
    let reviewStudent = { ...this.state.students[index] };
    reviewStudent.company.status = "review";
    this.setState({
      reviewStudents: this.state.reviewStudents.concat(reviewStudent),
      students: this.state.students.filter((item, j) => j !== index)
    });
    fetch(`http://localhost:8000/student/${reviewStudent.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reviewStudent)
    })
      .then(response => response.json())
      .then(json => console.log(json));
  };

  render() {
    let { students, reviewStudents } = this.state;
    return (
      <div
        style={{
          display: "flex",
          width: "90%",
          flexDirection: "column",
          margin: "auto"
        }}
      >
        <div style={{ marginBottom: "4vh" }}>
          <Button style={AddFilterStyle}>
            <ButtonText>Add Filter</ButtonText>
          </Button>

          {this.state.quickview ? (
            <ViewText>Quickview</ViewText>
          ) : (
            <ViewText>Detailed View</ViewText>
          )}

          <Switch
            defaultChecked
            onChange={() => this.setState({ quickview: !this.state.quickview })}
            style={{ align: "inline-block" }}
          />

          <HeaderText>Unread Applicants</HeaderText>

          {this.renderUnreadApplicants()}

          {this.renderReviewApplicants()}
        </div>
      </div>
    );
  }

  renderUnreadApplicants = () => {
    let { students } = this.state;
    return this.state.quickview ? (
      <React.Fragment>
        <CandidateInfoBar />
        {students.map((student, index) => (
          <CandidateQuickviewTab
            key={index}
            name={
              student.personal.first_name + " " + student.personal.last_name
            }
            school={student.education.school}
            GPA={student.education.weighted_GPA}
            industry={
              "Computer Science, Biotechnology, General Business, Finance or Accounting"
            }
            onReview={() => this.handleReview(index)}
          />
        ))}
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Divider />
        {students.map((student, index) => (
          <CandidateDetailedviewTab
            key={index}
            avatar={student.personal.avatar}
            name={
              student.personal.first_name + " " + student.personal.last_name
            }
            school={student.education.school.name}
            schoolAddress={
              student.education.school.address +
              ", " +
              student.education.school.state
            }
            GPA={student.education.weighted_GPA}
            age={student.personal.age}
            workDate={
              student.internship.work_start +
              " - " +
              student.internship.work_end
            }
            industries={
              student.internship.industries["1"] +
              ", " +
              student.internship.industries["2"] +
              ", " +
              student.internship.industries["3"] +
              ", "
            }
            activityOne={student.personal.extracurriculars["1"]}
            activityTwo={student.personal.extracurriculars["2"]}
            activityThree={student.personal.extracurriculars["3"]}
            classOne={student.education.relevant_courses["1"]}
            classTwo={student.education.relevant_courses["2"]}
            classThree={student.education.relevant_courses["3"]}
            onReview={() => this.handleReview(index)}
          />
        ))}
      </React.Fragment>
    );
  };

  renderReviewApplicants = () => {
    let { students, reviewStudents } = this.state;
    return this.state.quickview ? (
      <React.Fragment>
        <HeaderText>Marked for Review</HeaderText>
        <CandidateInfoBar />
        {reviewStudents.map((student, index) => (
          <CandidateQuickviewReviewTab
            key={index}
            name={
              student.personal.first_name + " " + student.personal.last_name
            }
            school={student.education.school}
            GPA={student.education.weighted_GPA}
            industry={
              "Computer Science, Biotechnology, General Business, Finance or Accounting"
            }
          />
        ))}
      </React.Fragment>
    ) : (
      <React.Fragment>
        <HeaderText>Marked for Review</HeaderText>
        <Divider />
        {reviewStudents.map((student, index) => (
          <CandidateDetailedviewReviewTab
            key={index}
            avatar={student.personal.avatar}
            name={
              student.personal.first_name + " " + student.personal.last_name
            }
            school={student.education.school.name}
            schoolAddress={
              student.education.school.address +
              ", " +
              student.education.school.state
            }
            GPA={student.education.weighted_GPA}
            age={student.personal.age}
            workDate={
              student.internship.work_start +
              " - " +
              student.internship.work_end
            }
            industries={
              student.internship.industries["1"] +
              ", " +
              student.internship.industries["2"] +
              ", " +
              student.internship.industries["3"] +
              ", "
            }
            activityOne={student.personal.extracurriculars["1"]}
            activityTwo={student.personal.extracurriculars["2"]}
            activityThree={student.personal.extracurriculars["3"]}
            classOne={student.education.relevant_courses["1"]}
            classTwo={student.education.relevant_courses["2"]}
            classThree={student.education.relevant_courses["3"]}
          />
        ))}
      </React.Fragment>
    );
  };

  componentDidMount() {
    fetch(`http://localhost:8000/student?_page=1&_limit=5`)
      .then(response => response.json())
      .then(json =>
        this.setState({
          students: json.filter(item => item.company.status !== "review"),
          reviewStudents: json.filter(item => item.company.status === "review")
        })
      );
  }
}

export default withRouter(ReviewApplicants);
