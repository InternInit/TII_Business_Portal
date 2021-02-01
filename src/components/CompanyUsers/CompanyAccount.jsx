import React, { Component } from "react";
import { Button, Row as AntRow, Col as AntCol, Modal, Skeleton } from "antd";
import {
  TabContainer,
  Header,
  Caption,
} from "../Styled/FundamentalComponents.jsx";

class CompanyAccount extends Component {
  state = {
    removeModal: false,
  };

  render() {
    return (
      <>
      <TabContainer
        className="py-2 px-6 mb-1 responsive-tab-container"
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
              {/*
              <AntCol span={14}>
                <Button size="large" type="default" block>
                  <Link to={`/users/${id}`}>Details</Link>
                </Button>
              
              </AntCol>
              */}
              <AntCol span={14}>
                <Button
                  size="large"
                  type="danger"
                  onClick={() => this.setState({ removeModal: true })}
                  block
                >
                  Remove
                </Button>
              </AntCol>
            </AntRow>
          </AntCol>
        </AntRow>
      </TabContainer>
      <Modal
                  title="Remove User"
                  centered
                  visible={this.state.removeModal}
                  onCancel={() => this.setState({ removeModal: false })}
                  footer={[
                    <Button
                      key="Cancel"
                      onClick={() => this.setState({ removeModal: false })}
                    >
                      Cancel
                    </Button>,
                    <Button
                      key="Reject"
                      type="danger"
                      onClick={() => this.setState({ removeModal: false })}
                    >
                      Remove
                    </Button>,
                  ]}
                >
                  <p>Are you sure you want to remove {this.props.name}'s account?</p>
                </Modal>
      </>
    );
  }
}

export const CompanyAccountSkeleton = (props) => {
  return (
    <TabContainer className="py-2 px-6 mb-1 responsive-tab-container" hoverable>
      <AntRow justify="space-between" align="middle">
        <AntCol flex={4}>
          <Skeleton
            paragraph={false}
            className="student-intern-tab-skeleton-name"
            active
          />
          <Skeleton
            paragraph={false}
            className="student-intern-tab-skeleton-position"
            active
          />
        </AntCol>

        <AntCol flex={1}>
          <AntRow justify="end" align="middle" gutter={[16, 0]}>
            <AntCol span={14}>
              <Button size="large" type="danger" block>
                Remove
              </Button>
            </AntCol>
          </AntRow>
        </AntCol>
      </AntRow>
    </TabContainer>
  );
};
export default CompanyAccount;
