import React, { Component } from "react";
import "../../App.scss";

import {
  Menu
} from "antd";

const SortByMenu = (props) => {
  return (
    <Menu>
      <Menu.Item onClick={() => props.setSort("First Name")}>
        First Name
      </Menu.Item>
      <Menu.Item onClick={() => props.setSort("Last Name")}>
        Last Name
      </Menu.Item>
      <Menu.Item onClick={() => props.setSort("School")}>School</Menu.Item>
      <Menu.Item onClick={() => props.setSort("Position")}>Position</Menu.Item>
      {props.gpa && (
        <Menu.Item onClick={() => props.setSort("GPA")}>GPA</Menu.Item>
      )}
    </Menu>
  );
};

export default SortByMenu;
