// Repurposed into modal


import axios from 'axios'; 

import { useEffect, useState, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage, withFormik} from 'formik';
import * as Yup from 'yup';
import {BASE_API_URL} from "../../utils/constant"


function App() {
    const navigate = useNavigate();


    const initialLogin = {
        password: "",
        email: ""
    }
    const loginSchema = Yup.object({
        email: Yup.string().required(),
        password: Yup.string().required()
    })

    const login = (data) => {
        axios.post( BASE_API_URL + `/api/users/login`, data)
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
        

        <h1>Log In</h1>
        <Formik initialValues={initialLogin} onSubmit={login} validationSchema={loginSchema} >
            <Form>
                <label htmlFor="emailInput">Email: </label>
                <ErrorMessage name='email' component="div" className='text-danger'/>
                <Field 
                className="form-group form-control mx-5"
                id="emailInput" 
                name="email" 
                />

                <label htmlFor="passwordInput">Password: </label>
                <ErrorMessage name='password' component="div" className='text-danger'/>
                <Field 
                className="form-group form-control mx-5"
                id="passwordInput" 
                name="password"
                type="password"
               />
                <button className='btn btn-warning m-5' type='submit'>Log In</button>
                <button className='btn btn-info m-5' onClick={() => {navigate("/register")}} >I don't have an account</button>
                <button className='btn btn-warning m-5' type='submit'>Sign in with Google</button>


            </Form>
        </Formik>
        


       




        </>
    )
}
export default App;










