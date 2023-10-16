// Repurposed into modal



import axios from 'axios'; 
// import '../App.css';
import { useEffect, useState, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage, withFormik} from 'formik';
import * as Yup from 'yup';



function Register() {
    const navigate = useNavigate();

    const initialRegister  = {
        password: "",
        passwordConfirm: "",
        email: ""
    }

    const registerSchema = () => {
        return Yup.object({

            password: Yup
            .string()
            .required("This field is required")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]|[!@#$%^&*()-_=+[\]{};:'",.<>?/\\|])[^ ]+$/, {message: "Password must contain one uppercase letter, one lowercase letter, and one number or special character."}        )
            .oneOf([Yup.ref('passwordConfirm'), null], 'Passwords must match')
            .min(6, "Password must be a minimum of 6 characters long")
            .max(100, "Password must be a maximum of 100 characters long"),
            passwordConfirm: Yup
            .string()
            .required("This field is required")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]|[!@#$%^&*()-_=+[\]{};:'",.<>?/\\|])[^ ]+$/, {message: "Password must contain one uppercase letter, one lowercase letter, and one number or special character."})
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .min(6, "Password must be a minimum of 6 characters long")
            .max(100, "Password must be a maximum of 100 characters long"),
            email: Yup
            .string()
            .required("This field is required")
            .email("You must enter a valid email")

        })
    } 

    const onEmailBlur = (data) => {

    };

    const register = (data) => {

    }



    return (
        <div>
            
           
                        
                            <>
                            <h1>Registration</h1>
                            <Formik initialValues={initialRegister} onSubmit={register} validationSchema={registerSchema} >
                                <Form>
                                    <label htmlFor="emailInput">Email: </label>
                                    <ErrorMessage name='email' component="div" className='text-danger'/>
                                    <></>
                                    <Field 
                                    className="form-group form-control mx-5"
                                    id="emailInput" 
                                    name="email" 
                                    // onBlurCapture={onEmailBlur}
                                    />
                
                                    <label htmlFor="passwordInput">Password: </label>
                                    <ErrorMessage name='password' component="div" className='text-danger'/>
                                    <Field 
                                    className="form-group form-control mx-5"
                                    id="passwordInput" 
                                    name="password" 
                                    type="password"
                                    
                                   />
                
                                    <label htmlFor="confirmPasswordInput">Confirm Password: </label>
                                    <ErrorMessage name='passwordConfirm' component="div" className='text-danger'/>
                                    <Field 
                                    className="form-group form-control mx-5"
                                    id="confirmPasswordInput" 
                                    name="passwordConfirm" 
                                    type="password"
                                   
                
                                   />
                                    <button className='btn btn-warning m-5' type='submit'>Create item</button>
                                    <button className='btn btn-info m-5' onClick={() => {navigate("/login")}} >I have an account</button>
                                    <button className='btn btn-warning m-5' type='submit'>Sign in with Google</button>

                
                                </Form>
                            </Formik>

                            </>
                        




  




        </div>
    )
}
export default Register;