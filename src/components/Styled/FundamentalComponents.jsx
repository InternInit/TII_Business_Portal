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
  marginBottom: 4vh;
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
  font-weight: ${props => props.bolded ? "bold" : "normal"};
  font-family: Lato;
  color: ${props => props.subheading ? "#262626" : "#000000"};
`;

export const FilterTag = styled.div`
  color: ${props => props.color ? props.color : "gray"};
  height: 30px;
  border: 1px solid ${props => props.color ? props.color : "gray"};
  border-radius: 4px;
  font-family: Roboto;
`