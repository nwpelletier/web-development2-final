import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../utils/constant";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(BASE_API_URL + `/ap/admin`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data);
          console.log("ERROR ADMIN",error.response)
        } else {
          setError("Unknown error occurred.");
        }
      });
  }, []);

  return (
    <>
      <div className="container-fluid">
        {error ? ( 
          <>
             {error}
          </>
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-8">
              <table className="table table-hover table-light">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">USERNAME</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">ACTIVE</th>
                    <th scope="col">ROLE</th>
                    <th scope="col" className="justify-content-center d-flex">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      className="justify-content-center"
                      onClick={() => console.log("USERID: ", user.id)}
                    >
                      <th scope="row">{index + 1}</th>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td
                        className={
                          user.isActive ? "text-success" : "text-danger"
                        }
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </td>
                      <td>{user.role}</td>
                      <td>
                        <div className="row">
                          <div className="col-md-6 d-flex justify-content-center">
                            <button className="btn btn-danger">Delete</button>
                          </div>

                          <div className="col-md-6 d-flex justify-content-center">
                            <button className="btn btn-success">
                              {user.isActive ? "Inactive" : "Active"}
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminPage;
