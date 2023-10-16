import Navbar from "../components/Navbar/Navbar";
import Main from "../components/Main/Main";
import RightNav from "../components/RightNav/RightNav";
import { SubcrudditContext } from "../App";
import { useParams } from "react-router-dom";


function SinglePost() {

  const { postId } = useParams();

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="App">
        <div className="row">
          <div className="col-11">
            <Main handle={postId}/>
          </div>
          <div className="col-1 right-nav-pin">
            <RightNav />
          </div>
        </div>      
      </div>
    </>
  );
}

export default SinglePost;
