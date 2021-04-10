import styled from 'styled-components';

export const Container = styled.div`

`
export const Header = styled.div`
    display:flex;

`
export const Icon = styled.span`
    font-size:18px;
    color:white;
    margin-left:${props => props.right };
    ${props => props.clicked && 'cursor:pointer'};
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
export const Input = styled.input`
    width:500px;
    padding:10px;
    margin-top:20px;
`
export const Button = styled.button`
    padding:10px 50px;
    margin-top:10px;
    background-color:${props => props.add ? 'green':'red' }
`
