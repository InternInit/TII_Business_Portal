import React from "react";
import { Layout, Menu, Avatar } from "antd";
import { withRouter, Link } from "react-router-dom";
import {
  PieChartOutlined,
  SettingOutlined,
  TeamOutlined,
  ContactsOutlined,
  SendOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const { Sider } = Layout;

//CSS Constants
const navbarStyle = {
  position: "fixed",
  height: "100vh",
  boxShadow: "2px 4px 8px 2px rgba(0,0,0,0.25)",
};

const BusinessNavBar = (props) => {
  let location = useLocation();

  const findPath = () => {
    if (location.pathname.includes("my-interns")) {
      return "4";
    } else if (location.pathname.includes("dashboard") || location.pathname === "/") {
      return "1";
    } else if (location.pathname.includes("internship-listings")) {
      return "2";
    } else if (location.pathname.includes("applicants")) {
      return "3";
    } else if (location.pathname.includes("users")) {
      return "5";
    } else {
      return "6";
    }
  };

  return (
    <Sider collapsed="true" style={navbarStyle}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Avatar
          size={36}
          style={{ marginTop: "10vh" }}
          icon={<UserOutlined />}
        />
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={findPath()}
        style={{ marginTop: "10vh" }}
      >
        <Menu.Item key="1">
          <Link to="/dashboard">
            <PieChartOutlined />
            <span>Overview</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="2">
          <Link to="/internship-listings">
            <DatabaseOutlined />
            <span>Internship Listings</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="3">
          <Link to="/applicants">
            <TeamOutlined />
            <span>Applicants</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="4">
          <Link to="/my-interns">
            <ContactsOutlined />
            <span>My Interns</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="5">
          <Link to="/users">
            <UserSwitchOutlined />
            <span>User Accounts</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="6">
          <Link to="/settings">
            <SettingOutlined />
            <span>Settings</span>
          </Link>
        </Menu.Item>

        <Menu.Item
          key="7"
          style={{ marginTop: "20vh" }}
          onClick={() => {
            props.logout();
          }}
        >
          <LogoutOutlined />
          <span>Log Out</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
export default withRouter(BusinessNavBar);
