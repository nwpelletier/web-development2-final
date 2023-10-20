import Navbar from "../components/Navbar/Navbar";
import Main from "../components/Main/Main";
import RightNav from "../components/RightNav/RightNav";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { BASE_API_URL } from "../utils/constant";

export const ModContext = React.createContext();

function Subcruddit() {

  const { handle, sortingType } = useParams();

  // Moderator status (useContext in SubcrudditDisplay and RightNav)
  const [isMod, setIsMod] = useState([]);
  useEffect(() => {
    const getModStatus = async () => {
      try {
        if (handle === 'all') {
          return;
        } else {
          const userId = localStorage.getItem('userId');
          const response = await axios.get(
            BASE_API_URL + `/api/moderators/ismod/${handle}`, {
              headers: {
                'x-access-token' : localStorage.getItem('token')
              }
            }
          );
          const isMod = response.data;
          setIsMod(isMod);

        }
      } catch (error) {
        console.log('Error fetching moderators:', error);
      }
    };

    getModStatus();
  }, [handle]);


  return (
    <>
      <ModContext.Provider value={[isMod, setIsMod]}>
        <div>
          <Navbar />
        </div>
        <div className="App">
          <div className="row">
            <div className="col-11">
              <Main handle={handle} sortingType={sortingType} />
            </div>
            <div className="col-1 right-nav-pin">
              {/* ToDo: Props/params to get proper rightNav still needed */}
              <RightNav margin={"0.1rem"} loc={"sub"} />
            </div>
          </div>
        </div>
      </ModContext.Provider>
    </>
  );
}

export default Subcruddit;
