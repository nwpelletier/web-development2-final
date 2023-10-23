import React, { useEffect, useState, createContext } from "react";
import Navbar from "../components/Navbar/Navbar";
import UserNav from "../components/UserComponents/UserNavbar";
import RightNav from "../components/RightNav/RightNav";
import "../components/RightNav/RightNav.css";
import "./UserPage.css";

export const CrudditUserPageContext = createContext();

function UserPage() {
  const [userId, setUserId] = useState(0);
  const [isUserPage, setIsUserPage] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (token) {
      setUserId(storedUserId);
      setIsUserPage(true);
    }
  }, []);

  return (
    <CrudditUserPageContext.Provider value={isUserPage}>
      <div>
        <div className=""></div>
        {/* <div className="main-content"> */}
        <Navbar />
        <RightNav margin={"4.4rem"} loc={"user"} />
        <UserNav />
      </div>
      {/* </div> */}
    </CrudditUserPageContext.Provider>
  );
}

export default UserPage;
