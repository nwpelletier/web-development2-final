import React from "react";

function UserCommentsTab() {
  // Sample comments data
  const userComments = [
    {
      text: "This is the first comment.",
    },
    {
      text: "Another comment by the user.",
    },
    // Add more comments here
  ];

  return (
    <div className="container mt-3">
      <ul className="list-group">
        {userComments.map((comment, index) => (
          <li key={index} className="list-group-item col-md-8 mb-3 border rounded p-3 shadow">
            <div className="">
              {comment.text}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserCommentsTab;
