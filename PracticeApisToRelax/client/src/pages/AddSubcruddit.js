import Navbar from "../components/Navbar/Navbar";
import CategoryFields from "../components/SubcrudditCreate/CategoryFields";
import {Formik, Form, Field, ErrorMessage, withFormik} from 'formik';
import * as Yup from 'yup';


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
        formType : "text"
    }
    const wikiInput = {
        formId : "wikiInput",
        formName : "wiki",
        formType : "textfield"
    }

    const bannerInput = {
        formId : "bannerInput",
        formName : "banner",
        formType : "file"
    }
    const login = () => {
        console.log("hello")
    }

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="App">
      <Formik initialValues={initialLogin} validationSchema={loginSchema} onSubmit={login} >
            <Form>
       
            <CategoryFields 
                title={"name"} 
                warning={"no spaces. avoid using trademarked names. once chosen, name cannot be changed"} 
                formStyle={"form-text custom-form "}
                formObj={nameInput}
                />
            <CategoryFields 
                title={"wiki"} 
                warning={"add description and subcruddit rules here."}
                formStyle={"form-field custom-form "}
                formObj={wikiInput}
                />
            <CategoryFields 
                title={"banner"} 
                warning={"optional. add some personality to your community"}
                formObj={bannerInput}
                />
            <button className='btn btn-warning m-5' type='submit'>Click</button>
            </Form>
        </Formik>
            
      </div>
    </>
  );
}

export default AddSubcruddit;


