import React from "react";
import styled from "styled-components";
import { Button } from "antd";


const STANDARD_BLUE = "#1890ff";

/*============================================================================================================
 * ***********************************************************************************************************
 *
 *                                      Tab-Based Components
 *
 * ***********************************************************************************************************
 * ============================================================================================================
 */

export const TabContainer = styled.div`
  background-color: white;

  width: 100%;

  border-radius: 4px;
  border: 1px solid #d8def3;
  box-shadow: 1px 1px 5px -4px;
`;

/*============================================================================================================
 * ***********************************************************************************************************
 *
 *                                      Containers
 *
 * ***********************************************************************************************************
 * ============================================================================================================
 */

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $gray-1;
  min-height: 100vh;
`;

export const InnerContainer = styled.div`
  width: 90%;
  marginbottom: 4vh;
`;

export const FormContainer = styled.div`
  position: relative;

  background-color: white;
  border-radius: 4px;
  box-shadow: 1px 1px 5px -4px;
  padding-left: 15%;
  padding-right: 15%;
  padding-bottom: 1em;
  padding-top: 5.5em;
`;

/*============================================================================================================
 * ***********************************************************************************************************
 *
 *                                      Text Components
 *
 * ***********************************************************************************************************
 * ============================================================================================================
 */

export const Header = styled.div`
  font-weight: ${(props) => (props.bolded ? "500" : "400")};
  font-family: Roboto;
  color: ${(props) =>
    props.subheading ? "#262626" : props.color ? props.color : "#000000"};
`;

export const Caption = styled.span`
  text-align: center;
  font-weight: ${(props) => (props.thin ? 300 : 400)};
  font-family: roboto;
  color: ${(props) =>
    props.light ? "#8c8c8c" : props.color ? props.color : "#262626"};
`;

export const NavigationButton = styled(Button)`
    background-color: ${props => props.active ? "#1890ff" : "inherit"};
    color: white;
    border: ${props => props.active ? "1px solid #1890ff" : "1px solid white"};

    &:hover,
    &:focus {
      background-color: #1890ff;
      color: white;
      border: 1px solid #1890ff;
    }
`;

export const RequiredAsterisk = styled.span`
  color: #f5222d;
`;

export const FilterTag = styled.div`
  color: ${(props) =>
    props.color === "High"
      ? "#f5222d"
      : props.color === "Medium"
      ? "#fa8c16"
      : "#52c41a"};
  background-color: ${(props) =>
    props.color === "High"
      ? "#fff1f0"
      : props.color === "Medium"
      ? "#fff7e6"
      : "#f6ffed"};
  display: flex;
  align-contents: center;
  justify-contents: center;
  height: 32px;
  border: 1px solid
    ${(props) =>
      props.color === "High"
        ? "#f5222d"
        : props.color === "Medium"
        ? "#fa8c16"
        : "#52c41a"};
  border-radius: 4px;
  font-family: Roboto;
  box-shadow: 1px 1px 5px -4px #000000;

  :hover {
    cursor: pointer;
    box-shadow: 1px 1px 5px -3px #000000;
    transition: 0.5s ease;
  }
`;

export const TypeTag = styled.div`
  color: #262626;
  background-color: #f5f5f5;
  display: flex;
  align-contents: center;
  justify-contents: center;
  height: 32px;
  border-radius: 4px;
  font-family: Roboto;
  width: 60%;

  :hover {
    cursor: pointer;
    transition: 0.5s ease;
  }
`;

export const BorderlessTag = styled.div`
  color: ${props => props.color ? props.color : "#262626"};
  background-color: ${props => props.background ? props.background : "#f5f5f5"};
  display: flex;
  align-items: center;
  align-self: center;
  text-align: center;
  vertical-align: center;
  justify-content: center;
  height: 32px;
  border-radius: 4px;
  font-family: Roboto;
`;
