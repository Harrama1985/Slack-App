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
export const Channel = styled.p`
    margin-left:20px;
    color:white;
    padding:10px;
    cursor:pointer;
    transition:.5s;
    ${props=>props.active &&  'background-color: #575454'};
`