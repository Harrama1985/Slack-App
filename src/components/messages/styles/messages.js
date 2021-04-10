import styled from "styled-components";

export const Container=styled.div`
    width:100%;
    height:400px;
    margin:10px;
    overflow-y:scroll;
    box-shadow: 0px 1px 10px 0px #d0d0d0;
    border-radius: 15px;
    padding:20px;
`
export const Message=styled.div`
    display:flex;
    box-shadow: 0px 1px 10px 0px #d0d0d0;
    border-radius: 7px;
    padding:7px;
    margin: 10px 0;
    width: fit-content;
    background-color: #9dc58c;
    color: #3b3a3a;
    ${props=>props.selfUser && 'margin-left:auto; background-color: #f8cccc;'}
`
export const Image=styled.img`
    width:30px;
    height:30px;
    border-radius:50%;
    
`
export const Content=styled.div`
    margin-left:10px
`
export const User=styled.h4`
    font-size:18px;
    font-weight:700;

`
export const Date=styled.span`
    font-size:12px;
    margin-left:20px;
    font-weight:100
`
export const Text=styled.p`
    font-size:16px;
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
export const Title = styled.h2`
    font-size:20px;
    color:white;
    padding:30px 0
`
export const Form = styled.div`
    display:flex;
    flex-direction:column;
`
export const File = styled.input`
    width:500px;
    padding:10px;
    margin-top:20px;
    background-color:white;
`
export const Button = styled.button`
    padding:10px 50px;
    margin-top:10px;
    font-weight:bold;
    color:${props => props.add ? 'green':'red' };
    border-color:${props => props.add ? 'green':'red' };
`
export const ImageFile = styled.img`
    margin:10px;
    width: 80%;
`
