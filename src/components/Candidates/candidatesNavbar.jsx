import React, { Component } from "react";
import "../../App.css";
import "./candidates.css";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Menu } from "antd";

import NavSearch from "../NavSearch";

/*
 ========================================================================
                              Heading Styles
 ========================================================================
*/
const MenuContainer = styled.div`
  height: 60px;
  background: #f5f5f5;
  border-top: 1px solid #bfbfbf;
  border-bottom: 1px solid #bfbfbf;
`;

const MenuItem = styled.h2`
  font-family: lato;
  font-weight: 600;
  font-size: 24px;
  align-items: center;
  line-height: 60px;
`;

const MenuItemWrapper = styled.div`
  width: 270px;
  height: 60px;
  margin-left: 50px;
  text-align: center;
  display: inline-block;
  :hover {
    cursor: pointer;
    transition:.15s;
    border-bottom: 5px solid #1890ff;
     ${MenuItem} {
      color: #1890ff;
    }
  }
  }
`;

const SelectedMenuItem = styled.h2`
  font-family: lato;
  font-weight: 600;
  font-size: 24px;
  color: #1890ff;
  align-items: center;
  line-height: 60px;
`;

const SelectedMenuItemWrapper = styled.div`
  width: 270px;
  height: 60px;
  margin-left: 5%;
  text-align: center;
  display: inline-block;
  border-bottom: 5px solid #1890ff;

  :hover {
    cursor: pointer;
  }
`;

function CandidatesNavbar(props) {
  return (
    <MenuContainer>
      {props.defaultSelectedKey === "review-applicants" ? (
        <React.Fragment>
          <Link to="/applicants/review-applicants">
            <SelectedMenuItemWrapper>
              <SelectedMenuItem>Review Applicants</SelectedMenuItem>
            </SelectedMenuItemWrapper>
          </Link>
          <Link to="/applicants/manage-candidates">
            <MenuItemWrapper>
              <MenuItem>Manage Candidates</MenuItem>
            </MenuItemWrapper>
          </Link>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Link to="/applicants/review-applicants">
            <MenuItemWrapper>
              <MenuItem>Review Applicants</MenuItem>
            </MenuItemWrapper>
          </Link>
          <Link to="/applicants/manage-candidates">
            <SelectedMenuItemWrapper>
              <SelectedMenuItem>Manage Candidates</SelectedMenuItem>
            </SelectedMenuItemWrapper>
          </Link>
        </React.Fragment>
      )}
    </MenuContainer>
  );
}

export default CandidatesNavbar;
