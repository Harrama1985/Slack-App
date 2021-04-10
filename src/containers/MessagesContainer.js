import React, { useEffect, useState } from 'react'
//import { connect } from 'react-redux'
import HeaderMsg from '../components/headerMsg'
import Messages from '../components/messages'
import SendMsg from '../components/sendMsg'
import firebase from '../firebase/firebase'
import mime from 'mime-types'
import {v4 as uuidv4} from 'uuid'   
import Progress from '../components/progress'
import { connect } from 'react-redux'
import {setUserPosts} from '../redux/channel/channelActions'
import 'emoji-mart/css/emoji-mart.css'
import {Picker,emojiIndex} from 'emoji-mart'
function MessagesContainer({user,currentChannel,privateChannel,setUserPosts}) {
    const messageRef=firebase.db.ref('messages')
    const usersRef = firebase.db.ref('users')
    let msgEnd; //hada ref kina fi document dial react raha saaahla 
    const messagePrivateRef = firebase.db.ref('privateMessages')
    const typingRef = firebase.db.ref('typing')
    //hadi bach kanchofo wach had l user baki mconnecter ola tket3at lih connection 
    const connectedRef = firebase.db.ref(".info/connected");
    
    let storageRef = firebase.storage.ref()  // hna kanekhdem bi storage li 3andi fi firebase hna bhala kandir wahed ref jdid
    //msg header
    const [search, setSearch] = useState('')
    const [isStarted , setIsStarted] = useState(false)
    const [resultSearch, setResultSearch] = useState([])
    //messages
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    //appload file
    const [file, setFile] = useState('')
    const [model, setModel] = useState(false)
    const [aploadState, setAploadState] = useState('')     //aploadState radi nehtajouha fi progress
    const [percent, setPercent] = useState(0)
    //hadi dial typing users
    const [typingUsers, setTypingUsers] = useState([])
    //hadi dial emoji
    const [emojiPicker, setEmojiPicker] = useState(false)

    const autorized =['image/jpeg','image/png']

    function refMessages(){
        return privateChannel ? messagePrivateRef : messageRef
    }

    useEffect(() => {

        let loadedMsg =[]
        if(user && currentChannel){
            setMessages([])
            refMessages().child(currentChannel.id).on('child_added',snap=>{
                loadedMsg.push(snap.val())
                setMessages([...loadedMsg])
                setAploadState('done')  //ila kan child added image kandiro done bach nhaydo hadak progresse bare
            })
        //start channels => hadi dawr dialha wa howa une fai katzad chihaja fi started li fi user katbeddel hadik isstarted men true li false or l3aks
        //dernaha hna hit 3andha 3alaka bi luser kina 3andi fi dependecies
        usersRef.child(`${user?.uid}/started`).once('value').then((data)=>{ //once bhal on finma kitra chi update wahed kikhdem
            if(data.val() !== null){
                const channelsId = Object.keys(data.val()) //hadi katrejje3 les key li kaynin fi object started fi array
                const prevStart = channelsId.includes(currentChannel.id)
                setIsStarted(prevStart)
            }
        })
            return ()=>{
                refMessages().child(currentChannel.id).off()
                usersRef.child(`${user?.uid}/started`).off()
            }
        }

    }, [user,currentChannel])
    //hadi dial count msg user
    useEffect(() => {
        //count user messages
        countUserMessage(messages)
    }, [messages])

    function countUserMessage(messages){
            const usermessages= messages.reduce((acc,msg)=>{
                if(msg.createdBy.name in acc ){
                    acc[msg.createdBy.name].count += 1 
                }else{
                    acc[msg.createdBy.name]={
                        avatar:msg.createdBy.avatar,
                        count:1
                    }
                }
                return acc
            },{})
            setUserPosts(usermessages)
    }

    function searchChange(event){
        setSearch(event.target.value)
    }

    useEffect(() => {
        const msgs = [...messages]
        const regex = new RegExp(search,'gi')//hna derna match bach nkhadem regexp bach tchercher fi arr soi kanet kelma kbira aw sghira
        const resultSearch = msgs.reduce((acc,msg)=>{
            if((msg.content && msg.content.match(regex)) || msg.createdBy.name.match(regex)){ 
                acc.push(msg)
            }
            return acc
        },[])
        setResultSearch(resultSearch)
    }, [search])




    function msgChange(event){
        setMessage(event.target.value)
    }
    
    function sendHandler(){
        if(message){
            refMessages().child(currentChannel.id).push().set(createMessage())
            .then(()=>{
                setMessage('')
                typingRef.child(currentChannel.id).child(user.uid).remove()
                setEmojiPicker(false)
            })
        }
    }

    function createMessage(url=null){
        const newMessage ={
            time:firebase.time, //hadik time jebtha men firebase
            createdBy:{
                id:user.uid,
                name:user.displayName,
                avatar:user.photoURL
            }, 
        }
        if(url){
            newMessage['image']= url  //ila kan url 3amer idan kanzid wahed key jdid smito image okane3tih url
        }else{
            newMessage['content']= message //hna ila makanch url kanzid fi new msg content okane3tiha msg
        }
        return newMessage
    }

    function sendFile(){ //hadik mime kaninstalih pakcage dialha okane3tiha smit lfile bi l extenssion dialo ohowa kihawelha matalan image/png
        if(file !== null){
            if(autorized.includes(mime.lookup(file.file.name))){ //mime.lookup katcheker 3la men be3d nokta chno l extenssion
                let metaData={contentType:mime.lookup(file.file.name)} //had metadata zedtha hit object file brit nzid fih contentType:image/png matalan 
                aploadFile(file.file,metaData)
                setFile('')
                setModel(false)
            }
        }
    }
    
    function aploadFile(file,metaData){ //had apload kandir biha hadak progress kibda men 0 htel 100 %
        const channelId = currentChannel.id
        const filePath = privateChannel ? `chat/private/${channelId}/${uuidv4()}.jpg` : `chat/public/${uuidv4()}.jpg` //uuidv4 hada pakcage smito uuid kainstalih okigenere lia wahed key
        setAploadState('Aploading') // hna kane3ti wahed lkima aploading bach apres radi netcheker biha
        storageRef = storageRef.child(filePath).put(file,metaData) //hna kanhot fi storage filepath ofi detail dial image kandir put (hna kikoun detail dial img)
        storageRef.on('state_change', snap=>{  //ohna kandir wahed listner 3la storage bach nebda n3amed fi progress
            const percentLoad = Math.round((snap.bytesTransferred/snap.totalBytes)*100) //bytesTransferred fach katcharga lfoto o hna bechhal kibda hta kiwsal 100 obach ndiro bi nisba lmi2awiya kankessmo 3la totale medroub fi 100
            setPercent(percentLoad)
            storageRef.snapshot.ref.getDownloadURL().then(urlImage=>{ // derna snapshot bach nakhdo reference dial refStorage
            sendFileMsg(urlImage,refMessages(),channelId)
        })
        })
    }
    
    function sendFileMsg(url,messageRef,channelId){
        messageRef.child(channelId).push().set(createMessage(url)) //hna kanzidha fi database realtime bi nefs lmethod creatMessage
    }
//hna file katrejje3 lia object fih file owast file detail dial object
    function changeFile(event){
        const file = event.target.files[0]
        if(file){
            setFile({file})
        }
    }
    function startChannelHandler(){
        setIsStarted(prevState=>!prevState)
    }
    useEffect(() => {
        if(user){
        if(isStarted ){
            usersRef.child(`${user.uid}/started`).update({
                [currentChannel.id] : {
                    name:currentChannel.name,
                    description:currentChannel.description,
                    createdBy:{
                        name:user.displayName,
                        avatar:user.photoURL
                    }
                }
            }) 
        }else{
            usersRef.child(`${user.uid}/started/${currentChannel?.id}`).remove(()=>console.log('remove channel started'))
        }
        }

    }, [isStarted,user]) 

    //had useeffect dial div li fih msgEnd
    useEffect(() => {
        if(msgEnd){
            msgEnd.scrollIntoView({behavior:'smooth'})
        }
    }, [messages])

    //hadi meni kibda chi user ikteb kiban lik rah chihad kikteb
    function handelKeyDown(event){
        if(event.keyCode === 13){
            sendHandler()
        }
        if(message && message!==''){
            typingRef.child(currentChannel.id).child(user.uid).set(user.displayName)
        }else{
            typingRef.child(currentChannel.id).child(user.uid).remove()
        }
    }
    // had useefffect dial typing user
    useEffect(() => {
        let typings = []
        if(user && currentChannel){
            typingRef.child(currentChannel.id).on('child_added',snap=>{
                if(snap.key !== user.uid){
                    typings.push({
                        id:snap.key,
                        name:snap.val()
                    })
                    setTypingUsers([...typings])
                }
            })
            typingRef.child(currentChannel.id).on('child_removed',snap=>{
                setTypingUsers(typingUsers.filter(typeUser=>typeUser.id !== snap.key))  // reje3 kolchi men ghir snap.key li temsah
            })
            connectedRef.on("value", (snap)=> {
                if (snap.val() === true) {
                    typingRef.child(currentChannel.id)
                            .child(user.uid)
                            .onDisconnect()
                            .remove(err=>console.log(err)) //had ondisconnect() hna kikra had event dial disconnect okinefdo meni kansed chrome awla kandir diconnect 
                } 
            })
            return()=>{
                typingRef.child(currentChannel.id).off()
                connectedRef.off()
            }
        }

    }, [user,currentChannel])

    function displayTypingUsers(){
        return typingUsers.length ?  typingUsers.map(user=>(
            <p key={user.id}>{user.name} is typing ....</p>
        )):null
    }

    function addEmoji(){
        setEmojiPicker(prevState=>!prevState)
    }

    function selectEmoji(emoji){
        const newMessage = colonToUniCode(`${message} ${emoji.colons}`)
        setMessage(newMessage)
        setEmojiPicker(false)
    }
    //hadi function ghir diri liha copier coller machi darori tfahmiha
    function colonToUniCode(message){
        return message.replace(/:[A-Za-z0-9_+-]+:/g,x=>{
            x=x.replace(/:/g, "");
            let emoji=emojiIndex.emojis[x];
            if(typeof emoji !=='undefined'){
                let unicode=emoji.native;
                if(typeof unicode !=='undefined'){
                    return unicode;
                }
            }
            x=':'+x+':';
            return x;
        });
    }

    return (
        <div style={{width:'70%'}}>
        <HeaderMsg channel={currentChannel?.name} messages={messages} 
                        privateChannel={privateChannel} startChannel={startChannelHandler} started={isStarted}>
            <HeaderMsg.Search 
            type='text'
            onChange={searchChange}
            value={search}
            placeHolder='Search'
            />
        </HeaderMsg>
        <Messages>
            {messages.length>0 ? resultSearch.length>0 && search ? 
            resultSearch.map(msg=>{
                return <Messages.Message key={msg.time} msg={msg} selfUser={user?.uid === msg?.createdBy.id}/>
            })
            : messages.map(msg=>{
                return <Messages.Message key={msg.time} msg={msg} selfUser={user?.uid === msg?.createdBy.id}/>
            }):''}
            { model && <Messages.Model closeModel={()=>setModel(false)} addFile={sendFile}>
                <Messages.File type='file'
                                value={file.name}
                                onChange={changeFile}
                />
            </Messages.Model>}
            <div ref={node=>msgEnd=node}>
                    {displayTypingUsers()} 
            </div>
        </Messages>
        <SendMsg>
            <span onClick={addEmoji} style={{position:'relative',cursor:'pointer',fontSize:'20px',fontWeight:'bold'}}>+
            { emojiPicker && <Picker 
                        set='apple'
                        emoji='point_up'
                        title='Pick your emoji…'
                        onSelect={selectEmoji}
                        style={{ position: 'absolute', bottom: '20px', left: '20px' }}
                        />}
            </span>
            <SendMsg.Input
                type='text'
                onChange={msgChange}
                value={message}
                placeHolder='Your message'
                onKeyDown={handelKeyDown}
                />
            <SendMsg.Button color='green' onClick={sendHandler}>Send message</SendMsg.Button>
            <SendMsg.Button color='orange' onClick={()=>setModel(true)}>Apload file</SendMsg.Button>
            {aploadState === 'Aploading' && <Progress percent={percent}/>} 
        </SendMsg>
        </div>
    )
}
const mapStateToProps = ({channel})=>(
    {
        privateChannel:channel.privateChannel
    }
)
export default connect(mapStateToProps,{setUserPosts})(MessagesContainer)
