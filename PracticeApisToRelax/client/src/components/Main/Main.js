import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import SubcrudditDisplay from './SubcrudditDisplay';


function Main({handle}) {
  // hard coded for now**
  const contentType = 'subcruddit'
  useEffect(() => {
    if (contentType === 'subcruddit') {

      const fetchSubcrudditId = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/subcruddits/${handle}`);
        } catch (error) {
          console.error('Error fetching subcruddit:', error);
        }
      };
      fetchSubcrudditId();
    }
  }, [handle]);


  return (
    <div>
      <SubcrudditDisplay subcrudditName={handle} />
    </div>
  );
}

export default Main;
