import React ,{useEffect,useState} from "react";
import Navbar from "../components/Navbar/Navbar";
import UserNav from "../components/UserComponents/UserNavbar";
import RightNav from "../components/RightNav/RightNav";
import "../components/RightNav/RightNav.css";
import "./UserPage.css";

function UserPage() {

  const [userId, setUserId] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (token) {
      setUserId(storedUserId);
    }
  }, []);
  return (
    <>
      <div>
        <div className="">
         
        </div>
        {/* <div className="main-content"> */}
        <Navbar />
        <RightNav margin={"4.4rem"} loc={"user"} />
        <UserNav/>
      </div>
      {/* </div> */}
    </>
  );
}

export default UserPage;
