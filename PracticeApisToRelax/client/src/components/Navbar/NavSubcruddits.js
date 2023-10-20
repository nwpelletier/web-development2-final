import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_API_URL } from '../../utils/constant';
function NavSubcruddits() {
  const [subcruddits, setSubcruddits] = useState([]);

  useEffect(() => {
    const fetchSubcruddits = async () => {
      try {
        const response = await axios.get(BASE_API_URL + '/api/subcruddits/all');
        setSubcruddits(response.data);
      } catch (error) {
        console.error('Error fetching subcruddits:', error);
      }
    };

    fetchSubcruddits();
  }, []);

  return (
    <div className="sub-cruddit-list">
      <div className="orange-box"></div>
      <div className="subcruddit-links">
        <a href={`/c/all`}>ALL</a>
        {subcruddits.map((subcruddit, index) => (
          <React.Fragment key={index}>
            <a href={`/c/${subcruddit.subcrudditName}`}>
              {typeof subcruddit.subcrudditName === 'string' ? subcruddit.subcrudditName.toUpperCase() : ''}
            </a>
            {index < subcruddits.length - 1 && ' - '}
          </React.Fragment>
        ))}
      </div>
    </div>

  );
}

export default NavSubcruddits;
