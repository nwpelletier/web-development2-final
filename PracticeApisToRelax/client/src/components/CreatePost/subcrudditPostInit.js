import { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { BASE_API_URL } from "../../utils/constant";
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
    data.UserId = 1
    axios
    .post(BASE_API_URL + `/api/subcruddits/` , data, {
    headers: {
      'x-access-token': localStorage.getItem("token")
    }
    })
    .then((response) => {
      console.log(response)
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
      return !response.data
    })
    .catch((error) => {
      console.log(error);
    });

}



export const formSchema = Yup.object({
    subcrudditName: Yup
    .string()
    .required()
    .min(4, "Name must be over 3 characters long.")
    .max(20, "Name must be less than 64 characters long.")
    .matches(/^[a-z0-9]+$/, "Name must be in lowercase letters and contain no spaces")
    ,
    wiki: Yup
    .string()
    .min(10, "Wiki must be over 10 characters long.")
    .max(10000, "Wiki must not exceed 10,000 characters.")
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
    formStyle: "form-text custom-form",
    onBlur: true,
    onBlurWarning: "This subcruddit already exists",
    onBlurFunction: onBlurCheck
},
{
    inputId: "wikiInput",
    name: "wiki",
    formType: "textarea",
    rows: "10",
    lineHeight: 1,
    title: "wiki",
    warning: "add description and subcruddit rules here.",
    formStyle: "form-field custom-form "
},
]

