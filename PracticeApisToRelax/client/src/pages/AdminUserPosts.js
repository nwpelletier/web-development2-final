import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function AdminUserPosts() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  let lengthData = 0;
  useEffect(() => {
    try {
      if (userId == 0) {
        navigate("/admin");
      } else {
        axios.get(BASE_API_URL + `/api/overview/${userId}`).then((response) => {
          lengthData = response.data.length;
          setPosts(response.data);
          setUsername(lengthData > 0 ? response.data[0].UserName : "");
          setLoading(false);
        });
      }
    } catch (error) {
      console.log("SHOW ERROR", error);
    }
  }, [userId]);


  const navAdmin = () => {
    navigate("/admin");
  }
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const userLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate(`/c/all`);
  };

  const navHome = () => {
    navigate(`/c/all`);
  };

  const token = localStorage.getItem("token");

  return (
    <>
      <div className="alert alert-info">
        <div className="row">
          <div className=" col-md-6 text-center pt-2">
          All Posts and Comments
            
          </div>

          <div className="col-md-4">
            <div className="d-flex justify-content-end">
              <button className="fs-6 btn float-end" onClick={userLogout}>
                {token ? "log out" : ""}
              </button>
              <button className="fs-6 btn float-end" onClick={navHome}>
                HOME
              </button>
            </div>
          </div>
        </div>
      </div>
    <div className="container">
      {lengthData < 0 ? (
        <p>Loading...</p>
      ) : username ? (
            <>
              <div className="row">
                <div className="col-md-12 text-center">
                <h1 className="bg-dark text-light">{username}'s Posts</h1>
                </div>
              </div>
          
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Active</th>
                <th>Locked</th>
                <th>Stickied</th>
                <th>Type</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post.id}>
                  <td>{post.isActive ? "Yes" : "No"}</td>
                  <td>{post.isLocked ? "Yes" : "No"}</td>
                  <td>{post.isStickied ? "Yes" : "No"}</td>
                  <td>{post.postType}</td>
                  <td>{post.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-md-6 mt-4">
              <div className="alert alert-danger">NO DATA to display</div>
            </div>
            <div className="col-md-6">
              <a role="button" className="alert alert-info" onClick={navAdmin}>back to admin page</a>
            </div>
          </div>
        </div>
      )}
    </div>
    
    
    </>
  );
}

export default AdminUserPosts;
