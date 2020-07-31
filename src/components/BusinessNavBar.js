import React from "react";
import { Layout, Menu, Avatar } from "antd";
import {
    PieChartOutlined,
    SettingOutlined,
    TeamOutlined,
    EditOutlined,
    SendOutlined,
    DatabaseOutlined,
    LogoutOutlined,
    UserOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

class BusinessNavBar extends React.Component {
    render() {
        return (
            <Sider
                collapsed='true'
                style={{
                    position: 'fixed',
                    height: '100vh',
                    boxShadow: '2px 4px 8px 2px rgba(0,0,0,0.25)',
                }} >
                <Avatar size={36} style={{ marginTop: '4vh', }} icon={<UserOutlined />} />

                <Menu
                    theme='dark'
                    defaultSelectedKeys={'1'}
                    style={{ marginTop: "10vh", }}>
                    <Menu.Item key='1'>
                        <PieChartOutlined />
                        <span>Overview</span>
                    </Menu.Item>
                    <Menu.Item key='2'>
                        <DatabaseOutlined />
                        <span>Data</span>
                    </Menu.Item>
                    <Menu.Item key='3'>
                        <TeamOutlined />
                        <span>Applicants</span>
                    </Menu.Item>
                    <Menu.Item key='4'>
                        <EditOutlined />
                        <span>Feedback</span>
                    </Menu.Item>
                    <Menu.Item key='5'>
                        <SendOutlined />
                        <span>Message School</span>
                    </Menu.Item>
                    <Menu.Item key='6'>
                        <SettingOutlined />
                        <span>Settings</span>
                    </Menu.Item>

                    <Menu.Item key='7' style={{ marginTop: "20vh" }}>
                        <LogoutOutlined />
                        <span>Log Out</span>
                    </Menu.Item>

                </Menu>
            </Sider >
        )
    }
} export default BusinessNavBar;