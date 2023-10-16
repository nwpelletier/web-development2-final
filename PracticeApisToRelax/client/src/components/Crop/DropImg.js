import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Formik, Field, ErrorMessage, withFormik } from 'formik';
import cardImage from '../../assets/card-image.svg';

function DropImg({ open, formObj, warning, title, setBannerFile, name, formId }) {
  const [file, setFile] = useState("");
  

  const onDrop = (acceptedFiles, rejectedFiles) => {
    console.log(acceptedFiles[0].path);
    setFile(acceptedFiles[0].path)
    
    if (acceptedFiles && acceptedFiles.length > 0) {
        setBannerFile(acceptedFiles[0].path);
      }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
    onDrop
  });

  return (
    <div className="row">
    <div className="bg-cruddit-blue col-5 mt-2 mx-3 mx-2 py-2 px-3">
      <label htmlFor={formId} className='text-dark-blue-20 mb-0 my-1'>
        {title}
      </label>
      <p className='small-warning-txt'>
        {warning}
      </p>
      <div {...getRootProps({})}>
        <input {...getInputProps()} />
        <div className="text-center">
          <div className="dropzone-content">
          <img src={cardImage} alt="Your Icon" width="auto" height="80%" className="m-2 icon-grey" />
            Drag and drop image here
          </div>
          <ErrorMessage name={name} component="div" className='text-danger' />
          <Field
            id={formId}
            name={name}
            hidden={file === "" ? true : false}
            
          />

        </div>
      </div>
    </div>
    </div>
  );
}

export default DropImg;
