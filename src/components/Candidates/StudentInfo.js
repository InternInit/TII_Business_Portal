import React from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';

const { TextArea } = Input;

const Header = styled.div`
font-size:36px;
font-weight:bold;

margin-top:8vh;

 
color:#000000;
`

const InfoHeader = styled.div`
font-size:24px;
font-weight:500;

margin-top:2vh;
 
color:#000000;
`
class StudentInfo extends React.Component {
    render() {
        return (
            <div
                style={{
                    backgroundColor: "#F0F5FF",
                    minHeight: '100vh',
                    display: 'flex',
                    width: '80%',
                    flexDirection: 'column'
                }
                }>
                <Header>Oscar Hong</Header>

                {/**
                 * 
                 * Student Information
                 * 
                 */}
                <InfoHeader> Applicant Information</InfoHeader>


                {/**
                 * 
                 * Student Notes
                 * 
                 */}
                <InfoHeader>Notes</InfoHeader>
                <TextArea placeholder="Student Notes"
                    autoSize={{ minRows: 7, maxRows: 15 }}
                    style={{ marginTop: '2vh' }} />

                <Button type="primary"
                    style={{
                        width: '24vh',
                        marginTop: '2vh',
                        alignSelf: 'flex-end'
                    }}
                >
                    Save Notes
                    </Button>
            </div>
        )
    }
}
export default StudentInfo;