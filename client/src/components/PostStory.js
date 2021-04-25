import { useState } from 'react';
import backend from '../helper/backend';

const PostStory = () => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  
  const onSubmitHandler = async (e) => {
    const data = {
      by: null,
      descendants: 0,
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
