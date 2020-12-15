import React from "react";
import styled from "styled-components";
import { Input, Button } from "antd";

const { TextArea } = Input;

const Header = styled.span`
  font-size: 36px;
  font-weight: bold;

  margin-top: 8vh;

  color: #000000;
`;

const InfoHeader = styled.span`
  font-size: 24px;
  font-weight: bold;

  margin-top: 10vh;
  color: #000000;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Info = styled.span`
  font-size: 18px;
  font-weight: 500;

  margin-top: 2vh;
  margin-bottom: 2vh;

  color: #434343;
`;

const SchoolContainer = styled.div`
  background-color: #f0f0f0;
  width: 90%;
  min-height: 10vh;

  margin-top: 2vh;
  margin-left: 5%;
  margin-bottom: 2vh;

  border-radius: 4px;
  border: 1px solid #d8def3;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SchoolName = styled.span`
  font-size: 18px;
  font-weight: bold;

  color: #000000;
`;

const SchoolInfo = styled.span`
  font-size: 16px;
  font-weight: 500;

  margin-left: 5%;
  margin-top: 1vh;
  margin-bottom: 1vh;

  color: #434343;
`;

const AppInfo = styled.span`
  font-size: 18px;

  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-left: 1vh;

  color: #595959;
`;

const ListInfo = styled.span`
  font-size: 18px;

  margin-left: 1vh;
  color: #595959;
`;

const Schools = ["1", "2"];

class StudentInfo extends React.Component {
  render() {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          width: "80%",
          flexDirection: "column",
        }}
      >
        <Header>Oscar Hong</Header>

        {/**
         *
         * Student Information
         *
         */}
        <InfoHeader style={{ marginTop: "4vh" }}>
          {" "}
          Personal Information
        </InfoHeader>

        <Row>
          <Row style={{ width: "50%" }}>
            <Info>First Name: </Info>
            <AppInfo>Oscar</AppInfo>
          </Row>

          <Row style={{ width: "50%" }}>
            <Info>Last Name: </Info>
            <AppInfo>Hong</AppInfo>
          </Row>
        </Row>

        <Row>
          <Row style={{ width: "50%" }}>
            <Info>Gender: </Info>
            <AppInfo>Male</AppInfo>
          </Row>

          <Row style={{ width: "50%" }}>
            <Info>Race/Ethnicity: </Info>
            <AppInfo>Asian</AppInfo>
          </Row>
        </Row>

        <Row>
          <Row style={{ width: "50%" }}>
            <Info>Age: </Info>
            <AppInfo>17</AppInfo>
          </Row>
        </Row>

        <Row>
          <Row style={{ width: "50%" }}>
            <Info>E-Mail: </Info>
            <AppInfo>21lub@nsboroschools.net</AppInfo>
          </Row>

          <Row style={{ width: "50%" }}>
            <Info>Phone Number: </Info>
            <AppInfo>774 415 4004</AppInfo>
          </Row>
        </Row>

        <Row>
          <Row>
            <Info>Address: </Info>
            <AppInfo>
              3 Blueberry Lane, Northborough, Massachusetts 01532
            </AppInfo>
          </Row>
        </Row>

        <Row style={{ marginTop: "2vh" }}>
          <Row>
            <Info style={{ margin: 0 }}>Extracurricular Activities: </Info>
          </Row>
          <Row style={{ alignItems: "flex-start" }}>
            <Col>
              <ListInfo>Soccer</ListInfo>
              <ListInfo>DECA</ListInfo>
              <ListInfo>Speech and Debate</ListInfo>
            </Col>
          </Row>
        </Row>

        <InfoHeader> Educational Information</InfoHeader>
        <Row>
          <Row style={{ width: "50%" }}>
            <Info>Unweighted GPA: </Info>
            <AppInfo>3.6</AppInfo>
          </Row>
          <Row style={{ width: "50%" }}>
            <Info>Weighted GPA: </Info>
            <AppInfo>4.0/5.0</AppInfo>
          </Row>
        </Row>
        <Row>
          <Info>Year of Graduation: </Info>
          <AppInfo>1821</AppInfo>
        </Row>

        <Row style={{ marginTop: "2vh" }}>
          <Row>
            <Info style={{ margin: 0 }}>Relevant Courses: </Info>
          </Row>
          <Row style={{ alignItems: "flex-start" }}>
            <Col>
              <ListInfo>AP CSA</ListInfo>
              <ListInfo>AP Forhan Class</ListInfo>
            </Col>
          </Row>
        </Row>

        <InfoHeader>Educational History</InfoHeader>
        {Schools.map((school) => (
          <SchoolContainer>
            <SchoolName
              style={{
                marginLeft: "5%",
                marginBottom: "1vh",
                marginTop: "4vh",
              }}
            >
              School Name
            </SchoolName>
            <Row>
              <SchoolInfo>
                School Location: Address, City, State, Zip Code
              </SchoolInfo>
            </Row>
            <Row style={{ paddingBottom: "4vh" }}>
              <SchoolInfo style={{ width: "50%" }}>
                Course Concentration: Finance, Biology
              </SchoolInfo>
              <SchoolInfo style={{ width: "50%" }}>
                Years Completed:{" "}
              </SchoolInfo>
            </Row>
          </SchoolContainer>
        ))}

        <InfoHeader>Internship Information</InfoHeader>
        <Row style={{ marginTop: "2vh", marginBottom: "2vh" }}>
          <Row>
            <Info style={{ margin: 0 }}>Interested Industries: </Info>
          </Row>
          <Row style={{ alignItems: "flex-start" }}>
            <Col>
              <ListInfo>General Business</ListInfo>
              <ListInfo>Consulting</ListInfo>
              <ListInfo>Finance or Accounting</ListInfo>
            </Col>
          </Row>
        </Row>

        <Row>
          <Row style={{ width: "50%" }}>
            <Info>Days Willing to Work: </Info>
            <AppInfo>Tuesday, Wednesday</AppInfo>
          </Row>

          <Row style={{ width: "50%" }}>
            <Info>Times Willing to Work: </Info>
            <AppInfo>Mornings, Evenings, Nights</AppInfo>
          </Row>
        </Row>

        <Row>
          <Info>Work Start:</Info>
          <AppInfo> 2020-8-14</AppInfo>
        </Row>
        <Row>
          <Info>Work End: </Info>
          <AppInfo>2020-09-19</AppInfo>
        </Row>

        <Row>
          <Info>Willing to Work Unpaid: </Info>
          <AppInfo>It doesn't matter</AppInfo>
        </Row>

        <InfoHeader>Resumé</InfoHeader>

        {/**
         *
         * Student Notes
         *
         */}
        <InfoHeader>Notes</InfoHeader>
        <TextArea
          placeholder="Student Notes"
          autoSize={{ minRows: 7, maxRows: 15 }}
          style={{ marginTop: "2vh" }}
        />

        <Button
          type="primary"
          style={{
            width: "24vh",
            marginTop: "2vh",
            alignSelf: "flex-end",
          }}
        >
          Save Notes
        </Button>
      </div>
    );
  }
}
export default StudentInfo;
