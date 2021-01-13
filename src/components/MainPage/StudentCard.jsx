import React from "react";
import { Avatar, Row, Col } from "antd";
import {
  Header,
  Caption,
  TabContainer,
} from "../Styled/FundamentalComponents.jsx";

import { UserOutlined } from "@ant-design/icons";

const StudentCard = (props) => {
  let { firstName, lastName, age, avatar } = props;
  let fullName = firstName + " " + lastName;
  return (
    <TabContainer className="px-3 py-1 dashboard-tab">
      <Row align="middle" gutter={[16, 0]}>
        {/* Avatar */}
        <Avatar src={avatar} size={38} icon={<UserOutlined />} />

        <Col>
          {/* Name */}
          <Row>
            <Header bolded className="eighteenFont">
              {fullName}
              {age}{" "}
            </Header>
          </Row>

          {/* Position */}
          <Row>
            {/*
@TODO
Get position they applied for & get position for positions of accepted interns 
 */}
            <Caption className="twelveFont" light style={{ marginTop: "0vh" }}>
              where did i apply??
            </Caption>
          </Row>
        </Col>
      </Row>
    </TabContainer>
  );
};
export default StudentCard;
