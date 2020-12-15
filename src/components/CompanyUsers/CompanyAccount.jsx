import React, { Component } from "react";
import styled from "styled-components";
import { Button, Row as AntRow, Col as AntCol } from "antd";
import {
  TabContainer,
  Header,
  Caption,
} from "../Styled/FundamentalComponents.jsx";

import { Link } from "react-router-dom";

const ButtonText = styled.span`
  font-family: roboto;
  color: #13c2c2;
  font-size: 18px;
`;

class CompanyAccount extends Component {
  render() {
    let { id } = this.props;
    return (
      <TabContainer
        className="py-2 px-4 mb-1 responsive-tab-container"
        hoverable
      >
        <AntRow justify="space-between" align="middle">
          <AntCol flex={4}>
            <Header className="twentyFont" bolded>
              {this.props.name}
            </Header>
            <Caption className="fourteenFont" thin light left>
              {this.props.role}
            </Caption>
          </AntCol>

          <AntCol flex={1}>
            <AntRow justify="end" align="middle" gutter={[16, 0]}>
              <AntCol span={14}>
                <Button size="large" type="default" block>
                  <Link to={`/users/${id}`}>Details</Link>
                </Button>
              </AntCol>
              <AntCol span={10}>
                <Button size="large" type="danger" block>
                  Remove
                </Button>
              </AntCol>
            </AntRow>
          </AntCol>
        </AntRow>
      </TabContainer>
    );
  }
}
export default CompanyAccount;
