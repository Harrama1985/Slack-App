import React, { useState } from 'react';
import useFormValidation from '../auth/useFormValidation';
import validateLogin from '../auth/validateLogin';
import Form from '../components/form';
import firebase from '../firebase/firebase';

const INITIAL_STATE ={
  email:'',
  password:''
}

function Login(props) {

  const {changeHandler,blurHandler,submitHandler, values, errors} = useFormValidation(INITIAL_STATE,validateLogin,authentication)
  const [errorFirebase, setErrorFirebase] = useState('')

  async function authentication(values){
    const {email,password}=values
    try {
        await firebase.login(email,password)
        props.history.push('/')
    } catch (err) {
        setErrorFirebase(err.message)
    }
  }

  return (
    <>
        <Form>
          <Form.Title>Login</Form.Title>
          <Form.Base onSubmit={submitHandler}  method="POST">
            <Form.Input
              placeholder="Email Address"
              type="email"
              name='email'
              value={values.email}
              onChange={changeHandler}
              onBlur={blurHandler}
            />
            { errors?.email && <Form.Error>{errors.email}</Form.Error>}
            <Form.Input
              placeholder="Password"
              type="password"
              name='password'
              onChange={changeHandler}
              value={values.password}
              onBlur={blurHandler}
            />
             { errors?.password && <Form.Error>{errors.password}</Form.Error>}
             { errorFirebase && <Form.Error>{errorFirebase}</Form.Error>}
            <Form.Submit  type="submit">
              Login
            </Form.Submit>
          </Form.Base>
          <Form.Text>
            <Form.Link to="/forget">I forget password</Form.Link>
          </Form.Text>
          <Form.Text>
            I need to create an account ! <Form.Link to="/register">Register</Form.Link>
          </Form.Text>
        </Form>

    </>
  );
}

export default Login;
