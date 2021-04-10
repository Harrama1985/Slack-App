import React,{useEffect, useState} from 'react'
import { connect } from 'react-redux'
import SideColor from '../components/sideColor'
import firebase from '../firebase/firebase'
import { setColorRedux } from '../redux/colors/colorsActions'

function SideColorContainer({user,setColorRedux}) {
    const [open, setOpen] = useState(false)
    const [primaryColor, setPrimaryColor] = useState('')
    const [secondaryColor, setSecondaryColor] = useState('')
    const [colors, setColors] = useState([])

    const usersRef=firebase.db.ref('users')

    useEffect(() => {
        let listColors=[]
        if(user){
            usersRef.child(`${user.uid}/colors`)
                .on('child_added',snap=>{
                    listColors.unshift(snap.val())
                    setColors([...listColors])
                })
        }
    }, [user])


    function handlerPrimaryColor(color){
        setPrimaryColor(color.hex)
    }

    function handlerSecondaryColor(color){
        setSecondaryColor(color.hex)
    }
    function addColorsHandler(){
        usersRef.child(`${user.uid}/colors`)
                .push()
                .set({
                    primaryColor,
                    secondaryColor
                })
                .then(()=>{
                    setOpen(false)
                })
    }
    return (
        <SideColor >
            <SideColor.Add onClick={()=>setOpen(true)}/>
            {open && <SideColor.Model closeModel={()=>setOpen(false)}
            handlerPrimaryColor={handlerPrimaryColor}
            primaryColor={primaryColor}
            handlerSecondaryColor={handlerSecondaryColor}
            secondaryColor={secondaryColor}
            addColors={addColorsHandler}
            />}
            {colors.length>0 && colors.map((color,i)=>(
                <SideColor.Color key={i} color={color}
                                onClick={()=>setColorRedux(color.primaryColor,color.secondaryColor)}
                />
            ))}
        </SideColor>
    )
}

export default connect(null,{setColorRedux})(SideColorContainer)
