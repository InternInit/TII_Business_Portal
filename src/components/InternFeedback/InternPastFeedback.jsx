import React from "react";

import { Row, Col, Avatar, Button } from "antd";

import { Header, Body, Caption, TabContainer } from "../Styled/FundamentalComponents.jsx";

import moment from "moment";

class InternPastFeedback extends React.Component {
  render() {
    let filler =
      "tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed";
    let { student } = this.props;
    let readMore = false;

    return (
      <Row>
        <Col span={12} offset={12}>
          <Header className="twentyEightFont" bolded>
            Past Feedback
          </Header>

          {student.feedback.map((data) => {
            return (
              <TabContainer>
                <Row className="px-3 py-2" gutter={16} wrap={false}> 

                    {/* Avatar Column */}
                    <Col flex="48px">
                      <Avatar src={student.image} size={48} />
                    </Col>

                    {/* Name, Date, Comment Column */}
                    <Col flex="auto">
                      
                      {/* Name & Date Row */}
                      <Row justify="space-between">
                        <Col>
                          <Header className="twentyTwoFont">
                            {student.formData[0]["First Name"] + " " + student.formData[0]["Last Name"]}
                          </Header>
                        </Col>

                        <Col className="universal-middle">
                          <Caption className="fourteenFont" light>
                              {moment(data.date).format("MM/DD/YYYY")}
                          </Caption>
                        </Col>
                      </Row>

                      {/* Feedback Row */}
                      <Row>
                        <Body className="fourteenFont universal-left">
                          {data.comment.length < 200 ? (
                            <div>
                              {(readMore = false)}
                              {data.comment}
                            </div>
                            ) : (
                            <div
                              className="intern-dashboard-shortened-feedback"
                              style={{ height: "80px", overflow: "hidden" }}
                            >
                              {(readMore = true)}
                              {filler}
                              {data.comment}
                            </div>
                          )}
                        </Body>
                      </Row> 

                      {/* Read more Button */}
                      <Row justify="end">
                        {readMore ? (
                          <Button type="link">
                            Read more
                          </Button>
                          ) : (
                          null
                        )} 
                      </Row>
                    </Col>
                </Row>
              </TabContainer>
            );
          })}
        </Col>
      </Row>
    );
  };
};

export default InternPastFeedback;
