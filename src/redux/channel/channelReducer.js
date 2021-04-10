import * as actions from './channelType'

const initialState = {
    currentChannel:null,
    privateChannel:false,
    userPosts:{}
}

const channelReducer =(state=initialState,action)=>{
    switch (action.type) {
        case actions.SET_CURRENT_CHANNELS:
            return {...state,
                currentChannel:action.payload.currentChannel
            }
        case actions.PRIVATE_CHANNEL:
            return {...state,
                privateChannel:action.payload.privateChannel
            }
        case actions.SET_USER_POSTS:
            return {...state,
                userPosts:action.payload.userPosts
            }
        default:
            return {...state}
}
}

export default channelReducer;