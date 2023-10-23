import DropImg from "../Crop/DropImg";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import CategoryFields from "../SubcrudditCreate/CategoryFields";
import {Formik, Form, Field, ErrorMessage, withFormik, useFormik} from 'formik';
import * as Yup from 'yup';





function PostCreate(props) {
  const { btnText, formInitValues, formObject, formSchema, postForm, postType, redirect, redirectTxt, imgDetails} = props;
  const {subcruddit} = useParams()
  const [subParam, setSubParam] = useState()
  

const navigate = useNavigate();



  useEffect(() => {
    if (subcruddit === "all") {
      setSubParam("")
      formInitValues.subcrudditName = ""
    } else {
      setSubParam(subcruddit)
      formInitValues.subcrudditName = subcruddit;
    }
  })

  const cancel = () => {
    if (!subcruddit){
      navigate("/c/all") 
    } else {
      navigate("/c/" + subcruddit) 
    }
  }

  const redirectAction = () => {
    let sub = '';
    if (!subcruddit){
      sub = "all"
    } else {
      sub = subcruddit
    }
    console.log("SUB: " + sub)
    navigate("/post/" + redirect + "/" + sub) 
  }

  const submit = async (data) => {
    try {
      const postedItem = await postForm(data);
      if (postedItem.type === "subcruddit") {
        navigate("/c/" + postedItem.subcruddit.subcrudditName) 
      } else {
        
        const url = `/c/${data.subcrudditName}/${postedItem.id}/${postedItem.title.replace(/[\s-]+/g, '_').replace(/["']/g, '').substring(0, 50).toLowerCase()}`
        navigate(url);
      }

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="App">
      <Formik initialValues={formInitValues} validationSchema={formSchema} onSubmit={submit} >
      {(formikProps) => (
            <Form encType={"multipart/form-data"}>

                
{formObject.map((formObj, index) => (

  
  <CategoryFields 
  key={index}
  title={formObj.title}
  warning={formObj.warning}
  formName={formObj.name}
  formStyle={formObj.formStyle}
  formId={formObj.inputId}
  formType={formObj.formType}
  rows={formObj.rows}
  lineHeight={formObj.lineHeight} 
  onBlurWarning = {formObj.onBlur ? formObj.onBlurWarning : undefined}
  onBlurFunction = {formObj.onBlur ? formObj.onBlurFunction : undefined}
  value = {formObj.value ? subParam : undefined}

  

 


  />
))}
       

                {postType === "image" &&
                // <div>{imgDetails.formName} + {imgDetails.formId}</div>
            <DropImg 
                title={"select image"} 
                warning={"pick only one image"}
                  name={imgDetails.formName}
                  formId = {imgDetails.formId}
                  formikProps={formikProps}
                 

              // setBannerFile={(imageData) => formikProps.setFieldValue("content", imageData)}
                />
            }

          <button className=' m-2' type='submit'>{btnText}</button>

           
           {redirectTxt && <button className="m-2" onClick={redirectAction} >{redirectTxt}</button>}
           <button className="m-2" onClick={cancel} >Cancel</button>
            
            </Form>
      )}
      
        
        </Formik> 
       
      </div>
      <div>
     
      </div>

    </>
  );
}

export default PostCreate;


