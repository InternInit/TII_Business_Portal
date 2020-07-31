import React from 'react';
import styled from 'styled-components';
import { Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const Container = styled.div`
width:100%;
min-height:12vh;
background-color:white;
 user-select:none;
 border-radius:2px;

 display:flex;
 flex-direction:column;
 align-items:center;
`
const Position = styled.div`
font-weight: 500;
font-size: 14px;
`

const Name = styled.div`
font-size:16px;
font-weight:bold;
margin-left:2vh;

`

const Date = styled.div`
font-weight: 500;
font-size: 12px;
`

const Row = styled.div`
display:flex;
flex-direction:row;
align-items:center;
`
const Col = styled.div`
display:flex;
flex-direction:column;
align-items:center;
 `


class DraggingCard extends React.Component {
    render() {
        return (<Container>
            <Row style={{ marginTop: '2vh' }}>
                <Avatar src="" size={30} icon={<UserOutlined />} />
                <Name>Oscar Hong</Name>
            </Row>
            <Col>
                <Position style={{ marginTop: '1vh' }}>
                    Position Name
            </Position>
                <Date>
                    Date Applied: 1/12/20
                </Date>
            </Col>

            <Button type="primary" style={{ marginTop: '2vh', width: '60%', marginBottom: '2vh' }}>
                Details
            </Button>
        </Container>
        )
    }
} export default DraggingCard;