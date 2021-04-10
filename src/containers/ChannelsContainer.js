import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Channels from '../components/channels'
import firebase from '../firebase/firebase'
import { setCurrentChannel,isPrivateChannel } from '../redux/channel/channelActions'

function ChannelsContainer({user,currentChannel,setCurrentChannel,isPrivateChannel}) {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [model, setModel] = useState(false)
    const [channels, setChannels] = useState([])
    const [firstLoad, setFirstLoad] = useState(true)
    //notification
    const [channel, setChannel] = useState(null)
    const [notifications,setNotifications]= useState([])

    const messageRef = firebase.db.ref('messages')
    const channelRef = firebase.db.ref('channels')
    const typingRef = firebase.db.ref('typing')

    useEffect(() => {
        const loadedChannel = []
        //on kadir lister 3la data 
         //.val() bhal .data() meni kanekhdem fi firestore
        channelRef.on('child_added',snap=>{
            loadedChannel.push(snap.val())
            setChannels([...loadedChannel])
            setCurrentChannel(loadedChannel[0]);
            firstChannel(loadedChannel[0])
            //notification
            addNotifications(snap.key)
        })
        
        //off() hna katestoppi listener
        return ()=>{
            channelRef.off()
            messageRef.off()
        }
    }, [])
    
    function addNotifications(channelId){   // hadi ila chihad sifet chi msg fichi channel madakhlach liha kitzad notification 3andi
        messageRef.child(channelId).on('value',snap=>{  //hna kanrakbo ila tzad chi msg fi messageRef
            let lastTotal = 0
            let index = notifications.findIndex(notific=>notific.id===channelId) //hna 3adna arr notifications fi state kanhoto fiha ga3 les channels likinin ohna kantcheker wach kina 3andi had channel ola la ila lkato katrejje3 lia index dial channel ola malkatouch katrajje3  -1
            if(index !== -1){  // hadi ila  kan index machi false ya3ni lgina channel fi notifications
                if(channelId !== channel?.id){ // hna kantcheker ila kanet channel machi hia li dakhla liha ?????????????????????????????????????????????????????    
                    
                    lastTotal=notifications[index].total //hna kanjibo les msg lekdam onakhod menhom total kane3tih lasttotal
                    if(snap.numChildren()-lastTotal>0){  //snap.numChildren() katehsseb chhal men msg kin men lowel htel akhir msg (hit msg 3ibara 3and children dial channel) okanhayed menha les msg li kano gbel mitzad msg jdid wila kan kbar men 0 ya3ni chihad kteb msg
                        notifications[index].count=snap.numChildren()-lastTotal  //hna kandiro fi count les msg jdad 
                    }
                }
                notifications[index].lastKnowTotal = snap.numChildren() //ohna fi lastKnowTotal kandiro fiha ga3 les msg li kinin fihad channel
            }else{ // had else kidkhol liha awel marra okihot fiha ga3 les channel okihsseb lihom chhal men msg fihom bihadik snap.numchildren
                notifications.push({
                    id:channelId,
                    total:snap.numChildren(),
                    lastKnowTotal:snap.numChildren(),
                    count:0
                })
            }
        })
        setNotifications(notifications)
    }

    function firstChannel(channel){
         //hadi kandiro bach awel marra idar selectioner 3la awel channel
        if(firstLoad && channel.length>0){
            setCurrentChannel(channel)
            setFirstLoad(false)
            setChannel(channel)
        }
    }

    function addChannel(){
        if(name && description && description.length>10 && user){
        const key = channelRef.push().key
        const newChannel = {
            id:key,
            name:name,
            description:description,
            createdBy:{
                id:user.uid,
                userName:user.displayName,
                avatar:user.photoURL
            }
        }
        channelRef.child(key).update(newChannel).then(()=>{
            setName('')
            setDescription('')
            closeModel()
        })}

    }
    function closeModel(){
        setModel(false)
    }

    function changeChannel(channel){
        setCurrentChannel(channel)
        typingRef.child(currentChannel.id).child(user.uid).remove()
        isPrivateChannel(false)
        setChannel(channel)
        clearNotifications()
        
    }

    function clearNotifications(){
        let index = notifications.findIndex(notific=>notific.id === channel?.id) 
        if(index !== -1){  
            let updateNotifications = [...notifications]
            updateNotifications[index].total = notifications[index].lastTotal
            updateNotifications[index].count = 0
            setNotifications(updateNotifications)
        }
    }
    function countNotification(channel){
        let count = 0
        notifications.forEach(notific=>{
            if(notific.id === channel.id){
                count=notific.count
            }
        })
        if(count>0) return count
    }
    
    return (
        <Channels>
            <Channels.Header openModel={()=>setModel(true)} countChannels={channels.length}/>
            {channels.length>0 ? channels.map(channel=>{
                return <Channels.Channel key={channel.id} channelName={channel.name}
                                        onClick={()=>changeChannel(channel)}
                                        active={channel.id === currentChannel?.id}
                                        >
                                            {countNotification(channel)}
                        </Channels.Channel> 
            }):' '}

            {model && <Channels.Model closeModel={closeModel} addChannel={addChannel}>
                            <Channels.Input 
                                placeholder='Channel name'
                                value={name}
                                onChange={(event)=>setName(event.target.value)}/>
                            <Channels.Input 
                                placeholder='Channel description'
                                value={description}
                                onChange={(event)=>setDescription(event.target.value)}/>
                        </Channels.Model>}
        </Channels>
    )
}
/* const mapStateToProps = ({user,channel})=>({
    user:user.currentUser,
    currentChannel:channel.currentChannel,
}) */
export default connect(null,{setCurrentChannel,isPrivateChannel})(ChannelsContainer)
