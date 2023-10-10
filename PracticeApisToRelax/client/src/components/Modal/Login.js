// 2023/10/10 -- copy-pasted from Alex's initial login/registration forms, adapted into Modals (removed a few buttons)
// I'll keep the login/registration "pages" just for reference as long as we need them - the logic I haven't changed, just the UI

import React from 'react';
import axios from 'axios'; // Import axios and other necessary dependencies
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Login form & ability to setModalContent
function Login({ setModalContent }) {
  const initialLogin = {
    password: "",
    email: ""
  }

  const loginSchema = Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required()
  })

  const login = (data) => {
    axios.post(`http://localhost:8080/api/users/login`, data)
      .then((response) => {
        console.log(response)
        if (response.data.auth === true) {
          console.log(true)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <Formik initialValues={initialLogin} onSubmit={login} validationSchema={loginSchema} >
        <Form>
          <label htmlFor="emailInput">Email: </label>
          <ErrorMessage name='email' component="div" className='text-danger'/>
          <Field 
            className="form-group form-control mx-1"
            id="emailInput" 
            name="email" 
          />

          <label htmlFor="passwordInput">Password: </label>
          <ErrorMessage name='password' component="div" className='text-danger'/>
          <Field 
            className="form-group form-control mx-1"
            id="passwordInput" 
            name="password"
            type="password"
          />
          <button className='btn btn-warning m-5' type='submit'>Log In</button>
          <button
            className='btn btn-primary m-5'
            type='button'
            onClick={() => setModalContent('signup')} // Set content to 'signup' on button click
          >
            Sign Up
          </button>
        </Form>
      </Formik>
    </>
  );
}

export default Login;
