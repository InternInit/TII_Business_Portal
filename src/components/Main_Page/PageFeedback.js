import React from 'react';
import styled from 'styled-components';

const FeedbackContainer = styled.div`
width:100%;
border-radius:4px;
min-width:325px;
`
const Banner = styled.div`
width:100%;
background-color:#fffbe6;
border-top-left-radius:4px;
border-top-right-radius:4px;
`
const Student = styled.div`
 font-size:12px;
`
const Position = styled.div`
font-weight:500;
`
const Feedback = styled.div`
width:100%;
background-color:white;
display:flex;
justify-content:center;
border-bottom-left-radius:4px;
border-bottom-right-radius:4px;
font-size:13px;
`


class PageFeedback extends React.Component {
    render() {
        return (
            <FeedbackContainer>
                <Banner>
                    {/**
                     * 
                     * Intern Name and Job Name
                     * 
                     */}
                    <div style={{ padding: '8px', marginLeft: '12px' }}>
                        <Position>
                            Position Name
                    </Position>
                        <Student>
                            Oscar Hong (18)
                    </Student>
                    </div>
                </Banner>
                {/**
                     * 
                     * Intern Feedback
                     * 
                     */}
                <Feedback>
                    <div style={{ width: '90%', marginTop: '10px', minHeight: '100px', maxHeight: '200px' }}>
                        Feedback goes here
                    </div>
                </Feedback>
            </FeedbackContainer>

        )
    }
} export default PageFeedback;