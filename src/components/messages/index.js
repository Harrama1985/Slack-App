import moment from 'moment'
import React from 'react'
import {Container,Message,Image,Content,User,Text,Date,File,Button,Form,Title,Model,ImageFile} from './styles/messages'
export default function Messages({children}) {
    return (
        <Container>
            {children}
        </Container>
    )
}
Messages.Message=({msg,...restProps})=>{
    //hasOwnProperty hadi katemchi tchouf l objet wach fih had lkey 
    function isImage(){
        return msg.hasOwnProperty('image') && !msg.hasOwnProperty('content')
    }

    return <Message  {...restProps}>
        <Image src={msg.createdBy.avatar}/>
        <Content>
            <User>{msg.createdBy.name}<Date>{moment(msg.time).fromNow()}</Date></User>
            {isImage() ? <ImageFile src={msg.image}/> : <Text>{msg.content}</Text>}
        </Content>
    </Message>
}
Messages.Model=({children,addFile,closeModel,...restProps})=> {
    return (
        <Model>
            <Title>Choose file</Title>
            <Form>
                {children}
                <Button onClick={addFile} add>Apload file</Button>
                <Button onClick={closeModel}>Cancel</Button>
            </Form>
        </Model>
    )
}
Messages.File=({...restProps})=>(
        <File {...restProps}/>
)