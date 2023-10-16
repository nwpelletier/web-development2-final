import React, { useEffect, useState } from "react";
import axios from "axios";

function UserOverview() {

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8080/api/posts/posts/new`)
        .then((response) => {
          setPosts(response.data);
        });
    } catch (error) {
      
    }
  },[]);

  return (
    <div className="container mt-3">
      <ul className="list-group">
        {posts.map((post, index) => (
          <li key={index} className="list-group-item col-md-8 mb-3 border rounded p-3 shadow">
            <div className="">
              {post.title}
            </div>
            <div className="">
              {post.caption}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserOverview;
