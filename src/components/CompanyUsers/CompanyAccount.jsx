import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "antd";

import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  background-color: white;

  border-radius: 4px;
  min-height: 12vh;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #d8def3;

  box-shadow: 1px 1px 5px -4px;
`;

const UserName = styled.span`
  font-size: 24px;
  font-family: Roboto;

  color: #000000;
`;
const PositionName = styled.span`
  font-size: 16px;
  font-family: Roboto;
  margin-top: -1vh;

  color: #10239e;
`;

const tabStyle = {
  width: "80%",

  display: "flex",
  flexDirection: "row",

  justifyContent: "space-between",
  alignItems: "center",
};

const RemoveButtonStyle = {
  width: "200px",
  height: "40px",
  fontFamily: "roboto",
  align: "inline-block",

  backgroundColor: "#fafafa",
};

const ButtonText = styled.span`
  font-family: roboto;
  color: #13c2c2;
  font-size: 18px;
`;

class CompanyAccount extends Component {
  render() {
    let { id } = this.props;
    return (
      <Container>
        <div style={tabStyle}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <UserName>{this.props.name}</UserName>
            <PositionName>{this.props.role}</PositionName>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "45%",
              justifyContent: "space-between",
            }}
          >
            <Button style={RemoveButtonStyle}>
              <ButtonText>Remove</ButtonText>
            </Button>
            <Button style={RemoveButtonStyle}>
              <Link to={`/users/${id}`}>
                <ButtonText>Details</ButtonText>
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    );
  }
}
export default CompanyAccount;
