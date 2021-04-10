import React from 'react'
import {Container,Logo,Title,Box} from './styles/sidePanel'

export default function SidePanel({children,...restProps}) {
    return (
        <Container {...restProps}>{children}</Container>
    )
}
SidePanel.Logo=({children,...restProps})=>{
    return (
        <Logo {...restProps}>{children}</Logo>
    )
}
SidePanel.Title=({children,...restProps})=>{
    return (
        <Title {...restProps}>{children}</Title>
    )
}
SidePanel.Box=({children,...restProps})=>{
    return (
        <Box {...restProps}>{children}</Box>
    )
}

