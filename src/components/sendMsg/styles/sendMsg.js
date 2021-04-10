import styled from "styled-components";

export const Container =styled.div`
    box-shadow: 0px 1px 10px 0px #d0d0d0;
    border-radius: 15px;
    padding:20px;
    margin: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    display:flex;
    flex-wrap:wrap;

`
export const Input =styled.input`
    flex:1 1 100%;
    padding:10px;
`

export const Button =styled.button`
    padding:10px;
    margin:10px 0;
    flex:1 1 50%;
    color:${props=>props.color};
    border-color:${props=>props.color};
`