import React, { useEffect, useState } from "react";
import {
  Header,
  Caption,
  TabContainer,
  BorderlessTag,
} from "../Styled/FundamentalComponents.jsx";
import {
  Row as AntRow,
  Col as AntCol,
  Button,
  Form,
  Input,
  message,
} from "antd";

import { connect } from "react-redux";
import { submitGrade } from "../../redux/actions";

import axios from "axios";

import _ from "underscore";

import gql from "graphql-tag";
import { print } from "graphql";

// prettier-ignore
const MUTATION = gql`
mutation MyMutation ($grades:AWSJSON, $assocId:String!){
  updateInternAssoc(input: {assocId: $assocId, grades: $grades}) {
    grades
  }
}                 
`

const mapDispatchToProps = {
  submitGrade,
};

const mapStateToProps = (state) => {
  return {
    interns: state.interns.currentInterns,
  };
};

const GradeCard = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      Grade: props.review.assessment,
      "Additional Comments": props.review.additionalComments,
    });
  });

  /**
   * NEW FIX ON DATE UPDATING SYSTEM
   * - Currently it uses a pretty low tech if else chain. In the future, the if else
   *   should only set colors and units instead of the tags themselves. This will have
   *   to do for now.
   *
   * @TODO
   *  - Joseph
   *  - Fix the color and tag-setting system on dates
   *
   */

  const RenderTag = () => {
    const daysUntil = props.review["Days Until dueDate"];
    if (daysUntil < 0)
      return (
        <BorderlessTag className="px-1-5" color="#f5222d" background="#ffccc7">
          Overdue
        </BorderlessTag>
      );
    else if (daysUntil === 0)
      return (
        <BorderlessTag className="px-1-5" color="#fff2e8" background="#fa541c">
          Due <strong>Today</strong>
        </BorderlessTag>
      );
    else if (daysUntil < 5)
      return (
        <BorderlessTag className="px-1-5" color="#fa541c" background="#ffd8bf">
          <span>
            Due in <strong>{daysUntil}</strong> days
          </span>
        </BorderlessTag>
      );
    else if (daysUntil < 30)
      return (
        <BorderlessTag className="px-1-5" color="#52c41a" background="#d9f7be">
          <span>
            Due in <strong>{daysUntil}</strong> days
          </span>
        </BorderlessTag>
      );
    else
      return (
        <BorderlessTag className="px-1-5" color="#52c41a" background="#d9f7be">
          <span>
            Due in <strong>{Math.round(daysUntil / 30)}</strong>{" "}
            {Math.round(daysUntil / 30) === 1 ? "month" : "months"}
          </span>
        </BorderlessTag>
      );
  };

  const mutateGradeAssoc = async (values) => {
    let access = await props.getAccess();
    let gradeId = props.review.Id;
    let internIndex = _.findIndex(props.interns, { Id: props.studentId });
    let internOfInterest = { ...props.interns[internIndex] };
    let newGrades = { ...internOfInterest.grades };
    let gradeObj = { ...newGrades[gradeId] };

    let finishDate = new Date();
    finishDate = finishDate.toISOString();

    gradeObj.assessment = values.Grade;
    gradeObj.additionalComments = values["Additional Comments"];
    gradeObj.finishedDate = finishDate;
    gradeObj.isFinished = true;

    newGrades[gradeId] = gradeObj;
    console.log(newGrades);
    //console.log(JSON.stringify(newGrades));

    axios({
      url: "/api/mutate_grades_assoc",
      method: "post",
      headers: {
        Authorization: access,
      },
      data: {
        query: print(MUTATION),
        variables: {
          assocId: props.interns[internIndex].assocId,
          grades: JSON.stringify(newGrades),
        },
      },
    })
      .then((result) => {
        console.log(result.data[gradeId]);
        console.log(internIndex, gradeId, result.data[gradeId]);
        props.submitGrade(internIndex, gradeObj);
        message.success("Grade Submitted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (values) => {
    console.log(values);
    mutateGradeAssoc(values);
  };

  return (
    <TabContainer className="py-1-5 px-2 mb-point-5" style={{ width: "100%" }}>
      <AntRow justify="space-between">
        <AntCol>
          <Header className="twentyFont">Performance Review</Header>
          <Caption className="fourteenFont" light thin>
            {props.review.dueDateFormatted}
          </Caption>
        </AntCol>
        <AntCol>
          <Header className="sixteenFont">{props.review.Id}</Header>
        </AntCol>
        <AntCol>{RenderTag()}</AntCol>
      </AntRow>
      <AntRow className="pt-point-5 pb-1">
        <AntCol
          flex="40px"
          style={{ borderBottom: "2px #91d5ff solid" }}
        ></AntCol>
      </AntRow>
      <Form name="gradeForm" onFinish={handleSubmit} form={form}>
        <AntRow>
          <Header className="sixteenFont">
            <span style={{ color: "#bfbfbf" }}>Type:</span> Grade
          </Header>
        </AntRow>
        <AntRow className="pt-point-5">
          <Form.Item name="Grade" key="grade" style={{ width: "100%" }}>
            <Input />
          </Form.Item>
        </AntRow>
        <AntRow>
          <Header className="sixteenFont">Additional Comments</Header>
        </AntRow>
        <AntRow className="pt-point-5 pb-1">
          <Form.Item
            name="Additional Comments"
            key="additionalComments"
            style={{ width: "100%" }}
          >
            <Input.TextArea
              placeholder="Commendations, constructive criticism, message to school"
              rows={6}
            />
          </Form.Item>
        </AntRow>
        <AntRow gutter={[16, 0]} className="pt-point-5s" justify="end">
          <AntCol>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </AntCol>
        </AntRow>
      </Form>
    </TabContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GradeCard);
