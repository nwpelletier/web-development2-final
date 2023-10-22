import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import RightNavNotLoggedIn from "./RightNavNotLoggedIn";
import { useLocation, useNavigate } from "react-router-dom";
import { ModContext } from '../../pages/Subcruddit';
import { SubCrudditContext } from "../../pages/Subcruddit";
import { BASE_API_URL } from "../../utils/constant";


function RNNotLoggedInPages(margin) {
  const [isMod, setIsMod] = useContext(ModContext);
  const [usernames, setUsernames] = useState([]);
  const [subcrudName, setSubcrudName] = useContext(SubCrudditContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Get list of mods! (Axios + filter by subcrudName)
  useEffect(() => {
    const getModList = async () => {
      try {
        const response = await axios.get(BASE_API_URL + '/api/moderators');
        if (response && response.data && Array.isArray(response.data.all)) {
          const filteredData = response.data.all.filter(
            item => item.Subcruddit && item.Subcruddit.subcrudditName === subcrudName
          );
          const usernames = filteredData.map(item => item.User.username);
          setUsernames(usernames);
        } else {
          console.error('Invalid response format');
        }
      } catch (error) {
        console.error('Error finding moderator data', error);
      }
    };
    getModList();
  }, []);


  //console.log("RIGHTNAV POSITION: ",margin.margin)
  const currentPath = useLocation().pathname.split("/")[2];
  const rules = [
    "Friendly discussion only - this is a positive forum",
    "Do not post harmful information - it's bad",
    "Be a decent person - not an indecent person",
    "Low effort posts are encouraged - just check /c/dogs",
    "Login credentials are confidential - don't share your info",
    "Be polite - we all want to get along with one another",
    " - Lourem Epsidom",
  ];

  return (
    <>
      <div id="right-panel-rnnot" style={{ marginTop: margin.margin }}>
        <div className="text-center right-nav-create-submit mt-3">
          <p className="mt-3 " onClick={() => navigate(`/post/text/${subcrudName}`)}>
            Submit a post
          </p>
        </div>
        {(location.pathname.includes('/c/all') || location.pathname.includes('/userpage')) && (
        <div className="text-center right-nav-create-submit mt-3">
          <p className="mt-3 " onClick={() => navigate(`/c/new`)}>
            Create a subcruddit
          </p>
        </div>
        )}
        <p>
          <strong className="right-nav-subcruddit-name"> /c/{currentPath} </strong>
        </p>
        <p><small className="text-danger">Please read our rules in their entirety before participating.</small></p>
        <div className="rules-box">
          {rules.map((rule, index) => (
            <ul className="right-nav-rules" key={index}>
              <div>{rule}</div>
            </ul>
          ))}
        </div>
        <div className="right-nav-mod-list align-items-center">
          {usernames.length > 0 && <p>====MODERATORS====</p>}
          {usernames.length > 0 && (
            <div className="right-nav-mod-container col-5">
              <ul>
                {usernames.map((username, index) => (
                  <li key={index}>{username}</li>
                ))}
              </ul>

            </div>
          )}
          {usernames.length > 0 && <p>==================</p>}
        </div>
      </div>
    </>
  );
}

export default RNNotLoggedInPages;
