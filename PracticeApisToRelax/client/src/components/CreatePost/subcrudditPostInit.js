import * as Yup from 'yup';
export const postType = "subcruddit"
export const btnText = "Create Subcruddit"
export const redirect = ""
export const redirectTxt = "Create Image Post"

export const formInitValues = {
    subcrudditName: "",
    wiki: "",
}

export const postForm = (data) => {
    console.log(data)
}

export const formSchema = Yup.object({
    subcrudditName: Yup
    .string()
    .required()
    .max(5, "Name must be over 5 characters long.")
    .min(20, "Name must be less than 64 characters long.")
    ,
    wiki: Yup
    .string()
    .max(10, "Wiki must be over 10 characters long.")
    .min(10000, "Wiki must not exceed 10,000 characters.")
    ,
})



export const formObject = [{
    inputId: "subcrudditNameInput",
    name: "subcrudditName",
    formType: "text",
    rows: "",
    lineHeight: 2.2,
    title: "name",
    warning: "no spaces. avoid using trademarked names. once chosen, name cannot be changed",
    formStyle: "form-text custom-form"
},
{
    inputId: "wikiInput",
    name: "wiki",
    formType: "textarea",
    rows: "3",
    lineHeight: 10,
    title: "wiki",
    warning: "add description and subcruddit rules here.",
    formStyle: "form-field custom-form "
},
]

