import React from 'react';
import styled from 'styled-components';
import { Progress } from 'antd';
const Header = styled.div`
font-size:20px;
font-weight:500;
color:#262626;
margin-bottom:12px;
`
const BoxContainer = styled.div`
background-color:white;
display:flex;
justify-content:center;
align-items:center;
 width:90%;
height:22vh;

border:
border-radius:4px;
`

class MainPercentages extends React.Component {
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', minWidth: '325px', flexDirection: 'row' }}>
                <PercentageBox header="Applied to Industry" percentage="2" color="#F5222D" />
                <PercentageBox header="Applied to Company" percentage="24" color="#1890ff" />
                <PercentageBox header="Percentage Accepted" percentage="97" color="#52C41A" />
            </div>
        )
    }
}
export default MainPercentages;

class PercentageBox extends React.Component {
    render() {
        let { header, percentage, } = this.props;
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}>
                <Header>
                    {header}
                </Header>
                <BoxContainer>
                    <Progress type='circle' percent={percentage} strokeColor={{ '0%': this.props.color, '100%': this.props.color, }} />
                </BoxContainer>
            </div>
        )
    }
}