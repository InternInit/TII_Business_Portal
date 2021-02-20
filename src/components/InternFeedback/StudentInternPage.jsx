import React, { Component } from "react";
import styled from "styled-components";
import StudentInternTab from "./StudentInternTab.jsx";
import NavSearch from "../General/NavSearch.jsx";
import InfoBar from "../General/InfoBar.jsx";
import SortByMenu from "../General/SortByMenu.jsx";
import { InnerContainer, Header } from "../Styled/FundamentalComponents";
import { StudentInternTabSkeleton } from "./StudentInternPageSkeleton";
import { Button, Row as AntRow, Col as AntCol, Dropdown } from "antd";
import { AiOutlineContacts } from "react-icons/ai";
import { Transition, config, animated } from "react-spring/renderprops";

import { connect } from "react-redux";

import _ from "lodash";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-width: 600px;
`;

const ButtonStyle = {
  width: "100%",
  minWidth: "170px",
  height: "40px",
  fontFamily: "roboto",
};

const mapStateToProps = (state) => {
  return {
    interns: state.interns.currentInterns,
    listings: state.listings,
    loadingStatuses: state.loadingStatuses,
  };
};

const AnimatedInner = animated(InnerContainer);

class InternFeedback extends Component {
  state = {
    sortType: "",
  };

  setSort = (val) => {
    switch (val) {
      case "First Name":
        this.setState({ sortType: "formData[0]['First Name']" });
        break;
      case "Last Name":
        this.setState({ sortType: "formData[0]['Last Name']" });
        break;
      case "School":
        this.setState({ sortType: "school.name" });
        break;
      case "Position":
        this.setState({ sortType: "appliedFor" });
        break;
      default:
        this.setState({ sortType: "formData[0]['First Name']" });
        break;
    }

    return;
  };

  render() {
    return (
      <>
        <Container className="global-container">
          <NavSearch
            title="My Interns"
            placeholder="Search Interns"
            //@TODO implement functionality
            searchBar={false}
          />
          <Transition
          native
            items={this.props.location.pathname}
            from={{ opacity: 0.5, transform: "translateY(20px)" }}
            enter={{ opacity: 1, transform: "translateY(0px)" }}
            leave={{ opacity: 1 }}
            config={config.stiff}
          >
            {(location) => (props) => (
              <AnimatedInner
                key="studentInternPageContainer"
                className="mt-2 mb-4"
                style={{ ...props }}
              >
                <AntRow gutter={[32, 16]}>
                  <AntCol xs={24} md={8} lg={5} className="mb-1">
                    <Dropdown
                      overlay={
                        <SortByMenu
                          gpa={false}
                          setSort={(val) => this.setSort(val)}
                        />
                      }
                      trigger={["click"]}
                    >
                      <Button type="default" style={ButtonStyle}>
                        <span className="sixteenFont">Sort By</span>
                      </Button>
                    </Dropdown>
                  </AntCol>
                </AntRow>

                <InfoBar
                  mobileHeader="Interns"
                  fieldOne={{
                    name: "Name",
                    sm: 10,
                    lg: 6,
                    align: "universal-left",
                  }}
                  fieldTwo={{
                    name: "School",
                    sm: 5,
                    lg: 8,
                    align: "universal-left",
                  }}
                  fieldThree={{
                    name: "Internship Type",
                    sm: 4,
                    lg: 4,
                    align: "universal-left",
                  }}
                  fieldFour={{
                    name: "Action",
                    sm: 5,
                    lg: 6,
                    align: "universal-center",
                  }}
                />

                {this.props.loadingStatuses.isInternLoading ? (
                  _.times(localStorage.getItem("NumInterns"), () => (
                    <StudentInternTabSkeleton />
                  ))
                ) : this.props.interns.length < 1 ? (
                  <>
                    <AntRow className="pt-3" justify="center" align="middle">
                      <AiOutlineContacts className="internship-posting-no-content-icon" />
                    </AntRow>
                    <AntRow justify="center" align="middle">
                      <Header className="twentyFourFont" color="#bfbfbf">
                        No Interns Right Now
                      </Header>
                    </AntRow>
                  </>
                ) : (
                  _.orderBy(this.props.interns, this.state.sortType).map(
                    (student) => (
                      <StudentInternTab
                        firstName={student.formData["0"]["First Name"]}
                        lastName={student.formData["0"]["Last Name"]}
                        age={student.formData["1"]["Age"]}
                        type="Hybrid"
                        id={student.Id}
                        attendanceDue={
                          student.hours
                            ? _.filter(
                                student.hours,
                                (hour) => !hour.isApproved
                              ).length
                            : 0
                        }
                        feedbackDue={
                          student.feedback
                            ? _.filter(
                                student.feedback,
                                (feedback) => !feedback.isRead
                              ).length
                            : 0
                        }
                        gradesDue={
                          student.grades
                            ? _.filter(
                                student.grades,
                                (grade) => !grade.isFinished
                              ).length
                            : 0
                        }
                        position={
                          this.props.listings.find(
                            (listing) => listing.Id === student.appliedFor
                          ).title
                        }
                        school={student.school ? student.school.name : "N/A"}
                        /**
                         * @TODO
                         * Replace with actual profile picture
                         */
                        //avatar={`https://tii-intern-media.s3.amazonaws.com/${student.Id}/profile_picture`}
                      />
                    )
                  )
                )}
              </AnimatedInner>
            )}
          </Transition>
        </Container>
      </>
    );
  }
}
export default connect(mapStateToProps)(InternFeedback);
