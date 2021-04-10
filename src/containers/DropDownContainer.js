import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import DropDownUser from '../components/dropDownUser'
import AvatarEditor from 'react-avatar-editor'
import firebase from '../firebase/firebase';

function DropDownContainer({user}) {

    let avatarEditor;

    const [open, setOpen] = useState(false)
    const [openModel, setOpenModel] = useState(false)
    const [fileAavatr, setFileAvatar] = useState('')
    const [blob, setBlob] = useState('') 
    const [crapedImg, setCrapedImg] = useState('') // hia l image li kankat3o bilcanvace
    const [imageAvatarUrl, setImageAvatarUrl] = useState('')

    const storageRef = firebase.storage.ref()
    const userRef = firebase.auth.currentUser
    const usersRef = firebase.db.ref('users')

    function OpenAvatarHandler(){
        setOpenModel(true)
    }

    function fileChangeHandler(event){
        let file = event.target.files[0] // target dial files kate3tini array fiha fils kamlin ohna kanjibo lowla
        const reader = new FileReader() //hadi wahed class kante 
        if(file){ // chofi doc dial FileReader fi google
            reader.readAsDataURL(file) // hna
            reader.addEventListener('load',()=>{ 
                setFileAvatar(reader.result) 
            })
        }
    }

    function previewImgHandler(){
        if(avatarEditor){ //hadi ref dial avatarEditor lcomponent
            avatarEditor.getImageScaledToCanvas() //hadchi 3ando 3alaka bi lconvace bla matsad3i rassek m3ah 
                        .toBlob((blob)=>{ 
                            let imgURL = URL.createObjectURL(blob)
                            setCrapedImg(imgURL) // hadchi ki3tini url dial image li ana katte3t bil convace
                            setBlob(blob) // had blob kikoun fih maaloumat 3la limage size o type 
                        })
        }
    }
    
    function saveAvatarHandler(){
        let metaData={
            contentType:'image/jpeg',
        }
        storageRef.child(`avatars/users/${user.uid}`).put(blob,metaData).then((snap)=>{ //put hia bach kanhotto les files fi storage
            snap.ref.getDownloadURL().then((imgUrl)=>{ // kate3ti url dial image li fi storage
                setImageAvatarUrl(imgUrl)
            })
        })
    }

    useEffect(() => {
        if(imageAvatarUrl){
            userRef.updateProfile({
                photoURL:imageAvatarUrl
            }).then(()=>{
                setFileAvatar('')
                setBlob('')
                setCrapedImg('')
                setOpenModel(false)
            })
            usersRef.child(user.uid).update({
                avatar:imageAvatarUrl
            })
        }
    }, [imageAvatarUrl])

    return (
        <DropDownUser>
            <DropDownUser.User 
                photoUrl={user?.photoURL}
                displayName={user?.displayName} 
                open={open} 
                onClick={()=>setOpen(prevState=>!prevState)}/>
            {open && <DropDownUser.Drop displayName={user?.displayName} ChangeAvatar={OpenAvatarHandler}/>}
            {openModel && <DropDownUser.Model closeModel={()=>setOpenModel(false)} previewImg={previewImgHandler} 
                                                showSaveAvatar={!!crapedImg} saveAvatar={saveAvatarHandler}> 
                    <DropDownUser.File type='file'
                        value={fileAavatr.name}
                        onChange={fileChangeHandler}
                    />
                        {fileAavatr && <AvatarEditor //hada component kaninstalih okandir lih import
                            image={fileAavatr}
                            width={80}
                            height={80}
                            border={50}
                            color={[0, 0, 0, 0.6]} // RGBA
                            scale={1.2}
                            rotate={0}
                            style={{margin:'15px'}}
                            ref={node=>avatarEditor = node}
                    />}
                    { crapedImg && <img src={crapedImg} style={{margin:'15px', width:'100px',height:'100px'}}/>}
                </DropDownUser.Model>}
        </DropDownUser>
    )
}

const mapStateToProps = ({user})=>{
    return {
        user:user.currentUser
    }
}

export default connect(mapStateToProps)(DropDownContainer)
