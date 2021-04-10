import React, { useState } from 'react';
import useFormValidation from '../auth/useFormValidation';
import validateRegiter from '../auth/validateRegister';
import Form from '../components/form';
import firebase from '../firebase/firebase';

const INITIAL_STATE ={
  name:'',
  email:'',
  password:'',
  confirmePassword:'',
}

function Register(props) {
  
  const {changeHandler,blurHandler,submitHandler, values, errors} = useFormValidation(INITIAL_STATE,validateRegiter,authenticate)
  const [errorFirebase, setErrorFirebase] = useState('')

  async function authenticate(values){
    const {name,email,password}=values
    try {
        await firebase.register(name,email,password)
        props.history.push('/')
    } catch (err) {
        setErrorFirebase(err.message)
    }
}
  return (
    <>
        <Form>
          <Form.Title>Register</Form.Title>
          <Form.Base onSubmit={submitHandler} method="POST">
            <Form.Input
              placeholder="User name"
              type="text"
              name='name'
              value={values.name}
              onChange={changeHandler}
              onBlur={blurHandler}
            />
              { errors?.name && <Form.Error>{errors.name}</Form.Error>}
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
            <Form.Input
              placeholder="Confirme password"
              type="password"
              name='confirmePassword'
              onChange={changeHandler}
              value={values.confirmePassword}
              onBlur={blurHandler}
            />
              { errors?.confirmePassword && <Form.Error>{errors.confirmePassword}</Form.Error>}
              { errorFirebase && <Form.Error>{errorFirebase}</Form.Error>}
            <Form.Submit type="submit">
                Register
            </Form.Submit>
          </Form.Base>
          <Form.Text>
            Already have a user ? <Form.Link to="/login">Login</Form.Link>
          </Form.Text>
        </Form>
    </>
  );
}


export default Register;
