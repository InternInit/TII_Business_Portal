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

const InternDashboard = (props) => {
  return (
    <>
      <AntRow justify="center" style={{ width: "100%" }}>
        <AntCol className="mt-1 pr-1" span={8}>
          <TabContainer
            className="py-1 px-2"
            style={{ width: "100%", height: "45vh" }}
          >
            <AntRow justify="start" style={{borderBottom: "1px solid #f0f0f0"}}>
              <Header className="twentyFont mb-point-25" bolded>
                Attendance Sheet
              </Header>
            </AntRow>
          </TabContainer>
        </AntCol>
        <AntCol className="mt-1 px-1" span={8}>
          <TabContainer
            className="py-1 px-2"
            style={{ width: "100%", height: "45vh" }}
          >
            <AntRow justify="start" style={{borderBottom: "1px solid #f0f0f0"}}>
              <Header className="twentyFont mb-point-25" bolded>
                Student Feedback
              </Header>
            </AntRow>
          </TabContainer>
        </AntCol>
        <AntCol className="mt-1 pl-1" span={8}>
          <TabContainer
            className="py-1 px-2"
            style={{ width: "100%", height: "45vh" }}
          >
            <AntRow justify="start" style={{borderBottom: "1px solid #f0f0f0"}}>
              <Header className="twentyFont mb-point-25" bolded>
                Employer Grades
              </Header>
            </AntRow>
          </TabContainer>
        </AntCol>
      </AntRow>
    </>
  );
};

export default InternDashboard;
