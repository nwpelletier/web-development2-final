import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SubcrudditDisplay from './SubcrudditDisplay';
import PostDisplay from './PostDisplay';

export const ContentTypeContext = React.createContext();

function Main({ handle }) {
  const { postId } = useParams();
  const contentType = postId ? 'post' : 'subcruddit';
  return (
    <ContentTypeContext.Provider value={contentType}>
      <div>
        {contentType === 'subcruddit' ? (
          <SubcrudditDisplay subcrudditName={handle} />
        ) : (
          <PostDisplay postId={postId} />
        )}
      </div>
    </ContentTypeContext.Provider>
  );
}

export default Main;
