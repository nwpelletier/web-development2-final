// import React, { useState } from "react";
// import Navbar from "../components/Navbar/Navbar";
// import UserNav from "../components/UserComponents/UserNavbar";
// import RightNav from "../components/RightNav/RightNav";
// import "../components/RightNav/RightNav.css"
// function UserPage(id) {


//   return (
//     <>

//       <RightNav />

//       <Navbar />

//       <UserNav />

      
      
//     </>
//   );
// }

// export default UserPage;


// UserPage.js
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import UserNav from "../components/UserComponents/UserNavbar";
import RightPanel from "../components/RightNav/RightNav"; 
import "../components/RightNav/RightNav.css"

function UserPage(id) {
  return (
    <>
      <div >
      <RightPanel /> 
        {/* <div className="main-content"> */}
          <Navbar />
          <UserNav />
        </div>
      {/* </div> */}
    </>
  );
}

export default UserPage;

