import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';

const { Search } = Input;

const Header = styled.div`
font-size:30px;
font-weight:500;
color:black;
margin-left:6vh;
margin-top:-1vh;
 `

class NavSearch extends React.Component {
    render() {
        return (
            <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                paddingTop: '2vh',
                paddingBottom: '2vh',
                backgroundColor: 'white'
            }}>

                <Header style={{ width: '45%', }}>
                    Internship Candidates
                </Header>

                <Search
                    style={{
                        width: '40%',
                        height: '40px',
                        borderRadius: '24px'
                    }} size="large" />

            </div>
        )
    }
}
export default NavSearch;