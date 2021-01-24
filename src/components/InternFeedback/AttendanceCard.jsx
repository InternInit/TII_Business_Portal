import React from "react";
import { Caption, TabContainer } from "../Styled/FundamentalComponents.jsx";
import { check } from "react-icons-kit/fa/check";
import { remove } from "react-icons-kit/fa/remove";
import { Icon } from "react-icons-kit";
import { Row as AntRow, Col as AntCol, Tooltip, message } from "antd";

import { connect } from "react-redux";

import { submitHour } from "../../redux/actions";

import axios from "axios";

import _ from "underscore";

import gql from "graphql-tag";
import { print } from "graphql";

// prettier-ignore
const MUTATION = gql`
mutation MyMutation ($hours:AWSJSON, $assocId:String!){
  updateInternAssoc(input: {assocId: $assocId, hours: $hours}) {
    hours
  }
}                 
`

const mapDispatchToProps = {
  submitHour,
};

const mapStateToProps = (state) => {
  return {
    interns: state.interns.currentInterns,
  };
};

const AttendanceCard = (props) => {
  const handleClick = () => {
    mutateHoursAssoc(true);
    message.success("Hours Approved");
  };

  const handleReject = () => {
    /**
     * @TODO
     * Add new field for rejected hours
     */
    mutateHoursAssoc(false);
    message.error("Hours Rejected");
  };

  const mutateHoursAssoc = async (isApproved) => {
    let access = await props.getAccess();

    let hourId = props.hoursId;
    let internIndex = _.findIndex(props.interns, { Id: props.studentId });
    let internOfInterest = { ...props.interns[internIndex] };
    let newHours = { ...internOfInterest.hours };
    let hourObj = { ...newHours[hourId] };

    hourObj.isApproved = isApproved;

    newHours[hourId] = hourObj;

    axios({
      url: "/api/mutate_hours_assoc",
      method: "post",
      headers: {
        Authorization: access,
      },
      data: {
        query: print(MUTATION),
        variables: {
          assocId: internOfInterest.assocId,
          hours: JSON.stringify(newHours),
        },
      },
    })
      .then((result) => {
        props.submitHour(internIndex, hourObj);
        console.log(result.data[hourId]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                  onClick={() => handleReject()}
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
