import React from "react";
import { Row as AntRow, Col as AntCol } from "antd";
import {
  Header,
  Caption,
  TabContainer,
} from "../Styled/FundamentalComponents.jsx";

import { Link } from "react-router-dom";

const PageListings = (props) => {
  let { name, interns, accepted, industry, id } = props;
  return (
    <Link
    to={`/internship-listings/${id}`}
    >
    <TabContainer
      className="px-3 py-1 dashboard-tab"
    >
      {/**
       *
       * Listing name + Industry
       *
       */}
      <AntRow align="middle" gutter={[16, 0]}>
        <AntCol xs={12} md={12} xl={15}>
          <AntRow>
            <Header className="eighteenFont mb-point-25" bolded>
              {name}
            </Header>
          </AntRow>
          <AntRow>
            <Caption
              style={{ color: "#262626", marginTop: "-1vh" }}
              className="fourteenFont"
            >
              {industry}
            </Caption>
          </AntRow>
        </AntCol>

        <AntCol xs={12} md={4} xl={3}>
          <AntRow justify="center">
            <Header bolded className="fourteenFont">
              {interns}{" "}
            </Header>
          </AntRow>
          <AntRow justify="center">
            <Caption light>Applicants</Caption>
          </AntRow>
        </AntCol>

        <AntCol xs={0} md={4} xl={3}>
          <AntRow justify="center">
            <Header bolded className="fourteenFont">
              {accepted}
            </Header>
          </AntRow>
          <AntRow justify="center">
            <Caption light>Accepted</Caption>
          </AntRow>
        </AntCol>

        <AntCol xs={0} md={4} xl={3}>
          <AntRow justify="center">
            <Header bolded className="fourteenFont">
              {interns + accepted}
            </Header>
          </AntRow>
          <AntRow justify="center">
            <Caption light>Total</Caption>
          </AntRow>
        </AntCol>
      </AntRow>
    </TabContainer>
    </Link>
    
  );
};
export default PageListings;
