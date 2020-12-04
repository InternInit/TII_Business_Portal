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
import { Row as AntRow, Col as AntCol, Avatar } from "antd";
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
                      style={{ marginTop: "-.5em" }}
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
            </TabContainer>
          </AntRow>

          <AntRow style={{ width: "100%" }}>
            <TabContainer
              className="my-1 py-1 universal-center intern-dashboard-navigation"
              style={{ width: "100%" }}
            >
              <AntRow justify="center" align="middle">
                <AntCol span={6} style={{ borderRight: "2px solid #bfbfbf" }}>
                  <NavigationLink className="twentyFont">
                    Dashboard
                  </NavigationLink>
                </AntCol>
                <AntCol span={6} style={{ borderRight: "2px solid #bfbfbf" }}>
                  <NavigationLink className="twentyFont">
                    Attendance
                  </NavigationLink>
                </AntCol>
                <AntCol span={6} style={{ borderRight: "2px solid #bfbfbf" }}>
                  <NavigationLink className="twentyFont">
                    Feedback
                  </NavigationLink>
                </AntCol>
                <AntCol span={6}>
                  <NavigationLink className="twentyFont">Grades</NavigationLink>
                </AntCol>
              </AntRow>
            </TabContainer>
          </AntRow>

          <ReactSwitch>
            <Route
              path={`/intern-feedback/:id`}
              exact
              render={() => <Redirect to={`/intern-feedback/:id/dashboard`} />}
            />
            <Route
              path={`/intern-feedback/:id/dashboard`}
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
