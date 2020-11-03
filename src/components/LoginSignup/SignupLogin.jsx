import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fafafa;
  width: 400px;
  height: auto;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  padding-bottom: 24px;

 `;

export const Background = styled.div`
background: radial-gradient(
  109.93% 109.93% at 50% 50%,
   rgba(18, 31, 128, 0.950428) 0%,
    #061178 8.33%,
     rgba(46, 62, 145, 0.835349) 56.77%,
     rgba(133, 161, 200, 0.479167) 89.06%,
      rgba(255, 255, 255, 0) 100%),
       #FFFFFF;
    
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: fill;
  background-color: #fafafa;
  position: fixed;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
 `;

export const Label = styled.div`
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  padding-bottom: 8px;
  margin-top: -8px;
`;

export const Banner = styled.div`
  background-color: #030852;
  padding: 18px;

  font-size: 32px;
  font-family: lato;
  font-weight: bold;

  color: white;
  font-weight: normal;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;

  display:flex;
  justify-content:center;
`;
