import * as actions from './userType'

export const setCurrentUser = (user)=>{
return {
    type: actions.SET_CURRENTUSER,
    payload: user
}
}