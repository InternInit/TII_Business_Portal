import React from "react";

import styled from "styled-components";

import { Row, Col, Calendar, Select, Button, Tooltip } from "antd";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { Header } from "../Styled/FundamentalComponents.jsx";

import { Scrollbars } from "react-custom-scrollbars";

import moment from "moment";

//CSS Constants
const CardStyle = {
  position: "relative",

  backgroundColor: "white",
  borderRadius: "16px",
  boxShadow: "1px 1px 5px -4px",

  paddingRight: "5%",
  paddingBottom: "2em",
  paddingTop: "2em",
  paddingLeft: "5%",
};

const ListContainterStyle = {
  height: "310px",
  overflowY: "auto",
  paddingBottom: "2em",
};

const AttendanceHeadingStyle = {
  fontSize: "20px",

  display: "flex",
  flexDirection: "row",

  paddingBottom: "10px",
  paddingRight: "20px",
};

const ListStyle = {
  display: "flex",
  flexDirection: "row",

  paddingTop: "7px",
  paddingBottom: "7px",

  fontSize: "16px",
  borderBottom: "1px solid #E0E0E0",
};

const CalendarStyle = {
  paddingTop: "1em",
  boxShadow: "1px 3px 4px -4px",
  border: ".01px solid #E0E0E0",
  borderRadius: "12px",
};

const ButtonStyle = {
  border: "none",
  color: "#1890ff",
  fontSize: "14px",
};

const HoverButtonStyle = styled(Button)`
  border: none;
  color: #1890ff;
  fontsize: 14px;

  &:hover,
  &:focus {
    background-color: #1890ff;
    color: white;
  }
`;

const CalHeaderStyle = {
  paddingTop: "8px",
  textAlign: "center",
  fontSize: "18px",
};

const CalDatesStyle = {
  width: "32px",
  textAlign: "center",

  position: "relative",
  zIndex: "2",
  display: "inline-block",
  minWidth: "32px",
  height: "32px",
  lineHeight: "32px",
  borderRadius: "2px",
};

const DaysWorkedStyle = {
  width: "32px",
  textAlign: "center",
  backgroundColor: "#91d5ff",
  color: "black",

  position: "relative",
  zIndex: "2",
  display: "inline-block",
  minWidth: "32px",
  height: "32px",
  lineHeight: "32px",
  borderRadius: "2px",
};

const ButtonListStyle = {
  border: "none",
  color: "#000",
  fontSize: "16px",
  padding: "0px",
  paddingRight: "25px",
  margin: "0px, 0px",
};

const IsSelectedStyle = {
  width: "32px",
  textAlign: "center",
  backgroundColor: "#002D62",
  color: "#fff",

  position: "relative",
  zIndex: "2",
  display: "inline-block",
  minWidth: "32px",
  height: "32px",
  lineHeight: "32px",
  borderRadius: "2px",
  borderWidth: "5px",
  borderColor: "yellow",
};

const CurrentDateStyle = {
  width: "32px",
  textAlign: "center",
  backgroundColor: "#D3D3D3",
  color: "#000",

  position: "relative",
  zIndex: "2",
  display: "inline-block",
  minWidth: "32px",
  height: "32px",
  lineHeight: "32px",
  borderRadius: "2px",
  borderWidth: "5px",
  borderColor: "yellow",
};

class AttendanceRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        date: moment(),
        dateList: moment(),
        toolTipDate: moment(),
        toolTipHour: ""
        };
  };

  render() {
    let { student } = this.props;

    //Changes Day Names (dd -> ddd)
    moment.updateLocale("en", {
      weekdaysMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    });

    return (
      <Row>
        <Col offset={10}>
          <Header bolded style={{ fontSize: "26px" }}>
            Attendance Record
          </Header>
          <div style={CardStyle}>
            <Row gutter={30}>
                
              {/* List of attendance dates and times */}
              <Col span={12}>

                {/* Date and Time headers */}
                <div style={AttendanceHeadingStyle}>
                  Date
                  <div style={{ marginLeft: "auto" }}>Hours Worked</div>
                </div>

                {/* Date and Time detailed data */}
                <div style={ListContainterStyle}>
                  {student.hours.map((data) => {
                    return (
                      <Scrollbars
                        autoHide={true}
                        style={{ width: 280, height: 50 }}
                      >
                        <div style={ListStyle}>
                            <Button
                              style={ButtonListStyle}
                              type="link"
                              onClick={() => {
                                this.setState( {date: moment(data.date).format("MM/DD/YYYY"), dateList: moment(data.date).format("MM/DD/YYYY")} );
                              }}
                            >
                                <div className="student-attendance-list">
                                    {moment(data.date).format("MM/DD/YYYY")}
                                </div>
                            </Button>
                        
                          <div style={{ marginLeft: "auto", color: "#b2b2b2" }}>
                            {data.time}
                          </div></div>
                      </Scrollbars>
                    );
                  })}
                </div>
              </Col>

              {/* Calendar */}
              <Col span={12} style={CalendarStyle}>
                <Calendar
                  fullscreen={false}

                  //sets date value being displayed
                  value={moment(this.state.date)}

                  //updates current date value if new date is selected
                  onSelect={(date) => {
                    this.setState({date: date})}}

                  //Fills calendar dates
                  dateFullCellRender={(date) => {
                    let style = CalDatesStyle;
                    let toolTipActive = false;
                    let hoursWorked;

                    //Date, month, year being displayed
                    const day = date.date(); //mapped; 1-31
                    const newMonth = date.month();
                    const newYear = date.year();

                    //Finds if they worked on a specific date
                    const hasWorked = (dd, mm, yy) => {
                      let daTruth = false;
                      let facts = false;
                      let datesWorked = [];

                      student.hours.map((data) => {
                        //splits date string into separate variables
                        let dateWorked = moment(moment(data.date).format("MM/DD/YYYY"), "MM/DD/YYYY").date();
                        let monthWorked = moment(moment(data.date).format("MM/DD/YYYY"), "MM/DD/YYYY").month();
                        let yearWorked = moment(moment(data.date).format("MM/DD/YYYY"), "MM/DD/YYYY").year();
                        let hoursWorked = data.time;

                        datesWorked.push({
                          date: dateWorked,
                          month: monthWorked,
                          year: yearWorked,
                          time: hoursWorked
                        });
                      });

                      console.log(datesWorked)

                      //Compares dates to be displayed against dates worked
                      for (let i = 0; i < datesWorked.length; i++) {
                        if (
                          dd === datesWorked[i].date &&
                          mm === datesWorked[i].month &&
                          yy === datesWorked[i].year 
                        ) {
                          daTruth = true;
                          facts = true;
                          toolTipActive = true;
                          hoursWorked = datesWorked[i].time;
                          break;
                        } else {
                          daTruth = false;
                        }
                      }

                      //Date, month, year chosen from detailed list
                      let selectedDate = moment(this.state.dateList, "MM/DD/YYYY").date();
                      let selectedMonth = moment(this.state.dateList,"MM/DD/YYYY").month();
                      let selectedYear = moment(this.state.dateList,"MM/DD/YYYY").year();

                      // more comparisons– date from list compared against dates being displayed in the calendar
                      if (
                        selectedDate === dd &&
                        selectedMonth === mm &&
                        selectedYear === yy &&
                        facts 
                      ) {
                        daTruth = "superTruth";
                      }

                      if (
                        dd === new Date().getDate() &&
                        mm === new Date().getMonth() &&
                        yy === new Date().getFullYear()
                      )
                        daTruth = "today";

                      return daTruth;
                    };

                    switch (hasWorked(day, newMonth, newYear)) {
                      case "today":
                        style = CurrentDateStyle;
                        break;
                      case "superTruth":
                        style = IsSelectedStyle;
                        break;
                      case true:
                        style = DaysWorkedStyle;
                        break;
                      case false:
                        style = CalDatesStyle;
                      default:
                        style = CalDatesStyle;
                    }

                    return (
                      <div style={style}>
                        <Tooltip
                            title={toolTipActive ? hoursWorked + " Hours": ""}
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
                          <HoverButtonStyle
                            type="link"
                            onClick={() => {
                              this.setState({ date: moment(), dateList: moment() });
                            }}
                          >
                            Today
                          </HoverButtonStyle>
                        );
                      } else {
                        return;
                      }
                    };

                    //returns new header
                    return (
                      <div>
                        {/* Calendar Arrow Buttons + Month/Year Info */}
                        <div style={CalHeaderStyle}>
                          <Button
                            style={ButtonStyle}
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
                          {monthOptions[month].props.children} {year}
                          <Button
                            icon={<RightOutlined />}
                            style={ButtonStyle}
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
                        </div>

                        {/* Return to Today Button */}
                        {monthChecker(month, year)}
                      </div>
                    );
                  }}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    );
  };
};

export default AttendanceRecord;
