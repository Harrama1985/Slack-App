import React from 'react'

import {Container,Header,Icon,Text,Channel} from './styles/started'

export default function Started({children,...restProps}) {
    return (
        <Container {...restProps}>{children}</Container>
    )
}

Started.Header = ({countStarted,...restProps})=> {
    return (
        <Header {...restProps}>
            <Icon>&#9734;</Icon>
            <Text>Started ({countStarted})</Text>
        </Header>
    )
}

Started.Channel=({channelName,...restProps})=> {
    return (
        <Channel {...restProps}>
            {channelName} 
        </Channel>
    )
}
