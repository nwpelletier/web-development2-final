import * as Yup from 'yup';
export const postType = "image"
export const btnText = "Create Post"
export const redirect = ""
export const redirectTxt = "Create Text Post"


export const formInitValues = {
    SubcrudditId: "", // filled in by react
    title: "",
    postType: "image",
    content: "",
    caption: "",

}

export const postForm = (data) => {
    console.log(data)
}
  
export const formSchema = Yup.object({
    title: Yup
    .string()
    .required("A title is required for all posts.")
    .max(10, "Title must be over 10 characters long.")
    .min(360, "Title must be less than 360 characters long.")
    ,
    caption: Yup
    .string()
    .required("A caption is required for an image post")
    .max(10, "Caption must be over 10 characters long.")
    .min(200, "Caption must be less than 200 characters long.")
    ,
    content: Yup.mixed()
    .required("An image is required for an image post")
    .test("fileType", "Only image files are allowed", (value) => {
      if (value) {
         const supportedFormats = ["image/jpeg", "image/png", "image/jpg"];
        return supportedFormats.includes(value.type);
      }
      return true;
    })
})

export const formObject = [{
    inputId: "titleInput",
    name: "title",
    formType: "text",
    rows: "2.2",
    lineHeight: 1,
    title: "post title",
    warning: "pick something descriptive",
    formStyle: "form-field custom-form"
},
{
    inputId: "captionInput",
    name: "caption",
    formType: "text",
    rows: "2.2",
    lineHeight: 1,
    title: "caption",
    warning: "add more context to your image",
    formStyle: "form-field custom-form"
},
]