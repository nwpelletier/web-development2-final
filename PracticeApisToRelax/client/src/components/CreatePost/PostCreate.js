import DropImg from "../Crop/DropImg";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import CategoryFields from "../SubcrudditCreate/CategoryFields";
import {Formik, Form, Field, ErrorMessage, withFormik, useFormik} from 'formik';
import * as Yup from 'yup';





function PostCreate(props) {
  const { btnText, formInitValues, formObject, formSchema, postForm, postType, redirect, redirectTxt, imgDetails} = props;
  const {subcruddit} = useParams()
  const [subParam, setSubParam] = useState()
  



  useEffect(() => {
    if (subcruddit === "all") {
      setSubParam("")
      formInitValues.subcrudditName = ""
    } else {
      setSubParam(subcruddit)
      formInitValues.subcrudditName = subcruddit;
    }
  })


  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="App">
      <Formik initialValues={formInitValues} validationSchema={formSchema} onSubmit={postForm} >
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


