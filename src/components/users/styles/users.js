import styled from 'styled-components';

export const Container = styled.div`

`
export const Header = styled.div`
    display:flex;

`
export const Icon = styled.span`
    font-size:18px;
    color:white;
`
export const Text = styled.p`
    font-size:18px;
    color:white;
    margin-left:10px;
    
`
export const User = styled.p`
    margin-left:20px;
    color:white;
    padding:10px;
    cursor:pointer;
    transition:.5s;
    ${props=>props.active &&  'background-color: #575454'};
`
export const Status = styled.span`
    display:inline-block;
    margin-left:15px;
    width:10px;
    height:10px;
    border-radius:50%;
    ${props=>props.status ?  'background-color: red' : 'background-color: green'};
`


