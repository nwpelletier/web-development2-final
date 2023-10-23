import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../utils/constant";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState([]);
  const [error, setError] = useState(null);

  // fetch all users
  useEffect(() => {
    axios
      .get(BASE_API_URL + `/api/admin`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response);
        } else {
          setError("Unknown error occurred.");
        }
      });
  }, []);

  const handleActive = (userId) => {
    axios
      .patch(BASE_API_URL + `/api/admin/active/${userId}`)
      .then((response) => {
        // Update the active status in the local state
        const updatedUsers = users.map((user) => {
          if (user.id === userId) {
            // Toggle the active status
            user.isActive = !user.isActive;
          }
          return user;
        });
        setUsers(updatedUsers);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response);
        } else {
          setError("Unknown error occurred.");
        }
      });
  };

  const [userId, setUserId] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("user");

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const storedUserId = localStorage.getItem("userId");
      if (token) {
        setUserId(storedUserId);
        // console.log("USER ADMIN PAGE: ", BASE_API_URL + `/api/admin/${storedUserId}`);
        // console.log("USER ADMIN PAGE: ",userId);
        axios
          .get(BASE_API_URL + `/api/admin/${storedUserId}`)
          .then((response) => {
            //console.log("USER ADMIN PAGE: ", response.data);
            setRole(response.data.role);
            setUsername(response.data.username);
          });
      } else {
        console.log("USER ADMIN PAGE: NO DATA");
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  }, []);

  const handleRole = async (userId) => {
    axios
    .patch(BASE_API_URL + `/api/admin/role/${userId}`)
    .then((response) => {
      // Update the active status in the local state
      const updatedUsers = users.map((user) => {
        if (user.id === userId) {
          // Toggle the active status
          user.role = user.role === "admin" ? "user" : "admin";
        }
        return user;
      });
      setUserRole(updatedUsers);
    })
    .catch((error) => {
      if (error.response) {
        setError(error.response);
      } else {
        setError("Unknown error occurred.");
      }
    });
  };

  return (
    <>
      <div className="alert alert-info">Admin Page --- <strong className="fs-4">{ username }</strong></div>
      <div className="container-fluid">
        {role !== "admin" ? (
          <>
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <strong>Access Denied</strong>
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </>
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-8">
              <table className="table table-responsive table-hover table-light">
                <thead className="thead-dark">
                  <tr className="col-md-8">
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
                    <tr className="justify-content-center" key={user.id}>
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
                          <div className="col-md-6  d-flex justify-content-center">
                            <button
                              className={user.isActive ? "btn btn-success": "btn btn-danger"}
                              onClick={() => handleActive(user.id)}
                            >
                              {user.isActive ? "Delete" : "Restore"}
                            </button>
                          </div>

                          <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                            <button
                              className={
                                user.role === "admin"
                                  ? "btn btn-info"
                                  : "btn btn-warning"
                              }
                              onClick={() => handleRole(user.id)}
                            >
                              {" "}
                              {user.role === "admin" ? "User" : "Admin"}
                            </button>
                          </div>

                          {/* <div className="col-md-4 d-flex justify-content-center">
                            <button className="btn btn-danger">Delete</button>
                          </div> */}
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
