import React, { Component } from "react";
import "../../App.css";
import "./candidates.css";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

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
  align: "inline-block",
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

const mapStateToProps = (state) => {
  return {
    companyInfo: state.companyInfo,
  };
};

class ReviewApplicants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quickview: true,
      page: "1",
      review: true,
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  handleReview = (studentId) => {
    this.props.updateCandidateStatus(studentId, "Review");
  };

  handleInterviewUnread = (studentId) => {
    this.props.updateCandidateStatus(studentId, "Online Interview");
  };

  handleInterviewReview = (studentId) => {
    this.props.updateCandidateStatus(studentId, "Online Interview");
  };

  handleReject = (studentId) => {
    this.props.updateCandidateStatus(studentId, "Rejected");
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          width: "90%",
          flexDirection: "column",
          margin: "auto",
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

    return null;
  }

  renderUnreadApplicants = () => {
    let { candidates } = this.props.companyInfo;
    let unreadCandidates = candidates.filter(
      (candidate) => candidate.status === "Pending"
    );
    return this.state.quickview ? (
      <React.Fragment>
        <CandidateInfoBar />
        {unreadCandidates.map((student, index) => (
          <CandidateQuickviewTab
            key={index}
            name={student.info["First Name"] + " " + student.info["Last Name"]}
            school={student.info.Education[0].Name}
            GPA={parseFloat(student.info["Unweighted GPA"])}
            industry={
              "Computer Science, Biotechnology, General Business, Finance or Accounting"
            }
            onReview={() => this.handleReview(student.studentId)}
            onInterview={() => this.handleInterviewUnread(student.studentId)}
            onReject={() => this.handleReject(student.studentId)}
          />
        ))}
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Divider />
        {unreadCandidates.map((student, index) => (
          <CandidateDetailedviewTab
            key={index}
            avatar={`https://tii-intern-media.s3.amazonaws.com/${student.studentId}/profile_picture`}
            name={student.info["First Name"] + " " + student.info["Last Name"]}
            school={student.info.Education[0].Name}
            schoolAddress={
              student.info.Education[0].Address +
              ", " +
              student.info.Education[0].State
            }
            GPA={parseFloat(student.info["Weighted GPA"])}
            age={student.info.Age}
            workDate={
              student.info["Starting/Ending Dates"][0].split("T")[0] +
              " - " +
              student.info["Starting/Ending Dates"][1].split("T")[0]
            }
            industries={
              "Computer Science, Biotechnology, General Business, Finance or Accounting"
            }
            activityOne={"Activity One"}
            activityTwo={"Activity Two"}
            activityThree={"Activity Three"}
            classOne={"Class One"}
            classTwo={"Class Two"}
            classThree={"Class Three"}
            onReview={() => this.handleReview(student.studentId)}
            onInterview={() => this.handleInterviewUnread(student.studentId)}
            onReject={() => this.handleReject(student.studentId)}
          />
        ))}
      </React.Fragment>
    );
  };

  renderReviewApplicants = () => {
    let { candidates } = this.props.companyInfo;
    let reviewCandidates = candidates.filter(
      (candidate) => candidate.status === "Review"
    );
    return this.state.quickview ? (
      <React.Fragment>
        <HeaderText>Marked for Review</HeaderText>
        <CandidateInfoBar />
        {reviewCandidates.map((student, index) => (
          <CandidateQuickviewReviewTab
            key={index}
            name={student.info["First Name"] + " " + student.info["Last Name"]}
            school={student.info.Education[0].Name}
            GPA={parseFloat(student.info["Unweighted GPA"])}
            industry={
              "Computer Science, Biotechnology, General Business, Finance or Accounting"
            }
            onInterview={() => this.handleInterviewReview(student.studentId)}
            onReject={() => this.handleReject(student.studentId)}
          />
        ))}
      </React.Fragment>
    ) : (
      <React.Fragment>
        <HeaderText>Marked for Review</HeaderText>
        <Divider />
        {reviewCandidates.map((student, index) => (
          <CandidateDetailedviewReviewTab
            key={index}
            avatar={`https://tii-intern-media.s3.amazonaws.com/${student.studentId}/profile_picture`}
            name={student.info["First Name"] + " " + student.info["Last Name"]}
            school={student.info.Education[0].Name}
            schoolAddress={
              student.info.Education[0].Address +
              ", " +
              student.info.Education[0].State
            }
            GPA={parseFloat(student.info["Weighted GPA"])}
            age={student.info.Age}
            workDate={
              student.info["Starting/Ending Dates"][0].split("T")[0] +
              " - " +
              student.info["Starting/Ending Dates"][1].split("T")[0]
            }
            industries={
              "Computer Science, Biotechnology, General Business, Finance or Accounting"
            }
            activityOne={"Activity One"}
            activityTwo={"Activity Two"}
            activityThree={"Activity Three"}
            classOne={"Class One"}
            classTwo={"Class Two"}
            classThree={"Class Three"}
            onInterview={() => this.handleInterviewReview(student.studentId)}
            onReject={() => this.handleReject(student.studentId)}
          />
        ))}
      </React.Fragment>
    );
  };
}

export default withRouter(connect(mapStateToProps)(ReviewApplicants));
