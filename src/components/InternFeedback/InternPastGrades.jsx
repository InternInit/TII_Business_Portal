import React, { useState } from "react";

import { Row as AntRow, Col as AntCol, Pagination } from "antd";

import {
  Header,
  Body,
  Caption,
  TabContainer,
} from "../Styled/FundamentalComponents.jsx";

import _ from "underscore";

import GradeCard from "./GradeCard.jsx";

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
              <GradeCard review={grade} />
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
          <Header bolded className="twentyTwoFont">
            Past Grades
          </Header>
        </AntCol>
      </AntRow>
    </>
  );
};

export default InternPastGrades;
