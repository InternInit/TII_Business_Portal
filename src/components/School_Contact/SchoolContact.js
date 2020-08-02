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
    width: "80%",
    flexDirection: "column",
    justifySelf: "center"
};

const Backend = [1, 2, 3, 4];

class SchoolContact extends Component {
    render() {
        return (
            <Container>
                <NavSearch title="Contact Schools" />

                <div style={pageStyle}>
                    <Row>
                        <Button type="primary" style={{ width: "27vh" }}>
                            Add Filter
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
