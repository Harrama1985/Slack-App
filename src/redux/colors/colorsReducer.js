import * as actions from './colorsTypes'

const initialState = {
    primColor:'',
    secondColor:''
}

const colorsReducer =(state=initialState,action)=>{
    switch (action.type) {
        case actions.SET_COLORS:
            return {...state,
                primColor:action.payload.primColor,
                secondColor:action.payload.secondColor
            }
        default:
            return {...state}
}
}

export default colorsReducer;