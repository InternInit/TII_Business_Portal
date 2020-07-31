import React from 'react';
import styled from 'styled-components';

const TabContainer = styled.div`
display:flex;
flex-direction:row;
align-items:center;
justify-content:center;
width:100%;
background-color:white;
min-height:7.4vh;
min-width:325px;
 border-radius:4px;
margin-bottom:12px;
`
const ListingName = styled.div`
font-size:22px;
font-weight:500;
 `
const Industry = styled.div`
margin-top:-4%;
font-size:14px;
color:#8c8c8c;
font-weight:500;
`
const Col = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
 `
const StatNum = styled.div`
display:flex;
justify-content:center;
font-weight:bold;
font-size:14px;
`
const StatLabel = styled.div`
margin-top:-4%;
font-size:14px;
color:#8c8c8c;
font-weight:500;
`



class PageListings extends React.Component {
    render() {
        return (<TabContainer>

            {/**
             * 
             * Listing name + Industry
             * 
             */}
            <Col style={{ marginLeft: '5%' }}>
                <ListingName>
                    Cheese Grator
            </ListingName>
                <Industry>
                    Data Science
                </Industry>
            </Col>


            {/**
             * 
             * Listing Details
             * 
             */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginLeft: '5%',
                width: '65%'
            }}>
                <Col >
                    <StatNum>
                        12
                    </StatNum>
                    <StatLabel>
                        Applicants
                    </StatLabel>
                </Col>

                <Col >
                    <StatNum>
                        12
                    </StatNum>
                    <StatLabel>
                        Accepted
                    </StatLabel>
                </Col>

                <Col >
                    <StatNum>
                        24
                    </StatNum>
                    <StatLabel>
                        Total
                    </StatLabel>
                </Col>
            </div>


        </TabContainer>)
    }
} export default PageListings;