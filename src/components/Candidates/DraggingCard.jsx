import React from "react";
import {
  Button,
  Avatar,
  Row as AntRow,
  Col as AntCol,
  Tooltip,
  Modal,
  Dropdown,
  Menu,
  message,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  TabContainer,
  Header,
  Caption,
} from "../Styled/FundamentalComponents.jsx";

import { connect } from "react-redux";
import { addInterviewTag } from "../../redux/actions";

const mapDispatchToProps = {
  addInterviewTag
};

const mapStateToProps = (state) => {
  return {
    companyInfo: state.companyInfo,
  };
};

class DraggingCard extends React.Component {

  handleTag = (tag) => {
    this.props.addInterviewTag(this.props.id, tag);
  }

  render() {
    let { name, date, city, position, avatar, id } = this.props;
    return (
      <>
        <TabContainer className="py-1-5 px-2 responsive-tab-container">
          {this.props.status}
          {/**
         * Temporarily removing this to test a new add tag button
         * 
         * <Caption className="twelveFont dragging-card-date" light right>
          Applied on <br /> {date[0]}
    </Caption>*/}

          {/**
           *
           * Row Containing Name + Avatar
           *
           */}
          <AntRow
            justify="start"
            align="middle"
            style={{ position: "relative" }}
          >
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
            {this.props.status.includes("Interview") ? (
              <Tooltip title="Categorize Interview">
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item onClick={() => this.handleTag("Online Interview")}>Online Interview</Menu.Item>
                      <Menu.Item onClick={() => this.handleTag("Phone Interview")}>Phone Interview</Menu.Item>
                      <Menu.Item onClick={() => this.handleTag("In-Person Interview")}>In-Person Interview</Menu.Item>
                    </Menu>
                  }
                  placement="bottomRight"
                  arrow
                  trigger={["click"]}
                >
                  <AiOutlinePlusCircle className="dragging-card-add-tag-icon" />
                </Dropdown>
              </Tooltip>
            ) : null}
          </AntRow>

          <AntRow className="mt-1">
            <Caption className="fourteenFont mr-point-25" light left>
              Applied on:
            </Caption>
            <AntCol>
              <Caption className="fourteenFont">{date[0]}</Caption>
            </AntCol>
          </AntRow>
          <AntRow className="mb-1">
            <AntCol>
              <Caption className="fourteenFont mr-point-25" light>
                Location:{" "}
              </Caption>
            </AntCol>
            <AntCol>
              <Caption className="fourteenFont">{city}</Caption>
            </AntCol>
          </AntRow>

          <AntRow justify="space-between">
            <AntCol>
              <Link to={`/applicants/${this.props.id}`}>
                <Button
                  type="ghost"
                  shape="round"
                  style={{ marginLeft: "-3px" }}
                >
                  Details
                </Button>
              </Link>
            </AntCol>
            <AntCol>
              <Button
                type="danger"
                shape="round"
                style={{ marginRight: "-7px" }}
                onClick={() => this.props.updateCandidateStatus(id, "Rejected")}
              >
                Remove
              </Button>
            </AntCol>
          </AntRow>

          {/**
           *
           * View Details Button
           *
           */}
        </TabContainer>
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DraggingCard);
