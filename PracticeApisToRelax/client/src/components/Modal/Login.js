import React from 'react';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
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
        if (response.data.auth === true) {
          setIsAuth(response.data.auth);
          setUsername(response.data.username)
          setUserRole(response.data.role)
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('userRole', response.data.role);
          closeModal();
          window.location.reload();
        } else {
          console.log("Login failed: Not authenticated.")
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
            onClick={() => setModalContent('signup')}
          >
            Sign Up
          </button>
        </Form>
      </Formik>
    </>
  );
}

export default Login;
