import React, { useState } from "react";

import { Row, Col, Avatar, Button, Grid, Tooltip, Modal } from "antd";
import { BiCheckCircle, BiMessageSquareDetail } from "react-icons/bi";

import {
  Header,
  Body,
  Caption,
  TabContainer,
} from "../Styled/FundamentalComponents.jsx";
import SmartAvatar from "../General/SmartAvatar";
import _ from "underscore";

import { connect } from "react-redux";
import { markFeedbackRead } from "../../redux/actions";

import { withRouter } from "react-router-dom";

import moment from "moment";

import axios from "axios";

import gql from "graphql-tag";
import { print } from "graphql";
import QueueAnim from "rc-queue-anim";

// prettier-ignore
const MUTATION = gql`
mutation MyMutation ($feedback:AWSJSON, $assocId:String!){
  updateInternAssoc(input: {assocId: $assocId, feedback: $feedback}) {
    feedback
  }
}                 
`

const mapDispatchToProps = {
  markFeedbackRead,
};

const mapStateToProps = (state) => {
  return {
    interns: state.interns.currentInterns,
  };
};

const InternPastFeedback = (props) => {
  let { student } = props;
  const [active, toggleActive] = useState(
    props.location.pathname.split("/").length === 5
  );
  const currentId = props.location.pathname.split("/")[4];

  const markRead = async (feedbackId) => {
    //markFeedbackRead(student.Id, data.Id);
    let access = await props.getAccess();

    console.log(props);
    let internIndex = _.findIndex(props.interns, { Id: student.Id });
    let internOfInterest = { ...props.interns[internIndex] };
    let newFeedback = { ...internOfInterest.feedback };
    let feedbackObj = { ...newFeedback[feedbackId] };

    feedbackObj.isRead = true;
    newFeedback[feedbackId] = feedbackObj;
    console.log(newFeedback);
    axios({
      url: "/api/mutate_feedback_assoc",
      method: "post",
      headers: {
        Authorization: access,
      },
      data: {
        query: print(MUTATION),
        variables: {
          assocId: internOfInterest.assocId,
          feedback: JSON.stringify(newFeedback),
        },
      },
    })
      .then((result) => {
        props.markFeedbackRead(internIndex, feedbackObj);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {props.student && active && (
        <Modal
          visible={active}
          footer={
            <Button
              key="submit"
              type="primary"
              onClick={() => {
                toggleActive(false);
                markRead(currentId);
              }}
            >
              Done
            </Button>
          }
          onCancel={() => {
            toggleActive(false);
            markRead(currentId);
          }}
          title={
            "On " +
            moment.utc(student.feedback[currentId].date).format("MM/DD") +
            ", " +
            student.formData[0]["First Name"] +
            " wrote:"
          }
        >
          {student.feedback[currentId].comment}
        </Modal>
      )}
      {props.loading ? null : _.filter(
          student.feedback,
          (feedback) => !feedback.isRead
        ).length > 0 ? (
        <Row className="mt-1">
          <Header className="twentyTwoFont mb-point-25" bolded>
            Unread Feedback
          </Header>
          <QueueAnim style={{ width: "100%" }}>
            {_.sortBy(
              _.filter(student.feedback, (feedback) => !feedback.isRead),
              "date"
            ).map((data) => (
              <FeedbackTab
                key={data.Id}
                student={student}
                data={data}
                markFeedbackRead={props.markFeedbackRead}
                hasModal={
                  props.location.pathname.split("/")[4] === data.Id
                    ? true
                    : false
                }
                markRead={markRead}
              />
            ))}
          </QueueAnim>
        </Row>
      ) : null}
      <Row className="mt-1">
        <Header className="twentyTwoFont mb-point-25" bolded>
          Past Feedback
        </Header>
        {_.filter(student.feedback, (feedback) => feedback.isRead).length >
        0 ? (
          <QueueAnim style={{ width: "100%" }}>
            {props.loading
              ? null
              : _.sortBy(
                  _.filter(student.feedback, (feedback) => feedback.isRead),
                  "date"
                ).map((data) => <FeedbackTab student={student} data={data} />)}
          </QueueAnim>
        ) : (
          <div className="py-5 universal-center ">
            <Row justify="center" align="middle">
              <BiMessageSquareDetail className="internship-posting-no-content-icon" />
            </Row>
            <Row justify="center" align="middle">
              <Header className="twentyFourFont" color="#bfbfbf">
                No Recent Feedback
              </Header>
            </Row>
          </div>
        )}
      </Row>
    </>
  );
};

const FeedbackTab = ({ data, student, markRead }) => {
  const [show, setShow] = useState(false);

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
            <SmartAvatar name={student.formData[0]["First Name"]} size={40} />
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
                  onClick={() => {
                    markRead(data.Id);
                  }}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Mark Read">
                <BiCheckCircle
                  className="student-intern-tab-unread-icon"
                  onClick={() => {
                    markRead(data.Id);
                  }}
                />
              </Tooltip>
            )}
          </Col>
        </Row>
      </TabContainer>
    </>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InternPastFeedback)
);
