import React from "react";
import "../../App.scss";
import { Row as AntRow, Col as AntCol } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
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
  width: 100%;
`;

const MenuItem = styled.h2`
  font-family: lato;
  font-weight: 600;
  align-items: center;
  line-height: 60px;
`;

const MenuItemWrapper = styled.div`
  width: 100%;
  height: 60px;
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
  color: #1890ff;
  align-items: center;
  line-height: 60px;
`;

const SelectedMenuItemWrapper = styled.div`
  width: 100%;
  height: 60px;
  text-align: center;
  display: inline-block;
  border-bottom: 5px solid #1890ff;

  :hover {
    cursor: pointer;
  }
`;

function CandidatesNavbar(props) {
  return (
    <MenuContainer className="px-5">
      {props.defaultSelectedKey === "review-applicants" ? (
        <React.Fragment>
          <AntRow>
            <AntCol xs={11} sm={10} lg={7} xl={6}>
              <Link to="/applicants/review-applicants">
                <SelectedMenuItemWrapper className="mx-1">
                  <SelectedMenuItem className="twentyFourFont menu-item-font">
                    Review Applicants
                  </SelectedMenuItem>
                </SelectedMenuItemWrapper>
              </Link>
            </AntCol>
            <AntCol offset={1} xs={11} sm={10} lg={7} xl={6}>
              <Link to="/applicants/manage-candidates">
                <MenuItemWrapper className="mx-1">
                  <MenuItem className="twentyFourFont menu-item-font">
                    Manage Candidates
                  </MenuItem>
                </MenuItemWrapper>
              </Link>
            </AntCol>
          </AntRow>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <AntRow>
            <AntCol xs={11} sm={10} lg={7} xl={6}>
              <Link to="/applicants/review-applicants">
                <MenuItemWrapper className="mx-1">
                  <MenuItem className="twentyFourFont menu-item-font">
                    Review Applicants
                  </MenuItem>
                </MenuItemWrapper>
              </Link>
            </AntCol>
            <AntCol offset={1} xs={11} sm={10} lg={7} xl={6}>
              <Link to="/applicants/manage-candidates">
                <SelectedMenuItemWrapper className="mx-1">
                  <SelectedMenuItem className="twentyFourFont menu-item-font">
                    Manage Candidates
                  </SelectedMenuItem>
                </SelectedMenuItemWrapper>
              </Link>
            </AntCol>
          </AntRow>
        </React.Fragment>
      )}
    </MenuContainer>
  );
}

export default CandidatesNavbar;
