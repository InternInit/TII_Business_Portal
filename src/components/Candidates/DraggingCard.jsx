import React from "react";
import { Button, Avatar, Row as AntRow, Col as AntCol } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import {
  TabContainer,
  Header,
  Caption,
} from "../Styled/FundamentalComponents.jsx";
import { BsThreeDotsVertical } from "react-icons/bs";

class DraggingCard extends React.Component {
  render() {
    let { name, date, city, stateLocation, position, avatar, id } = this.props;
    return (
      <TabContainer className="py-1-5 px-2 responsive-tab-container">
        <Caption className="twelveFont dragging-card-date" light right>
          Applied on <br /> {new Date(date[0]).getMonth()}/
          {new Date(date[0]).getDate()}/{new Date(date[0]).getFullYear()}
        </Caption>
        {/**
         *
         * Row Containing Name + Avatar
         *
         */}
        <AntRow justify="start" align="middle">
          <AntCol>
            <Avatar src={avatar} size={40} icon={<UserOutlined />} />
          </AntCol>
          <AntCol offset={1}>
            <AntRow>
              <Header className="twentyFont" bolded>
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
                {position}
              </Caption>
            </AntRow>
          </AntCol>
        </AntRow>

        <AntRow className="mt-1 mb-1-5">
          <AntCol>
            <Caption className="fourteenFont mr-point-25" light>
              Location:{" "}
            </Caption>
          </AntCol>
          <AntCol>
            <Caption className="fourteenFont">{city}</Caption>
          </AntCol>
        </AntRow>

        <span className="twelveFont dragging-card-button">
          Read Application
        </span>

        {/**
         *
         * View Details Button
         *
         */}
      </TabContainer>
    );
  }
}
export default DraggingCard;
