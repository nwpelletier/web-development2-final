import React from "react";
import RightNavNotLoggedIn from './RightNavNotLoggedIn';
import RNNotLoggedInPage from './RNNotLoggedInPages';
function RightNav(margin) {


  console.log("RIGHTNAV MARGIN Value: ",margin)
  return (
    <>
      {/* 
          cases 
          - user not logged in/registered @home page (RightNavNotLoggedIn)
          - user not logged in/registered @other pages (RightNavNotLoggedIn + wiki)
          - user is logged in @user page (RightNavUserPage)
          - user is logged in @other page (RightNavSubcruddit)
      */}
    <div className="right-panel" style={{ marginTop: margin.margin }}>
    {/* <RightNavNotLoggedIn /> */}
        <RNNotLoggedInPage margin={margin} />
        {/* <p> RIGHTNAV MARGIN Value: {margin.margin}</p> */}
    </div>
    </>
  );
}

export default RightNav;
