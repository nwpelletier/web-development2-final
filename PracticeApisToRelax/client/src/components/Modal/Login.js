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
          localStorage.setItem('userId', response.data.id);
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
        <div className="modal-big-text col-10">Sign in for your very own personalized Cruddit experience!</div>
        <p className="modal-info-text">By having a Cruddit account, you can join, vote and comment on all of your favorite content!</p>
        <Formik
          initialValues={initialLogin}
          onSubmit={login}
          validationSchema={loginSchema} >
          <Form>
            <label className="modal-label" htmlFor="usernameInput">LOGIN </label>
            <ErrorMessage
              name='username'
              component="div"
              className='modal-danger-text' />
            <Field
              className="modal-text-input form-control mx-1"
              placeholder="username"
              id="usernameInput"
              name="username"
            />
            <label className="modal-label" htmlFor="passwordInput">Password: </label>
            <ErrorMessage
              name='password'
              component="div"
              className='modal-danger-text' />
            <Field
              className="modal-text-input form-control mx-1"
              id="passwordInput"
              placeholder="password"
              name="password"
              type="password"
            />
            <div className="modal-signup-reminder mx-1">
              <span>Don't have an account? </span>
              <a className="modal-signup-prompt" onClick={() => setModalContent('signup')}> Sign Up</a>
              <span> | </span><span className="modal-signup-prompt">Reset password</span>
            </div>
            <div class="button-container">
              <button
                className='btn btn-primary mt-4'
                type='submit'>LOG IN</button>
            </div>
          </Form>
        </Formik>
    </>
  );
}

export default Login;
