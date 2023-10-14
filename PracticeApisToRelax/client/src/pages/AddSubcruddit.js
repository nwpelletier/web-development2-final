import DropImg from "../components/Crop/DropImg";
import Navbar from "../components/Navbar/Navbar";
import CategoryFields from "../components/SubcrudditCreate/CategoryFields";
import {Formik, Form, Field, ErrorMessage, withFormik, useFormik} from 'formik';
import * as Yup from 'yup';


// initialvalues
//form schema 
// on submit
// redirect route
// modal 
// btn text 


// OBJECT 
// inputId
// name 
// formType 
//rows
//lineheight 
// title
//warning 
// form-style



function AddSubcruddit() {
    const initialLogin = {
        subcrudditName: "",
        wiki: "",
        banner: ""
    }
    const loginSchema = Yup.object({
        subcrudditName: Yup.string().required(),
        wiki: Yup.string().required(),
        subcrudditName: Yup.string().required(),
    })

    const nameInput = {
        formId : "subcrudditNameInput",
        formName : "subcrudditName",
        formType : "text", 
        rows: "",
        lineHeight: 2.2
    }
    const wikiInput = {
        formId : "wikiInput",
        formName : "wiki",
        formType : "textarea",
        rows: 3,
        lineHeight: 10
    }

    const bannerInput = {
        formId : "bannerInput",
        formName : "banner",
        formType : "file",
        rows: "",
        lineHeight: 1.5
    }
    const post = (data) => {
        console.log(data.banner)
    }

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="App">
      <Formik initialValues={initialLogin} validationSchema={loginSchema} onSubmit={post} >
      {formikProps => (
            <Form>
       
            <CategoryFields 
                title={"name"} 
                warning={"no spaces. avoid using trademarked names. once chosen, name cannot be changed"} 
                formStyle={"form-text custom-form "}
                formObj={nameInput}
                initValue = {""}
                />
            <CategoryFields 
                title={"wiki"} 
                warning={"add description and subcruddit rules here."}
                formStyle={"form-field custom-form "}
                formObj={wikiInput}
                initValue = {""}
                />
            <DropImg 
                title={"banner"} 
                warning={"optional. add some personality to your community"}
                formObj={bannerInput}
                initValue = {""}
                setBannerFile={(file) => formikProps.setFieldValue("banner", file)}
                />


            <button className=' m-2' type='submit'>Create Subcruddit</button>
            </Form>
      )}
        
        </Formik> 
      </div>
      <div>
     
      </div>

    </>
  );
}

export default AddSubcruddit;


