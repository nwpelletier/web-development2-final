import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import Comments from './Comments';
import PostComments from './PostComments';
import { BASE_API_URL } from '../../utils/constant';
import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function CreateComment(props) {
  const { id, value, setReply, order, setNewComment, setNestedReply, setCommentReplies, commentReplies, replyToComment } = props
  const currentPath = useLocation().pathname;
  const [content, setContent] =useState("")




  const formInitValues = {
    content: "",
  }
  const [defaultVal, setDefaultVal] = useState("")
  
  const postForm = (data, { resetForm }) => {
    console.log(data)
      if (value) {
        // Handle the case when 'value' is truthy (if needed)
      } else {
        console.log(data);
        axios
          .post(BASE_API_URL + `/api/posts/comment/${id}`, data, {
            headers: {
              'x-access-token': localStorage.getItem("token")
            }
          })
          .then((response) => {
            setReply(false);
            setNewComment(response.data);
            if (replyToComment) {
              setNestedReply(true);
              setCommentReplies(commentReplies + 1);
            }

            // After successful submission, reset the form
            resetForm({values: ""});
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };





  const formSchema = Yup.object({
    content: Yup
      .string()
      .required()
      .min(2, "Comment must be over 2 characters long.")
      .max(5000, "Comment must be less than 5000 characters long.")

  })

  const cancel = () => {
    setReply(false)
  }



  return (
    <div className='comment-form'>
      {!currentPath.includes('/userpage') && (
        <Formik
          initialValues={formInitValues}
          validationSchema={formSchema}
          onSubmit={postForm}
        >
          <Form>
            <ErrorMessage name={"content"} component="div" className="text-danger " />
            <Field
              className={"form-comment custom-form"}
              id={"formId"}
              name={"content"}
              as={"textarea"}
              rows={6}
              style={{ lineHeight: 1 }}
              
            />
            <br />
            <button className='comment-btn m-1' type='submit'>{"submit"}</button>
            <button onClick={cancel} className='comment-btn m-1'>{"cancel"}</button>
          </Form>
        </Formik>
      )}
    </div>



  )







}
export default CreateComment;