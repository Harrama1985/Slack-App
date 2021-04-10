import styled from 'styled-components'

export const Header=styled.div`
    display:flex;
    justify-content:space-between;
    width:100%;
    align-items:center;
    margin:10px;
    box-shadow: 0px 1px 10px 0px #d0d0d0;
    border-radius: 15px;
    padding:20px;
`
export const Box=styled.div`
    
`
export const Span=styled.span`
    ${props=>props.started && 'color:#ffe400'} ;
    font-size:20px;
    cursor:pointer;
`
export const Text=styled.p`
    font-size:18px;
`
export const Search=styled.div`
    
`
export const Input=styled.input`
    width:200px;
    padding:5px;
    border:1px solid #55555580;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;

    outline:none;
    background-color:transparent;
`
export const BtnSearch=styled.button`
    padding:5px;
    outline:none;
    border:1px solid #55555580;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
    
`