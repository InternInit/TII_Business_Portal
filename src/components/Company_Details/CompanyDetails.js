import React from "react";
import styled from "styled-components";

import { Input, Upload, Button } from "antd";
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

const UploadHeader = styled.div`
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

class CompanyDetails extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "#eceff9",
          width: "80%"
        }}
      >
        {/**
         *
         * Company Name
         *
         */}
        <Header>XYZ Corporation</Header>
        <Input placeholder="Change Company Name" style={{ marginTop: "2vh" }} />

        {/**
         *
         * Company Description
         *
         */}
        <InfoHeader>Company Description</InfoHeader>
        <TextArea
          placeholder="Company Description"
          autoSize={{ minRows: 5, maxRows: 10 }}
          style={{ marginTop: "2vh" }}
        />

        {/**
         *
         * Company Website
         *
         */}
        <InfoHeader>Website</InfoHeader>
        <Input
          placeholder="https://www.interninit.com"
          style={{ marginTop: "2vh" }}
        />

        {/**
         *
         * E-Mail
         *
         */}
        <InfoHeader>E-Mail</InfoHeader>
        <Input placeholder="company@email.com" style={{ marginTop: "2vh" }} />

        {/**
         *
         * Phone Number
         *
         */}
        <InfoHeader>Phone Number</InfoHeader>
        <Input placeholder="123 456 7891" style={{ marginTop: "2vh" }} />

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
            <Dragger style={{ width: "50vh", height: "30px" }}>
              <h1 style={{ color: "#69c0ff" }}>
                <InboxOutlined />
              </h1>
              <h5>Click or Drag Files to Upload Here</h5>
            </Dragger>
          </Col>

          {/**
           *
           * Company Avatar
           *
           */}
          <Col>
            <UploadHeader>Upload Company Visual</UploadHeader>
            <Dragger style={{ width: "50vh", height: "30px" }}>
              <h1 style={{ color: "#69c0ff" }}>
                <InboxOutlined />
              </h1>
              <h5>Click or Drag Files to Upload Here</h5>
            </Dragger>
          </Col>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "4vh",
            marginBottom: "4vh"
          }}
        >
          <Button type="primary" size="medium" style={{ width: "36vh" }}>
            Save Changes
          </Button>
        </div>
      </div>
    );
  }
}
export default CompanyDetails;
