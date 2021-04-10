import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import firebase from './firebase/firebase';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPassword from './pages/forgetPassword';
import {setCurrentUser} from './redux/user/userActions'
import Home from './pages/Home';

function App({setCurrentUser,history}) {

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user)=>{
      
        if(user){
          setCurrentUser(user)
        }else{
          setCurrentUser(null)
          history.push('/login')
        }

    })
    return () => unsubscribe()
}, [])

  return (
    <>
      <Switch>
        <Route exact path='/' render={()=><Home/>}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/forget' component={ForgetPassword}/>
      </Switch>
    </>
  );
}

export default connect(null,{setCurrentUser})(withRouter(App));
