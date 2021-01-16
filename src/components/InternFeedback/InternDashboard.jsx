import React, { useState, useEffect } from "react";
import {
  Header,
  Caption,
  TabContainer,
  BorderlessTag,
  Body,
} from "../Styled/FundamentalComponents.jsx";
import AttendanceCard from "./AttendanceCard.jsx";
import GradeCard from "./GradeCard.jsx";
import { Row as AntRow, Col as AntCol, Avatar, Button, Pagination } from "antd";
import _ from "underscore";

const ATTENDANCE_PER_PAGE = 5;
const FEEDBACK_PER_PAGE = 2;
const GRADES_PER_PAGE = 1;

const InternDashboard = (props) => {
  const [page, changePage] = useState(0);
  const [feedbackPage, changeFeedbackPage] = useState(0);
  const [gradePage, changeGradePage] = useState(0);

  return (
    <>
      <AntRow justify="center" style={{ width: "100%" }}>
        <AntCol className="mt-1 pr-1" span={8}>
          <Header className="twentyTwoFont mb-point-25" bolded>
            Attendance Sheet (To Be Approved)
          </Header>
          {props.student.hours.filter((day) => !day.isApproved).length > 5
            ? props.student.hours
                .filter((day) => !day.isApproved)
                .slice(
                  page * ATTENDANCE_PER_PAGE,
                  (page + 1) * ATTENDANCE_PER_PAGE
                )
                .map((hour, index) => (
                  <AttendanceCard
                    key={index}
                    studentId={props.student.Id}
                    hoursId={hour.Id}
                    time={hour.time}
                    date={hour.dateFormatted}
                    review={true}
                  />
                ))
            : props.student.hours
                .filter((day) => !day.isApproved)
                .map((hour, index) => (
                  <AttendanceCard
                    key={index}
                    studentId={props.student.Id}
                    hoursId={hour.Id}
                    time={hour.time}
                    date={hour.dateFormatted}
                    review={true}
                  />
                ))}
        </AntCol>
        <AntCol className="mt-1 px-1" span={8}>
          <Header className="twentyTwoFont mb-point-25" bolded>
            Recent Feedback
          </Header>
          {props.student.feedback
            .filter((piece) => !piece.isRead)
            .slice(
              feedbackPage * FEEDBACK_PER_PAGE,
              (feedbackPage + 1) * FEEDBACK_PER_PAGE
            )
            .map((feedback) => (
              <StudentFeedbackCard
                avatar={props.student.image ? props.student.image : false}
                name={props.student.formData[0]["First Name"]}
                feedback={feedback}
              />
            ))}
        </AntCol>
        <AntCol className="mt-1 pl-1" span={8}>
          <Header className="twentyTwoFont mb-point-25" bolded>
            Employer Grades
          </Header>
          {sortReview(props.student.grades)
            .slice(
              gradePage * GRADES_PER_PAGE,
              (gradePage + 1) * GRADES_PER_PAGE
            )
            .map((grade) => (
              <GradeCard review={grade} />
            ))}
        </AntCol>
      </AntRow>
      <AntRow justify="center" style={{ width: "100%" }}>
        <AntCol className="mt-point-25 pr-1 universal-center" span={8}>
          <Pagination
            current={page + 1}
            total={props.student.hours.filter((day) => !day.isApproved).length}
            showLessItems={true}
            pageSize={ATTENDANCE_PER_PAGE}
            onChange={(pageChange) => changePage(pageChange - 1)}
            hideOnSinglePage={true}
            style={{ marginTop: "10px" }}
          />
        </AntCol>
        <AntCol className="mt-point-25 px-1 universal-center" span={8}>
          <Pagination
            current={feedbackPage + 1}
            total={
              props.student.feedback.filter((piece) => !piece.isRead).length
            }
            showLessItems={true}
            pageSize={FEEDBACK_PER_PAGE}
            onChange={(pageChange) => changeFeedbackPage(pageChange - 1)}
            hideOnSinglePage={true}
            style={{ marginTop: "10px" }}
          />
        </AntCol>
        <AntCol className="mt-point-25 pl-1 universal-center" span={8}>
          <Pagination
            current={gradePage + 1}
            total={
              props.student.grades.filter((piece) => !piece.isFinished).length
            }
            showLessItems={true}
            pageSize={GRADES_PER_PAGE}
            onChange={(pageChange) => changeGradePage(pageChange - 1)}
            hideOnSinglePage={true}
            style={{ marginTop: "10px" }}
          />
        </AntCol>
      </AntRow>
    </>
  );
};

const StudentFeedbackCard = (props) => {
  const ColorList = ["#f56a00", "#7265e6", "#13c2c2", "#00a2ae"];

  return (
    <TabContainer className="py-1-5 px-2 mb-point-5" style={{ width: "100%" }}>
      <AntRow>
        <AntCol>
          {props.avatar ? (
            <Avatar src={props.avatar} size={48} />
          ) : (
            <Avatar
              size={48}
              gap={-4}
              style={{ backgroundColor: ColorList[props.name.length % 4] }}
            >
              {props.name.substring(0, 1)}
            </Avatar>
          )}
        </AntCol>
        <AntCol offset={1}>
          <Header className="twentyFont">{props.name}</Header>
          <Caption className="fourteenFont" thin light>
            {props.feedback.dateFormatted}
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
  const filteredReviews = review.filter((piece) => !piece.isFinished);
  const sortedReviews = _.sortBy(
    filteredReviews,
    (piece) => piece["Days Until dueDate"]
  );

  return sortedReviews;
};

export default InternDashboard;
