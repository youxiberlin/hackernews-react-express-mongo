import { useState, useEffect } from 'react';
import axios from 'axios';

const PostStory = () => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  
  const onSubmitHandler = async (e) => {
    const data = {
      by: null,
      decendants: null,
      id: Math.floor(Math.random() * 10000),
      kids: [],
      score: 0,
      time: Math.floor(Date.now() /1000),
      title,
      type: 'story',
      url
    }
    e.preventDefault();
    try {
      const backend = axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 1000,
      });
      await backend({
        method: 'post',
        url: '/story',
        data,
      });
      console.log('submit!');
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="container">
      <form onSubmit={onSubmitHandler}>
      <label className="form-label">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="form-label">URL</label> 
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          type="submit"
          value="Submit" 
        />
      </form>
    </div>
  );
};

export default PostStory;
