import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import SubcrudditDisplay from './SubcrudditDisplay';
import PostDisplay from './PostDisplay';

function Main({ handle }) {
  const { postId } = useParams();
  const contentType = postId ? 'post' : 'subcruddit';
  console.log(contentType)

  return (
    <div>
      {contentType === 'subcruddit' ? (
        <SubcrudditDisplay subcrudditName={handle} />
      ) : (
        <PostDisplay postId={postId} />
      )}
    </div>
  );
}

export default Main;
