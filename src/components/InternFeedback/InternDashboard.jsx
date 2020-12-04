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
          <TabContainer style={{ width: "100%", height: "400px" }} />
        </AntCol>
        <AntCol className="mt-1 px-1" span={8}>
          <TabContainer style={{ width: "100%", height: "400px" }} />
        </AntCol>
        <AntCol className="mt-1 pl-1" span={8}>
          <TabContainer style={{ width: "100%", height: "400px" }} />
        </AntCol>
      </AntRow>
    </>
  );
};

export default InternDashboard;
