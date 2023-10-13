import DropImg from "../components/Crop/DropImg";
import Navbar from "../components/Navbar/Navbar";
import CategoryFields from "../components/SubcrudditCreate/CategoryFields";
import {Formik, Form, Field, ErrorMessage, withFormik, useFormik} from 'formik';
import * as Yup from 'yup';
import {btnText, formInitValues, formObject, formSchema, postForm, postType, redirect, redirectTxt} from "../components/CreatePost/subcrudditPostInit";
import { useState } from "react";





function Post() {

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="App">
      <Formik initialValues={formInitValues} validationSchema={formSchema} onSubmit={postForm} >
      {formikProps => (
            <Form>

                
{formObject.map((formObj, index) => (
  <CategoryFields 
  key={index}
  title={formObj.title}
  warning={formObj.warning}
  formName={formObj.name}
  formStyle={formObj.formStyle}
  formId={formObj.inputId}
  formType={formObj.formType}
  rows={formObj.rows} />
))}
       

                {postType === "image" &&
            <DropImg 
                title={"banner"} 
                warning={"optional. add some personality to your community"}
                formObj={formObject[1]}
                initValue = {""}
                setBannerFile={(file) => formikProps.setFieldValue("banner", file)}
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

export default Post;


