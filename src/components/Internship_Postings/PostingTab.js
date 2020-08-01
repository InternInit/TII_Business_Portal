import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  background-color: white;

  width: 100%;
  min-height: 9vh;
  min-width: 600px;

   margin-top:2vh;

  border-radius: 4px;
  border: 1px solid #d8def3;
  box-shadow: 1px 1px 5px -4px;
`;

const Header = styled.span`
font-size:16px;
font-weight:bold;
`

const Col = styled.div`
display:flex;
flex-direction:column;
`

const Caption = styled.span`
font-size:12px;
margin-top:-.5vh;
`

const Status = styled.span`
font-size:16px;
font-weight:500;
 `

//CSS Constants
const dividerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '90vh',
    marginLeft: '25vh',
    paddingRight: '1vh',
    alignItems: 'center'
}


class PostingTab extends Component {
    render() {
        let { status } = this.props;
        let statusColor = "";

        let { id } = this.props;

        switch (status) {
            case 'Active':
                statusColor = "#52c41a";
                break;
            case 'Inactive':
                statusColor = "#f5222d";
                break;
            default:
                break;
        }
        return (<TabContainer>

            {/**
             * 
             * Listing Name + Industry
             * 
             */}
            <Col style={{ width: '20vh', }}>
                <Header>Coffee Getter</Header>
                <Caption>Data Science</Caption>
            </Col>

            {/**
             * 
             * Dividing margin
             * 
             */}
            <div style={dividerStyle}>

                {/**
             * 
             * Status
             * 
             */}
                <Status style={{ color: statusColor }}>{status}</Status>

                {/**
             * 
             * Number of Applicants
             * 
             */}
                <Col style={{ alignItems: 'center' }}>
                    <Header>12</Header>
                    <Caption style={{ color: '#BFBFBF' }}>Applicants</Caption>
                </Col>

                {/**
             * 
             * View Listing Details
             * 
             */}
                <Button type='primary'
                    style={{
                        width: '30vh',
                    }}
                >
                    <Link to={`/internship-listings/${id}`}>Details</Link></Button>
            </div>

        </TabContainer>)
    }
}
export default PostingTab;