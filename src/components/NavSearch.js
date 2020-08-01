import React, { Component } from "react";
import styled from "styled-components";
import { Input } from "antd";

const { Search } = Input;

const Header = styled.span`
  font-size: 48px;
  font-weight: 600;
  color: black;
  margin-left: 5%;
`;

//CSS Constants
const containerStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  paddingTop: "2vh",
  paddingBottom: "2vh",
  backgroundColor: "white"
}

class NavSearch extends Component {
  render() {
    return (
      <div
        style={containerStyle}
      >
        <Header style={{ width: "45%" }}>{this.props.title}</Header>
        {this.props.searchBar ? (
          <Search
            style={{
              width: "40%",
              height: "40px",
              borderRadius: "24px"
            }}
            size="large"
          />
        ) : null}
      </div>
    );
  }
}

NavSearch.defaultProps = {
  searchBar: true
};
export default NavSearch;
