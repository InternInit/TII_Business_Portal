import React, { Component } from "react";
import NavSearch from "../General/NavSearch.jsx";
import {
  Header,
  Caption,
  NavigationLink,
  TabContainer,
  PageContainer,
  InnerContainer,
} from "../Styled/FundamentalComponents.jsx";
import { students } from "../../Fake_Students.js";
import { Row as AntRow, Col as AntCol, Avatar, Button } from "antd";
import InternDashboard from "./InternDashboard.jsx";

import { Link, Route, Switch as ReactSwitch, Redirect } from "react-router-dom";

class InternPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      student: null,
    };
  }

  findStudent = () => {
    const id = this.props.location.pathname.split("/");
    this.setState({
      student: students.find((student) => student.id === Number(id[2])),
    });
    this.setState({ loading: false });
  };

  componentDidMount() {
    this.findStudent();
  }

  render() {
    const { student } = this.state;

    return this.state.loading ? (
      <h1>Hello</h1>
    ) : (
      <>
        <NavSearch title="Intern Dashboard" />
        <PageContainer className="global-container px-6 pt-2">
          <AntRow style={{ width: "100%" }}>
            <TabContainer
              className="mb-1 py-2 px-6 intern-dashboard-banner"
              style={{ width: "100%" }}
            >
              <AntRow>
                <AntCol className="universal-middle">
                  <Avatar size={150} src={student.image} />
                </AntCol>
                <AntCol flex="auto" offset={1}>
                  <AntRow>
                    <Header
                      className="twentyEightFont intern-dashboard-banner-text"
                      color="white"
                    >
                      {student.firstName} {student.lastName}
                    </Header>
                  </AntRow>
                  <AntRow>
                    <Caption
                      className="eighteenFont intern-dashboard-banner-text"
                      color="white"
                      thin
                      style={{ marginTop: "-.5em", fontStyle: "italic" }}
                    >
                      {student.position}
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
                        {student.school.contact}
                      </Caption>
                    </AntCol>
                  </AntRow>
                  <AntRow className="mt-point-5">
                    <AntCol span={12}>
                      <Caption className="sixteenFont" color="white">
                        <Caption color="#C5D1D8">Email:</Caption>{" "}
                        {student.email}
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
                  <Button
                    style={{ width: "100%" }}
                    shape="round"
                    size="large"
                    type={this.props.location.pathname.includes("dashboard") ? "primary" : "default"}
                    ghost={!this.props.location.pathname.includes("dashboard")}
                  >
                    Dashboard
                  </Button>
                </AntCol>
                <AntCol span={4}>
                  <Button
                    style={{ width: "100%" }}
                    shape="round"
                    size="large"
                    ghost
                  >
                    Attendance
                  </Button>
                </AntCol>
                <AntCol span={4}>
                  <Button
                    style={{ width: "100%" }}
                    shape="round"
                    size="large"
                    ghost
                  >
                    Feedback
                  </Button>
                </AntCol>
                <AntCol span={4}>
                  <Button
                    style={{ width: "100%" }}
                    shape="round"
                    size="large"
                    ghost
                  >
                    Grades
                  </Button>
                </AntCol>
              </AntRow>
            </TabContainer>
          </AntRow>

          <AntRow style={{ width: "100%" }}>
            <TabContainer
              className="my-1 py-1 universal-center intern-dashboard-navigation"
              style={{ width: "100%" }}
            >
              <AntRow justify="center" align="middle">
                <AntCol span={6} style={{ borderRight: "2px solid #bfbfbf" }}>
                  <NavigationLink
                    className="twentyFont"
                    active={this.props.location.pathname.includes("dashboard")}
                  >
                    Dashboard
                  </NavigationLink>
                </AntCol>
                <AntCol span={6} style={{ borderRight: "2px solid #bfbfbf" }}>
                  <NavigationLink
                    className="twentyFont"
                    active={this.props.location.pathname.includes("attendance")}
                  >
                    Attendance
                  </NavigationLink>
                </AntCol>
                <AntCol span={6} style={{ borderRight: "2px solid #bfbfbf" }}>
                  <NavigationLink
                    className="twentyFont"
                    active={this.props.location.pathname.includes("feedback")}
                  >
                    Feedback
                  </NavigationLink>
                </AntCol>
                <AntCol span={6}>
                  <NavigationLink
                    className="twentyFont"
                    active={this.props.location.pathname.includes("grades")}
                  >
                    Grades
                  </NavigationLink>
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
              component={InternDashboard}
            />
          </ReactSwitch>
        </PageContainer>
      </>
    );
  }
}

export default InternPageContainer;
