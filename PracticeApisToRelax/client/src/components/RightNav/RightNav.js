import React from "react";
import RightNavNotLoggedIn from './RightNavNotLoggedIn';
import RNNotLoggedInPage from './RNNotLoggedInPages';
function RightNav() {
  //console.log("RIGHTNAV POSITION: ",margin.margin)
  return (
    <>
      {/* 
          cases 
          - user not logged in/registered @home page (RightNavNotLoggedIn)
          - user not logged in/registered @other pages (RightNavNotLoggedIn + wiki)
          - user is logged in @user page (RightNavUserPage)
          - user is logged in @other page (RightNavSubcruddit)
      */}
    
    {/* <RightNavNotLoggedIn /> */}
    <RNNotLoggedInPage />
    
    </>
  );
}

export default RightNav;
