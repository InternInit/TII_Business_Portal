import React, { useState } from "react";
import { Row as AntRow, Col as AntCol, Avatar } from "antd";
import {
  InnerContainer,
  TabContainer,
  Header,
  Caption,
} from "../Styled/FundamentalComponents.jsx";
import _ from "underscore";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    companyInfo: state.companyInfo,
  };
};

const StudentInfo = (props) => {
  const { id } = props.match.params;

  /**
   * @TejasMaraliga
   *
   * TODO: This needs to be replaced with an API Call
   */

  const [student, changeStudent] = useState(
    _.find(props.companyInfo.candidates, (student) => student.internId === id)
  );


  if (student) {
  return (
    <AntRow
      className="py-2"
      justify="center"
      style={{ width: "100%", backgroundColor: "yellow" }}
    >
      <InnerContainer>
        <TabContainer className="px-4 py-3">
          <AntRow gutter={[32, 0]}>
            <AntCol
              className="px-2"
              span={8}
              style={{ backgroundColor: "#fafafa" }}
            >
              <AntRow justify="center">
                <Avatar
                  size={225}
                  src="https://i.kym-cdn.com/entries/icons/original/000/016/546/hidethepainharold.jpg"
                ></Avatar>
              </AntRow>
              <AntRow justify="center">
                <Header
                  className="twentyEightFont mt-1 mb-point-5"
                  color="#002766"
                  bolded
                >
                  Contact
                </Header>
              </AntRow>
              <AntRow>
                <Header className="sixteenFont mr-point-25" bolded>
                  Full Name:{" "}
                </Header>
                <Caption className="sixteenFont">
                  {student.info["First Name"]} {student.info["Last Name"]}
                </Caption>
              </AntRow>
            </AntCol>
            <AntCol span={16} style={{ backgroundColor: "#f9f0ff" }}>
              <h1>HELLO</h1>
            </AntCol>
          </AntRow>
        </TabContainer>
      </InnerContainer>
    </AntRow>
  );
  } else {
    return (
      <h1> LOADING! </h1>
    )
  }
};
export default withRouter(connect(mapStateToProps)(StudentInfo));
