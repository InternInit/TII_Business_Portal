import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';

import { UserOutlined } from '@ant-design/icons';

const Container = styled.div`
width:100%;
background-color:white;
min-height:50px;
margin-bottom:10px;
min-width:325px;
border-radius:4px;
height:7.4vh;

display:flex;
justify-content:center;
align-items:center;
`

const Col = styled.div`
display:flex;
flex-direction:column;

margin-left:6px;
`
const Name = styled.div`
font-size:18px;
font-weight:500;
color:#434343;
`
const Applying = styled.div`
margin-top:-4px;
font-size:12px;
font-weight:500;
color:#8c8c8c;
`


class StudentCard extends React.Component {
    render() {
        return (
            <Container>
                <Avatar size={28} icon={<UserOutlined />} />
                <Col>
                    <Name>
                        Oscar Hong (18)
                    </Name>
                    <Applying>
                        Coffee Grinder
                    </Applying>
                </Col>
            </Container>
        )
    }
}
export default StudentCard;