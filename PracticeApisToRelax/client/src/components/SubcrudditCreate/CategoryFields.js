import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';

function CategoryFields(props) {
    const { title, warning, formName, formStyle, formId, formType, rows } = props;

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
                        <Field
                            className={formStyle}
                            id={formId}
                            name={formName}
                            as={formType === "textarea" ? "textarea" : undefined}
                            type={formType !== "textarea" ? formType : undefined}
                            rows={rows}
                            // style={{ lineHeight: formObj.lineHeight }}
                        />
                    </>
                </div>
            </div>
        </div>
    );
}

export default CategoryFields;
