import React, { useState } from "react";

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

  return (
    <Row className="mt-1">
      <Col xs={24} md={10}></Col>
      <Col xs={24} md={14}>
        <Header className="twentyTwoFont mb-point-25" bolded>
          Past Feedback
        </Header>

        {student.feedback.map((data) => (
          <FeedbackTab student={student} data={data} />
        ))}
      </Col>
    </Row>
  );
};

const FeedbackTab = ({ data, student, feedback }) => {
  const [readMore, toggleReadMore] = useState(false);

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

  const isMd = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((breakpoint) => breakpoint[0])
    .includes("md");

  return (
    <>
      <TabContainer className="mb-1 student-intern-tab-container" hoverable>
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
                {isMd && data.comment.length > 200 ? (
                  <div
                    className="intern-dashboard-shortened-feedback"
                    style={{ overflow: "hidden", height: "80px" }}
                  >
                    {data.comment.length}
                    {data.comment}
                  </div>
                ) : (isSm || isXs) && !isMd && data.comment.length > 100 ? (
                  <div
                    className="intern-dashboard-shortened-feedback"
                    style={{ overflow: "hidden", height: "80px" }}
                  >
                    {data.comment}
                  </div>
                ) : (
                  <div>{data.comment}</div>
                )}
              </Body>
            </Row>

            {/* Read more Button */}
            <Row justify="end">
              {data.comment.length >= 200 && (
                <Button type="link" onClick={() => toggleReadMore(!readMore)}>
                  Read more
                </Button>
              )}
            </Row>
          </Col>
        </Row>
      </TabContainer>
    </>
  );
};

export default InternPastFeedback;
