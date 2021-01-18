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
  let { firstName, lastName, age, avatar, id, tag, type, position } = props;
  let fullName = firstName + " " + lastName;
  let colors = {
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
    // review: {
    //   text: "white",
    //   background: "#fa8c16"
    // },
    // online: {
    //   text: "white",
    //   background: "#52c41a"
    // },
    // inPerson: {
    //   text: "white",
    //   background: "#1890ff"
    // }
  };

  let textColor;
  let backgroundColor;

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

  const setColor = () => {
    switch (type) {
      case "Online Interview":
        textColor = colors.online.text;
        backgroundColor = colors.online.background;
        break;
      case "Review":
        textColor = colors.review.text;
        backgroundColor = colors.review.background;
        break;

      case "On-Site Interview":
        textColor = colors.online.text;
        backgroundColor = colors.online.background;
        break;
      default:
        textColor = "#262626";
        backgroundColor = "#f5f5f5";
        break;
    }
  };

  console.log(Object.entries(screens)
  .filter((screen) => !!screen[1])
  .map((breakpoint) => breakpoint[0]));

  return (
    <Link to={`/applicants/${id}`}>
      <TabContainer className="px-3 py-1 dashboard-tab">
        <Row align="middle" gutter={[16, 0]}>
          {/* Avatar */}
          <Avatar src={avatar} size={44} icon={<UserOutlined />} />

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
              {tag && (isXl || isXs || (isMd && !isLg) ) ? (
                <Col>
                  {setColor()}
                  <BorderlessTag
                    style={{ marginRight: "-20px", marginTop: "0px" }}
                    className="px-1 py-0"
                    background={backgroundColor}
                    color={textColor}
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
