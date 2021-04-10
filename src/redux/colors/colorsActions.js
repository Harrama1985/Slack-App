import * as actions from './colorsTypes'

export const setColorRedux = (primColor,secondColor)=>{
return {
    type: actions.SET_COLORS,
    payload: {
        primColor,
        secondColor
    }
}
}