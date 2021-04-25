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
    <form
      className="m-3 d-flex flex-column"
      onSubmit={onSubmitHandler}
    >
      <label>
        <p>Title</p>
        <input
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        <p>URL</p>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default PostStory;
