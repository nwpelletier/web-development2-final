import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import Comments from './Comments';
import PostComments from './PostComments';

function CreateComment(props) {
    const {comment, value, setReply, order, setNewComment, setNestedReply, setCommentReplies, commentReplies} = props
    const formInitValues = {
        UserId: 1,
        content: "",
    }
    
    const postForm = (data) => {
        console.log(data)
        axios
        .post(`http://localhost:8080/api/posts/comment/${comment.id}`, data)
        .then((response) => {
            setReply(false)
            setNewComment(response.data)
            setNestedReply(true)
           
        })
        .catch((error) => {
          console.log(error);
        });
        
    }

    
    
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
        <Formik initialValues={formInitValues} validationSchema={formSchema} onSubmit={postForm}>
            <Form>
            <ErrorMessage name={"content"} component="div" className="text-danger " />
            <Field
                            className={"form-comment custom-form"}
                            id={"formId"}
                            name={"content"}
                            as={"textarea"}
                            rows={6}
                            style={{ lineHeight: 1 }}
                            defaultValue={value ? value : undefined}
                            
                        />
                        <br></br>
                        <button className='comment-btn m-1 ' type='submit'>{"submit"}</button>
                        <button onClick={cancel} className='comment-btn m-1 ' >{"cancel"}</button>
            </Form>
        </Formik>
        </div>



    )

  





}
export default CreateComment;