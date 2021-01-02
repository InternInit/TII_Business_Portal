import React, { Component } from "react";

import NavSearch from "../General/NavSearch.jsx";

import {
  Header,
  Caption,
  NavigationButton,
  TabContainer,
  PageContainer,
  InnerContainer,
} from "../Styled/FundamentalComponents.jsx";

import { Row as AntRow, Col as AntCol, Avatar, Button } from "antd";

import InternDashboard from "./InternDashboard.jsx";
import InternPastFeedback from "./InternPastFeedback.jsx";

import { Link, Route, Switch as ReactSwitch, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import {
  startCandidateLoading,
  finishCandidateLoading,
} from "../../redux/actions";


const mapStateToProps = (state) => {
  return {
    companyInfo: state.companyInfo,
    loadingStatuses: state.loadingStatuses
  };
};

const mapDispatchToProps = {
  startCandidateLoading,
  finishCandidateLoading,
};

class InternPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      student: null,
    };
  }

  findStudent = () => {
    console.log("trying to find");
    if(!this.props.loadingStatuses.isCandidateLoading){
      const id = this.props.location.pathname.split("/");
      const foundStudent = this.props.companyInfo.candidates.find((student) => student.Id == id[2]);
      console.log(foundStudent);
      this.setState({
        student: foundStudent,
        loading: false,
      });
    }
  };

  componentDidMount() {
    this.findStudent();
  }

  componentDidUpdate() {
    if(this.state.student === null){
      this.findStudent();
    }
  }

  render() {
    const { student, loading } = this.state;

    return (loading || this.props.loadingStatuses.isCandidateLoading) ? (
      <>
        <h1>IMPLEMENT SOME KIND ON LOADING SCREEN HERE</h1>
        <h1>{`Loading is currently: ${loading}`}</h1>
        <h1>{`Candidate is currently: ${this.props.loadingStatuses.isCandidateLoading}`}</h1>
      </>
    ) : (
      <>
        <PageContainer>
          <NavSearch title="Intern Dashboard" />
          <InnerContainer className="mt-3 mb-4">
            <AntRow style={{ width: "100%" }}>
              <TabContainer
                className="mb-1 py-2 px-6 intern-dashboard-banner"
                style={{ width: "100%" }}
              >
                <AntRow>
                  <AntCol className="universal-middle">
                    <Avatar size={150} src={`https://tii-intern-media.s3.amazonaws.com/${student.Id}/profile_picture`} />
                  </AntCol>
                  <AntCol flex="auto" offset={1}>
                    <AntRow>
                      <Header
                        className="twentyEightFont intern-dashboard-banner-text"
                        color="white"
                      >
                        {student.formData["0"]["First Name"]} {student.formData["0"]["Last Name"]}
                      </Header>
                    </AntRow>
                    <AntRow>
                      <Caption
                        className="eighteenFont intern-dashboard-banner-text"
                        color="white"
                        thin
                        style={{ marginTop: "-.5em", fontStyle: "italic" }}
                      >
                        {"Placeholder Position"}
                      </Caption>
                    </AntRow>
                    <AntRow className="mt-point-5">
                      <AntCol span={12}>
                        <Caption className="sixteenFont" color="white">
                          <Caption color="#C5D1D8">Phone:</Caption> 6179311128
                        </Caption>
                      </AntCol>
                      <AntCol span={12}>
                        <Caption className="sixteenFont" color="white">
                          <Caption color="#C5D1D8">Counselor Name:</Caption>{" "}
                          {"Placeholder Contact"}
                        </Caption>
                      </AntCol>
                    </AntRow>
                    <AntRow className="mt-point-5">
                      <AntCol span={12}>
                        <Caption className="sixteenFont" color="white">
                          <Caption color="#C5D1D8">Email:</Caption>{" "}
                          {student.formData["0"].Email}
                        </Caption>
                      </AntCol>
                      <AntCol span={12}>
                        <Caption className="sixteenFont" color="white">
                          <Caption color="#C5D1D8">Counselor Email:</Caption>{" "}
                          {student.school.email}
                        </Caption>
                      </AntCol>
                    </AntRow>
                    <AntRow className="mt-point-5">
                      <AntCol span={12}>
                        <Caption className="sixteenFont" color="white">
                          <Caption color="#C5D1D8">School:</Caption>{" "}
                          {student.school.name}
                        </Caption>
                      </AntCol>
                      <AntCol span={12}>
                        <Caption className="sixteenFont" color="white">
                          <Caption color="#C5D1D8">Counselor Phone:</Caption>{" "}
                          {student.school.phone}
                        </Caption>
                      </AntCol>
                    </AntRow>
                  </AntCol>
                </AntRow>
                <AntRow className="mt-2" gutter={[16, 0]}>
                  <AntCol span={4}>
                    <Link to={`/my-interns/${student.id}/dashboard`}>
                      <NavigationButton
                        block
                        shape="round"
                        size="large"
                        active={this.props.location.pathname.includes(
                          "dashboard"
                        )}
                        type={
                          this.props.location.pathname.includes("dashboard")
                            ? "primary"
                            : "default"
                        }
                      >
                        Dashboard
                      </NavigationButton>
                    </Link>
                  </AntCol>
                  <AntCol span={4}>
                    <Link to={`/my-interns/${student.id}/attendance`}>
                      <NavigationButton
                        block
                        shape="round"
                        size="large"
                        active={this.props.location.pathname.includes(
                          "attendance"
                        )}
                        type={
                          this.props.location.pathname.includes("attendance")
                            ? "primary"
                            : "default"
                        }
                      >
                        Attendance
                      </NavigationButton>
                    </Link>
                  </AntCol>
                  <AntCol span={4}>
                    <Link to={`/my-interns/${student.id}/feedback`}>
                      <NavigationButton
                        block
                        shape="round"
                        size="large"
                        active={this.props.location.pathname.includes(
                          "feedback"
                        )}
                        type={
                          this.props.location.pathname.includes("feedback")
                            ? "primary"
                            : "default"
                        }
                      >
                        Feedback
                      </NavigationButton>
                    </Link>
                  </AntCol>
                  <AntCol span={4}>
                    <Link to={`/my-interns/${student.id}/grades`}>
                      <NavigationButton
                        block
                        shape="round"
                        size="large"
                        active={this.props.location.pathname.includes("grades")}
                        type={
                          this.props.location.pathname.includes("grades")
                            ? "primary"
                            : "default"
                        }
                      >
                        Grades
                      </NavigationButton>
                    </Link>
                  </AntCol>
                </AntRow>
              </TabContainer>
            </AntRow>

            <ReactSwitch>
              <Route
                path={`/my-interns/:id`}
                exact
                render={() => <Redirect to={`/my-interns/:id/dashboard`} />}
              />
              <Route
                path={`/my-interns/:id/dashboard`}
                exact
                render={() => <InternDashboard student={student} />}
              />
              <Route
                path={`/my-interns/:id/attendance`}
                exact
                component={() => <InternDashboard student={student} />}
              />
              <Route
                path={`/my-interns/:id/feedback`}
                exact
                component={() => <InternPastFeedback student={student}/>}
              />
            </ReactSwitch>
          </InnerContainer>
        </PageContainer>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InternPageContainer);
