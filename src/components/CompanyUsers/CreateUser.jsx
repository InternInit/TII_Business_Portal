import React from "react";
import styled from "styled-components";


import NavSearch from "../General/NavSearch.jsx";

import {
    Input,
    Button,
    Form,
    Popover,
    Divider,
    Switch
} from "antd";
import {
    Container,
    Background,
    Label,
} from "../LoginSignup/SignupLogin";

//Ant D Icons
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import EmailConfirmation from "../LoginSignup/EmailConfirmation.jsx";


import { withRouter } from "react-router";

export const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fafafa;
  width: 60%;
  height: auto;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  padding-bottom: 24px;

  margin-top:8vh;
  margin-bottom:4vh;

 `;

const pageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    float: "center",
    backgroundColor: '#eceff9'

}

const validationRules = (required, inputName, type, pattern) => [
    {
        required: required,
        message: "Please input your " + inputName,
        type: type,
        pattern: pattern,
    },
];

const formItemProps = {
    username: {
        rules: validationRules(true, "username", "string"),
    },
    position: {
        //Implement Custom Validation Rules
    },
    password: {
        //Implement Custom Validation Rules
    },
    confirmPassword: {
        rules: [
            {
                required: true,
                message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
                validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                    }

                    return Promise.reject(
                        "The two passwords that you entered do not match!"
                    );
                },
            }),
        ],
    },
    email: {
        rules: validationRules(true, "email", "email"),
    },
};


class CreateUser extends React.Component {
    render() {

        const title = "Password Policy";
        const passwordPolicyContent = (
            <React.Fragment>
                <h4>Your password should contain: </h4>
                <ul>
                    <li>Minimum length of 8 characters</li>
                    <li>Numerical characters (0-9)</li>
                    <li>Special characters</li>
                    <li>Uppercase letter</li>
                    <li>Lowercase letter</li>
                </ul>
            </React.Fragment>
        );


        return (
            <React.Fragment>
                <NavSearch title="Create Company Account" searchBar={false} />
                <div
                    style={pageStyle}
                >
                    <SignupContainer >
                        <div style={{ width: "70%" }}>
                            <Form onFinish={this.handleSubmit} ref={this.formRef}>
                                <Label style={{ marginTop: "24px" }}>Username</Label>
                                <Form.Item {...formItemProps.username} name="username">
                                    <Input />
                                </Form.Item>

                                <Label>Position Title</Label>

                                <Form.Item {...formItemProps.position} name="position">
                                    <Input />
                                </Form.Item>

                                <Label>Password</Label>
                                <Popover
                                    placement="right"
                                    title={title}
                                    content={passwordPolicyContent}
                                    trigger="focus"
                                >
                                    <Form.Item
                                        {...formItemProps.password}
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter your password",
                                            },

                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                </Popover>
                                <Label>Confirm Password</Label>
                                <Form.Item
                                    {...formItemProps.confirmPassword}
                                    name="confirm-password"
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Divider style={{ fontFamily: 'roboto' }}>Permissions</Divider>

                                <Label style={{ marginTop: '4vh' }}>Administrator</Label>
                                <Switch />

                                <Label style={{ marginTop: '4vh' }}>Permission 2</Label>
                                <Switch />

                                <Label style={{ marginTop: '4vh' }}>Permission 3</Label>
                                <Switch />

                                <Label style={{ marginTop: '4vh' }}>Permission 4</Label>
                                <Switch />

                                <Label style={{ marginTop: '4vh' }}>Permission 5</Label>
                                <Switch style={{ marginBottom: '4vh' }} />





                                <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
                                    <Button
                                        className="profile-button-style"
                                        type="primary"
                                        htmlType="submit"
                                        style={{
                                            width: "50%",

                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        Create Account
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </SignupContainer>


                </div>
            </React.Fragment >
        );
    }

}
export default CreateUser;
