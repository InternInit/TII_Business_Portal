import React from "react";
import { Progress, Col as AntCol, Tooltip, Row } from "antd";
import { Header, TabContainer } from "../Styled/FundamentalComponents.jsx";

const PercentageBox = (props) => {
  let { header, percentage, color } = props;
  let toolTipTitle;

  switch (header) {
    case "Industry":
      toolTipTitle = `${percentage}% of all students applied to your industry`;
      break;
    case "Company":
      toolTipTitle = `You received ${percentage}% of all applications within your industry`;
      break;
    case "Accepted":
      toolTipTitle = "Acceptance rate of your listing(s)";
      break;
    default:
      toolTipTitle = null;
      break;
  }

  return (
    <TabContainer className="px-0 py-2 universal-center">
      <Tooltip title={toolTipTitle} color="blue" placement="top">
        <Progress
          type="circle"
          percent={percentage}
          strokeColor={{ "0%": color, "100%": color }}
          className="dashboard-progress"
        />
      </Tooltip>
    </TabContainer>
  );
};

const MainPercentages = (props) => {
  let { currentApplicantsReceived, internsTaken } = props;
  return (
    <>
      <AntCol xs={24} md={8}>
        <Row justify="center">
          <Header className="twentyTwoFont mb-point-5">
            Applied to Industry
          </Header>
          <PercentageBox header="Industry" percentage={0} color="#722ed1" />
        </Row>{" "}
      </AntCol>

      <AntCol xs={24} md={8}>
        <Row justify="center">
          <Header className="twentyTwoFont mb-point-5">
            Applied to Company
          </Header>

          <PercentageBox header="Company" percentage={0} color="#1890ff" />
        </Row>
      </AntCol>
      <AntCol xs={24} md={8}>
        <Row justify="center">
          <Header className="twentyTwoFont mb-point-5">
            Percentage Accepted
          </Header>

          <PercentageBox
            header="Accepted"
            percentage={
              Number.isNaN(
                (internsTaken / (currentApplicantsReceived + internsTaken)) *
                  100
              )
                ? 0
                : (
                    (internsTaken /
                      (currentApplicantsReceived + internsTaken)) *
                    100
                  ).toFixed(2)
            }
            color="#52C41A"
          />
        </Row>
      </AntCol>
    </>
  );
};
export default MainPercentages;
