import React from 'react';
import PostItem from './PostItem';
import PostForm from './PostForm';

function Posts() {
  return (
    <div className='container'>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Ask Your Fellow Teachers A Question
      </p>
      <PostForm />
      <div className='posts'>
        <PostItem />
      </div>
    </div>
  );
}

export default Posts;