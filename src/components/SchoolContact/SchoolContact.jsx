import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "antd";
import NavSearch from "../General/NavSearch.jsx";
import SchoolInfoBar from "./SchoolInfoBar.jsx";
import SchoolTab from './SchoolTab.jsx';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-width: 600px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 4vh;
  margin-bottom: 4vh;

  width: 85vh;
  justify-content: space-between;
  align-self: flex-start;
`;

//CSS Constants
const pageStyle = {
    display: "flex",
    width: "90%",
    flexDirection: "column",
    justifySelf: "center"
};

const AddFilterStyle = {
    width: "270px",
    height: "40px",
    fontFamily: "roboto",
    fontColor: "#13C2C2",
    marginTop: "33px",
    align: "inline-block"
};

const ButtonText = styled.span`
  font-family: roboto;
  color: #13c2c2;
  font-size: 18px;
`;

const Backend = [1, 2, 3, 4];

class SchoolContact extends Component {
    state = {
        students: []
    }
    render() {
        let { students } = this.state;
        return (
            <Container className="global-container">
                <NavSearch title="Contact Schools" placeholder="Search Schools"/>

                <div style={pageStyle}>
                    <Row>
                        <Button style={AddFilterStyle}>
                            <ButtonText> Add Filter</ButtonText>
                        </Button>
                        <Button style={AddFilterStyle}>
                            <ButtonText> E-Mail All</ButtonText>
                        </Button>
                    </Row>

                    <SchoolInfoBar />
                    {students.map(student => (
                        <SchoolTab
                            key={student.id}
                            name={student.education.school.name}
                            address={student.education.school.address + ", " + student.education.school.state}
                            interns={"12"} //Not part of db.json
                            email={"brandonbl2021@gmail.com"} //Not part of db.json
                            phone={"774 415 4004"} //Not part of db.json
                        />

                    ))}
                </div>
            </Container>
        );
    }
    componentDidMount() {
        fetch('http://localhost:8000/student?_page=1&_limit=10')
            .then(response => response.json())
            .then(json =>
                this.setState({ students: json }))
    }
}
export default SchoolContact;
