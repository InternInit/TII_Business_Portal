import React from "react";
import styled from "styled-components";
import {
  Input,
  Button,
  Form,
  notification,
  message,
  Modal,
  Popover,
  Row as AntRow,
  Col as AntCol,
} from "antd";
import { Label, ImageText } from "./SignupLogin";
import { Header } from "../Styled/FundamentalComponents.jsx";
import { ReactComponent as LoginSignupIcon } from "../../Assets/LoginSignupImage.svg";
import { Transition, config } from "react-spring/renderprops";

import { Link } from "react-router-dom";

import { Auth } from "aws-amplify";

//Ant D Icons
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import { withRouter } from "react-router";

const passwordValidator = require("password-validator");

const schema = new passwordValidator();

schema.is().min(8).has().uppercase().has().lowercase().has().digits();

const validationRules = (required, inputName, type, pattern) => [
  {
    required: required,
    message: "Please enter a valid " + inputName,
    type: type,
    pattern: pattern,
  },
];

//Styled Components
const ForgotPass = styled.a`
  display: flex;
  text-align: left;
  font-weight: 500;
  width: 80%;
  margin-top: -19px;
`;

const openSuccessfulNotification = (title, description) => {
  notification.open({
    message: title,
    description: description,
    icon: <CheckOutlined style={{ color: "green" }} />,
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};

const openUnsuccessfulNotification = (title, description) => {
  notification.open({
    message: title,
    description: description,
    icon: <CloseOutlined style={{ color: "red" }} />,
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};

const formItemProps = {
  username: {
    rules: validationRules(true, "username", "string"),
  },
  confirmPassword: {
    rules: [
      {
        required: true,
        message: "Please confirm your password!",
      },
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (!value || getFieldValue("new-pass") === value) {
            return Promise.resolve();
          }

          return Promise.reject(
            "The two passwords that you entered do not match!"
          );
        },
      }),
    ],
  },
};

function ForgotPassForm(props) {
  const emailSent = props.emailSent;
  const formRef = props.formRef;

  const title = "Password Policy";
  const passwordPolicyContent = (
    <React.Fragment>
      <h4>Your password should contain: </h4>
      <ul>
        <li>Minimum length of 8 characters</li>
        <li>Numerical characters (0-9)</li>
        <li>Uppercase letters</li>
        <li>Lowercase letters</li>
      </ul>
    </React.Fragment>
  );

  if (!emailSent) {
    return (
      <Form ref={formRef}>
        <Label>Username</Label>
        <Form.Item {...formItemProps.username} name="username">
          <Input />
        </Form.Item>
      </Form>
    );
  } else {
    return (
      <Form ref={formRef}>
        <Label>Confirmation Code</Label>
        <Form.Item name="conf-code">
          <Input />
        </Form.Item>
        <Label>New Password</Label>
        <Popover
          placement="right"
          title={title}
          content={passwordPolicyContent}
          trigger="focus"
        >
          <Form.Item
            name="new-pass"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  let errors = schema.validate(value, { list: true });

                  function getValidationMessage(errors) {
                    for (let i = 0; i < errors.length; i++) {
                      if (errors[i] === "min") {
                        return "Password length should be at least 8 characters";
                      } else if (errors[i] === "lowercase") {
                        return "Password should contain lowercase letters";
                      } else if (errors[i] === "uppercase") {
                        return "Password should contain uppercase letters";
                      } else if (errors[i] === "digits") {
                        return "Password should contain digits";
                      } else if (errors[i] === "symbols") {
                        return "Password should contain symbols";
                      }
                    }
                  }

                  if (typeof getValidationMessage(errors) == "undefined") {
                    return Promise.resolve();
                  }

                  return Promise.reject(getValidationMessage(errors));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Popover>
        <Label>Confirm Pass</Label>
        <Form.Item {...formItemProps.confirmPassword} name="conf-pass">
          <Input.Password />
        </Form.Item>
      </Form>
    );
  }
}

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forgotPassVisible: false,
      newPassVisible: false,
      emailSent: false,
      username: "",
      user: "",
    };
  }

  forgotPassRef = React.createRef();
  newPassRef = React.createRef();

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const passwordPolicyContent = (
      <React.Fragment>
        <h4>Your password should contain: </h4>
        <ul>
          <li>Minimum length of 8 characters</li>
          <li>Numerical characters (0-9)</li>
          <li>Uppercase letters</li>
          <li>Lowercase letters</li>
        </ul>
      </React.Fragment>
    );
    return (
      <AntRow style={{ height: "100vh" }}>
        <Transition
          items={this.props.location.pathname}
          from={{ opacity: 0.5, transform: "translateX(-20px)" }}
          enter={{ opacity: 1, transform: "translateX(0px)" }}
          leave={{ opacity: 0 }}
          config={config.stiff}
        >
          {(location) => (props) => (
            <AntCol
              key="logIncontainer"
              className="universal-middle px-8 py-4"
              xs={{ span: 24, order: 2 }}
              md={{ span: 10, order: 1 }}
              style={{ ...props }}
            >
              <AntRow justify="center" align="middle">
                <Header className="thirtySixFont" bolded>
                  Company Login
                </Header>
              </AntRow>
              <AntRow>
                <Form onFinish={this.handleSubmit} style={{ width: "100%" }}>
                  <Label style={{ marginTop: "24px" }}>Username</Label>
                  <Form.Item name="username">
                    <Input size="large" />
                  </Form.Item>
                  <Label>Password</Label>
                  <Form.Item name="password">
                    <Input.Password size="large" />
                  </Form.Item>
                  <ForgotPass onClick={this.showForgotPassModal}>
                    Forgot Password
                  </ForgotPass>
                  <Modal
                    title="Forgot Password"
                    visible={this.state.forgotPassVisible}
                    onOk={() => this.handleForgotPassOk(this.forgotPassRef)}
                    onCancel={this.handleForgotPassCancel}
                  >
                    <ForgotPassForm
                      formRef={this.forgotPassRef}
                      emailSent={this.state.emailSent}
                    />
                  </Modal>
                  <AntRow justify="center">
                    <Button
                      className="my-2 profile-button-style"
                      type="primary"
                      htmlType="submit"
                      size="large"
                      style={{ width: "60%", minWidth: "100px" }}
                    >
                      Log In
                    </Button>
                  </AntRow>
                  <Modal
                    title="Change Password"
                    visible={this.state.newPassVisible}
                    onOk={() => this.handleNewPassOk(this.newPassRef)}
                    onCancel={this.handleNewPassCancel}
                  >
                    <Form ref={this.newPassRef}>
                      <Label>New Password</Label>
                      <Popover
                        placement="right"
                        title="Password Policy"
                        content={passwordPolicyContent}
                        trigger="focus"
                      >
                        <Form.Item
                          name="new-pass"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your password",
                            },
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                let errors = schema.validate(value, {
                                  list: true,
                                });

                                function getValidationMessage(errors) {
                                  for (let i = 0; i < errors.length; i++) {
                                    if (errors[i] === "min") {
                                      return "Password length should be at least 8 characters";
                                    } else if (errors[i] === "lowercase") {
                                      return "Password should contain lowercase letters";
                                    } else if (errors[i] === "uppercase") {
                                      return "Password should contain uppercase letters";
                                    } else if (errors[i] === "digits") {
                                      return "Password should contain digits";
                                    } else if (errors[i] === "symbols") {
                                      return "Password should contain symbols";
                                    }
                                  }
                                }

                                if (
                                  typeof getValidationMessage(errors) ==
                                  "undefined"
                                ) {
                                  return Promise.resolve();
                                }

                                return Promise.reject(
                                  getValidationMessage(errors)
                                );
                              },
                            }),
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>
                      </Popover>
                      <Label>Confirm Pass</Label>
                      <Form.Item
                        {...formItemProps.confirmPassword}
                        name="conf-pass"
                      >
                        <Input.Password />
                      </Form.Item>
                    </Form>
                  </Modal>
                  <Label className="my-1">
                    Don't have an account?
                    <Link to="/signup"> Sign up here</Link>
                  </Label>
                </Form>
              </AntRow>
            </AntCol>
          )}
        </Transition>
        <AntCol
          xs={{ span: 24, order: 1 }}
          md={{ span: 14, order: 2 }}
          style={{ backgroundColor: "#bbe1fa" }}
        >
          <AntRow className="universal-middle py-4" style={{ height: "100%" }}>
            <AntCol span={24}>
              <AntRow>
                <LoginSignupIcon
                  style={{
                    width: "80%",
                    height: "auto",
                    marginTop: "-10%",
                    marginLeft: "3%",
                  }}
                />
              </AntRow>
              <AntRow>
                <ImageText
                  className="fortyEightFont"
                  color="#1b262c"
                  bolded
                  style={{ marginTop: "-5%", marginLeft: "16%" }}
                >
                  Find Your Perfect <br /> Intern.
                </ImageText>
              </AntRow>
              <AntRow>
                <Header
                  className="twentyFont"
                  color="#1b262c"
                  style={{ marginLeft: "16%" }}
                >
                  Customized high school recruiting. At scale.
                </Header>
              </AntRow>
            </AntCol>
          </AntRow>
        </AntCol>
      </AntRow>
    );
  }

  handleSubmit = async (values) => {
    let { username, password } = values;
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      this.setState({
        user: user,
      });
      if (
        typeof user.challengeName !== undefined &&
        user.challengeName === "NEW_PASSWORD_REQUIRED"
      ) {
        this.setState({
          newPassVisible: true,
        });
      } else {
        openSuccessfulNotification(
          "Success",
          "You will be redirected to the dashboard in a bit."
        );

        this.props.auth();
        this.props.history.push("/dashboard");
      }
    } catch (error) {
      console.log("error signing in:", error);
      openUnsuccessfulNotification("Login Error", error.message);
    }
  };

  showForgotPassModal = () => {
    this.setState({
      forgotPassVisible: true,
    });
  };

  handleForgotPassOk = (formRef) => {
    if (!this.state.emailSent) {
      formRef.current
        .validateFields()
        .then((values) => {
          console.log(values);
          Auth.forgotPassword(values.username)
            .then((data) => {
              console.log(data);
              this.setState({
                emailSent: true,
                username: values.username,
              });
            })
            .catch((err) => {
              console.log(err);
              message.error(err.message);
            });
        })
        .catch((error) => {
          message.error("Please ensure your username is correct.");
        });
    } else {
      formRef.current
        .validateFields()
        .then((values) => {
          console.log(values);
          Auth.forgotPasswordSubmit(
            this.state.username,
            values["conf-code"],
            values["new-pass"]
          )
            .then((data) => {
              console.log(data);
              message.success(
                "Your password has been changed. Please login now."
              );

              this.setState({
                forgotPassVisible: false,
              });
            })
            .catch((err) => {
              console.log(err);
              message.error(err.message);
            });
        })
        .catch((error) => {
          message.error(
            "Please ensure your new password meets specifications."
          );
        });
    }
  };

  handleForgotPassCancel = (e) => {
    this.setState({
      forgotPassVisible: false,
    });
  };

  showNewPassModal = () => {
    this.setState({
      newPassVisible: true,
    });
  };

  handleNewPassOk = (formRef) => {
    formRef.current
      .validateFields()
      .then((values) => {
        Auth.completeNewPassword(this.state.user, values["new-pass"])
          .then((data) => {
            console.log(data);
            this.setState({
              newPassVisible: false,
            });
            message.success(
              "Your password has been changed. You will be redirected soon."
            );

            this.props.auth();
            this.props.history.push("/dashboard");
          })
          .catch((err) => {
            console.log(err);
            message.error(err.message);
          });
      })
      .catch((error) => {
        message.error("Please ensure your inputs are valid.");
      });
  };

  handleNewPassCancel = (e) => {
    console.log(e);
    this.setState({
      newPassVisible: false,
    });
  };
}
export default withRouter(LogIn);
