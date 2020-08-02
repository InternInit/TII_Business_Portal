import React from "react";
import { Layout, Menu, Avatar } from "antd";
import { withRouter, Link } from "react-router-dom";
import {
  PieChartOutlined,
  SettingOutlined,
  TeamOutlined,
  EditOutlined,
  SendOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  UserOutlined
} from "@ant-design/icons";

const { Sider } = Layout;

//CSS Constants
const navbarStyle = {
  position: "fixed",
  height: "100vh",
  boxShadow: "2px 4px 8px 2px rgba(0,0,0,0.25)"
};

class BusinessNavBar extends React.Component {
  findPath = () => {
    if (this.props.location.pathname.includes("dashboard")) {
      return "1";
    } else if (this.props.location.pathname.includes("internship-listings")) {
      return "2";
    } else if (this.props.location.pathname.includes("applicants")) {
      return "3";
    } else if (this.props.location.pathname.includes("contact-schools")) {
      return "4";
    } else {
      return "5";
    }
  };

  render() {
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
          defaultSelectedKeys={this.findPath()}
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
            <Link to="/contact-schools">
              <SendOutlined />
              <span>Message School</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="5">
            <Link to="/intern-feedback">
              <EditOutlined />
              <span>Intern Feedback</span>
            </Link>
          </Menu.Item>


          <Menu.Item key="6">
            <Link to="/settings">
              <SettingOutlined />
              <span>Settings</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="7" style={{ marginTop: "20vh" }}>
            <LogoutOutlined />
            <span>Log Out</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
  routeChange = path => {
    this.props.history.push(path);
  };
}
export default withRouter(BusinessNavBar);
