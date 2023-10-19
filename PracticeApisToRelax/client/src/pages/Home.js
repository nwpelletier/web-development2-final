import Navbar from "../components/Navbar/Navbar";
import Main from "../components/Main/Main";
import RightNav from "../components/RightNav/RightNav";

function Home() {

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="App">
        <div className="row">
          <div className="col-11">
            <Main />
          </div>
          <div className="col-1 right-nav-pin">
            <RightNav margin={"0.1rem"} loc={"home"} />
          </div>
        </div>      
      </div>
    </>
  );
}

export default Home;
