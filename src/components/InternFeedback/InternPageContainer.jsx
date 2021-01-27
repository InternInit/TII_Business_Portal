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

import { Row as AntRow, Col as AntCol, Skeleton, Dropdown, Menu } from "antd";
import QueueAnim from "rc-queue-anim";
import { AiOutlineMenu } from "react-icons/ai";

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
    isInternLoading: state.loadingStatuses.isInternLoading,
  };
};

const mapDispatchToProps = {
  startInternLoading,
  finishInternLoading,
};

class InternPageContainer extends Component {

  componentDidMount() {
    console.log("Page Container Mounted");
  }

  componentWillUnmount() {
    console.log("Page Container Unmounted");
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

  render() {
    const student = this.props.interns.find(
      (student) => student.Id == this.props.location.pathname.split("/")[2]
    );

    return (
      <>
        <PageContainer>
          <NavSearch title="Intern Dashboard" />
          <InnerContainer className="mt-3 mb-4">
            <AntRow style={{ width: "100%" }}>
              {this.props.isInternLoading ? (
                <InternBannerSkeleton />
              ) : (
                <>
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
                              style={{
                                marginTop: "-.5em",
                                fontStyle: "italic",
                              }}
                            >
                              {student.appliedFor}
                            </Caption>
                          </AntRow>
                          <AntRow className="mt-point-5">
                            <AntCol xs={24} md={12}>
                              <Caption className="sixteenFont" color="white">
                                <Caption color="#C5D1D8">Phone:</Caption>{" "}
                                6179311128
                              </Caption>
                            </AntCol>
                            <AntCol xs={24} md={12}>
                              <Caption className="sixteenFont" color="white">
                                <Caption color="#C5D1D8">
                                  Counselor Name:
                                </Caption>{" "}
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
                                <Caption color="#C5D1D8">
                                  Counselor Email:
                                </Caption>{" "}
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
                                <Caption color="#C5D1D8">
                                  Counselor Phone:
                                </Caption>{" "}
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
                                this.props.location.pathname.includes(
                                  "dashboard"
                                )
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
                                this.props.location.pathname.includes(
                                  "attendance"
                                )
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
                                this.props.location.pathname.includes(
                                  "feedback"
                                )
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
                </>
              )}
            </AntRow>

            <ReactSwitch>
              <Route
                path={`/my-interns/:id`}
                exact
                render={() => (
                  <Redirect
                    to={`/my-interns/${this.props.match.params.id}/dashboard`}
                  />
                )}
              />
              <Route
                path={`/my-interns/:id/dashboard`}
                exact
                render={() => (
                  <InternDashboard
                    loading={this.props.isInternLoading}
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
                    loading={this.props.isInternLoading}
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
                    loading={this.props.isInternLoading}
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
                    loading={this.props.isInternLoading}
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
                    loading={this.props.isInternLoading}
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

const InternBannerSkeleton = (props) => {
  return (
    <TabContainer
      className="mb-1 py-2 px-6 intern-dashboard-banner"
      style={{ width: "100%" }}
    >
      <AntRow justify="center">
        <AntCol>
          <Skeleton.Avatar
            className="intern-banner-skeleton-avatar"
            size={150}
            active
          />
        </AntCol>
        <AntCol flex="auto" offset={1}>
          <AntRow className="intern-dashboard-banner-text-row">
            <Skeleton
              paragraph={false}
              className="intern-banner-skeleton-name"
              active
            />
          </AntRow>
          <AntRow className="intern-dashboard-banner-text-row">
            <Skeleton
              paragraph={false}
              className="intern-banner-skeleton-position"
              active
            />
          </AntRow>
          <AntRow className="mt-point-5">
            <AntCol xs={24} md={12}>
              <Skeleton
                paragraph={false}
                className="intern-banner-skeleton-caption"
                active
              />
            </AntCol>
            <AntCol xs={24} md={12}>
              <Skeleton
                paragraph={false}
                className="intern-banner-skeleton-caption"
                active
              />
            </AntCol>
          </AntRow>
          <AntRow className="mt-point-5">
            <AntCol xs={24} md={12}>
              <Skeleton
                paragraph={false}
                className="intern-banner-skeleton-caption"
                active
              />
            </AntCol>
            <AntCol xs={24} md={12}>
              <Skeleton
                paragraph={false}
                className="intern-banner-skeleton-caption"
                active
              />
            </AntCol>
          </AntRow>
          <AntRow className="mt-point-5">
            <AntCol xs={24} md={12}>
              <Skeleton
                paragraph={false}
                className="intern-banner-skeleton-caption"
                active
              />
            </AntCol>
            <AntCol xs={24} md={12}>
              <Skeleton
                paragraph={false}
                className="intern-banner-skeleton-caption"
                active
              />
            </AntCol>
          </AntRow>
        </AntCol>
      </AntRow>
      <AntRow className="mt-1" gutter={[16, 0]}>
        <AntCol xs={0} md={6} xl={4}>
          <NavigationButton block shape="round" size="large">
            Dashboard
          </NavigationButton>
        </AntCol>
        <AntCol xs={0} md={6} xl={4}>
          <NavigationButton block shape="round" size="large">
            Attendance
          </NavigationButton>
        </AntCol>
        <AntCol xs={0} md={6} xl={4}>
          <NavigationButton block shape="round" size="large">
            Feedback
          </NavigationButton>
        </AntCol>
        <AntCol xs={0} md={6} xl={4}>
          <NavigationButton block shape="round" size="large">
            Grades
          </NavigationButton>
        </AntCol>
      </AntRow>
    </TabContainer>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InternPageContainer);
