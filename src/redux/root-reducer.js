import {combineReducers} from 'redux'
import userReducer from './user/userReducer'
import channelReducer from './channel/channelReducer'
import colorsReducer from './colors/colorsReducer';

const rootReducer = combineReducers({
    user: userReducer,
    channel:channelReducer,
    colors:colorsReducer
  });
  
  export default  rootReducer;