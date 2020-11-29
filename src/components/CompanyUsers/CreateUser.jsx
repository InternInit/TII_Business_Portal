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

import axios from 'axios';

const passwordValidator = require("password-validator");

const schema = new passwordValidator();

schema.is().min(8).has().uppercase().has().lowercase().has().digits();

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
        message: "Please input a valid " + inputName,
        type: type,
        pattern: pattern,
    },
];

const formItemProps = {
    username: {
        rules: validationRules(true, "username", "string"),
    },
    email: {
        rules: validationRules(true, "email", "email")
    },
    name: {
        rules: validationRules(true, "name", "string")
    },
};


class CreateUser extends React.Component {

    render() {

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

                                <Label>Name</Label>
                                <Form.Item {...formItemProps.name} name="name">
                                    <Input />
                                </Form.Item>

                                <Label>Email</Label>
                                <Form.Item {...formItemProps.email} name="email">
                                    <Input />
                                </Form.Item>

                                

                                <Divider style={{ fontFamily: 'roboto' }}>Permissions</Divider>

                                <Label style={{ marginTop: '4vh' }}>Administrator</Label>
                                <Form.Item name="admin-state">
                                    <Switch />
                                </Form.Item>

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

    handleSubmit = (values) => {
        if(values["admin-state"] === true) {
            values["custom:role"] = "Admin"
        } else {
            values["custom:role"] = "User"
        }
        delete values["admin-state"];
        values["custom:companyId"] = this.props.companyInfo.id
        values["custom:company"] = this.props.companyInfo.name
        console.log(values);
        console.log(this.props.token.access);

        let headers = {headers: {Authorization: "Bearer " + this.props.token.access}}

        axios
        .post("/api/admin_create_user", values, headers)
        .then((response) => {
            console.log(JSON.parse(response.data));
        });

    }

}
export default CreateUser;
