import React, { Component } from "react";
import NavSearch from "../General/NavSearch.jsx";
import {
  Header,
  Caption,
  NavigationLink,
  TabContainer,
  PageContainer,
  InnerContainer,
} from "../Styled/FundamentalComponents.jsx";
import { check } from "react-icons-kit/fa/check";
import { remove } from "react-icons-kit/fa/remove";
import { Icon } from "react-icons-kit";
import { Row as AntRow, Col as AntCol, Avatar } from "antd";

const InternDashboard = (props) => {
  return (
    <>
      <AntRow justify="center" style={{ width: "100%" }}>
        <AntCol className="mt-1 pr-1" span={8}>
          <Header className="twentyFont mb-point-5" bolded>
            Attendance Sheet
          </Header>
          <TabContainer className="py-1 px-2">
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
          </TabContainer>
        </AntCol>
        <AntCol className="mt-1 px-1" span={8}>
          <Header className="twentyFont mb-point-25" bolded>
            Student Feedback
          </Header>
          <TabContainer
            className="py-1 px-2"
            style={{ width: "100%", height: "45vh" }}
          >
            {props.student.hours.length > 5
              ? props.student.hours
                  .slice(0, 5)
                  .map((hour) => (
                    <AttendanceRow
                      time={hour.time}
                      date={hour.date}
                      review={true}
                    />
                  ))
              : props.student.hours.map((hour) => (
                  <AttendanceRow
                    time={hour.time}
                    date={hour.date}
                    review={true}
                  />
                ))}
          </TabContainer>
        </AntCol>
        <AntCol className="mt-1 pl-1" span={8}>
          <Header className="twentyFont mb-point-25" bolded>
            Employer Grades
          </Header>
          <TabContainer
            className="py-1 px-2"
            style={{ width: "100%", height: "45vh" }}
          >
            <AntRow justify="center"></AntRow>
          </TabContainer>
        </AntCol>
      </AntRow>
    </>
  );
};

const AttendanceBox = (props) => {
  return (
    <AntRow>
      <TabContainer className="py-1 pr-2 px-2 mb-point-5 universal-middle">
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

const AttendanceRow = (props) => {
  return (
    <AntRow className="py-1" style={{ borderBottom: "2px solid #f0f0f0" }}>
      <AntCol span={20}>
        <AntRow>
          <Caption className="sixteenFont">Date: {props.date}</Caption>
        </AntRow>
        <AntRow>
          <Caption className="sixteenFont">Time: {props.time} hours </Caption>
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
  );
};

export default InternDashboard;
