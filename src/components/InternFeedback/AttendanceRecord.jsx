import React, { useState, useEffect } from "react";

import {
  Row,
  Col,
  Calendar,
  Select,
  Button,
  Tooltip,
  Grid,
  Pagination,
  Empty,
} from "antd";
import QueueAnim from "rc-queue-anim";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { BiTime } from "react-icons/bi";

import {
  Header,
  TabContainer,
  Caption,
} from "../Styled/FundamentalComponents.jsx";
import AttendanceCard from "./AttendanceCard.jsx";

import _ from "underscore";

import { Scrollbars } from "react-custom-scrollbars";

import moment from "moment";

const ATTENDANCE_PER_PAGE = 5;

const AttendanceRecord = (props) => {
  const { student } = props;

  const [state, setState] = useState({
    date: moment(),
    dateList: moment(),
    toolTipDate: moment(),
    toolTipHour: "",
  });
  const [page, changePage] = useState(0);

  /**
   * Approved hours in state is a dictionary to track which hours
   * have been approved
   */
  const [approvedHours, changeApprovedHours] = useState({});
  /**
   * useEffect only runs when @props student changes, which on this page
   * would only occur during a approval or denial.
   * 
   * The useEffect loops through the hours and assigns each approved
   * date to an hour in the dictionary in the following format:
   * 
   *  mm/dd/yy: hours
   * 
   * The value is used in dateFullCellRender
   */
  useEffect(() => {
    let newHours = {};
    if (student) {
      _.filter(props.student.hours, (day) => day.isApproved).forEach((data) => {
        //splits date string into separate variables
        let dateWorked = moment(
          moment(data.date).format("MM/DD/YYYY"),
          "MM/DD/YYYY"
        ).date();
        let monthWorked = moment(
          moment(data.date).format("MM/DD/YYYY"),
          "MM/DD/YYYY"
        ).month();
        let yearWorked = moment(
          moment(data.date).format("MM/DD/YYYY"),
          "MM/DD/YYYY"
        ).year();
        let hoursWorked = data.time;

        newHours[
          monthWorked + "/" + dateWorked + "/" + yearWorked
        ] = hoursWorked;
      });
    }
    changeApprovedHours(newHours);
  }, [student]);

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const isMd = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((breakpoint) => breakpoint[0])
    .includes("md");

  //Changes Day Names (dd -> ddd)
  moment.updateLocale("en", {
    weekdaysMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  });

  return (
    <Row className="mt-1" justify="end">
      <Col
        className="pr-2"
        sm={{ span: 10, order: 1 }}
        xs={{ span: 24, order: 2 }}
      >
        <Header bolded className="twentyTwoFont mb-point-25">
          To Be Approved
        </Header>
        {props.loading ? null : _.filter(
            props.student.hours,
            (day) => !day.isApproved
          ).length > 0 ? (
          <QueueAnim>
            {_.sortBy(
              _.filter(props.student.hours, (day) => !day.isApproved),
              "date"
            )
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
                  getAccess={props.getAccess}
                />
              ))}
          </QueueAnim>
        ) : (
          <div className="py-2-5 universal-center ">
            <Row justify="center" align="middle">
              <BiTime className="internship-posting-no-content-icon" />
            </Row>
            <Row justify="center" align="middle">
              <Header className="twentyFourFont" color="#bfbfbf">
                No Hours to Approve
              </Header>
            </Row>
          </div>
        )}
        <Row justify="center">
          {props.loading ? null : (
            <Pagination
              current={page + 1}
              total={
                _.filter(props.student.hours, (day) => !day.isApproved).length
              }
              showLessItems={true}
              pageSize={ATTENDANCE_PER_PAGE}
              onChange={(pageChange) => changePage(pageChange - 1)}
              hideOnSinglePage={true}
              style={{ marginTop: "10px" }}
            />
          )}
        </Row>
      </Col>
      <Col sm={{ span: 14, order: 2 }} xs={{ span: 24, order: 1 }}>
        <Header bolded className="twentyTwoFont">
          Attendance Record
        </Header>

        {props.loading ? null : (
          <TabContainer className="mt-point-25 px-2 py-2">
            <Row
              gutter={[16, 16]}
              justify="center"
              align={
                _.filter(props.student.hours, (day) => day.isApproved)
                  .length !== 0
                  ? "top"
                  : "middle"
              }
            >
              {/* attendance list */}
              <Col
                xs={24}
                sm={24}
                m={24}
                lg={24}
                xl={12}
                style={{ paddingLeft: "4px" }}
              >
                {_.filter(props.student.hours, (day) => day.isApproved)
                  .length !== 0 ? (
                  <>
                    {isMd ? (
                      <Row
                        justify="space-between"
                        style={{ paddingBottom: "12px", paddingRight: "23px" }}
                      >
                        <Header className="twentyFont">Date</Header>
                        <Header className="twentyFont">Hours Worked</Header>
                      </Row>
                    ) : (
                      <Row
                        justify="space-between"
                        style={{ paddingBottom: "12px", paddingRight: "23px" }}
                      >
                        <Header className="twentyFont">Date</Header>
                        <Header className="twentyFont">Hours Worked</Header>
                      </Row>
                    )}

                    <Row className="attendance-list-container">
                      {_.sortBy(
                        _.filter(props.student.hours, (day) => day.isApproved),
                        "date"
                      ).map((data) => {
                        return (
                          <Scrollbars autoHide={true} style={{ height: 50 }}>
                            {isMd ? (
                              <Col flex="auto">
                                <Row
                                  className="attendance-list-row"
                                  align="middle"
                                  justify="space-between"
                                >
                                  <Button
                                    style={{ padding: "0px" }}
                                    type="link"
                                    onClick={() => {
                                      setState({
                                        date: moment(data.date).format(
                                          "MM/DD/YYYY"
                                        ),
                                        dateList: moment(data.date).format(
                                          "MM/DD/YYYY"
                                        ),
                                      });
                                    }}
                                  >
                                    <Header className="student-attendance-list">
                                      {moment(data.date).format("MM/DD/YYYY")}
                                    </Header>
                                  </Button>

                                  <Header
                                    className="sixteenFont mr-point-5"
                                    style={{ color: "#a0a0a0" }}
                                  >
                                    {data.time}
                                  </Header>
                                </Row>
                              </Col>
                            ) : (
                              <Col flex="auto">
                                <Row
                                  className="attendance-list-row"
                                  align="middle"
                                  justify="space-between"
                                >
                                  <Button
                                    style={{ padding: "0px" }}
                                    type="link"
                                    onClick={() => {
                                      setState({
                                        date: moment(data.date).format(
                                          "MM/DD/YYYY"
                                        ),
                                        dateList: moment(data.date).format(
                                          "MM/DD/YYYY"
                                        ),
                                      });
                                    }}
                                  >
                                    <Header className="student-attendance-list">
                                      <div style={{ fontSize: "16px" }}>
                                        {moment(data.date).format("MM/DD/YYYY")}
                                      </div>
                                    </Header>
                                  </Button>

                                  <Header
                                    className="sixteenFont mr-point-5"
                                    color="#a0a0a0"
                                  >
                                    {data.time}
                                  </Header>
                                </Row>
                              </Col>
                            )}
                          </Scrollbars>
                        );
                      })}
                    </Row>
                  </>
                ) : (
                  <Row justify="center" align="middle">
                    <Empty
                      description={
                        <Caption className="eighteenFont" light>
                          {student.formData["0"]["First Name"] +
                            " " +
                            student.formData["0"]["Last Name"]}{" "}
                          doesn't have any approved hours{" "}
                        </Caption>
                      }
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  </Row>
                )}
              </Col>

              {/* Calendar */}
              <Col lg={24} xl={12} className="attendance-calendar">
                <Calendar
                  fullscreen={false}
                  //sets date value being displayed
                  value={moment(state.date)}
                  //updates current date value if new date is selected
                  onSelect={(date) => {
                    setState({ date: date });
                  }}
                  //Fills calendar dates
                  dateFullCellRender={(date) => {
                    let style;
                    let toolTipActive = false;
                    let hoursWorked;

                    //Date, month, year being displayed
                    const day = date.date(); //mapped; 1-31
                    const newMonth = date.month();
                    const newYear = date.year();

                    //Finds if they worked on a specific date
                    const hasWorked = (dd, mm, yy) => {
                      let dateType = false;
                      let isSelected = false;

                      if (
                        approvedHours[mm + "/" + dd + "/" + yy] !== undefined
                      ) {
                        hoursWorked = approvedHours[mm + "/" + dd + "/" + yy];
                        dateType = true;
                        isSelected = true;
                        toolTipActive = true;
                      } else {
                        dateType = false;
                      }

                      //Date, month, year chosen from detailed list
                      let selectedDate = moment(
                        state.dateList,
                        "MM/DD/YYYY"
                      ).date();
                      let selectedMonth = moment(
                        state.dateList,
                        "MM/DD/YYYY"
                      ).month();
                      let selectedYear = moment(
                        state.dateList,
                        "MM/DD/YYYY"
                      ).year();

                      // more comparisons– date from list compared against dates being displayed in the calendar
                      if (
                        selectedDate === dd &&
                        selectedMonth === mm &&
                        selectedYear === yy &&
                        isSelected
                      ) {
                        dateType = "fromList";
                      }

                      if (
                        dd === new Date().getDate() &&
                        mm === new Date().getMonth() &&
                        yy === new Date().getFullYear()
                      )
                        dateType = "today";

                      return dateType;
                    };

                    switch (hasWorked(day, newMonth, newYear)) {
                      case "today":
                        style = "attendance-date-current";
                        break;
                      case "fromList":
                        style = "attendance-date-selected";
                        break;
                      case true:
                        style = "attendance-date-worked";
                        break;
                      case false:
                        style = "attendance-date-default";
                        break;
                      default:
                        style = "attendance-date-default";
                    }

                    return (
                      <div className={style}>
                        <Tooltip
                          title={toolTipActive ? hoursWorked + " Hours" : ""}
                        >
                          {day}
                        </Tooltip>
                      </div>
                    );
                  }}
                  //Calendar header
                  headerRender={({ value }) => {
                    const start = 0;
                    const end = 12;

                    //List of months, Jan–Dec
                    const monthOptions = [];

                    const current = moment().clone();
                    const localeData = moment().localeData();
                    const months = [];

                    for (let i = 0; i < 12; i++) {
                      current.month(i);
                      months.push(localeData.monthsShort(current));
                    }

                    for (let index = start; index < end; index++) {
                      monthOptions.push(
                        <Select.Option className="month-item" key={`${index}`}>
                          {months[index]}
                        </Select.Option>
                      );
                    }

                    // Displayed Month #, 0-11
                    let month = value.month();

                    // Displayed Year
                    let year = value.year();

                    //Return Button Function
                    const monthChecker = (propsMonth, propsYear) => {
                      if (
                        propsMonth != new Date().getMonth() ||
                        propsYear != new Date().getFullYear()
                      ) {
                        return (
                          <Row>
                            <Button
                              type="link"
                              onClick={() => {
                                setState({
                                  date: moment(),
                                  dateList: moment(),
                                });
                              }}
                            >
                              Today
                            </Button>
                          </Row>
                        );
                      } else {
                        return;
                      }
                    };
                    //returns new header
                    return (
                      <Row>
                        {/* Calendar Arrow Buttons + Month/Year Info */}
                        <Col span={24}>
                          <Row justify="center" align="middle">
                            <Button
                              size="large"
                              type="link"
                              icon={<LeftOutlined />}
                              onClick={() => {
                                const currentMonth = month; //number 0-11
                                const desiredMonth = currentMonth - 1; //back 1 month

                                const newValue = value.clone();
                                newValue.month(desiredMonth); //get month data
                                setState({ date: newValue }); //display new month data
                              }}
                            />
                            <Header className="eighteenFont">
                              {monthOptions[month].props.children} {year}
                            </Header>

                            <Button
                              icon={<RightOutlined />}
                              className="fourteenFont"
                              size="large"
                              type="link"
                              onClick={() => {
                                const currentMonth = month; //number 0-11
                                const desiredMonth = currentMonth + 1; //back forward month

                                const newValue = value.clone();
                                newValue.month(desiredMonth); //get month data
                                setState({ date: newValue }); //display new month data
                              }}
                            />
                          </Row>
                        </Col>

                        {/* Return to Today Button */}
                        <Row>{monthChecker(month, year)}</Row>
                      </Row>
                    );
                  }}
                />
              </Col>
            </Row>
          </TabContainer>
        )}
      </Col>
    </Row>
  );
};

export default AttendanceRecord;
