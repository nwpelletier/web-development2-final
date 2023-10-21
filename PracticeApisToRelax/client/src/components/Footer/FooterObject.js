import React from 'react';

function FooterObject({ text, footObjClass }) {
  return (
    <div className={footObjClass}>
      <p>{text}</p>
    </div>
  );
}

export default FooterObject;
