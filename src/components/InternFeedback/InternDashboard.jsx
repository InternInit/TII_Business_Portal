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
      student: null
    }
  }

  findStudent = () => {
    const id = this.props.location.pathname.split("/");
    this.setState({student: students.find(student => student.id === Number(id[2]))});
  }

  componentDidMount() {
    this.findStudent();
  }
  

  render() {
    return (
      <>
        <NavSearch title="Intern Dashboard" />
        <PageContainer className="global-container px-6 pt-2">
          <AntRow style={{ width: "100%" }}>
            <TabContainer
              className="mb-1 py-3 px-4 intern-dashboard-banner"
              style={{ width: "100%", height: "250px"}}
            >
              <AntRow>
                <AntCol>
                  <Avatar size={128} />
                </AntCol>
                <AntCol>

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
