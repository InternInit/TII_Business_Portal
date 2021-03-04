import React from "react";

import NavSearch from "../General/NavSearch.jsx";

import {
  Input,
  Button,
  Form,
  Breadcrumb,
  Divider,
  PageHeader,
  Select,
  Row as AntRow,
} from "antd";
import { Transition, config } from "react-spring/renderprops";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  PageContainer,
  FormContainer,
  Header,
  RequiredAsterisk
} from "../Styled/FundamentalComponents.jsx";

import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import axios from "axios";
import _ from "underscore";

const passwordValidator = require("password-validator");
const { Option } = Select;

const schema = new passwordValidator();

const headerClassNames = "twentyFont mb-point-5";

schema.is().min(8).has().uppercase().has().lowercase().has().digits();

const mapStateToProps = (state) => {
  return {
    listings: state.listings,
  };
};

const validationRules = (required, inputName, type, pattern) => [
  {
    required: required,
    message: "Please input a valid " + inputName,
    type: type,
    pattern: pattern,
  },
];

const formItemProps = {
  username: {
    name: "Username",
    key: "username",
    required: true,
    rules: validationRules(true, "username", "string"),
  },
  email: {
    name: "Email",
    key: "email",
    required: true,
    rules: validationRules(true, "email", "email"),
  },
  name: {
    name: "Name",
    key: "name",
    required: true,
    rules: validationRules(true, "name", "string"),
  },
  password: {
    name: "TemporaryPassword",
    key: "temporaryPassword",
    required: true,
    rules: validationRules(true, "password", "string"),
  },
  role: {
    name: "Role",
    key: "role",
    required: true,
    rules: validationRules(true, "role", "string"),
  },
  listingAccess: {
    name: "Listing Access",
    key: "listingAccess",
    required: true,
    rules: validationRules(true, "listing access", "array"),
  },
  applicantActions: {
    name: "Applicant Actions",
    key: "applicantActions",
    required: true,
    rules: validationRules(true, "applicant action", "string"),
  },
};

class CreateUser extends React.Component {
  state = {
    isAdmin: false,
    applicantActionValue: "",
  };
  formRef = React.createRef();

  toggleAdmin = (value) => {
    if (value === "admin") {
      this.setState({ isAdmin: true });
      this.formRef.current.setFieldsValue({
        "Applicant Actions": "*",
        "Listing Access": _.pluck(this.props.listings, "Title"),
      });
    } else {
      this.setState({ isAdmin: false });
      this.formRef.current.resetFields(["Applicant Actions", "Listing Access"]);
    }
  };

