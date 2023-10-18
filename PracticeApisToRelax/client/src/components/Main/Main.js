import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import SubcrudditDisplay from './SubcrudditDisplay';
import PostDisplay from './PostDisplay';

export const ContentTypeContext = React.createContext();

function Main({ handle, sortingType }) {
  const { postId } = useParams();
  const contentType = postId ? 'post' : 'subcruddit';
  return (
    <ContentTypeContext.Provider value={contentType}>
      <div>
        {contentType === 'subcruddit' ? (
          <SubcrudditDisplay subcrudditName={handle} sortingType={sortingType} />
        ) : (
          <PostDisplay postId={postId} />
        )}
      </div>
    </ContentTypeContext.Provider>
  );
}

export default Main;
