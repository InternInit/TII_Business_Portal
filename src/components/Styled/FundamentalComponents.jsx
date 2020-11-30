import React from "react";
import styled from "styled-components";

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
  font-weight: ${(props) => (props.bolded ? "bold" : "normal")};
  font-family: Lato;
  color: ${(props) => (props.subheading ? "#262626" : "#000000")};
`;

export const Caption = styled.span`
  text-align: center;
  font-family: roboto;
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
    transition: .5s ease;
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
    transition: .5s ease;
  }
`;
