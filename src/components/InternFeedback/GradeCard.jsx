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
import { submitGrade, rejectHours } from "../../redux/actions";

const mapDispatchToProps = {
  submitGrade,
  rejectHours,
};

const mapStateToProps = (state) => {
  return {
    companyInfo: state.companyInfo,
  };
};

const GradeCard = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
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
            Due in <strong>{Math.round(daysUntil / 30)}</strong> months
          </span>
        </BorderlessTag>
      );
  };

  const handleSubmit = (values) => {
    console.log(values);
    props.submitGrade(
      props.studentId,
      props.review.Id,
      values.Grade,
      values["Additional Comments"]
    );
    message.success("Grade Submitted");
  };

  return (
    <TabContainer className="py-1-5 px-2 mb-point-5" style={{ width: "100%" }}>
      <AntRow justify="space-between">
        <AntCol>
          <Header className="twentyFont">Performance Review</Header>
          <Caption className="fourteenFont" light thin>{props.review.dueDateFormatted}</Caption>
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
            <Input defaultValue={props.review.assessment} />
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
              defaultValue={props.review.additionalComments}
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
