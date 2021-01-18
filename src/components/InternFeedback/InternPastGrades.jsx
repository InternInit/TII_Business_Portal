import React, { useState } from "react";

import { Row as AntRow, Col as AntCol, Pagination, Collapse } from "antd";
import { Scrollbars } from "react-custom-scrollbars";

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
  const filteredReviews = review.filter((piece) => !piece.isFinished);
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
          {sortReview(props.student.grades)
            .slice(
              gradePage * GRADES_PER_PAGE,
              (gradePage + 1) * GRADES_PER_PAGE
            )
            .map((grade) => (
              <GradeCard review={grade} studentId={props.student.Id}/>
            ))}
          <AntRow justify="center">
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
          </AntRow>
        </AntCol>
        <AntCol sm={14} xs={24}>
          <Header bolded className="twentyTwoFont mb-point-25">
            Past Grades
          </Header>
          <GradeTable
            grades={_.sortBy(
              props.student.grades.filter((grade) => grade.isFinished),
              "dueDate"
            )}
          />
        </AntCol>
      </AntRow>
    </>
  );
};

const GradeTable = (props) => {
  return (
    <>
      <TabContainer style={{ height: "83%", overflow: "hidden", minHeight: "400px" }}>
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
        <Scrollbars>
          <Collapse className="intern-past-grades-collapse" bordered={false}>
            {props.grades.map((grade) => (
              <Panel
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
                <Caption className="sixteenFont intern-past-grades-collapse-panel-text">
                  <Caption light>Additional Comments: </Caption>{grade.additionalComments}
                </Caption>
              </Panel>
            ))}
          </Collapse>
        </Scrollbars>
      </TabContainer>
    </>
  );
};

const GradeRow = (props) => {
  /**
   * @TODO
   * Convert Due Date to Date Completed
   */
  return (
    <Panel
      header={
        <AntRow
          justify="space-between"
          className="intern-past-grades-grade-row"
        >
          <AntCol>
            <Caption className="sixteenFont">
              {props.grade.dueDateFormatted}
            </Caption>
          </AntCol>
          <AntCol>
            <Caption className="sixteenFont">
              {props.grade.assessment ? props.grade.assessment : "A"}
            </Caption>
          </AntCol>
        </AntRow>
      }
      showArrow={false}
    >
      <Caption className="sixteenFont">
        {props.grade.additionalComments}
      </Caption>
    </Panel>
  );
};

export default InternPastGrades;
