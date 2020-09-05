import React from "react";
import styled from "styled-components";
import { Input, Button, Form, notification } from "antd";
import {
    Container,
    Background,
    Label,
    Banner,
} from "./SignupLogin";

import { Link } from "react-router-dom";

//Ant D Icons
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import { withRouter } from "react-router";

import './Login.css'

//Styled Components
const ForgotPass = styled.a`
  display: flex;
  text-align: left;
  font-weight: 500;
  width: 80%;
  margin-top: -19px;
`;


class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <Background>
                <Container >
                    <Banner style={{ marginTop: "0px", width: '100%' }}>
                        Company Login
          </Banner>
                    <div style={{ width: "70%" }}>
                        <Form onFinish={this.handleSubmit}>
                            <Label style={{ marginTop: "24px" }}>Username</Label>
                            <Form.Item name="username">
                                <Input />
                            </Form.Item>
                            <Label>Password</Label>
                            <Form.Item name="password">
                                <Input.Password />
                            </Form.Item>
                            <ForgotPass>Forgot Password</ForgotPass>
                            <Button
                                className="profile-button-style"
                                type="primary"
                                htmlType="submit"
                                style={{
                                    /*ORDER MATTERS DON'T SWITCH*/

                                    margin: "auto",
                                    marginTop: "30px",

                                    display: 'flex',
                                    justifySelf: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                Log In
              </Button>
                            <Label style={{ marginTop: "10%" }}>
                                Don't have an account?
                <Link to="/signup"> Sign up here</Link>
                            </Label>
                        </Form>
                    </div>
                </Container>
            </Background>
        );
    }


}
export default withRouter(LogIn);
