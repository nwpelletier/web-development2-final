import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import Comments from './Comments';
import PostComments from './PostComments';

function EditComment(props) {
    const {comment, value, setReply, order, setNewComment, setNestedReply, setCommentReplies, commentReplies, setEdit, setCommentContent} = props
    const formInitValues = {
        UserId: 1,
        content: value,
    }
    
    const postForm = (data) => {
    console.log(data) 
setCommentContent("alex")
    }

    
    
    const formSchema = Yup.object({
        content: Yup
        .string()
        .required()
        .min(2, "Comment must be over 2 characters long.")
        .max(5000, "Comment must be less than 5000 characters long.")

    })

    const cancel = () => {
        setEdit(false)
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
                            defaultValue={value}
                         
                            
                        />
                        <br></br>
                        <button className='comment-btn m-1 ' type='submit'>{"submit"}</button>
                        <button onClick={cancel} className='comment-btn m-1 ' >{"cancel"}</button>
            </Form>
        </Formik>
        </div>



    )

  





}
export default EditComment;