import React, { Component } from "react";
import "../../App.scss";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Button, Switch, Divider, Row as AntRow, Col as AntCol } from "antd";
import { Header } from "../Styled/FundamentalComponents.jsx";
import { AiOutlineUser } from "react-icons/ai";

import InfoBar from "../General/InfoBar.jsx";
import CandidateQuickviewTab from "./CandidateQuickviewTab.jsx";
import CandidateQuickviewReviewTab from "./CandidateQuickviewReviewTab.jsx";
import CandidateDetailedviewTab from "./CandidateDetailedviewTab.jsx";
import CandidateDetailedviewReviewTab from "./CandidateDetailedviewReviewTab.jsx";

//Ant Design Styles
const AddFilterStyle = {
  width: "270px",
  height: "40px",
  fontFamily: "roboto",
  marginTop: "33px",
  align: "inline-block",
};

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

  handleReview = (internId) => {
    //console.log(internId);
    this.props.updateCandidateStatus(internId, "Review");
  };

  handleInterviewUnread = (internId) => {
    this.props.updateCandidateStatus(internId, "Online Interview");
  };

  handleInterviewReview = (internId) => {
    this.props.updateCandidateStatus(internId, "Online Interview");
  };

  handleReject = (internId) => {
    this.props.updateCandidateStatus(internId, "Rejected");
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
          <Button type="default" style={AddFilterStyle}>
            <span className="sixteenFont">Sort By</span>
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

          <Header className="twentyEightFont mt-1 mb-point-75" bolded>
            Unread Applicants
          </Header>

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
        <InfoBar
          mobileHeader="Applicants"
          fieldOne={{ name: "Name", sm: 4, lg: 4, align: "universal-left" }}
          fieldTwo={{
            name: "School and Region",
            sm: 8,
            lg: 8,
            align: "universal-center",
          }}
          fieldThree={{ name: "GPA", sm: 3, lg: 3, align: "universal-center" }}
          fieldFour={{
            name: "Applied For",
            sm: 6,
            lg: 6,
            align: "universal-center",
          }}
          fieldFive={{
            name: "Actions",
            sm: 3,
            lg: 3,
            align: "universal-center",
          }}
        />
        {unreadCandidates.length > 0 ? (
          unreadCandidates.map((student, index) => (
            <CandidateQuickviewTab
              key={index}
              id={student.Id}
              name={
                student.formData["0"]["First Name"] +
                " " +
                student.formData["0"]["Last Name"]
              }
              school={student.formData["1"]["Education"][0]}
              GPA={parseFloat(student.formData["0"]["Unweighted GPA"])}
              appliedFor={student.appliedFor}
              onReview={() => this.handleReview(student.Id)}
              onInterview={() => this.handleInterviewUnread(student.Id)}
              onReject={() => this.handleReject(student.Id)}
            />
          ))
        ) : (
          <div className="py-2-5 universal-center ">
            <AntRow justify="center" align="middle">
              <AiOutlineUser className="review-applicants-no-content-icon" />
            </AntRow>
            <AntRow justify="center" align="middle">
              <Header className="twentyFourFont" color="#bfbfbf">
                No Unread Applicants
              </Header>
            </AntRow>
          </div>
        )}
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Divider />
        {unreadCandidates.length > 0 ? (
          unreadCandidates.map((student, index) => (
            <CandidateDetailedviewTab
              key={index}
              id={student.Id}
              /**
               * All avatars follow this style path. If valid, avatar will show up. If not, the ANTD default will
               * show up.
               */
              avatar={`http://tii-intern-media.s3-website-us-east-1.amazonaws.com/${student.Id}/profile_picture`}
              name={
                student.formData["0"]["First Name"] +
                " " +
                student.formData["0"]["Last Name"]
              }
              city={student.formData["0"].City}
              school={student.formData["1"]["Education"][0].Name}
              schoolAddress={
                student.formData["1"]["Education"][0].Address +
                ", " +
                student.formData["1"]["Education"][0].State
              }
              GPA={parseFloat(student.formData["0"]["Unweighted GPA"])}
              appliedFor={student.appliedFor}
              age={student.formData["1"].Age}
              workDate={
                student.formData["0"]["Starting/Ending Dates"][0].split(
                  "T"
                )[0] +
                " - " +
                student.formData["0"]["Starting/Ending Dates"][1].split("T")[0]
              }
              workDays={student.formData["0"]["Willing Work Days"]}
              workTimes={student.formData["0"]["Willing Work Times"]}
              activities={student.formData["3"].Extracurriculars}
              courses={student.formData["3"].Courses}
              onReview={() => this.handleReview(student.Id)}
              onInterview={() => this.handleInterviewUnread(student.Id)}
              onReject={() => this.handleReject(student.Id)}
            />
          ))
        ) : (
          <div className="py-2-5 universal-center ">
            <AntRow justify="center" align="middle">
              <AiOutlineUser className="review-applicants-no-content-icon" />
            </AntRow>
            <AntRow justify="center" align="middle">
              <Header className="twentyFourFont" color="#bfbfbf">
                No Unread Applicants
              </Header>
            </AntRow>
          </div>
        )}
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
        <Header className="twentyEightFont mt-2 mb-point-75" bolded>
          Marked for Review
        </Header>
        <InfoBar
          mobileHeader="Applicants"
          fieldOne={{ name: "Name", sm: 4, lg: 4, align: "universal-left" }}
          fieldTwo={{
            name: "School and Region",
            sm: 8,
            lg: 8,
            align: "universal-center",
          }}
          fieldThree={{ name: "GPA", sm: 3, lg: 3, align: "universal-center" }}
          fieldFour={{
            name: "Applied For",
            sm: 6,
            lg: 6,
            align: "universal-center",
          }}
          fieldFive={{
            name: "Actions",
            sm: 3,
            lg: 3,
            align: "universal-center",
          }}
        />
        {reviewCandidates.length > 0 ? (
          reviewCandidates.map((student, index) => (
            <CandidateQuickviewReviewTab
              key={index}
              id={student.Id}
              name={
                student.formData["0"]["First Name"] +
                " " +
                student.formData["0"]["Last Name"]
              }
              school={student.formData["1"]["Education"][0]}
              GPA={parseFloat(student.formData["0"]["Unweighted GPA"])}
              appliedFor={student.appliedFor}
              onReview={() => this.handleReview(student.Id)}
              onInterview={() => this.handleInterviewUnread(student.Id)}
              onReject={() => this.handleReject(student.Id)}
            />
          ))
        ) : (
          <div className="py-2-5 universal-center ">
            <AntRow justify="center" align="middle">
              <AiOutlineUser className="review-applicants-no-content-icon" />
            </AntRow>
            <AntRow justify="center" align="middle">
              <Header className="twentyFourFont" color="#bfbfbf">
                No Applicants to Review
              </Header>
            </AntRow>
          </div>
        )}
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Header className="twentyEightFont mt-2" bolded>
          Marked for Review
        </Header>
        <Divider />
        {reviewCandidates.length > 0 ? (
          reviewCandidates.map((student, index) => (
            <CandidateDetailedviewReviewTab
              key={index}
              id={student.Id}
              /**
               * All avatars follow this style path. If valid, avatar will show up. If not, the ANTD default will
               * show up.
               */
              avatar={`http://tii-intern-media.s3-website-us-east-1.amazonaws.com/${student.Id}/profile_picture`}
              name={
                student.formData["0"]["First Name"] +
                " " +
                student.formData["0"]["Last Name"]
              }
              city={student.formData["0"].City}
              school={student.formData["1"]["Education"][0].Name}
              schoolAddress={
                student.formData["1"]["Education"][0].Address +
                ", " +
                student.formData["1"]["Education"][0].State
              }
              GPA={parseFloat(student.formData["0"]["Unweighted GPA"])}
              appliedFor={student.appliedFor}
              age={student.formData["1"].Age}
              workDate={
                student.formData["0"]["Starting/Ending Dates"][0].split(
                  "T"
                )[0] +
                " - " +
                student.formData["0"]["Starting/Ending Dates"][1].split("T")[0]
              }
              workDays={student.formData["0"]["Willing Work Days"]}
              workTimes={student.formData["0"]["Willing Work Times"]}
              activities={student.formData["3"].Extracurriculars}
              courses={student.formData["3"].Courses}
              onReview={() => this.handleReview(student.Id)}
              onInterview={() => this.handleInterviewUnread(student.Id)}
              onReject={() => this.handleReject(student.Id)}
            />
          ))
        ) : (
          <div className="py-2-5 universal-center ">
            <AntRow justify="center" align="middle">
              <AiOutlineUser className="review-applicants-no-content-icon" />
            </AntRow>
            <AntRow justify="center" align="middle">
              <Header className="twentyFourFont" color="#bfbfbf">
                No Applicants to Review
              </Header>
            </AntRow>
          </div>
        )}
      </React.Fragment>
    );
  };
}

export default withRouter(connect(mapStateToProps)(ReviewApplicants));
