import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Formik, Field, ErrorMessage, withFormik, formikProps, setFieldValue } from 'formik';
import cardImage from '../../assets/card-image.svg';

function DropImg({ open, warning, title, name, formId, formikProps }) {
  const [imageData, setImageData] = useState("");
  const [imgValue, setImgValue] = useState("")


  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const fileData = event.target.result; 
        const contentObject = {
          fileData: fileData,
          file: file
        };
        console.log(file)
        formikProps.setFieldValue("content", file);
        setImgValue(file); 
      };
  
      reader.readAsArrayBuffer(file);
    }
  };

  

  
   
  const { getRootProps, getInputProps } = useDropzone({
    resizeWidth: 400,
    resizeQuality: 0.60,
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
            hidden={true}
           
          
            
           
    
            
          />

        </div>
      </div>
    </div>
    </div>
  );
}

export default DropImg;
