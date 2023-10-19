import axios from 'axios';
import * as Yup from 'yup';
const FormData = require('form-data');


export const postType = "image"
export const btnText = "Create Post"
export const redirect = ""
export const redirectTxt = "Create Text Post"



export const formInitValues = {
    subcrudditName: "", // filled in by react
    title: "",
    postType: "image",
    content: "",
    caption: "",

}

// export const postForm = (data) => {
    
//    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
//     console.log(data)

//     axios
//     .post(`http://localhost:8080/api/posts/post/`, data, config)
//     .then((response) => {
      
//       console.log(response.data)
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }



export const postForm = (data) => {
    const formData = new FormData();
    formData.append('subcrudditName', data.subcrudditName);
    formData.append('title', data.title);
    formData.append('postType', data.postType);
    formData.append('caption', data.caption);
    formData.append('content', data.content);
    formData.append('UserId', data.UserId);
  
    const headers = {
        'Content-Type': 'multipart/form-data',
        'x-access-token': localStorage.getItem("token")
      };
  
    axios
      .post(`http://localhost:8080/api/posts/image`, formData, {headers:headers})
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
 




const onBlurCheck =  (data) => {
    console.log(data + " my data")
    return axios
    .get(`http://localhost:8080/api/subcruddits/exists/` + data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });

}
  
export const formSchema = Yup.object({
    title: Yup
    .string()
    .required("A title is required for all posts.")
    .min(10, "Title must be over 10 characters long.")
    .max(360, "Title must be less than 360 characters long.")
    ,
    caption: Yup
    .string()
    .required("A caption is required for an image post")
    .min(10, "Caption must be over 10 characters long.")
    .max(200, "Caption must be less than 200 characters long.")
    ,
    content: Yup.mixed()
    .required("An image is required for an image post")
    // .test("fileType", "Only image files are allowed", (value) => {
    //   if (value) {
    //      const supportedFormats = ["image/jpeg", "image/png", "image/jpg"];
    //     return supportedFormats.includes(value.type);
    //   }
    //   return true;
    // })
})

export const formObject = [{
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
}, {
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
    inputId: "captionInput",
    name: "caption",
    formType: "text",
    rows: 2.2,
    lineHeight: 2.2,
    title: "caption",
    warning: "add more context to your image",
    formStyle: "form-text custom-form"
},
]

export const imgDetails = {
    formName: "content",
    formId: "contentInput"
   }