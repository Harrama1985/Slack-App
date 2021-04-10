import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../../firebase'
import useFormValidation from './useFormValidation'
import validateLogin from './validateLogin'

const INITIAL_STATE ={
    name:'',
    email:'',
    password:''
}

function Login(props) {
    const [login, setLogin] = useState(true)
    const {changeHandler,blurHandler,submitHandler, values, errors} = useFormValidation(INITIAL_STATE,validateLogin,authenticate)
    const {firebase}=useContext(FirebaseContext)
    const [errorFirebase, setErrorFirebase] = useState('')
    
    async function authenticate(values){
        const {name,email,password}=values
        try {
            login ? await firebase.login(email,password) : await firebase.register(name,email,password)
            props.history.push('/')
        } catch (err) {
            setErrorFirebase(err.message)
        }
    }
    
    return (
        <>
        {!login ? <h2>Create an account</h2>
                : <h2>Login</h2>}
        <form onSubmit={submitHandler}>
            {!login && <input 
                type='text'
                placeholder='Name'
                name='name'
                onChange={changeHandler}
                value={values.name}
                onBlur={blurHandler}
            />}
            <input 
                type='email'
                placeholder='Email'
                name='email'
                onChange={changeHandler}
                value={values.email}
                onBlur={blurHandler}
            />
            { errors?.email && <span className='error_text'>{errors.email}</span>}
            <input 
                type='password'
                placeholder='Password'
                name='password'
                onChange={changeHandler}
                value={values.password}
                onBlur={blurHandler}
            />
            { errors?.password && <span className='error_text'>{errors.password}</span>}
            {errorFirebase && <span className='error_text'>{errorFirebase}</span>}
            <button type='submit' >Submit</button>
            <button type='button' onClick={()=> {
                setLogin(prevLogin=>!prevLogin)
                setErrorFirebase('')
                }}>{login ? 'need to create an account' : 'I already have an account'}</button>
        </form>
        {login && <Link to='/forget'> Forget password </Link>}
        </>
    )
}

export default Login
