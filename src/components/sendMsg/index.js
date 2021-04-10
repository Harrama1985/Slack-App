import React from 'react'
import {Picker} from 'emoji-mart'
import {Container,Input,Button} from './styles/sendMsg'
export default function SendMsg({children}) {
    return (
        <Container>
            {children}
        </Container>
    )
}

SendMsg.Input=({...restProps})=>(
    <Input {...restProps}/>
)

SendMsg.Button=({color,children,...restProps})=>(
    <Button color={color} {...restProps}>{children}</Button>
)
