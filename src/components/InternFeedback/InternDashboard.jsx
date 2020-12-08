import React, { useState, useEffect } from "react";
import {
  Header,
  Caption,
  TabContainer,
  BorderlessTag,
  Body,
} from "../Styled/FundamentalComponents.jsx";
import { check } from "react-icons-kit/fa/check";
import { remove } from "react-icons-kit/fa/remove";
import { Icon } from "react-icons-kit";
import { Row as AntRow, Col as AntCol, Avatar, Button } from "antd";
import _ from "underscore";
import { toInteger } from "lodash";

const InternDashboard = (props) => {
  return (
    <>
      <AntRow justify="center" style={{ width: "100%" }}>
        <AntCol className="mt-1 pr-1" span={8}>
          <Header className="twentyTwoFont mb-point-25" bolded>
            Attendance Sheet
          </Header>
          {props.student.hours.length > 5
            ? props.student.hours
                .slice(0, 5)
                .map((hour) => (
                  <AttendanceBox
                    time={hour.time}
                    date={hour.date}
                    review={true}
                  />
                ))
            : props.student.hours.map((hour) => (
                <AttendanceBox
                  time={hour.time}
                  date={hour.date}
                  review={true}
                />
              ))}
        </AntCol>
        <AntCol className="mt-1 px-1" span={8}>
          <Header className="twentyTwoFont mb-point-25" bolded>
            Recent Feedback
          </Header>
          {props.student.feedback.length > 2
            ? props.student.feedback
                .splice(0, 2)
                .map((feedback) => (
                  <StudentFeedbackCard
                    avatar={props.student.image}
                    name={props.student.firstName}
                    feedback={feedback}
                  />
                ))
            : props.student.feedback.map((feedback) => (
                <StudentFeedbackCard
                  avatar={props.student.image}
                  name={props.student.firstName}
                  feedback={feedback}
                />
              ))}
        </AntCol>
        <AntCol className="mt-1 pl-1" span={8}>
          <Header className="twentyTwoFont mb-point-25" bolded>
            Employer Grades
          </Header>
          {sortReview(props.student.review)
            .slice(0)
            .reverse()
            .map((review) => (
              <GradeCard review={review} />
            ))}
        </AntCol>
      </AntRow>
    </>
  );
};

const AttendanceBox = (props) => {
  return (
    <AntRow>
      <TabContainer className="py-1-5 pr-2 px-2 mb-point-5 universal-middle">
        <AntRow>
          <AntCol span={20}>
            <AntRow>
              <Caption className="sixteenFont">Date: {props.date}</Caption>
            </AntRow>
            <AntRow>
              <Caption className="sixteenFont">
                Time: {props.time} hours{" "}
              </Caption>
            </AntRow>
          </AntCol>
          <AntCol className="universal-middle universal-right" span={4}>
            {props.review && (
              <Icon
                className="mx-point-5"
                icon={check}
                style={{ color: "#bfbfbf" }}
              />
            )}
            {props.review && (
              <Icon
                className="mx-point-5"
                icon={remove}
                style={{ color: "#bfbfbf" }}
              />
            )}
          </AntCol>
        </AntRow>
      </TabContainer>
    </AntRow>
  );
};

const StudentFeedbackCard = (props) => {
  return (
    <TabContainer className="py-1-5 px-2 mb-point-5" style={{ width: "100%" }}>
      <AntRow>
        <AntCol>
          <Avatar src={props.avatar} size={48} />
        </AntCol>
        <AntCol offset={1}>
          <Header className="twentyFont">{props.name}</Header>
          <Caption className="fourteenFont" thin light>
            {props.feedback.date}
          </Caption>
        </AntCol>
        <AntCol className="universal-middle" flex="auto">
          <AntRow justify="end">
            <BorderlessTag
              className="px-1-5"
              color="#fa541c"
              background="#ffd8bf"
            >
              Unread
            </BorderlessTag>
          </AntRow>
        </AntCol>
      </AntRow>
      <AntRow className="py-1">
        <AntCol
          flex="40px"
          style={{ borderBottom: "2px #91d5ff solid" }}
        ></AntCol>
      </AntRow>
      <AntRow justify="start">
        <Body className="fourteenFont universal-left">
          {props.feedback.comment.length < 200 ? (
            <div>{props.feedback.comment}</div>
          ) : (
            <div
              className="intern-dashboard-shortened-feedback"
              style={{ height: "80px", overflow: "hidden" }}
            >
              {props.feedback.comment}
            </div>
          )}
        </Body>
      </AntRow>
      <AntRow className="pt-point-5s" justify="end">
        <Button type="link">Continue Reading</Button>
      </AntRow>
    </TabContainer>
  );
};

const sortReview = (review) => {
  let sortedReviews = _.sortBy(review, (piece) => new Date(piece.date));
  const today = new Date();
  const filteredReviews = sortedReviews.filter(
    (piece) => today - new Date(piece.date) < 21601553606
  );

  return filteredReviews;
};

const GradeCard = (props) => {
  /**
   * So... the way the current date system works is below:
   * 1) I filter the dates by an arbitrary cut-off date before the current date
   * 2) I then return that filtered list through sortReview
   * 3) Any date that is BEFORE the current date is labeled overdue
   * 4) All other dates are properly labeled
   */
  const today = new Date();

  const calculateDays = (oldDate, newDate) => {
    let diff = Math.abs(oldDate - newDate) / (1000 * 3600 * 24);

    if (diff >= 30) {
      return { value: Math.round(diff / 30), unit: "months" };
    }

    return { value: Math.round(diff), unit: "days" };
  };

  return (
    <TabContainer className="py-1-5 px-2 mb-point-5" style={{ width: "100%" }}>
      <AntRow justify="space-between">
        <AntCol>
          <Header className="twentyFont">Performance Review</Header>
        </AntCol>
        <AntCol>
          {today - new Date(props.review.date) > 0 ? (
            <BorderlessTag
              className="px-1-5"
              color="#f5222d"
              background="#ffccc7"
            >
              Overdue
            </BorderlessTag>
          ) : (
            <BorderlessTag
              className="px-1-5"
              color="#fa541c"
              background="#ffd8bf"
            >
              <span>
                Due in{" "}
                <strong>
                  {calculateDays(today, new Date(props.review.date)).value}
                </strong>{" "}
                {calculateDays(today, new Date(props.review.date)).unit}
              </span>
            </BorderlessTag>
          )}
        </AntCol>
      </AntRow>
    </TabContainer>
  );
};

export default InternDashboard;
