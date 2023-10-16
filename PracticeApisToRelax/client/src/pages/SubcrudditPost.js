
import {btnText, formInitValues, formObject, formSchema, postForm, postType, redirect, redirectTxt} from "../components/CreatePost/subcrudditPostInit";
import PostCreate from "../components/CreatePost/PostCreate"

function SubcrudditPost () {

    
    const valuesToPass = {
        btnText: btnText,
        formInitValues: formInitValues,
        formObject: formObject,
        formSchema: formSchema,
        postForm: postForm,
        postType: postType,
        redirect: redirect,
        redirectTxt: redirectTxt, 
       
   
      };
return (
    <div>
        <PostCreate {...valuesToPass} />
    </div>
)
}

export default SubcrudditPost;