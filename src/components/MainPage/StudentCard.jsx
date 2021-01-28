import React, { useState } from "react";
import { Avatar, Row, Col, Grid } from "antd";
import {
  Header,
  Caption,
  TabContainer,
  BorderlessTag,
} from "../Styled/FundamentalComponents.jsx";

import SmartAvatar from "../General/SmartAvatar";

import { UserOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { reduce } from "underscore";

const StudentCard = (props) => {
  const { firstName, lastName, avatar, id, tag, type, position } = props;
  const fullName = firstName + " " + lastName;

  const colors = {
    review: {
      text: "#FA8C16",
      background: "#FFF7E6",
    },
    online: {
      text: "#1890FF",
      background: "#E6F7FF",
    },
    inPerson: {
      text: "#eb2f96",
      background: "#fff0f6",
    },
  };

  const setColor = () => {
    //console.log(firstName+ " is " + type);
    switch (type) {
      case "Review":
        return {
          textColor: "red",
          //colors.review.text,
          backgroundColor: colors.review.background,
        };
      default:
        return {
          textColor: colors.online.text,
          backgroundColor: colors.online.background,
        };
    }
  };

  const [styles, changeStyles] = useState(setColor());

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const isXs = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((breakpoint) => breakpoint[0])
    .includes("xs");

  const isXl = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((breakpoint) => breakpoint[0])
    .includes("xl");

  const isMd = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((breakpoint) => breakpoint[0])
    .includes("md");

  const isLg = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((breakpoint) => breakpoint[0])
    .includes("lg");
  /*
  console.log(
    Object.entries(screens)
      .filter((screen) => !!screen[1])
      .map((breakpoint) => breakpoint[0])
  );
  */

  return (
    <Link to={`/applicants/${id}`}>
      <TabContainer className="px-3 py-1 dashboard-tab">
        <Row align="middle" gutter={[16, 0]}>
          {/* Old Avatar 
          <Avatar src={avatar} size={44} icon={<UserOutlined />} />
          */}
          <SmartAvatar size={44} name={firstName} />
          <Col flex="auto">
            {/* Name */}
            <Row justify="space-between" align="middle">
              <Col>
                <Header bolded className="eighteenFont">
                  {fullName}
                </Header>

                <div style={{ marginTop: "-3px" }}>
                  <Caption className="fourteenFont " light>
                    {position}
                  </Caption>
                </div>
              </Col>
              {tag && (isXl || isXs || (isMd && !isLg)) ? (
                <Col>
                  <BorderlessTag
                    style={{ marginRight: "-20px", marginTop: "0px" }}
                    className="px-1 py-0"
                    background={styles.backgroundColor}
                    color={styles.textColor}
                  >
                    {type.includes("Interview") ? "Interview" : type}
                  </BorderlessTag>
                </Col>
              ) : null}
            </Row>

            {/* Position */}
            {/*
              @TODO
              Get position they applied for & get position for positions of accepted interns 
              */}
            {/* {!isXl ? (
              <Row>
                <Caption
                  className="twelveFont"
                  light
                  style={{ marginTop: "-3px" }}
                >
                  where did i apply?
                </Caption>
              </Row>
            ) : null} */}
          </Col>
        </Row>
      </TabContainer>
    </Link>
  );
};
export default StudentCard;
