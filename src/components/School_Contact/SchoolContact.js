import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "antd";
import NavSearch from "../NavSearch";
import SchoolInfoBar from "./SchoolInfoBar";
import SchoolTab from './SchoolTab';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 100vh;
  min-width: 600px;

  background-color: #eceff9;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 4vh;
  margin-bottom: 4vh;

  width: 60vh;
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
    render() {
        return (
            <Container>
                <NavSearch title="Contact Schools" />

                <div style={pageStyle}>
                    <Row>
                        <Button style={AddFilterStyle}>
                            <ButtonText> Add Filter</ButtonText>
                        </Button>
                    </Row>

                    <SchoolInfoBar />

                    <SchoolTab name="Algonquin Regional High School" />
                </div>
            </Container>
        );
    }
}
export default SchoolContact;
