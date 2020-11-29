import React from "react";
import styled from "styled-components";

import {
    Input,
    Button,
    Form,
    Popover,
    Divider,
    Switch
} from "antd";
import {
    Label,
} from "../LoginSignup/SignupLogin";


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
    backgroundColor: '#eceff9',

    minHeight: '100vh'

}

const Info = styled.div`
   font-size: 18px;
  font-weight: 500;
  text-align: left;

  color:#722ed1;
  margin-bottom:24px;
  margin-top:-8px;
    
`

const EmployeeName = styled.div`
font-size: 24px;
font-weight: 500;
text-align: left;

color:#262626;
 margin-top:-8px;
 margin-bottom:6px;
`




class UserDetails extends React.Component {
    render() {


        return (
            <React.Fragment>
                <div
                    style={pageStyle}
                >
                    <SignupContainer >
                        <div style={{ width: "70%" }}>
                            <Form onFinish={this.handleSubmit} ref={this.formRef}>

                                <EmployeeName style={{ marginTop: "24px" }}>{this.props.name}</EmployeeName>
                                <Info>{this.props.role}</Info>

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
                                        Save Changes
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
export default UserDetails;
