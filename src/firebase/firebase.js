import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import md5 from 'md5';
import firebaseConfig from './config'


class Firebase {
    constructor(){
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.database()
        this.time=app.database.ServerValue.TIMESTAMP;
        this.storage = app.storage();
    }

    async register(name,email,password){
        const newUser = await this.auth.createUserWithEmailAndPassword(email,password)
        await newUser.user.updateProfile({
            displayName:name,
            photoURL:`http://gravatar.com/avatar/${md5(email)}?d=identicon`
        }).then(()=>{
            //hadi katecree lia db jdida dial users li tsejlo 
            firebase.db.ref('users').child(newUser.user.uid).set({
            name:newUser.user.displayName,
            photoURL:newUser.user.photoURL
          })
        })
    }

    async login(email,password){
        return await this.auth.signInWithEmailAndPassword(email,password)
    }

    async logOut(){
        await this.auth.signOut()
    }
    async restPassword(email){
        await this.auth.sendPasswordResetEmail(email)
    }
}

const firebase = new Firebase()

export default firebase