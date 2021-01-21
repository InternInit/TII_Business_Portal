import React from "react";
import { Avatar, Row, Col, Grid } from "antd";
import {
  Header,
  Caption,
  TabContainer,
} from "../Styled/FundamentalComponents.jsx";

import { Link } from "react-router-dom";

import { UserOutlined } from "@ant-design/icons";

const PageFeedback = (props) => {
  let { firstName, lastName, school, avatar, position, id } = props;
  let fullName = firstName + " " + lastName;

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const isMd = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((breakpoint) => breakpoint[0])
    .includes("md");

  return (
    <Link to={`/my-interns/${id}`}>
    <TabContainer className="px-3 py-1 dashboard-tab">
      {isMd ? (
        <Row align="middle" gutter={[16, 0]}>
          <Col>
            <Avatar src={avatar} size={50} icon={UserOutlined} />
          </Col>

          <Col flex="auto">
            <Row justify="space-between" align="middle">
              <Col>
                <Row>
                  <Header className="eighteenFont" bolded>
                    {fullName}
                  </Header>
                </Row>
                <Row>
                  <Caption
                    className="fourteenFont"
                    light
                    style={{ marginTop: "-3px" }}
                  >
                    {position}
                  </Caption>
                </Row>
              </Col>
              <Col>
                <Caption className="universal-center sixteenFont" light>
                  {school}
                </Caption>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <Row align="middle" gutter={[16, 0]}>
          <Col>
            <Avatar src={avatar} size={50} icon={UserOutlined} />
          </Col>

          <Col flex="auto">
            <Row justify="space-between" align="middle">
              <Col>
                <Row>
                  <Header className="twentyFont" bolded>
                    {fullName}
                  </Header>
                </Row>
                <Row>
                  <Caption
                    className="fourteenFont"
                    light
                    style={{ marginTop: "-3px" }}
                  >
                    {position}
                  </Caption>
                </Row>
              </Col>
              <Col>
                {/* <Caption className="universal-center sixteenFont" light>
                  {school}
                </Caption> */}
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </TabContainer>
    </Link>
  );
};
export default PageFeedback;
