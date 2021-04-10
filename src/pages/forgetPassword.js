import React, { useState } from 'react'
import firebase from '../firebase/firebase'
import Form from '../components/form';

function ForgetPassword() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [successEmail, setSuccessEmail] = useState(false)

    async function clickHandler(){
        try {
            await firebase.restPassword(email)
            setSuccessEmail(true)
            setError('')
        } catch (err) {
            setError(err.message)
            setSuccessEmail(false)
        }
    }
    return (
                <Form>
                <Form.Title>Reset password</Form.Title>               
                    <Form.Input
                    placeholder="Email Address"
                    type="email"
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                  />
                  { error && <Form.Error>{error}</Form.Error>}
                  {successEmail &&  <p>check your email to rest password</p>} 
                  <Form.Submit  type="button" onClick={clickHandler}> Reset password </Form.Submit>
              </Form>
    )
}

export default ForgetPassword
