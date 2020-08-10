import React from "react";
import styled from "styled-components";

import {
  Input,
  Upload,
  Button,
  Form
} from "antd";
import { InboxOutlined } from "@ant-design/icons";

import NavSearch from "../NavSearch";

const { TextArea } = Input;
const { Dragger } = Upload;

const Header = styled.div`
  font-size: 36px;
  font-weight: bold;

  margin-top: 8vh;

  color: #000000;
`;

const InfoHeader = styled.div`
  font-size: 24px;
  font-weight: bold;

  margin-top: 4vh;

  color: #434343;
`;

const UploadHeader = styled.span`
  font-size: 18px;
  font-weight: bold;

  margin-top: 4vh;
  margin-bottom: 2vh;

  color: #434343;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

//CSS Constants
const buttonStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "6vh",
  marginBottom: "6vh"
}

const marginStyle = {
  backgroundColor: "#eceff9",
  width: "80%"
}

const pageStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  float: "center",
  backgroundColor: '#eceff9'

}

//Form Props
const FormProps = {
  TotalForm: {
    name: "Company Details"
  },
  name: {
    key: "name",
    name: "Name",
  },
  Description: {
    key: "description",
    name: "Description",
  },
  Website: {
    key: "website",
    name: "Website"
  },
  EMail: {
    key: "email",
    name: "E-Mail"
  },
  Phone: {
    key: "phone",
    name: "Phone Number"
  },
  Visual: {
    key: "visual",
    name: "Visual"
  },
  Avatar: {
    key: "avatar",
    name: "Avatar"
  }
}


class CompanyDetails extends React.Component {
  state = { business: null }
  render() {
    let { business } = this.state;
    if (business === null) {
      return null;
    }
    return (
      <React.Fragment>
        <NavSearch title="Company Information" searchBar={false} />
        <div
          style={pageStyle}
        >
          <div
            style={marginStyle}
          >
            {/**
             *
             * Company Name
             *
             */}
            <Header>{business[0].name}</Header>
            <Form {...FormProps.TotalForm}>
              <Form.Item {...FormProps.name}>
                <Input
                  placeholder="Change Company Name"
                  defaultValue={business[0].name}
                  style={{ marginTop: "2vh" }}
                />
              </Form.Item>
              {/**
             *
             * Company Description
             *
             */}
              <InfoHeader>Company Description</InfoHeader>
              <Form.Item {...FormProps.Description}>
                <TextArea
                  placeholder="Company Description"
                  defaultValue={business[0].description}
                  autoSize={{ minRows: 5, maxRows: 10 }}
                  style={{ marginTop: "2vh" }}
                />
              </Form.Item>
              {/**
             *
             * Company Website
             *
             */}
              <InfoHeader>Website</InfoHeader>
              <Form.Item {...FormProps.Website}>
                <Input
                  placeholder="https://www.interninit.com"
                  defaultValue={business[0].website}
                  style={{ marginTop: "2vh" }}
                />
              </Form.Item>
              {/**
             *
             * E-Mail
             *
             */}
              <InfoHeader>E-Mail</InfoHeader>
              <Form.Item {...FormProps.EMail}>
                <Input
                  placeholder="company@email.com"
                  defaultValue={business[0].email}
                  style={{ marginTop: "2vh" }}
                />
              </Form.Item>
              {/**
             *
             * Phone Number
             *
             */}
              <InfoHeader>Phone Number</InfoHeader>
              <Form.Item {...FormProps.Phone}>
                <Input placeholder="123 456 7891"
                  defaultValue={business[0].phone}
                  style={{ marginTop: "2vh" }} />
              </Form.Item>

              {/**Row for Upload files */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly"
                }}
              >
                {/**
               *
               * Company Visual
               *
               */}
                <Col>
                  <UploadHeader>Upload Company Visual</UploadHeader>
                  <Form.Item {...FormProps.Visual}>
                    <Dragger style={{ width: "50vh", height: "30px" }}>
                      <h1 style={{ color: "#69c0ff" }}>
                        <InboxOutlined />
                      </h1>
                      <h5>Click or Drag Files to Upload Here</h5>
                    </Dragger>
                  </Form.Item>
                </Col>

                {/**
               *
               * Company Avatar
               *
               */}
                <Col>
                  <UploadHeader>Upload Company Logo</UploadHeader>
                  <Form.Item {...FormProps.Avatar}>
                    <Dragger style={{ width: "50vh", height: "30px" }}>
                      <h1 style={{ color: "#69c0ff" }}>
                        <InboxOutlined />
                      </h1>
                      <h5>Click or Drag Files to Upload Here</h5>
                    </Dragger>
                  </Form.Item>
                </Col>
              </div>
            </Form>
            <div
              style={buttonStyle}
            >
              <Button type="primary" size="medium" style={{ width: "36vh" }} htmlType="submit">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  componentDidMount() {
    let variable = null;
    fetch('http://localhost:8000/business?_page=1&_limit=1')
      .then(response => response.json())
      .then(json =>
        this.setState({ business: json }))
  }

  handleSave = (values) => {
    console.log("This is the finished form", values)
    /*fetch(`http://localhost:8000/business`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(json => console.log(json));
      */
  }
}
export default CompanyDetails;
