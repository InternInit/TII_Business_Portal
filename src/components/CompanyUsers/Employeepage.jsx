import React, { Component } from "react";
import styled from "styled-components";
import { Button, Row as AntRow, Col as AntCol } from "antd";
import NavSearch from "../General/NavSearch.jsx";

import CompanyAccount from "./CompanyAccount";
import {
  PageContainer,
  InnerContainer,
} from "../Styled/FundamentalComponents.jsx";

import { withRouter, Link } from "react-router-dom";

const ButtonStyle = {
  width: "100%",
  minWidth: "170px",
  height: "40px",
  fontFamily: "roboto",
};

class Employeepage extends Component {
  render() {
    return (
      <PageContainer className="global-container">
        <NavSearch
          title="Company User Accounts"
          placeholder="Search Users"
          //@TODO implement functionality
          searchBar={false}
        />
        <InnerContainer className="py-2">
          <AntRow gutter={[32, 16]}>
            <AntCol xs={24} md={8} lg={5}>
              <Link to="/users/new-account">
                <Button type="default" style={ButtonStyle}>
                  <span className="sixteenFont">Add User Account</span>
                </Button>
              </Link>
            </AntCol>
          </AntRow>
          {this.props.users.map((user, index) => (
            <CompanyAccount
              name={user.name}
              role={user["custom:role"]}
              id={user.sub}
            />
          ))}
        </InnerContainer>
      </PageContainer>
    );
  }
}
export default Employeepage;
