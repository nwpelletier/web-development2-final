import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import Comments from './Comments';
import PostComments from './PostComments';
import { BASE_API_URL } from '../../utils/constant';
import Alert from "react-bootstrap/Alert"; 


function EditPost(props) {
   // const {comment, value, setReply, order, setNewComment, setNestedReply, setCommentReplies, commentReplies, setEdit, setCommentContent} = props
    const formInitValues = {
      
        content: "",
    }
    
//     const postForm = (data) => {
//     console.log(data) 
//    // .put("/comments/:id"
//    data.content = "";
//    axios.put(BASE_API_URL + "/api/posts/comments/" + comment.id, data, {
//     headers: {
//       'x-access-token': localStorage.getItem("token")
//     }
//     })
//    .then((response)=> {
   
//     setCommentContent(response.data.comment.content)
//     setEdit(false)
//    })
//    .catch((error)=> {
//     console.log(error)
//    })

//     }

const postForm = () => {
    console.log("BLAH")
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
        <Formik initialValues={formInitValues} validationSchema={formSchema} onSubmit={postForm}>
            <Form>
            <ErrorMessage name={"content"} component="div" className="text-danger " />
            <Field

                            className={"custom-form edit-post mt-5"}
                            id={"formId"}
                            name={"content"}
                             as={"textarea"}
                            rows={15}
                            style={{ lineHeight: 1 }}
                            defaultValue={""}
          
                        />
                        <br></br>
                        <button className='comment-btn m-1 ' type='submit'>{"submit"}</button>
                        {/* <button onClick={cancel} className='comment-btn m-1 ' >{"cancel"}</button> */}
            </Form>
        </Formik>
        </div>



    )

  





}
export default EditPost;