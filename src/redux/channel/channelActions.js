import * as actions from './channelType'

export const setCurrentChannel = (channel)=>{
return {
    type: actions.SET_CURRENT_CHANNELS,
    payload: {
        currentChannel:channel
    }
}
}
export const isPrivateChannel = (channel)=>{
return {
    type: actions.PRIVATE_CHANNEL,
    payload: {
        privateChannel:channel
    }
}
}
export const setUserPosts = (messages)=>{
return {
    type: actions.SET_USER_POSTS,
    payload: {
        userPosts:messages
    }
}
}