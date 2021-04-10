import styled from 'styled-components';

export const Container = styled.div`

`
export const User = styled.div`
display:flex;

`
export const Avatar = styled.img`
width:30px;
height:30px;
border-radius:50%;
margin-right:10px;

`
export const UserName = styled.h3`
font-size:18px;
color:white;

`
export const Icon = styled.span`
font-size:18px;
color:white;
margin-left:auto;
`
export const Drop = styled.ul`
list-style-type:none;
background-color:white;
border-radius:7px;
margin-top:10px;
`
export const List = styled.li`
color:grey;
font-size:16px;
padding:5px 10px;
cursor:pointer;

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


