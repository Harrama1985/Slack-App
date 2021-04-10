import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import Users from '../components/users'
import firebase from '../firebase/firebase'
import { setCurrentChannel,isPrivateChannel } from '../redux/channel/channelActions'

function UsersContainer({user,setCurrentChannel,isPrivateChannel,currentChannel}) {
    const usersRef = firebase.db.ref('users')
    const connectedRef = firebase.db.ref(".info/connected");
    const presenceRef = firebase.db.ref("presence");
    const [users, setUsers] = useState([])

useEffect(() => {
    connectUser(users) 
    return ()=>{
        usersRef.off()
        connectedRef.off()
        presenceRef.off()
    } 
}, [user])
// hadi kaddir lia 4 dial hajat
//1- kanjib les users okolla user kitzad kanzido lih uid status okanhottohom fi usesate users ohna darori kantcheker mikounouch ana 
//2- had connectedRef kina fi firebase kaddir listner 3la ayi wahed  tconnecta kanzido bi set(true) fi prensenceRef wila deconnecta kandir lih remove men presenceRef
//3- hadi kaddir lia listner 3la child_added okantcheker 3la l users li tzad mikounch ana olli mconnecter kanbeddel lih status bi online
//4- hadi child_removed bhal rakm 3 kanbedel status bi offline
function connectUser(){ 

    const loadUsers =[]                 //1
    usersRef.on('child_added',snap=>{
    if(user && (user.uid !== snap.key)){
        let snapUser = snap.val()
        snapUser['uid']=snap.key
        snapUser['status']='offline'
        loadUsers.push(snapUser)
        presenceRef.on('child_added',snap=>{    //2
            if(user?.uid !== snap.key){
                const updateUsers=loadUsers.reduce((acc,user)=>{
                    if(snap.key === user.uid){
                        user['status']='online'
                    }            
                    return acc.concat(user)
                },[])
                setUsers([...updateUsers])
            }
        })   
        presenceRef.on('child_removed',snap=>{
            if(user?.uid !== snap.key){
                const updateUsers=loadUsers.reduce((acc,user)=>{
                    if(snap.key === user.uid){
                        user['status']='offline'
                    }            
                    return acc.concat(user)
                },[])
                setUsers([...updateUsers])
            }
        })
        if(users.length===0){
            setUsers([...loadUsers])
        }
    }
    })
    connectedRef.on("value", (snap)=> {    //1  //value ya3ni ayi haja tbedlat fihad lhala dialna ila wellah true ola false user.uid wellat true ola false
        if (user && snap.val() === true) {
            const ref = presenceRef.child(user.uid)  
            ref.set(true)
            ref.onDisconnect().remove(err=>console.log(err)) //had ondisconnect() hna kikra had event dial disconnect okinefdo meni kansed chrome awla kandir diconnect 
        } 
    })

}

function changeUser(user){
       const channelId = getChannelId(user.uid) // ohna nekdar ndir ghiiiiiiiir user.uid bla had dawra mai la brit security osf
        const newData = {
            id:channelId,
            name:user.name
        } 
        setCurrentChannel(newData) //hna kandiro newdate 3la kbel id hit user fiha uid
        isPrivateChannel(true)
}

function getChannelId(userId){ //hadi tarika dialo howa taycree biha id jdid binnisba lchannel jdida 
        return userId < user.uid ?  // had tarika diri warka ostylo ohalliha radi tfahmi m3a firebase data
            `${userId}/${user.uid}`: `${user.uid}/${userId}`
}

function userActive(userId){
        return currentChannel?.id.includes(userId)
}
    return (
        <Users>
            <Users.Header countUsers={users.length}/>
                { users && users.map(user=>(<Users.User key={user.uid} 
                                                        onClick={()=>changeUser(user)} 
                                                        userName={user.name} 
                                                        status={user.status} 
                                                        active ={userActive(user.uid)}
                                                        /> ))} 
        </Users>
    )

}

const mapStateToProps = ({channel})=>({
    currentChannel:channel.currentChannel,
})
export default connect(mapStateToProps,{setCurrentChannel,isPrivateChannel})(UsersContainer)
