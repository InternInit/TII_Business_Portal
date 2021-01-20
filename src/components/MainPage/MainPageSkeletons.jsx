import React from "react";
import { Avatar, Row, Col, Grid, Skeleton } from "antd";
import {
  Header,
  Caption,
  TabContainer,
  BorderlessTag,
} from "../Styled/FundamentalComponents.jsx";

export const StudentCardSkeleton = (props) => {

  return (
    <TabContainer className="px-3 py-1 dashboard-tab">
      <Row align="middle" gutter={[16, 0]}>
        {/* Avatar */}
        <Skeleton.Avatar size={44} active/>

        <Col flex="auto">
          {/* Name */}
          <Row justify="space-between" align="middle">
            <Col>
              <Skeleton
                paragraph={false}
                className="student-card-skeleton-name"
                active
              />
              <Skeleton
                paragraph={false}
                className="student-card-skeleton-position"
                active
              />
            </Col>
            <Col>
              {props.tag && <Skeleton
                paragraph={false}
                className="student-card-skeleton-tag"
                active
              />}
            </Col>
          </Row>
        </Col>
      </Row>
    </TabContainer>
  );
};

/**
 * 
 *  Adds a space where the dots would be to prevent
 *  weird spacing on the skeletons
 * 
*/ 
export const DotSkeletonSpacer = (props) => {
  return (
    <div style={{width: "100%", height: "11px" }} />
  )
}