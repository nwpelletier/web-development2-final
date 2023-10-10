import React, { useState, useEffect } from 'react';

function SubCrudditList() {
  const [subcruddits, setSubcruddits] = useState([]);

  // temp data just for testing purposes --> will have to do proper Axios request here when it comes to it
  useEffect(() => {
    const getSubcruddits = async () => {
      const data = ["home", "news", "askcruddit", "pics", "funny", "politics", "music", "world", "montreal", "johnabbottcollege", "react", "computerscience"]
      setSubcruddits(data);
    };

    getSubcruddits();
  }, [])
  return (
    <div className="sub-cruddit-list">
      <div className="orange-box"></div>
      <div className="subcruddit-links">
        {subcruddits.map((subcruddit, index) => (
          <React.Fragment key={index}>
            <a href={`/c/${subcruddit}`}>{subcruddit.toUpperCase()}</a>
            {index < subcruddits.length - 1 && ' - '}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default SubCrudditList;
