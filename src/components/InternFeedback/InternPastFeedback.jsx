import React from "react";

import { Row, Col, Avatar, Button, Grid } from "antd";

import {
  Header,
  Body,
  Caption,
  TabContainer,
} from "../Styled/FundamentalComponents.jsx";

import moment from "moment";

const InternPastFeedback = (props) => {
  let { student } = props;
  let readMore = false;

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const isXs = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((breakpoint) => breakpoint[0])
    .includes("xs");

  const isSm = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((breakpoint) => breakpoint[0])
    .includes("sm");

  const isLg = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((breakpoint) => breakpoint[0])
    .includes("lg");

  return (
    <Row className="mt-1">
      <Col xs={24} md={10}>
      </Col>
      <Col xs={24} md={14}>
        <Header className="twentyTwoFont mb-point-25" bolded>
          Past Feedback
        </Header>

        {student.feedback.map((data) => {
          return (
            <TabContainer className="mb-1 student-intern-tab-container" hoverable>
              {/* Avatar Column */}
              {!isLg ? (
                <Row gutter={16} wrap={false}>
                  <Col flex="40px">
                    <Avatar src={student.image} size={40} />
                  </Col>
                  <Col flex="auto">
                    {/* Name & Date Row */}
                    <Row justify="space-between">
                      <Col span={24}>
                        <Header className="twentyFont">
                          {student.formData[0]["First Name"] +
                            " " +
                            student.formData[0]["Last Name"]}
                        </Header>
                      </Col>

                      <Col
                        //style={{backgroundColor: "red"}}
                        className="universal-middle"
                        span={24}
                      >
                        <Row justify="start">
                          <Caption className="twelveFont" light>
                            <div style={{ padding: "0px 0px 6px 0px" }}>
                              {moment(data.date).format("MM/DD/YYYY")}
                            </div>
                          </Caption>
                        </Row>
                      </Col>
                    </Row>

                    {/* Feedback Row */}
                    <Row>
                      <Body className="fourteenFont universal-left">
                        {!isSm && !isXs ? (
                          <div>
                            {(readMore = false)}
                            {data.comment}
                          </div>
                        ) : (
                          <div
                            className="intern-dashboard-shortened-feedback"
                            style={{ height: "80px", overflow: "hidden" }}
                          >
                            {(readMore = true)}
                            {data.comment}
                          </div>
                        )}
                      </Body>
                    </Row>

                    {/* Read more Button */}
                    <Row justify="end">
                      {readMore ? <Button type="link">Read more</Button> : null}
                    </Row>
                  </Col>
                </Row>
              ) : (
                <Row gutter={16} wrap={false}>
                  <Col flex="48px">
                    <Avatar src={student.image} size={48} />
                  </Col>{" "}
                  <Col flex="auto">
                    {/* Name & Date Row */}
                    <Row justify="space-between">
                      <Col>
                        <Header className="twentyTwoFont">
                          {student.formData[0]["First Name"] +
                            " " +
                            student.formData[0]["Last Name"]}
                        </Header>
                      </Col>

                      <Col
                        className="universal-middle"
                      >
                        <Row justify="end">
                        <Caption className="fourteenFont" light>
                          {moment(data.date).format("MM/DD/YYYY")}
                        </Caption>
                        </Row>
                      </Col>
                    </Row>

                    {/* Feedback Row */}
                    <Row>
                      <Body className="fourteenFont universal-left">
                        {data.comment.length < 200 ? (
                          <div>
                            {(readMore = false)}
                            {data.comment}
                          </div>
                        ) : (
                          <div
                            className="intern-dashboard-shortened-feedback"
                            style={{ height: "80px", overflow: "hidden" }}
                          >
                            {(readMore = true)}
                            {data.comment}
                          </div>
                        )}
                      </Body>
                    </Row>

                    {/* Read more Button */}
                    <Row justify="end">
                      {readMore ? <Button type="link">Read more</Button> : null}
                    </Row>
                  </Col>
                </Row>
              )}

              {/* Name, Date, Comment Column */}
            </TabContainer>
          );
        })}
      </Col>
    </Row>
  );
};

export default InternPastFeedback;
