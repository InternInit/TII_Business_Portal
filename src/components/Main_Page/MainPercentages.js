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
height:25vh;
border-radius:4px;
`

class MainPercentages extends React.Component {
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', minWidth: '325px', flexDirection: 'row' }}>
                <PercentageBox header="Applied to Industry" percentage="2" />
                <PercentageBox header="Applied to Company" percentage="24" />
                <PercentageBox header="Percentage Accepted" percentage="97" />
            </div>
        )
    }
}
export default MainPercentages;

class PercentageBox extends React.Component {
    render() {
        let { header, percentage } = this.props;
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
                    <Progress percent={percentage} size="large" type='circle' style={{ backgroundColor: 'red' }} />

                </BoxContainer>
            </div>
        )
    }
}