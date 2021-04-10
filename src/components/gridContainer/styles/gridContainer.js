import styled from 'styled-components/macro'

export const Container = styled.div`
display:flex;
position:relative;
`
export const SideBar = styled.div`
width:300px;
height:100vh;
background-color:${props=>props.primColor ? props.primColor :'#363535'};
border-right:1px solid black;
overflow-y:auto;
`
export const Content = styled.div`
height:100vh;
background-color:${props=>props.secondColor ? props.secondColor :'#faefef'};
flex-basis:100%;
position:relative;
display:flex;
width:100%;
`