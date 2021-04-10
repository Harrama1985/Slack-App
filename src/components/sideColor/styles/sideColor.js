import styled from "styled-components";

export const Container = styled.div`
width:50px;
height:100vh;
background-color:#1c1e1c;;
padding:5px;

`
export const Add = styled.span`
font-size:33px;
color:white;
display:block;
cursor:pointer;
font-weight:bold;
margin:10px 0;
text-align: center;
`
export const Model = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    width:100vw;
    height:100vh;
    background-color:#000000c2;
    position:fixed;
    top:0;
    left:0;
    z-index:100;
`
export const Title = styled.h4`
    font-size:18px;
    color:white;
    padding:10px 0
`

export const Button = styled.button`
    padding:10px 50px;
    margin-top:10px;
    background-color:${props => props.add ? 'green':'red' }
`
export const Base = styled.div`
    width:800px;
    margin-bottom:20px;
`
export const Color = styled.div`
    border-radius:5px;
    margin:10px auto;
    border:20px solid transparent;
    border-top-color:${props=>props.color.primaryColor};
    border-right-color:${props=>props.color.primaryColor};
    border-bottom-color:${props=>props.color.secondaryColor};
    border-left-color:${props=>props.color.secondaryColor};
    cursor:pointer;
`

