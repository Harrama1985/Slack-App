import React from 'react'

import {Container,Header,Icon,Text,Channel,Model,Title,Form,Button,Input} from './styles/channels'

export default function Channels({children,...restProps}) {
    return (
        <Container {...restProps}>{children}</Container>
    )
}

Channels.Header = ({countChannels,addChannel,openModel,...restProps})=> {
    return (
        <Header {...restProps}>
            <Icon>&#8633;</Icon>
            <Text>Channels ({countChannels})</Text>
            <Icon right={'auto'} clicked onClick={openModel}>&#8724;</Icon>
        </Header>
    )
}

Channels.Channel=({channelName,children,...restProps})=> {
    return (
        <Channel {...restProps}>
            {channelName} {children}
        </Channel>
    )
}
Channels.Model=({children,addChannel,closeModel,...restProps})=> {
    return (
        <Model>
            <Title>Add channel</Title>
            <Form>
                {children}
                <Button onClick={addChannel} add>Add channel</Button>
                <Button onClick={closeModel}>Cancel</Button>
            </Form>
        </Model>
    )
}
Channels.Input=({...restProps})=>{
    return(
        <Input type='text'  {...restProps}/>
    )
}