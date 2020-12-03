import React, { Component } from "react";
import NavSearch from "../General/NavSearch.jsx";
import {
  Header,
  Caption,
  TabContainer,
  PageContainer,
  InnerContainer,
} from "../Styled/FundamentalComponents.jsx";
import { students } from "../../Fake_Students.js";
import { Row as AntRow, Col as AntCol, Avatar } from "antd";

class InternDashboard extends Component {
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
              className="mb-1 py-2 px-4 intern-dashboard-banner"
              style={{ width: "100%", height: "225px" }}
            >
              <AntRow>
                <AntCol className="universal-middle">
                  <Avatar size={128} src={student.image} />
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
                      <Caption className="sixteenFont" color="white">Phone: 6179311128</Caption>
                    </AntCol>
                    <AntCol span={12}>
                      <Caption className="sixteenFont" color="white">
                        Counselor Name: {student.school.contact}
                      </Caption>
                    </AntCol>
                  </AntRow>
                  <AntRow className="mt-point-5">
                    <AntCol span={12}>
                      <Caption className="sixteenFont" color="white">Email: {student.email}</Caption>
                    </AntCol>
                    <AntCol span={12}>
                      <Caption className="sixteenFont" color="white">
                        Counselor Email: {student.school.email}
                      </Caption>
                    </AntCol>
                  </AntRow>
                  <AntRow className="mt-point-5">
                    <AntCol span={12}>
                      <Caption className="sixteenFont" color="white">School: {student.school.name}</Caption>
                    </AntCol>
                    <AntCol span={12}>
                      <Caption className="sixteenFont" color="white">
                        Counselor Phone: {student.school.phone}
                      </Caption>
                    </AntCol>
                  </AntRow>
                </AntCol>
              </AntRow>
            </TabContainer>
          </AntRow>
          <AntRow style={{ width: "100%" }}>
            <TabContainer
              className="my-1"
              style={{ width: "100%", height: "75px" }}
            />
          </AntRow>
          <AntRow justify="center" style={{ width: "100%" }}>
            <AntCol className="mt-1 pr-1" span={8}>
              <TabContainer style={{ width: "100%", height: "400px" }} />
            </AntCol>
            <AntCol className="mt-1 px-1" span={8}>
              <TabContainer style={{ width: "100%", height: "400px" }} />
            </AntCol>
            <AntCol className="mt-1 pl-1" span={8}>
              <TabContainer style={{ width: "100%", height: "400px" }} />
            </AntCol>
          </AntRow>
        </PageContainer>
      </>
    );
  }
}

export default InternDashboard;
