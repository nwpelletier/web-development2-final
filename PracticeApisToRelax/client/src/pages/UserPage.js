import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import UserNav from "../components/UserComponents/UserNavbar";
import UserCommentsTab from '../components/UserComponents/UserCommentsTab';

function UserPage(id) {
  
  // if user logged in
  // userID = loggedinUserID
  // then userID = id

  return (
    <>
      <Navbar />

      <UserNav />

      
      
    </>
  );
}

export default UserPage;
