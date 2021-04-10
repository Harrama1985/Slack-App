import React from 'react'

import {Container,Header,Icon,Text,User,Status} from './styles/users'

export default function Users({children,...restProps}) {
    return (
        <Container {...restProps}>{children}</Container>
    )
}

Users.Header = ({countUsers,...restProps})=> {
    return (
        <Header {...restProps}>
            <Icon>&#9977;</Icon>
            <Text>Users ({countUsers})</Text>
        </Header>
    )
}

Users.User=({userName,status,...restProps})=> {
    return (
        <User {...restProps}>
            {userName}
            <Status status={status==='offline'}></Status>
        </User>
    )
}
