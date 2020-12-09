import React from "react";
import { Caption, TabContainer } from "../Styled/FundamentalComponents.jsx";
import { check } from "react-icons-kit/fa/check";
import { remove } from "react-icons-kit/fa/remove";
import { Icon } from "react-icons-kit";
import { Row as AntRow, Col as AntCol, Tooltip } from "antd";

const AttendanceCard = (props) => {
  return (
    <AntRow>
      <TabContainer className="py-1 pr-2 px-2 mb-point-5 universal-middle">
        <AntRow>
          <AntCol span={20}>
            <AntRow>
              <Caption className="sixteenFont">Date: {props.date}</Caption>
            </AntRow>
            <AntRow>
              <Caption className="sixteenFont">
                Time: {props.time} hours{" "}
              </Caption>
            </AntRow>
          </AntCol>
          <AntCol className="universal-middle universal-right" span={4}>
            {props.review && (
              <Tooltip title="Approve">
                <Icon
                  className="mx-point-5 intern-dashboard-attendance-approve"
                  icon={check}
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

export default AttendanceCard;
