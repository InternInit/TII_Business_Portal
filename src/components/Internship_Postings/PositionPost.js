import React, { Component } from 'react';
import styled from 'styled-components';
import PostingTab from './PostingTab';
import { Button } from 'antd';
import NavSearch from '../NavSearch';
import InfoBar from './InfoBar';

const Container = styled.div`
 display:flex;
flex-direction:column;
align-items:center;

min-height:100vh;
min-width:600px;

background-color:#eceff9;
`

const Row = styled.div`
display:flex;
flex-direction:row;

margin-top:4vh;
margin-bottom:4vh;

width:60vh;
justify-content:space-between;
align-self:flex-start;
`

const Backend = [
    '1', '2', '3', '4'
]

//CSS Constants
const pageStyle = {
    display: 'flex',
    width: '80%',
    flexDirection: 'column',
    justifySelf: 'center'
}
class PositionPost extends Component {
    render() {
        return (<Container>
            <NavSearch title='My Internship Postings' />


            <div style={pageStyle}>

                <Row >
                    <Button type='primary' style={{ width: '27vh' }}>
                        New Internship
                </Button>
                    <Button type='primary' style={{ width: '27vh' }}>
                        Edit Filter
                </Button>
                </Row>

                <InfoBar />

                {Backend.map(postings => (
                    <PostingTab status="Active" />
                ))}


            </div>



        </Container>)
    }
}
export default PositionPost;