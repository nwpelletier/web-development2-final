import Navbar from "../components/Navbar/Navbar";
import Main from "../components/Main/Main";
import RightNav from "../components/RightNav/RightNav";
import { SubcrudditContext } from "../App";
import { useParams } from "react-router-dom";

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
            <RightNav />
          </div>
        </div>
      </div>
    </>
  );
}

export default Subcruddit;