  render() {
    return (
      <React.Fragment>
        <PageContainer>
          <NavSearch title="Create Company Account" searchBar={false} />
          <Transition
            items={this.props.location.pathname}
            from={{ opacity: 0.5, transform: "translateY(20px)" }}
            enter={{ opacity: 1, transform: "translateY(0px)" }}
            leave={{ opacity: 1 }}
            config={config.stiff}
          >
            {(location) => (props) => (
              <div
                key="createUserContainer"
                className="px-8 py-2"
                style={{ ...props, width: "100%" }}
              >
                <Breadcrumb style={{ paddingBottom: "1em" }}>
                  <Breadcrumb.Item className="twentyFont">
                    <Link to="/users">Users</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item className="twentyFont">
                    Create User
                  </Breadcrumb.Item>
                </Breadcrumb>
                <FormContainer style={{ paddingBottom: "2em" }}>
                  <PageHeader
                    className="rm-lg"
                    onBack={() => this.props.history.push("/users")}
                    style={{ position: "absolute", left: "3.5em", top: "1em" }}
                    title={
                      <Link
                        to="/users"
                        style={{ fontWeight: "normal", color: "#262626" }}
                      >
                        Back to Users
                      </Link>
                    }
                  />
                  <Form onFinish={this.handleSubmit} ref={this.formRef}>
                    <Header
                      className="twentyEightFont universal-center mb-1"
                      bolded
                    >
                      Create a New User
                    </Header>
                    <Header className={headerClassNames}>
                      Username
                      <RequiredAsterisk> *</RequiredAsterisk>
                      </Header>
                    <Form.Item {...formItemProps.username}>
                      <Input size="large" placeholder="Username" />
                    </Form.Item>
                    <Header className={headerClassNames}>
                      Name
                      <RequiredAsterisk> *</RequiredAsterisk>
                      </Header>
                    <Form.Item {...formItemProps.name}>
                      <Input size="large" placeholder="Name" />
                    </Form.Item>
                    <Header className={headerClassNames}>
                      Email
                      <RequiredAsterisk> *</RequiredAsterisk>
                      </Header>
                    <Form.Item {...formItemProps.email}>
                      <Input size="large" placeholder="Email" />
                    </Form.Item>
                    <Header className={headerClassNames}>
                      Temporary Password
                      <RequiredAsterisk> *</RequiredAsterisk>
                    </Header>
                    <Form.Item {...formItemProps.password}>
                      <Input.Password
                        size="large"
                        placeholder="Temporary Password"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                      />
                    </Form.Item>

                    <AntRow align="middle">
                      <Divider>
                        <Header className="twentyFourFont" bolded>
                          Permissions
                        </Header>
                      </Divider>
                    </AntRow>

                    <Header className={headerClassNames}>Role
                    <RequiredAsterisk> *</RequiredAsterisk>
                    </Header>
                    <Form.Item {...formItemProps.role}>
                      <Select
                        placeholder="Choose Site Role"
                        size="large"
                        onChange={(value) => this.toggleAdmin(value)}
                      >
                        <Option value="admin">Administrator</Option>
                        <Option value="applicationReader">
                          Application Reader
                        </Option>
                      </Select>
                    </Form.Item>

                    <Header className={headerClassNames}>Listing Access
                    <RequiredAsterisk> *</RequiredAsterisk>
                    </Header>
                    <Form.Item {...formItemProps.listingAccess}>
                      <Select
                        disabled={this.state.isAdmin}
                        placeholder="Pick Accessible Listings"
                        size="large"
                        mode="multiple"
                      >
                        {this.props.listings.map((listing, index) => (
                          <Option value={listing.title} key={index}>
                            {listing.title}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Header className={headerClassNames}>
                      {this.state.applicantActionValue}
                    </Header>
                    <Header className={headerClassNames}>
                      Applicant Actions
                      <RequiredAsterisk> *</RequiredAsterisk>
                    </Header>
                    <Form.Item {...formItemProps.applicantActions}>
                      <Select
                        disabled={this.state.isAdmin}
                        placeholder="Pick Applicant Actions"
                        size="large"
                      >
                        <Option value="*">Full Access</Option>
                        <Option value="read-only">Read only</Option>
                      </Select>
                    </Form.Item>
                    <AntRow className="mt-3" justify="end">
                      <Button type="primary" size="large" htmlType="submit">
                        Create Account
                      </Button>
                    </AntRow>
                  </Form>
                </FormContainer>
              </div>
            )}
          </Transition>
        </PageContainer>
      </React.Fragment>
    );
  }

  handleSubmit = (values) => {
    if (values["Role"] === "admin") {
      values["custom:role"] = "Admin";
    } else {
      values["custom:role"] = "Application Reader";
    }
    delete values["Role"];

    values["custom:applicantActions"] = values["Applicant Actions"].toString(); // Assign new key
    delete values["Applicant Actions"];

    values["custom:listingAccess"] = values["Listing Access"].toString(); // Assign new key
    delete values["Listing Access"];

    values["custom:companyId"] = this.props.companyInfo.id;
    values["custom:company"] = this.props.companyInfo.name;
    console.log(values);

    console.log(this.props.token.access);

    let headers = {
      headers: { Authorization: "Bearer " + this.props.token.access },
    };

    axios.post("/api/admin_create_user", values, headers).then((response) => {
      console.log(JSON.parse(response.data));
    });
  };
}
export default withRouter(connect(mapStateToProps)(CreateUser));
