import Navbar from "../components/Navbar/Navbar";
import Main from "../components/Main/Main";
import RightNav from "../components/RightNav/RightNav";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from 'react';

function Subcruddit() {

  const { handle, sortingType } = useParams();


  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="App">
        <div className="row">
          <div className="col-11">
            <Main handle={handle} sortingType={sortingType} />
          </div>
          <div className="col-1 right-nav-pin">
            {/* ToDo: Props/params to get proper rightNav still needed */}
            <RightNav margin={"0.1rem"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Subcruddit;
