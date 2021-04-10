import React from 'react'
import {Container,SideBar,Content} from './styles/gridContainer'
export default function GridContainer({children,...restProps}) {
    return (
        <Container {...restProps}>
            {children}
        </Container>
    )
}
GridContainer.SideBar=({children,primColor,...restProps})=>{
    return <SideBar primColor={primColor} {...restProps}>{children}</SideBar> 
}
GridContainer.Content=({children,secondColor,...restProps})=>{
    return <Content {...restProps} secondColor={secondColor}>{children}</Content> 
}

