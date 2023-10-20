import * as Yup from 'yup';
import axios from 'axios';
import { BASE_API_URL } from "../../utils/constant";



   export const postType = "text"
   export const  btnText = "Create Post"
   export const  redirect = "redirect"
   export const  redirectTxt = "Create Image Post"
   
   export const formInitValues = {
    subcrudditName: "",
       title: "",
       postType: "text",
       content: "",

   }
   
   export const  postForm = (data) => {
    console.log(data)
    axios
    .post(BASE_API_URL + `/api/posts/text`, data, {
      headers: {
        'x-access-token': localStorage.getItem("token")
      }
      })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
   }

   const onBlurCheck =  (data) => {
    console.log(data + " my data")
    return axios
    .get(BASE_API_URL + `/api/subcruddits/exists/` + data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });

}
    
   export const  formSchema = Yup.object({
       title: Yup
       .string()
       .required("A title is required for all posts.")
       .min(10, "Title must be over 10 characters long.")
       .max(360, "Title must be less than 360 characters long.")
       ,
       content: Yup
       .string()
       .required("Text content is required for all posts.")
       .min(10, "Content must be over 10 characters long.")
       .max(50000, "Content must be less than 50,000 characters long.")
       ,
       
   })
   
   export const   formObject = [{
    inputId: "subcrudditNameInput",
    name: "subcrudditName",
    formType: "text",
    rows: "",
    lineHeight: 2.2,
    title: "subcruddit",
    warning: "please select a subcruddit that exists",
    formStyle: "form-text custom-form",
    onBlur: true,
    onBlurWarning: "This subcruddit does not exist",
    onBlurFunction: onBlurCheck,
    value: " "
},{
       inputId: "titleInput",
       name: "title",
       formType: "text",
       rows: 2.2,
       lineHeight: 2.2,
       title: "title",
       warning: "be descriptive",
       formStyle: "form-text custom-form"
   },
   {
       inputId: "contentInput",
       name: "content",
       formType: "textarea",
       rows: 10,
       lineHeight: 1,
       title: "content",
       warning: "add your post here",
       formStyle: "form-field custom-form"
   }
   ]









// OBJECT 
// inputId
// name 
// formType 
//rows
//lineheight 
// title
//warning 
// form-style



      