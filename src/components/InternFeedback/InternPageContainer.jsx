import React, { Component } from "react";

import NavSearch from "../General/NavSearch.jsx";
import SmartAvatar from "../General/SmartAvatar";

import {
  Header,
  Caption,
  NavigationButton,
  TabContainer,
  PageContainer,
  InnerContainer,
} from "../Styled/FundamentalComponents.jsx";

import { Row as AntRow, Col as AntCol, Avatar, Dropdown, Menu } from "antd";
import { AiOutlineMenu } from "react-icons/ai";
import TopLoader from "react-top-loader";

import InternDashboard from "./InternDashboard.jsx";
import InternPastFeedback from "./InternPastFeedback.jsx";
import InternPastGrades from "./InternPastGrades.jsx";
import AttendanceRecord from "./AttendanceRecord.jsx";

import { Link, Route, Switch as ReactSwitch, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { startInternLoading, finishInternLoading } from "../../redux/actions";

const mapStateToProps = (state) => {
  return {
    interns: state.interns.currentInterns,
    loadingStatuses: state.loadingStatuses,
  };
};

const mapDispatchToProps = {
  startInternLoading,
  finishInternLoading,
};

class InternPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      student: null,
    };
  }

  MobileMenu = (student) => {
    return (
      <Menu>
        <Menu.Item>
          <Link to={`/my-interns/${student.Id}/dashboard`}>Dashboard</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={`/my-interns/${student.Id}/attendance`}>Attendance</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={`/my-interns/${student.Id}/feedback`}>Feedback</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={`/my-interns/${student.Id}/grades`}>Grades</Link>
        </Menu.Item>
      </Menu>
    );
  };

  findStudent = () => {
    console.log("trying to find");
    if (!this.props.loadingStatuses.isInternLoading) {
      const id = this.props.location.pathname.split("/");
      //console.log(this.props);
      const foundStudent = this.props.interns.find(
        (student) => student.Id == id[2]
      );
      console.log(foundStudent);
      this.setState({
        student: foundStudent,
        loading: false,
      });
    }
  };

  componentDidMount() {
    this.findStudent();
    console.log("Called Find Student and Mounted");
  }

  componentDidUpdate() {
    if (this.state.student === null) {
      this.findStudent();
    }
  }

  render() {
    const { loading } = this.state;
    const student = this.props.interns.find(
      (student) => student.Id == this.props.location.pathname.split("/")[2]
    );

    return (
      <>
        <PageContainer>
          <NavSearch title="Intern Dashboard" />
          <InnerContainer className="mt-3 mb-4">
            <AntRow style={{ width: "100%" }}>
              {this.props.loadingStatuses.isInternLoading ? (
                <TabContainer
                  className="mb-1 py-2 px-6 intern-dashboard-banner"
                  style={{ width: "100%" }}
                ></TabContainer>
              ) : (
                <TabContainer
                  className="mb-1 py-2 px-6 intern-dashboard-banner"
                  style={{ width: "100%" }}
                >
                  <Dropdown
                    overlay={this.MobileMenu(student)}
                    placement="bottomRight"
                  >
                    <AiOutlineMenu className="intern-dashboard-mobile-menu" />
                  </Dropdown>
                  <AntRow justify="center">
                    <AntCol className="universal-middle">
                      <SmartAvatar
                        size={150}
                        name={student.formData["0"]["First Name"]}
                        fontSize="fortyEightFont"
                      />
                      {/**
                     * @TODO
                     * Make it so that it can check if there's actually a profile pic for the user
                     <Avatar
                      size={150}
                      src={`http://tii-intern-media.s3-website-us-east-1.amazonaws.com/${student.Id}/profile_picture`}
                    />*/}
                    </AntCol>
                    <AntCol flex="auto" offset={1}>
                      <AntRow className="intern-dashboard-banner-text-row">
                        <Header
                          className="twentyEightFont intern-dashboard-banner-text"
                          color="white"
                        >
                          {student.formData["0"]["First Name"]}{" "}
                          {student.formData["0"]["Last Name"]}
                        </Header>
                      </AntRow>
                      <AntRow className="intern-dashboard-banner-text-row">
                        <Caption
                          className="eighteenFont intern-dashboard-banner-text"
                          color="white"
                          thin
                          style={{ marginTop: "-.5em", fontStyle: "italic" }}
                        >
                          {student.appliedFor}
                        </Caption>
                      </AntRow>
                      <AntRow className="mt-point-5">
                        <AntCol xs={24} md={12}>
                          <Caption className="sixteenFont" color="white">
                            <Caption color="#C5D1D8">Phone:</Caption> 6179311128
                          </Caption>
                        </AntCol>
                        <AntCol xs={24} md={12}>
                          <Caption className="sixteenFont" color="white">
                            <Caption color="#C5D1D8">Counselor Name:</Caption>{" "}
                            {student.school
                              ? student.school.counselorName
                              : "N/A"}
                          </Caption>
                        </AntCol>
                      </AntRow>
                      <AntRow className="mt-point-5">
                        <AntCol xs={24} md={12}>
                          <Caption className="sixteenFont" color="white">
                            <Caption color="#C5D1D8">Email:</Caption>{" "}
                            {student.formData["0"].Email}
                          </Caption>
                        </AntCol>
                        <AntCol xs={24} md={12}>
                          <Caption className="sixteenFont" color="white">
                            <Caption color="#C5D1D8">Counselor Email:</Caption>{" "}
                            {student.school ? student.school.email : "N/A"}
                          </Caption>
                        </AntCol>
                      </AntRow>
                      <AntRow className="mt-point-5">
                        <AntCol xs={24} md={12}>
                          <Caption className="sixteenFont" color="white">
                            <Caption color="#C5D1D8">School:</Caption>{" "}
                            {student.school ? student.school.name : "N/A"}
                          </Caption>
                        </AntCol>
                        <AntCol xs={24} md={12}>
                          <Caption className="sixteenFont" color="white">
                            <Caption color="#C5D1D8">Counselor Phone:</Caption>{" "}
                            {student.school ? student.school.phone : "N/A"}
                          </Caption>
                        </AntCol>
                      </AntRow>
                    </AntCol>
                  </AntRow>
                  <AntRow className="mt-2" gutter={[16, 0]}>
                    <AntCol xs={0} md={6} xl={4}>
                      <Link to={`/my-interns/${student.Id}/dashboard`}>
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
                    <AntCol xs={0} md={6} xl={4}>
                      <Link to={`/my-interns/${student.Id}/attendance`}>
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
                    <AntCol xs={0} md={6} xl={4}>
                      <Link to={`/my-interns/${student.Id}/feedback`}>
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
                    <AntCol xs={0} md={6} xl={4}>
                      <Link to={`/my-interns/${student.Id}/grades`}>
                        <NavigationButton
                          block
                          shape="round"
                          size="large"
                          active={this.props.location.pathname.includes(
                            "grades"
                          )}
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
              )}
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
                render={() => (
                  <InternDashboard
                    loading={this.props.loadingStatuses.isInternLoading}
                    functionLoading={this.state.loading}
                    student={student}
                    getAccess={this.props.getAccess}
                  />
                )}
              />
              <Route
                path={`/my-interns/:id/attendance`}
                exact
                component={() => (
                  <AttendanceRecord
                    student={student}
                    getAccess={this.props.getAccess}
                  />
                )}
              />
              <Route
                path={`/my-interns/:id/feedback`}
                exact
                component={() => (
                  <InternPastFeedback
                    student={student}
                    getAccess={this.props.getAccess}
                  />
                )}
              />
              <Route
                path={`/my-interns/:id/grades`}
                exact
                component={() => (
                  <InternPastGrades
                    student={student}
                    getAccess={this.props.getAccess}
                  />
                )}
              />
              <Route
                path={`/my-interns/:id/feedback/:id`}
                exact
                component={() => (
                  <InternPastFeedback
                    student={student}
                    fromDashboard={true}
                    getAccess={this.props.getAccess}
                  />
                )}
              />
            </ReactSwitch>
          </InnerContainer>
        </PageContainer>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InternPageContainer);
