import React from 'react'
import { SliderPicker } from 'react-color';
import {Container,Add,Model,Base,Title,Button,Color} from './styles/sideColor'

export default function SideColor({children}) {
    return (
        <Container>
            {children}
        </Container>
    )
}
SideColor.Add=({...restProps})=> {
    return (
        <Add {...restProps}> + </Add>
    )
}
SideColor.Model=({children,addColors,closeModel,handlerPrimaryColor,primaryColor,handlerSecondaryColor,secondaryColor,...restProps})=> {
    return (
        <Model>
            <Base>
                <Title>Primary color</Title>
                <SliderPicker onChange={handlerPrimaryColor} color={primaryColor} />
            </Base>
            <Base>
                <Title>Secondary color</Title>
                <SliderPicker onChange={handlerSecondaryColor} color={secondaryColor}/>
            </Base>
                <Button onClick={addColors} add>Add colors</Button>
                <Button onClick={closeModel}>Cancel</Button>
        </Model>
    )
}
SideColor.Color=({color,...restProps})=> {
    return (
        <Color {...restProps} color={color} /> 

    )
}



