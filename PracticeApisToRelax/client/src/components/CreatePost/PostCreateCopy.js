import DropImg from "../Crop/DropImg";
import Navbar from "../Navbar/Navbar";
import CategoryFields from "../SubcrudditCreate/CategoryFields";
import {Formik, Form, Field, ErrorMessage, withFormik, useFormik} from 'formik';
import * as Yup from 'yup';




function PostCreate(props) {
  const { btnText, formInitValues, formObject, formSchema, postForm, postType, redirect, redirectTxt } = props;


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
  rows={formObj.rows}
  lineHeight={formObj.lineHeight} />
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

export default PostCreate;


