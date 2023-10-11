import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

function UserCommentsTab() {
  let { id } = useParams();
  const [comments, setComments] = useState([]);
  id = 1;
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8080/api/posts/${id}/comments`)
        .then((response) => {
          setComments(response.data);
        });
    } catch (error) {
      
    }
  },[]);

  // Sample comments data to test
  const userComments = [
    {
      text: "This is the first comment.",
    },
    {
      text: "Another comment by the user.",
    },
      ];

  return (
    <div className="container mt-3">
      <ul className="list-group">
        {comments.map((comment, index) => (
          <li key={index} className="list-group-item col-md-8 mb-3 border rounded p-3 shadow">
            <div className="">
              {comment.title}
            </div>
            <div className="">
              {comment.caption}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserCommentsTab;
