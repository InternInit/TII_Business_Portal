import React from "react";

import { Row, Col, Calendar, Select, Button, Tooltip } from "antd";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { Header, TabContainer } from "../Styled/FundamentalComponents.jsx";

import { Scrollbars } from "react-custom-scrollbars";

import moment from "moment";

class AttendanceRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      dateList: moment(),
      toolTipDate: moment(),
      toolTipHour: "",
    };
  }

  render() {
    let { student } = this.props;

    //Changes Day Names (dd -> ddd)
    moment.updateLocale("en", {
      weekdaysMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    });

    return (
      <Row>
        <Col offset={10}>
          <Header bolded className="twentyEightFont">
            Attendance Record
          </Header>

          <TabContainer className="px-2 py-2">
            <Row gutter={[16]} justify="center" align="middle">
              {/* attendance list */}
              <Col span={12} style={{ paddingLeft: "4px" }}>
                <Row
                  justify="space-between"
                  style={{ paddingBottom: "12px", paddingRight: "23px" }}
                >
                  <Header className="twentyFont">Date</Header>
                  <Header className="twentyFont">Hours Worked</Header>
                </Row>

                <Row className="attendance-list-container">
                  {student.hours.map((data) => {
                    return (
                      <Scrollbars
                        autoHide={true}
                        style={{ width: 296, height: 50 }}
                      >
                        <Col span={24}>
                          <Row
                            className="attendance-list-row"
                            align="middle"
                            justify="space-between"
                          >
                            <Button
                              style={{ padding: "0px" }}
                              type="link"
                              onClick={() => {
                                this.setState({
                                  date: moment(data.date).format("MM/DD/YYYY"),
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
                              className="sixteenFont"
                              style={{ color: "#a0a0a0" }}
                            >
                              {data.time}
                            </Header>
                          </Row>
                        </Col>
                      </Scrollbars>
                    );
                  })}
                </Row>
              </Col>

              {/* Calendar */}
              <Col span={12} className="attendance-calendar">
                <Calendar
                  fullscreen={false}
                  //sets date value being displayed
                  value={moment(this.state.date)}
                  //updates current date value if new date is selected
                  onSelect={(date) => {
                    this.setState({ date: date });
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
                      let datesWorked = [];

                      student.hours.map((data) => {
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

                        datesWorked.push({
                          date: dateWorked,
                          month: monthWorked,
                          year: yearWorked,
                          time: hoursWorked,
                        });
                      });

                      //Compares dates to be displayed against dates worked
                      for (let i = 0; i < datesWorked.length; i++) {
                        if (
                          dd === datesWorked[i].date &&
                          mm === datesWorked[i].month &&
                          yy === datesWorked[i].year
                        ) {
                          dateType = true;
                          isSelected = true;
                          toolTipActive = true;
                          hoursWorked = datesWorked[i].time;
                          break;
                        } else {
                          dateType = false;
                        }
                      }

                      //Date, month, year chosen from detailed list
                      let selectedDate = moment(
                        this.state.dateList,
                        "MM/DD/YYYY"
                      ).date();
                      let selectedMonth = moment(
                        this.state.dateList,
                        "MM/DD/YYYY"
                      ).month();
                      let selectedYear = moment(
                        this.state.dateList,
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
                                this.setState({
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
                                this.setState({ date: newValue }); //display new month data
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
                                this.setState({ date: newValue }); //display new month data
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
        </Col>
      </Row>
    );
  }
}

export default AttendanceRecord;
