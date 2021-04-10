import React from 'react'
import {Header,Box,Text,Search,Input,BtnSearch,Span} from './styles/headerMsg'
export default function HeaderMsg({channel,children,messages,privateChannel,startChannel,started}) {
    const uniqueUsers = messages.reduce((acc,msg)=>{ // acc => accumulator 
        if(!acc.includes(msg.createdBy.id)){
            acc.push(msg.createdBy.id)
        }
        return acc
    },[])
    return (
        <Header>
            <Box>
                <Text><Span onClick={startChannel} started={started}>{!started ? '✩' : '★'}</Span> {channel}</Text>
                {!privateChannel && <Text>Users ({uniqueUsers.length})</Text>}
            </Box>
            {children}
        </Header>
    )
}

HeaderMsg.Search=({searchHandler,...restProps})=>(
    <Search>
        <Input {...restProps}/>
        <BtnSearch>Ok</BtnSearch>
    </Search>
)



