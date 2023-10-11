import React, { useState, useEffect } from "react";

function UserPage() {

  const data = [
    "overview",
    "comments",
    "submitted",
    "upvoted",
    "downvoted",
  ];

  return (
    <div className="sub-cruddit-list">
      <div className="orange-box"></div>
      <div className="subcruddit-links">    
      </div>
    </div>
  );
}

export default UserPage;
