import React, {Component} from 'react';
import NavSearch from "../General/NavSearch.jsx";
import {Header, Caption, TabContainer, PageContainer, InnerContainer} from "../Styled/FundamentalComponents.jsx";
import {Row as AntRow, Col as AntCol} from "antd";

class InternDashboard extends Component {
  render() {
    return (
      <>
        <NavSearch title="Intern Dashboard" />
        <PageContainer className="global-container px-6 pt-2">
          <AntRow style={{width: "100%"}}>
            <TabContainer className="mb-1"style={{width: "100%", height: "250px"}} />
          </AntRow>
          <AntRow style={{width: "100%"}}>
            <TabContainer className="my-1" style={{width: "100%", height: "100px"}} />
          </AntRow>
          <AntRow justify="center" style={{width: "100%"}}>
            <AntCol className="mt-1 pr-1" span={8}>
              <TabContainer style={{width: "100%", height: "400px"}} />
            </AntCol>
            <AntCol className="mt-1 px-1" span={8}>
              <TabContainer style={{width: "100%", height: "400px"}} />
            </AntCol>
            <AntCol className="mt-1 pl-1" span={8}>
              <TabContainer style={{width: "100%", height: "400px"}} />
            </AntCol>
          </AntRow>
        </PageContainer>
      </>
    )
  }
}

export default InternDashboard;