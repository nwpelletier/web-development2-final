import React, { useState, useContext } from "react";
import RightNavNotLoggedIn from "./RightNavNotLoggedIn";
import RNNotLoggedInPage from "./RNNotLoggedInPages";
import RightNavLoggedIn from "./RightNavLoggedIn";
function RightNav(params) {


  // console.log("RIGHTNAV MARGIN Value: ", params.margin);
  // console.log("RIGHTNAV LOC Value: ", params.loc);


  // Right panel will display based on the pages 
  // when calling the RightPanel(RightNav) we need to include (home, sub) as parameter(params.loc) to be displayed correctly
  // the other parameter(params.margin) is for the margin-top val for right panel
  // Verifying mod status!

  let rightNavComponent = null;
  if (params.loc === "home") {
    rightNavComponent = <RightNavNotLoggedIn />;
  } else if (params.loc === "sub") {
    rightNavComponent = <RNNotLoggedInPage />;
  } else if (params.loc === "user") {
    rightNavComponent = <RightNavLoggedIn />;
  }

  return (
    <>
      {/* 
          cases 
          - user not logged in/registered @home page (RightNavNotLoggedIn)
          - user not logged in/registered @other pages (RightNavNotLoggedIn + wiki)
          - user is logged in @user page (RightNavUserPage)
          - user is logged in @other page (RightNavSubcruddit)
      */}
      <div className="right-panel" style={{ marginTop: params.margin }}>
        {rightNavComponent}
      </div>
    </>
  );
}

export default RightNav;
