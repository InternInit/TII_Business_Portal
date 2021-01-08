import React from 'react';

import { 
    Typography,
    Row, 
    Col,
    Avatar,
    Button
} from "antd";

import { Header, Body } from "../Styled/FundamentalComponents.jsx";

import moment from "moment";


const { Paragraph } = Typography;

//CSS Constants
const CardStyle = {
    position: "relative",

    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "1px 1px 5px -4px",

    paddingRight: "5%",
    paddingBottom: "1em",
    paddingTop: "2em",
    paddingLeft: "3.5%",

    marginBottom: "1em"
};

const AvatarStyle = {
    paddingLeft: "3.5%"
};

const NameStyle = {
    fontSize: "22px", 
    paddingLeft: "3.5%",
    paddingBottom: "5px",

    marginTop: "5px"
};

const DateStyle = {
    color: "#b2b2b2",
    fontSize: "14px",
    marginLeft: "auto"
};

const ContainerStyle = {
    display: "flex",
    flexDirection: "row"
};

const FeedbackStyle = {
    paddingLeft: "3.5%",
    text: "justify"
};

const ButtonStyle = {
    float: "right", 
    paddingTop: "3px"
};

const FeedbackInfoStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
};

class InternPastFeedback extends React.Component {
    render() {
        let {student} = this.props;

        return(
            <div>
                <Row>
                    <Col span={12} offset={12}>
                        <Header bolded style={{"font-size": "26px"}}>Past Feedback</Header>
                            {student.feedback.map((data) => {
                                return(
                                    <Row style={CardStyle}>
                                        <div style={ContainerStyle}>

                                            {/* 
                                                Avatar Column
                                            */}
                                            <Col flex="48px" style={{paddingTop: "7px", marginTop: "1px"}}>
                                                <div style={AvatarStyle}>
                                                    <Avatar src={student.image} size={48}/>
                                                </div>
                                            </Col>

                                            {/* 
                                                Name, Date, Comment Column
                                            */}
                                            <Col flex="auto">

                                                {/* 
                                                    Name & Date Row
                                                */}
                                                <div style={FeedbackInfoStyle}>
                                                    <div style={NameStyle}>
                                                        {student.formData[0]["First Name"] + " " + student.formData[0]["Last Name"]}
                                                    </div>

                                                    <div style={DateStyle}>
                                                        {moment(data.date).format("MM/DD/YYYY")}
                                                    </div>
                                                </div>

                                                {/* 
                                                    Feedback Row
                                                */}
                                                <div style={FeedbackStyle}>
                                                    <Body className="fourteenFont universal-left">
                                                        {data.comment < 200 ? (
                                                            <div>{data.comment}</div>
                                                        ) : (
                                                            <div
                                                            className="intern-dashboard-shortened-feedback"
                                                            style={{ height: "80px", overflow: "hidden" }}
                                                            >
                                                            {data.comment}
                                                            tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed
                                                            </div>
                                                        )}
                                                    </Body>
                                                </div>

                                                {/* 
                                                    Read more Button
                                                */}
                                                <Button type="link" style={ButtonStyle}>Read more</Button>
                                            </Col>
                                        </div>
                                    </Row>
                                );
                            })}
                    </Col>
                </Row>
            </div>
        );
    };
};

export default InternPastFeedback;