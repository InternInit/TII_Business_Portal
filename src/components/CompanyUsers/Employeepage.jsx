import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "antd";
import NavSearch from "../General/NavSearch.jsx";

import CompanyAccount from "./CompanyAccount";

import { withRouter, Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-width: 600px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 4vh;
  margin-bottom: 4vh;

  width: 85vh;
  justify-content: space-between;
  align-self: flex-start;
`;

//CSS Constants
const pageStyle = {
  display: "flex",
  width: "90%",
  flexDirection: "column",
  justifySelf: "center",
};

const AddFilterStyle = {
  width: "270px",
  height: "40px",
  fontFamily: "roboto",
  fontColor: "#13C2C2",
  marginTop: "33px",
  align: "inline-block",
};

const ButtonText = styled.span`
  font-family: roboto;
  color: #13c2c2;
  font-size: 18px;
`;

class Employeepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render() {
    return (
      <Container className="global-container">
        <NavSearch title="Company User Accounts" placeholder="Search Users"/>

        <div style={pageStyle}>
          <Row>
            <Link to="/users/new-account">
              <Button style={AddFilterStyle}>
                <ButtonText> Add User Account</ButtonText>
              </Button>
            </Link>
          </Row>

          <CompanyAccount />
        </div>
      </Container>
    );
  }
}
export default Employeepage;
