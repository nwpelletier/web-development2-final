// I'll keep the login/registration "pages" just for reference as long as we need them - the logic I haven't changed, just the UI
// Nick 2023/10/12... Using some console logs for debugging - will sweep through to remove!


import React from 'react';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios'; // Import axios and other necessary dependencies
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext, UsernameContext, UserRoleContext } from '../../App';

// Login form & ability to setModalContent
function Login({ setModalContent, closeModal }) {

  axios.defaults.withCredentials = true;
  const [isAuth, setIsAuth] = useContext(AuthContext);
  const [username, setUsername] = useContext(UsernameContext);
  const [userRole, setUserRole] = useContext(UserRoleContext);


  const initialLogin = {
    username: "",
    password: ""
  }

  const loginSchema = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required()
  })
  

  const login = (data) => {
    axios.post(`http://localhost:8080/api/users/login`, data)
      .then((response) => {
        // console.log(response)
        if (response.data.auth === true) {
          setIsAuth(response.data.auth);
          setUsername(response.data.username)
          setUserRole(response.data.role)
          localStorage.setItem('token', response.data.token);
          closeModal();
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <Formik
        initialValues={initialLogin}
        onSubmit={login}
        validationSchema={loginSchema} >
        <Form>
          <label htmlFor="usernameInput">Username: </label>
          <ErrorMessage
            name='username'
            component="div"
            className='text-danger' />
          <Field
            className="form-group form-control mx-1"
            id="usernameInput"
            name="username"
          />

          <label htmlFor="passwordInput">Password: </label>
          <ErrorMessage
            name='password'
            component="div"
            className='text-danger' />
          <Field
            className="form-group form-control mx-1"
            id="passwordInput"
            name="password"
            type="password"
          />
          <button
            className='btn btn-warning m-5'
            type='submit'>Log In</button>
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
