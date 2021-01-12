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
  // let filler =
  //   "tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed";
  let { student } = props;
  let readMore = false;

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const isXs = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((breakpoint) => breakpoint[0])
    .includes("xs");

  const isLg = Object.entries(screens)
  .filter((screen) => !!screen[1])
  .map((breakpoint) => breakpoint[0])
  .includes("lg");

  return (
    <Row>
      <Col span={12} offset={12}>
        <Header className="twentyEightFont" bolded>
          Past Feedback
        </Header>

        {student.feedback.map((data) => {
          return (
            <TabContainer>
              {/* Avatar Column */}
              {!isLg ? (
                <Row className="px-1 py-2" gutter={16} wrap={false}>
                  <Col flex="40px">
                    <Avatar src={student.image} size={40} />
                  </Col>
                  <Col flex="auto">
                    {/* Name & Date Row */}
                    <Row justify="space-between">
                      <Col xl={20}>
                        <Header className="twentyFont">
                          {student.formData[0]["First Name"] +
                            " " +
                            student.formData[0]["Last Name"]}
                        </Header>
                      </Col>

                      <Col 
                      //style={{backgroundColor: "red"}}
                        className="universal-middle"
                        sm={24}
                        m={24}
                      >
                        <Row justify="start">
                        <Caption className="twelveFont" light>
                          <div style={{padding: "0px 0px 6px 0px"}}>{moment(data.date).format("MM/DD/YYYY")}</div>
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
              ) : (
                <Row className="px-3 py-2" gutter={16} wrap={false}>
                  <Col flex="48px">
                    <Avatar src={student.image} size={48} />
                  </Col>{" "}
                  <Col flex="auto">
                    {/* Name & Date Row */}
                    <Row justify="space-between">
                      <Col xl={20}>
                        <Header className="twentyTwoFont">
                          {student.formData[0]["First Name"] +
                            " " +
                            student.formData[0]["Last Name"]}
                        </Header>
                      </Col>

                      <Col
                        className="universal-middle"
                        sm={24}
                        m={24}
                        lg={24}
                        xl={4}
                      >
                        <Caption className="fourteenFont" light>
                          {moment(data.date).format("MM/DD/YYYY")}
                        </Caption>
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
