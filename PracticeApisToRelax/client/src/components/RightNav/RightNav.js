import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import RightNavNotLoggedIn from './RightNavNotLoggedIn'
function RightNav() {
  //console.log("RIGHTNAV POSITION: ",margin.margin)
  return (
    <>
      {/* 
          cases 
          - user not logged in/registered @home page (RightNavNotLoggedIn)
          - user not logged in/registered @other pages (RightNavNotLoggedIn + wiki)
          - user is logged in @user page (RightNavUserPage)
          - user is logged in @user page (RightNavSubcruddit)
      */}
    
    <RightNavNotLoggedIn />
    
    </>
  );
}

export default RightNav;
