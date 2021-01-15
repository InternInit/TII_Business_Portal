import React from "react";
import { Avatar, Row, Col, Grid } from "antd";
import {
  Header,
  Caption,
  TabContainer,
  BorderlessTag,
} from "../Styled/FundamentalComponents.jsx";

import { UserOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

const StudentCard = (props) => {
  let { firstName, lastName, age, avatar, id, tag, type } = props;
  let fullName = firstName + " " + lastName;

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const isSm = Object.entries(screens)
  .filter((screen) => !!screen[1])
  .map((breakpoint) => breakpoint[0])
  .includes("sm");

  return (
    <Link to={`/applicants/${id}`}>
      <TabContainer className="px-3 py-1 dashboard-tab">
        <Row align="middle" gutter={[16, 0]}>
          {/* Avatar */}
          <Avatar src={avatar} size={38} icon={<UserOutlined />} />

          <Col flex="auto">
            {/* Name */}
            <Row justify="space-between">
              <Col>
                <Header bolded className="eighteenFont">
                  {fullName}
                </Header>
              </Col>
              {tag ? (
                <Col>
                  <BorderlessTag style={{marginRight: "-16px"}} className="px-1 py-0">{type}</BorderlessTag>
                </Col>
              ) : null}
            </Row>

            {/* Position */}
            <Row>
              {/*
              @TODO
              Get position they applied for & get position for positions of accepted interns 
              */}
              {tag ? (
                <Caption
                  className="twelveFont"
                  light
                  style={{ marginTop: "-5px" }}
                >
                  where did i apply??
                </Caption>
              ) : (
                <Caption
                  className="twelveFont"
                  light
                  style={{ marginTop: "0vh" }}
                >
                  where did i apply??
                </Caption>
              )}
            </Row>
          </Col>
        </Row>
      </TabContainer>
    </Link>
  );
};
export default StudentCard;
