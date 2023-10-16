
import {btnText, formInitValues, formObject, formSchema, postForm, postType, redirect, redirectTxt, imgDetails} from "../components/CreatePost/imagePostInit";
import PostCreate from "../components/CreatePost/PostCreate"

function ImgPost() {
    const valuesToPass = {
        btnText: btnText,
        formInitValues: formInitValues,
        formObject: formObject,
        formSchema: formSchema,
        postForm: postForm,
        postType: postType,
        redirect: redirect,
        redirectTxt: redirectTxt, 
        imgDetails: imgDetails
      };
return (
    <div>
        <PostCreate {...valuesToPass} />
    </div>
)
}

export default ImgPost;