import React, { useState } from 'react';
import { Form, Field, ErrorMessage } from 'formik';

function CategoryFields(props) {
    const { title, warning, formName, formStyle, formId, formType, rows, lineHeight, onBlurWarning, onBlurFunction, value } = props;
    const [subcrudditExists, setSubcrudditExists] = useState()
   

    const onBlur = async (event) => {
        console.log(event.target.value)
        const  doesExist =  await onBlurFunction(event.target.value)
        setSubcrudditExists(!doesExist)
    }

    

    return (
        <div>
            
            <div className="row">
                <div className="bg-cruddit-blue col-5 mt-2 mx-3 mx-2 py-2 px-3">
                    <label htmlFor={formId} className="text-dark-blue-20 mb-0 my-1">
                        {title}
                    </label>
                    <p className="small-warning-txt">
                        {warning}
                    </p>
                    <>
                        <ErrorMessage name={formName} component="div" className="text-danger" />
                        <div>{(onBlurWarning  && subcrudditExists ) && (<div className='text-danger'>{onBlurWarning}</div>)}</div>
                        <Field
                            className={formStyle}
                            id={formId}
                            name={formName}
                            as={formType === "textarea" ? "textarea" : undefined}
                            type={formType !== "textarea" ? formType : undefined}
                            rows={rows}
                            style={{ lineHeight: lineHeight }}
                            onBlurCapture= {onBlurWarning ?  onBlur : undefined}
                            defaultValue={value ? value : undefined}
                            
                        />
                    </>
                </div>
            </div>
        </div>
    );
}

export default CategoryFields;
