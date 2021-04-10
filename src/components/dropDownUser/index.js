import React from 'react'
import {Container,User,Avatar,UserName,Icon,Drop,List,Model,Form,Title,File,Button} from './styles/dropDownUser'
import firebase from '../../firebase/firebase'
export default function DropDownUser({children,...restProps}) {
    return (
        <Container {...restProps}>
            {children}
        </Container>
    )
}
DropDownUser.User=({photoUrl,displayName,open,...restProps })=>{
    return (
    <User {...restProps}>
        <Avatar src={photoUrl}/>
        <UserName>{displayName}</UserName>
        {!open ? <Icon>&#9660;</Icon> :<Icon>&#9650;</Icon>}
    </User>)
}
DropDownUser.Drop=({displayName,ChangeAvatar})=>{
    return(
        <Drop>
            <List>Sign in as {displayName}</List>
            <List onClick={ChangeAvatar}>Change avatar</List>
            <List onClick={()=>firebase.logOut()}>Sign out</List>
        </Drop>
    )
} 
DropDownUser.Model=({children,saveAvatar,previewImg,closeModel,showSaveAvatar})=> {
    return (
        <Model>
            <Title>Change avatar</Title>
            <Form>
                {children}
                {showSaveAvatar && <Button onClick={saveAvatar} add >Save avatar</Button>}
                <Button onClick={previewImg} add>Preview Image</Button>
                <Button onClick={closeModel}>Cancel</Button>
            </Form>
        </Model>
    )
}
DropDownUser.File=({...restProps})=>(
        <File {...restProps}/>
) 

