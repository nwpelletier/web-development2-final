import * as Yup from 'yup';
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

export const postForm = (data) => {
    console.log(data)
}
const onBlurCheck = (data) => {
    console.log(data)
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