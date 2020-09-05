import React from "react";
import {
    Input,
    Button,
    Form,
    Popover,
    notification,
    Modal,
    Checkbox,
} from "antd";
import {
    Container,
    Background,
    Label,
    Banner,
} from "./SignupLogin";

//Ant D Icons
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import EmailConfirmation from "./EmailConfirmation.jsx";


import { withRouter } from "react-router";




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



class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailConfirmationVisible: false,
            email: "default@email.com",
            username: "",
            password: "",
        };
    }

    formRef = React.createRef();
    emailFormRef = React.createRef();

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
            <Background>
                <Container >
                    <Banner style={{ marginTop: "0px", width: "100%" }}>
                        New Company Account
          </Banner>
                    <div style={{ width: "70%" }}>
                        <Form onFinish={this.handleSubmit} ref={this.formRef}>
                            <Label style={{ marginTop: "24px" }}>Username</Label>
                            <Form.Item {...formItemProps.username} name="username">
                                <Input />
                            </Form.Item>

                            <Label>Company Name Name</Label>
                            <Form.Item {...formItemProps.name} name="name">
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

                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please read the Terms and Conditions and Privacy Agreement",
                                    },
                                ]}
                                name="termsAndConditions"
                                onChange={this.onChecked}
                                style={{ textAlign: "left" }}
                            >
                                <Checkbox autoFocus={true}>
                                    I agree to the Terms and Conditions and Privacy Agreement
                </Checkbox>
                            </Form.Item>
                            <Button
                                className="profile-button-style"
                                type="primary"
                                htmlType="submit"
                                style={{
                                    width: "100%",

                                    display: 'flex',
                                    justifySelf: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                Sign Up
              </Button>
                        </Form>
                    </div>
                </Container>
                <Modal
                    title="Email Confirmation"
                    visible={this.state.emailConfirmationVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <EmailConfirmation
                        email={this.state.email}
                        formRef={this.emailFormRef}
                    />
                </Modal>
            </Background>
        );
    }

}
export default withRouter(SignUp);
