import React, { useState } from "react";

import { Row as AntRow, Col as AntCol, Pagination, Collapse } from "antd";
import QueueAnim from "rc-queue-anim";
import { Scrollbars } from "react-custom-scrollbars";
import { BiCheckSquare } from "react-icons/bi";

import {
  Header,
  Caption,
  TabContainer,
} from "../Styled/FundamentalComponents.jsx";

import _ from "underscore";

import GradeCard from "./GradeCard.jsx";

const { Panel } = Collapse;
const GRADES_PER_PAGE = 1;

const sortReview = (review) => {
  const filteredReviews = _.filter(review, (piece) => !piece.isFinished);
  const sortedReviews = _.sortBy(
    filteredReviews,
    (piece) => piece["Days Until dueDate"]
  );

  return sortedReviews;
};

const InternPastGrades = (props) => {
  const [gradePage, changeGradePage] = useState(0);

  return (
    <>
      <AntRow className="mt-1" justify="end">
        <AntCol className="pr-2" sm={10} xs={24}>
          <Header bolded className="twentyTwoFont mb-point-25">
            Grade Student
          </Header>
          <QueueAnim>
            {props.loading ? null : _.filter(
                props.student.grades,
                (piece) => !piece.isFinished
              ).length > 0 ? (
              sortReview(props.student.grades)
                .slice(
                  gradePage * GRADES_PER_PAGE,
                  (gradePage + 1) * GRADES_PER_PAGE
                )
                .map((grade, index) => (
                  <GradeCard
                    key={index}
                    review={grade}
                    studentId={props.student.Id}
                    reset={true}
                    getAccess={props.getAccess}
                  />
                ))
            ) : (
              <div className="py-2-5 universal-center ">
                <AntRow justify="center" align="middle">
                  <BiCheckSquare className="internship-posting-no-content-icon" />
                </AntRow>
                <AntRow justify="center" align="middle">
                  <Header className="twentyFourFont" color="#bfbfbf">
                    No Grades Due
                  </Header>
                </AntRow>
              </div>
            )}
          </QueueAnim>
          <AntRow justify="center">
            {props.loading ? null : (
              <Pagination
                current={gradePage + 1}
                total={
                  _.filter(props.student.grades, (piece) => !piece.isFinished)
                    .length
                }
                showLessItems={true}
                pageSize={GRADES_PER_PAGE}
                onChange={(pageChange) => changeGradePage(pageChange - 1)}
                hideOnSinglePage={true}
                style={{ marginTop: "10px" }}
              />
            )}
          </AntRow>
        </AntCol>
        <AntCol sm={14} xs={24}>
          <Header bolded className="twentyTwoFont mb-point-25">
            Past Grades
          </Header>
          {props.loading ? null : (
            <QueueAnim>
              <GradeTable
                key="gradeTable"
                grades={_.sortBy(
                  _.filter(props.student.grades, (grade) => grade.isFinished),
                  "dueDate"
                )}
              />
            </QueueAnim>
          )}
        </AntCol>
      </AntRow>
    </>
  );
};

const GradeTable = (props) => {
  return (
    <>
      <TabContainer
        style={{ overflow: "hidden", height: "450px" }}
      >
        <AntRow
          justify="space-between"
          className="px-2 py-1 intern-past-grades-col-header"
        >
          <AntCol>
            <Header className="twentyFont">Date Completed</Header>
          </AntCol>
          <AntCol>
            <Header className="twentyFont">Grade</Header>
          </AntCol>
        </AntRow>
        <Scrollbars style={{ width: "auto", height: "390px" }}>
          <Collapse
            className="intern-past-grades-collapse"
            bordered={false}
            accordion
          >
            {_.map(props.grades, (grade) => (
              <Panel
                key={grade.Id}
                className="intern-past-grades-collapse-panel"
                header={
                  <AntRow
                    justify="space-between"
                    className="intern-past-grades-grade-row"
                  >
                    <AntCol>
                      <Caption className="sixteenFont">
                        {grade.dueDateFormatted}
                      </Caption>
                    </AntCol>
                    <AntCol>
                      <Caption className="sixteenFont">
                        {grade.assessment ? grade.assessment : "A"}
                      </Caption>
                    </AntCol>
                  </AntRow>
                }
                showArrow={false}
              >
                <div className="intern-past-grades-collapse-panel-text">
                  <Caption className="sixteenFont">
                    <Caption light>Additional Comments: </Caption>
                    {grade.additionalComments}
                  </Caption>
                </div>
              </Panel>
            ))}
          </Collapse>
          </Scrollbars>
      </TabContainer>
    </>
  );
};

export default InternPastGrades;
