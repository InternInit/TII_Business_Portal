import React from "react";
import { Caption, TabContainer } from "../Styled/FundamentalComponents.jsx";
import { check } from "react-icons-kit/fa/check";
import { remove } from "react-icons-kit/fa/remove";
import { Icon } from "react-icons-kit";
import { Row as AntRow, Col as AntCol, Tooltip } from "antd";

import { connect } from "react-redux";

import { approveHours } from "../../redux/actions";

const mapDispatchToProps = {
  approveHours,
};

const mapStateToProps = (state) => {
  return {
    companyInfo: state.companyInfo,
  };
};

const AttendanceCard = (props) => {

  const handleClick = () => {
    props.approveHours(props.studentId, props.hoursId);
  }

  return (
    <AntRow>
      <TabContainer className="py-1 pr-2 px-2 mb-point-5 universal-middle">
        <AntRow>
          <AntCol flex={2}>
            <AntRow>
              <Caption className="sixteenFont">Date: {props.date}</Caption>
            </AntRow>
            <AntRow>
              <Caption className="sixteenFont">
                Time: {props.time} hours{" "}
              </Caption>
            </AntRow>
          </AntCol>
          <AntCol className="universal-middle universal-right" flex={1}>
            {props.review && (
              <Tooltip title="Approve">
                <Icon
                  className="mx-point-5 intern-dashboard-attendance-approve"
                  icon={check}
                  onClick={() => handleClick()}
                />
              </Tooltip>
            )}
            {props.review && (
              <Tooltip title="Reject">
                <Icon
                  className="mx-point-5 intern-dashboard-attendance-reject"
                  icon={remove}
                />
              </Tooltip>
            )}
          </AntCol>
        </AntRow>
      </TabContainer>
    </AntRow>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceCard);
