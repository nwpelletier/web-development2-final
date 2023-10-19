import React from "react";
import RightNavNotLoggedIn from "./RightNavNotLoggedIn";
import { useLocation } from "react-router-dom";

function RNNotLoggedInPages(margin) {
  //console.log("RIGHTNAV POSITION: ",margin.margin)
  const currentPath = useLocation().pathname.split("/")[2];
  const rules = [
    "Lourem Epsidom",
    "Lourem Epsidom",
    "Lourem Epsidom",
    "Lourem Epsidom",
    "Log in",
    "Be polite",
    "Use pics only",
    "Lourem Epsidom",
  ];

  return (
    <>
      <div className="right-panel" style={{ marginTop: margin.margin }}>
        <RightNavNotLoggedIn />
        <p>
          <strong> {currentPath} </strong>
              </p>
              <p><small className="text-primary">Please read our rules in their entirety before participating.</small></p>
              <div className="border border-dark alert alert-danger">
                  
                  {rules.map((rule, index) => (
                      
                      <ul className="">
                          <li key={index}>{rule}</li>
                      </ul>


                  ))};
                  

              </div>
      </div>
    </>
  );
}

export default RNNotLoggedInPages;
