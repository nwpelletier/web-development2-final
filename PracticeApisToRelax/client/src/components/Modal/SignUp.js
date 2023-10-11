import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, withFormik } from 'formik';
import * as Yup from 'yup';
const BASE_URL = "http://localhost:8080";


// Register form & ability to setModalContent
function Register({ setModalContent }) {
  // const navigate = useNavigate();

  let navigate = useNavigate();
  const initialRegister = {
    username: "",
    password: "",
    passwordConfirm: "",
    email: ""
  }

  const registerSchema = () => {
    return Yup.object({

      password: Yup
        .string()
        .required("This field is required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]|[!@#$%^&*()-_=+[\]{};:'",.<>?/\\|])[^ ]+$/, { message: "Password must contain one uppercase letter, one lowercase letter, and one number or special character." })
        .oneOf([Yup.ref('passwordConfirm'), null], 'Passwords must match')
        .min(6, "Password must be a minimum of 6 characters long")
        .max(100, "Password must be a maximum of 100 characters long"),
      passwordConfirm: Yup
        .string()
        .required("This field is required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]|[!@#$%^&*()-_=+[\]{};:'",.<>?/\\|])[^ ]+$/, { message: "Password must contain one uppercase letter, one lowercase letter, and one number or special character." })
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .min(6, "Password must be a minimum of 6 characters long")
        .max(100, "Password must be a maximum of 100 characters long"),
      email: Yup
        .string()
        .required("This field is required")
        .email("You must enter a valid email")

    })
  }

  // const onEmailBlur = (data) => {
  // };

  const register = (userData) => {
    return axios.post(`${BASE_URL}/api/users/register`, userData)
    .then((response) => {
      navigate("/home");
    })
    .catch((error) => {
      console.error("Error creating user:", error);
    })
  }
  return (
    <div>
      <>
        <Formik
          initialValues={initialRegister}
          onSubmit={register}
          validationSchema={registerSchema} >
          <Form>

            <label htmlFor="usernameInput">Username: </label>
            <ErrorMessage
              name='username'
              component="div"
              className='text-danger' />
            <></>
            <Field
              className="form-group form-control mx-5"
              id="usernameInput"
              name="username"
            // onBlurCapture={onEmailBlur}
            />

            <label htmlFor="emailInput">Email: </label>
            <ErrorMessage
              name='email'
              component="div"
              className='text-danger' />
            <></>
            <Field
              className="form-group form-control mx-5"
              id="emailInput"
              name="email"
            // onBlurCapture={onEmailBlur}
            />

            <label htmlFor="passwordInput">Password: </label>
            <ErrorMessage
              name='password'
              component="div"
              className='text-danger' />
            <Field
              className="form-group form-control mx-5"
              id="passwordInput"
              name="password"
              type="password"
            />

            <label htmlFor="confirmPasswordInput">Confirm Password: </label>
            <ErrorMessage
              name='passwordConfirm'
              component="div"
              className='text-danger' />
            <Field
              className="form-group form-control mx-5"
              id="confirmPasswordInput"
              name="passwordConfirm"
              type="password"

            />
            <button
              className='btn btn-warning m-5'
              type='submit'>Sign Up</button>
            <button
              className='btn btn-primary m-5'
              type='button'
              onClick={() => setModalContent('login')}
            >
              Log In
            </button>
          </Form>
        </Formik>
      </>
    </div>
  )
}
export default Register;