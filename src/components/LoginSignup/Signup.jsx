import React from "react";
import {
  Input,
  Button,
  Form,
  notification,
  Modal,
  Popover,
  Checkbox,
  Row as AntRow,
  Col as AntCol,
} from "antd";
import { Label, ImageText } from "./SignupLogin";
import { Header } from "../Styled/FundamentalComponents.jsx";
import { ReactComponent as LoginSignupIcon } from "../../Assets/LoginSignupImage.svg";
import { Transition, config } from "react-spring/renderprops";

import { Link } from "react-router-dom";

//Ant D Icons
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import EmailConfirmation from "./EmailConfirmation.jsx";

import { Auth } from "aws-amplify";

import { withRouter } from "react-router";

import { v4 as uuidv4 } from "uuid";

const passwordValidator = require("password-validator");

const schema = new passwordValidator();

schema
  .is()
  .min(8)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits();

const validationRules = (required, inputName, type, pattern) => [
  {
    required: required,
    message: "Please enter a valid " + inputName,
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
  companyName: {
    rules: validationRules(true, "company name", "string"),
  },
  name: {
    rules: validationRules(true, "name", "string"),
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
          <li>Uppercase letter</li>
          <li>Lowercase letter</li>
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
              key="signUpContainer"
              className="universal-middle px-8 py-4"
              xs={{ span: 24, order: 2 }}
              md={{ span: 10, order: 1 }}
              style={{ ...props }}
            >
              <AntRow justify="center" align="middle">
                <Header className="thirtySixFont" bolded>
                  New Company Account
                </Header>
              </AntRow>
              <AntRow>
                <Form
                  onFinish={this.handleSubmit}
                  ref={this.formRef}
                  style={{ width: "100%" }}
                >
                  <Label style={{ marginTop: "24px" }}>Username</Label>
                  <Form.Item {...formItemProps.username} name="username">
                    <Input size="large" />
                  </Form.Item>

                  <Label>Name</Label>
                  <Form.Item {...formItemProps.name} name="name">
                    <Input size="large" />
                  </Form.Item>

                  <Label>E-Mail</Label>
                  <Form.Item {...formItemProps.email} name="email">
                    <Input size="large" />
                  </Form.Item>

                  <Label>Company Name</Label>
                  <Form.Item {...formItemProps.companyName} name="companyName">
                    <Input size="large" />
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

                            if (
                              typeof getValidationMessage(errors) == "undefined"
                            ) {
                              return Promise.resolve();
                            }

                            return Promise.reject(getValidationMessage(errors));
                          },
                        }),
                      ]}
                    >
                      <Input.Password size="large" />
                    </Form.Item>
                  </Popover>
                  <Label>Confirm Password</Label>
                  <Form.Item
                    {...formItemProps.confirmPassword}
                    name="confirm-password"
                  >
                    <Input.Password size="large" />
                  </Form.Item>

                  <Form.Item
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(
                                "Please read the Terms and Conditions and Privacy Agreement"
                              ),
                      },
                    ]}
                    name="termsAndConditions"
                    valuePropName="checked"
                    onChange={this.onChecked}
                    style={{ textAlign: "left" }}
                  >
                    <Checkbox autoFocus={true}>
                      I agree to the{" "}
                      <a
                        href="https://interninit.com/student-terms-and-conditions/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="https://interninit.com/student-privacy-agreement/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        Privacy Agreement{" "}
                      </a>
                    </Checkbox>
                  </Form.Item>
                  <AntRow justify="center">
                    <Button
                      className="profile-button-style"
                      type="primary"
                      htmlType="submit"
                      size="large"
                      style={{ width: "60%", minWidth: "150px" }}
                    >
                      Sign Up
                    </Button>
                  </AntRow>
                  <Label style={{ marginTop: "10%" }}>
                    Already have an account?
                    <Link to="/login"> Log in here</Link>
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
      </AntRow>
    );
  }

  handleSubmit = async (values) => {
    let { username, password, email, companyName, name } = values;
    this.setState({ email: email, username: username, password: password });

    try {
      const user = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          name,
          "custom:company": companyName,
          "custom:companyId": uuidv4(),
          "custom:role": "Admin",
        },
      });
      this.setState({ emailConfirmationVisible: true });
      console.log(user);
    } catch (error) {
      console.log("error signing up:", error);
      openUnsuccessfulNotification("Signup Error", error.message);
    }
  };

  handleOk = async (e) => {
    const values = await this.emailFormRef.current.getFieldsValue();
    const code = values.confirmationCode;
    console.log(values.confirmationCode);
    const username = this.state.username;
    const password = this.state.password;
    console.log(username);
    try {
      const callback = await Auth.confirmSignUp(username, code);
      console.log(callback);
      openSuccessfulNotification(
        "Success",
        "You will be redirected to the dashboard in a bit."
      );
      Auth.signOut()
        .then(() => console.log("Signed Out"))
        .catch(() => console.log("Could Not Sign Out"));

      const user = await Auth.signIn(username, password);
      this.setState({
        emailConfirmationVisible: false,
      });
      this.props.auth();
      this.props.startupProcedure();
      this.props.history.push("/dashboard");
    } catch (error) {
      console.log(error);
      openUnsuccessfulNotification(
        "Confirmation Code Error",
        "Sorry, we couldnt confirm that code."
      );
    }
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      emailConfirmationVisible: false,
    });
  };
}
export default withRouter(SignUp);
