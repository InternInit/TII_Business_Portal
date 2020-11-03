import React, { Component } from "react";
import styled from "styled-components";
import { Input } from "antd";

const { Search } = Input;

const Header = styled.span`
  font-weight: 600;
  color: black;
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
        <Header className="thirtySixFont ml-1-5" style={{ width: "45%" }}>{this.props.title}</Header>
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
