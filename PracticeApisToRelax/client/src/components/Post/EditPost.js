import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import Comments from './Comments';
import PostComments from './PostComments';
import { BASE_API_URL } from '../../utils/constant';
import Alert from "react-bootstrap/Alert"; 
import { useState } from 'react';


function EditPost(props) {
    const {editPost, value} = props
    const [defaultVal, setDefaultVal] = useState(value)
    const formInitValues = {
        content: value,
    }
    

    
    
    const formSchema = Yup.object({
        content: Yup
        .string()
        .required()
        .min(2, "Comment must be over 2 characters long.")
        .max(5000, "Comment must be less than 5000 characters long.")

    })

    // const cancel = () => {
    //     setEdit(false)
    // }

  
    
    return (
        <div className='comment-form'>
        <Formik initialValues={formInitValues} validationSchema={formSchema} onSubmit={editPost}>
            <Form>
            <ErrorMessage name={"content"} component="div" className="text-danger " />
            <Field

                            className={"custom-form edit-post mt-1"}
                            id={"formId"}
                            name={"content"}
                             as={"textarea"}
                            rows={15}
                            style={{ lineHeight: 1 }}
                            defaultValue={value}
          
                        />
                        <br></br>
                        <button className='comment-btn edit-btn' type='submit'>{"submit"}</button>
                        {/* <button onClick={cancel} className='comment-btn m-1 ' >{"cancel"}</button> */}
            </Form>
        </Formik>
        </div>



    )

  





}
export default EditPost;