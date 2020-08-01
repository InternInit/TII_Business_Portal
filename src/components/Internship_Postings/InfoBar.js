import React, { Component } from 'react';
import styled from 'styled-components';

const Info = styled.div`
font-size:16px;
font-weight:500;
color:#B2B2B2;
`

const Container = styled.div`
width:100%;
min-width:600px;
border-bottom:1px solid #D1D1D1;

display:flex;
justify-content:center;
`

//CSS Constants
const dividerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '90vh',
    marginLeft: '25vh',
}

function InfoBar() {
    return (<Container>
        {/**
         * 
         * Name
         * 
         */}
        <Info style={{ width: '20vh' }}>Name</Info>


        {/**
         * 
         * Spacing
         * 
         */}
        <div style={dividerStyle}>

            {/**
         * 
         * Status, Applicants, and Edit Details
         * 
         */}
            <Info>Status</Info>
            <Info>Applicants</Info>
            <Info style={{ width: '30vh', justifyContent: 'center', display: 'flex' }}>Edit Details</Info>

        </div>
    </Container>)
}
export default InfoBar;