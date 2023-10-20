import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, withFormik } from 'formik';
import * as Yup from 'yup';
import { BASE_API_URL } from '../../utils/constant';


// Register form & ability to setModalContent
function Register({ setModalContent, closeModal }) {
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
      username: Yup
        .string()
        .matches(/^\S*$/, 'No spaces allowed!'),
        // .required("Please include a username..."),
      password: Yup
        .string()
        // .required("This field is required")
        .matches(/^\S*$/, 'No spaces allowed!')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]|[!@#$%^&*()-_=+[\]{};:'",.<>?/\\|])[^ ]+$/, { message: "Password must contain one uppercase letter, one lowercase letter, and one number or special character." })
        // .oneOf([Yup.ref('passwordConfirm'), null], 'Passwords must match')
        .min(6, "Password must be a minimum of 6 characters long")
        .max(100, "Password must be a maximum of 100 characters long"),
      email: Yup
        .string()
        .email("You must enter a valid email... or leave it")

    })
  }

  // const onEmailBlur = (data) => {
  // };

  const register = (userData) => {
    return axios.post(`${BASE_API_URL}/api/users/register`, userData)
      .then((response) => {
        navigate("/");
        closeModal();
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      })
  }
  return (
    <>
      <div className="modal-big-text col-10">Create an account!</div>
      <p className="modal-info-text mb-0">Your username is how other crudditors will see you.  What should we call you???</p>
      <Formik
        initialValues={initialRegister}
        onSubmit={register}
        validationSchema={registerSchema} >
        <Form>

          <label className="modal-label" htmlFor="usernameInput">CHOOSE USERNAME </label>
          <ErrorMessage
            name='username'
            component="div"
            className='modal-danger-text' />
          <></>
          <Field
            className="modal-text-input form-control mx-1"
            id="usernameInput"
            placeholder="username"
            name="username"
          />

          <label className="modal-label" htmlFor="passwordInput">PICK A GOOD PASSWORD </label>
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

          <label className="modal-label" htmlFor="emailInput">EMAIL (not required) </label>
          <ErrorMessage
            name='email'
            component="div"
            className='modal-danger-text' />
          <></>
          <Field
            className="modal-text-input form-control mx-1"
            id="emailInput"
            placeholder="email"
            name="email"
          />


          {/* <label htmlFor="confirmPasswordInput">Confirm Password: </label>
            <ErrorMessage
              name='passwordConfirm'
              component="div"
              className='text-danger' />
            <Field
              className="form-group form-control mx-5"
              id="confirmPasswordInput"
              name="passwordConfirm"
              type="password"
            /> */}
          <div className="modal-signup-reminder mx-1">
            <span>Already have an account? </span>
            <a className="modal-signup-prompt" onClick={() => setModalContent('login')}> Log In</a>
            <span> | </span>
          </div>
          <div className="button-container ">
            <button
              className='btn btn-primary mt-4'
              type='submit'>SIGN UP</button>
          </div>
        </Form>
      </Formik>
    </>
  )
}
export default Register;