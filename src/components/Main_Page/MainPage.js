import React from 'react';
import styled from 'styled-components';

import { Layout, } from 'antd';
import BusinessNavBar from '../BusinessNavBar';
import PageListings from './PageListings';
import PageFeedback from './PageFeedback';
import MainPercentages from './MainPercentages';
import StudentCard from './StudentCard';
const PageHeader = styled.div`
font-size:36px;
font-weight:500;
margin-left:12px;
`
const Header = styled.div`
font-size:24px;
font-weight:500;
color:#262626;
margin-bottom:12px;
`

const Col = styled.div`
display:flex;
flex-direction:column;
`

const Row = styled.div`
display:flex;
flex-direction:row;
 `

class MainPage extends React.Component {
  render() {
    return (<div style={{
      backgroundColor: "#f0f0f0",
      height: '100vh',
    }}>

      <PageHeader>
        Overview
      </PageHeader>

      <Row >
        {/**
         * 
         * Column 1
         * 
         */}
        <Col style={{ marginTop: '8px', marginLeft: '2%', width: '60%' }}>




          {/**
         * 
         * Listings
         * 
         */}
          <Header> Listings</Header>
          <PageListings />
          <PageListings />
          <PageListings />


          {/**
         * 
         * Intern Feedback
         * 
         */}
          <Header>Intern Feedback</Header>
          <PageFeedback />


          {/**
         * 
         * Industry Percentages
         * 
         */}
          <div style={{ marginTop: "12px", }}>
            <MainPercentages />
          </div>

        </Col>



        {/**
         * 
         * Column 2
         * 
         */}
        <Col style={{ marginLeft: '2%', marginTop: '8px', width: '32%' }}>

          {/**
         * 
         * Incoming Applicants
         * 
         */}
          <Header>Incoming Applicants</Header>
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />

          {/**
         * 
         * To be Interviewed
         * 
         */}
          <Header>Incoming Applicants</Header>
          <StudentCard />
          <StudentCard />
          <StudentCard />

        </Col>

      </Row>
    </div >)
  }


}
export default MainPage;