import React, { Component } from "react";
import { Button, Row as AntRow, Col as AntCol } from "antd";
import { Transition, config } from "react-spring/renderprops";
import NavSearch from "../General/NavSearch.jsx";

import CompanyAccount, { CompanyAccountSkeleton } from "./CompanyAccount";
import {
  PageContainer,
  InnerContainer,
} from "../Styled/FundamentalComponents.jsx";

import { Link } from "react-router-dom";
import _ from "underscore";

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
        <Transition
          items={this.props.location.pathname}
          from={{ opacity: 0.5, transform: "translateY(20px)" }}
          enter={{ opacity: 1, transform: "translateY(0px)" }}
          leave={{ opacity: 1 }}
          config={config.stiff}
        >
          {(location) => (props) => (
            <InnerContainer
              key="employeePageContainer"
              className="py-2"
              style={{ ...props }}
            >
              <AntRow gutter={[32, 16]} className="mb-1">
                <AntCol xs={24} md={8} lg={5}>
                  <Link to="/users/new-account">
                    <Button type="default" style={ButtonStyle}>
                      <span className="sixteenFont">Add User Account</span>
                    </Button>
                  </Link>
                </AntCol>
              </AntRow>
              {this.props.loading ? (
                <>
                  {_.times(localStorage.getItem("NumUsers"), () => (
                    <CompanyAccountSkeleton />
                  ))}
                </>
              ) : (
                this.props.users.map((user, index) => (
                  <CompanyAccount
                    name={user.name}
                    role={user["custom:role"]}
                    id={user.sub}
                  />
                ))
              )}
            </InnerContainer>
          )}
        </Transition>
      </PageContainer>
    );
  }
}
export default Employeepage;
