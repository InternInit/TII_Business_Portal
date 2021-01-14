import React from "react";
import { Avatar, Row, Col } from "antd";
import {
  Header,
  Caption,
  TabContainer,
} from "../Styled/FundamentalComponents.jsx";

import { UserOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

const StudentCard = (props) => {
  let { firstName, lastName, age, avatar, id } = props;
  let fullName = firstName + " " + lastName;
  return (
    <Link to={`applicants/${id}`}>
<TabContainer className="px-3 py-1 dashboard-tab">
      <Row align="middle" gutter={[16, 0]}>
        {/* Avatar */}
        <Avatar src={avatar} size={38} 
        icon={<UserOutlined />} 
        />

        <Col>
          {/* Name */}
          <Row>
            <Header bolded className="eighteenFont">
              {fullName}
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
    </Link>
    
  );
};
export default StudentCard;
