import React from 'react'
import {Formik, Form, Field, ErrorMessage, withFormik} from 'formik';

function CategoryFields(props) {
    const {title, warning, formObj, onBlur, formStyle} = props
  return (
    <div>
        <div className='row'>
            <div className="bg-cruddit-blue col-5 mt-2 mx-3 mx-2 py-2 px-3">
                <label htmlFor={formObj.formId} className='text-dark-blue-20 mb-0 my-1'>
                    {title}
                </label>
                <p className='small-warning-txt'>
                    {warning}
                </p>
                <>
                <ErrorMessage name={formObj.formName} component="div" className='text-danger'/>
                <Field 
                className={formStyle}
                id={formObj.formId}
                name={formObj.formName} 
                type={formObj.formType}
                />

                
                </>
            </div>
        </div>
    </div>
  )
}

export default CategoryFields
