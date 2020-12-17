import React from "react";
import { Button, Avatar, Row as AntRow, Col as AntCol } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import {
  TabContainer,
  Header,
  Caption,
} from "../Styled/FundamentalComponents.jsx";

class DraggingCard extends React.Component {
  render() {
    let { name, date, city, stateLocation, position, avatar, id } = this.props;
    return (
      <TabContainer className="py-1-5 px-2 responsive-tab-container">
        {/**
         *
         * Row Containing Name + Avatar
         *
         */}
        <AntRow justify="center" align="middle">
          <Avatar src={avatar} size={64} icon={<UserOutlined />} />
        </AntRow>
        <AntRow>
          <Header className="twentyFont mt-point-25" bolded>
            {name}
          </Header>
        </AntRow>
        <AntRow>
          <Caption
            className="fourteenFont"
            style={{ marginTop: "-5px" }}
            light
            thin
            left
          >
            {city}
          </Caption>
        </AntRow>
        <AntRow className="mt-point-5">
          <AntCol className="mr-point-25">
            <Caption className="sixteenFont" light>
              Availability:
            </Caption>
          </AntCol>
          <AntCol>
            <Caption className="sixteenFont">
              {new Date(date[0]).getMonth()}/{new Date(date[0]).getDate()}/
              {new Date(date[0]).getFullYear()} - {new Date(date[1]).getMonth()}
              /{new Date(date[1]).getDate()}/{new Date(date[1]).getFullYear()}
            </Caption>
          </AntCol>
        </AntRow>
        <AntRow>
          <AntCol className="mr-point-25">
            <Caption className="sixteenFont" light>
              Position:
            </Caption>
          </AntCol>
          <AntCol>
            <Caption className="sixteenFont">{position}</Caption>
          </AntCol>
        </AntRow>

        {/**
         *
         * View Details Button
         *
         */}
        <AntRow className="mt-1">
          <Button shape="round" type="primary" block>
            <Link to={`/applicants/${id}`}>Details</Link>
          </Button>
        </AntRow>
      </TabContainer>
    );
  }
}
export default DraggingCard;
