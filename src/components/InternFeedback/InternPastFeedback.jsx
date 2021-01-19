import React, { useState } from "react";

import { Row, Col, Avatar, Button, Grid, Tooltip, Modal } from "antd";
import { BiCheckCircle } from "react-icons/bi";

import {
  Header,
  Body,
  Caption,
  TabContainer,
} from "../Styled/FundamentalComponents.jsx";
import _ from "underscore";

import { connect } from "react-redux";
import { markFeedbackRead } from "../../redux/actions";

import { useLocation } from "react-router-dom";

import moment from "moment";

const mapDispatchToProps = {
  markFeedbackRead,
};

const mapStateToProps = (state) => {
  return {
    companyInfo: state.companyInfo,
  };
};

const InternPastFeedback = (props) => {
  let { student, fromDashboard } = props;

  return (
    <>
      <Row className="mt-1">
        <Header className="twentyTwoFont mb-point-25" bolded>
          Unread Feedback
        </Header>
        {_.sortBy(
          student.feedback.filter((feedback) => !feedback.isRead),
          "date"
        ).map((data) => (
          <FeedbackTab
            student={student}
            data={data}
            markFeedbackRead={props.markFeedbackRead}
            hasModal={fromDashboard}
          />
        ))}
      </Row>
      <Row className="mt-1">
        <Header className="twentyTwoFont mb-point-25" bolded>
          Past Feedback
        </Header>
        {_.sortBy(
          student.feedback.filter((feedback) => feedback.isRead),
          "date"
        ).map((data) => (
          <FeedbackTab student={student} data={data} />
        ))}
      </Row>
    </>
  );
};

const FeedbackTab = ({ data, student, markFeedbackRead, hasModal }) => {
  const [active, toggleActive] = useState(hasModal);
  const [show, setShow] = useState(false);

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const location = useLocation();

  const getFeedbackId = () => {
    let id;
    {
      hasModal
        ? (id = location.pathname.substring(
            location.pathname.lastIndexOf("/feedback/") + 10,
            location.pathname.length
          ))
        : (id = "");
    }
    return id;
  };

  console.log(data);

  const findFeedback = () => {
    let message;

    switch (data.Id) {
      case getFeedbackId():
        message = data.comment;
        break;
      default:
        break;
    }
    return message;
  };

  const markRead = () => {
    markFeedbackRead(student.Id, data.Id);
  };

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
      {findFeedback() ? (
        <Modal
          visible={active}
          footer={
            <Button
              key="done"
              type="primary"
              onClick={() => {
                toggleActive(false);
                markRead();}}
            >
              Done
            </Button>
          }
          onCancel={() => {
            toggleActive(false);
            markRead();
          }}
        >
          {findFeedback()}
        </Modal>
      ) : null}

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

              <Col className="universal-middle" span={24}>
                <Row justify="start">
                  <Caption className="twelveFont" light>
                    <div style={{ padding: "0px 0px 6px 0px" }}>
                      {moment.utc(data.date).format("MM/DD/YYYY")}
                    </div>
                  </Caption>
                </Row>
              </Col>
            </Row>

            {/* Feedback Row */}
            <Row>
              <Body className="fourteenFont universal-left">
                {isMd && data.comment.length > 200 && show === false ? (
                  <div
                    className="intern-dashboard-shortened-feedback"
                    style={{ overflow: "hidden", height: "80px" }}
                  >
                    {data.comment}
                  </div>
                ) : (isSm || isXs) &&
                  !isMd &&
                  data.comment.length > 100 &&
                  show === false ? (
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
              {(isMd && data.comment.length > 200) ||
              ((isSm || isXs) && !isMd && data.comment.length > 100) ? (
                <Button type="link" onClick={() => setShow(!show)}>
                  {!show ? "Read more" : "Read less"}
                </Button>
              ) : null}
            </Row>
          </Col>
          <Col>
            {data.isRead ? (
              <Tooltip title="Read">
                <BiCheckCircle
                  className="student-intern-tab-read-icon"
                  onClick={markRead}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Mark Read">
                <BiCheckCircle
                  className="student-intern-tab-unread-icon"
                  onClick={markRead}
                />
              </Tooltip>
            )}
          </Col>
        </Row>
      </TabContainer>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InternPastFeedback);
