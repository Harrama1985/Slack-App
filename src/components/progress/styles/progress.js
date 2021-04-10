import styled from 'styled-components';

export const Container = styled.div`
    width:70%;
    margin:10px auto;
    border-radius:7px;
    overflow:hidden;
`
export const Base = styled.div`
    width:${props=>props.percent};
    background-color:green;
    font-size:14px;
    color:white;
`