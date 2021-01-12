import React from "react";
import styled from "styled-components";

import NavSearch from "../General/NavSearch.jsx";

import {
  Input,
  Button,
  Form,
  Breadcrumb,
  Divider,
  Switch,
  Select,
  Row as AntRow,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Label } from "../LoginSignup/SignupLogin";
import {
  PageContainer,
  FormContainer,
  Header,
} from "../Styled/FundamentalComponents.jsx";

import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import axios from "axios";

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
    name: "Password",
    key: "password",
    required: true,
    rules: validationRules(true, "password", "string"),
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
      this.formRef.current.setFieldsValue({ "Applicant Actions": "full" });
    } else this.setState({ isAdmin: false });
  };

  render() {
    return (
      <React.Fragment>
        <PageContainer>
          <NavSearch title="Create Company Account" searchBar={false} />
          <div className="px-8 py-2" style={{ width: "100%" }}>
            <Breadcrumb style={{ paddingBottom: "1em" }}>
              <Breadcrumb.Item className="twentyFont">
                <Link to="/users">Users</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item className="twentyFont">
                Create User
              </Breadcrumb.Item>
            </Breadcrumb>
            <FormContainer style={{ paddingBottom: "2em" }}>
              <Form onFinish={this.handleSubmit} ref={this.formRef}>
                <Header
                  className="twentyEightFont universal-center mb-1"
                  bolded
                >
                  Create a New User
                </Header>
                <Header className={headerClassNames}>Username</Header>
                <Form.Item {...formItemProps.username}>
                  <Input size="large" placeholder="Username" />
                </Form.Item>
                <Header className={headerClassNames}>Name</Header>
                <Form.Item {...formItemProps.name}>
                  <Input size="large" placeholder="Name" />
                </Form.Item>
                <Header className={headerClassNames}>Email</Header>
                <Form.Item {...formItemProps.email}>
                  <Input size="large" placeholder="Email" />
                </Form.Item>
                <Header className={headerClassNames}>Temporary Password</Header>
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

                <Header className={headerClassNames}>Role</Header>
                <Form.Item name="Role" key="role">
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

                <Header className={headerClassNames}>Listing Access</Header>
                <Form.Item name="Listing Access" key="listingAccess">
                  <Select
                    placeholder="Pick Accessible Listings"
                    size="large"
                    mode="multiple"
                  >
                    {this.props.listings.map((listing, index) => (
                      <Option value={listing.Title} key={index}>
                        {listing.Title}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Header className={headerClassNames}>
                  {this.state.applicantActionValue}
                </Header>
                <Header className={headerClassNames}>Applicant Actions</Header>
                <Form.Item name="Applicant Actions" key="applicantActions">
                  <Select placeholder="Pick Applicant Actions" size="large">
                    <Option value="full">Full Access</Option>
                    <Option value="read">Read only</Option>
                  </Select>
                </Form.Item>
                <AntRow justify="end">
                  <Button type="primary" size="large" htmlType="submit">
                    Create Account
                  </Button>
                </AntRow>
              </Form>
            </FormContainer>
          </div>
        </PageContainer>
      </React.Fragment>
    );
  }

  handleSubmit = (values) => {
    if (values["admin-state"] === true) {
      values["custom:role"] = "Admin";
    } else {
      values["custom:role"] = "User";
    }
    delete values["admin-state"];
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
