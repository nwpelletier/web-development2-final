import React from "react";
import RightNavNotLoggedIn from "./RightNavNotLoggedIn";
import RNNotLoggedInPage from "./RNNotLoggedInPages";
function RightNav(params) {
  // console.log("RIGHTNAV MARGIN Value: ", params.margin);
  // console.log("RIGHTNAV LOC Value: ", params.loc);

  let rightNavComponent = null;
  if (params.loc === "home") {
    rightNavComponent = <RightNavNotLoggedIn />;
  } else if (params.loc === "sub") {
    rightNavComponent = <RNNotLoggedInPage />;
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
