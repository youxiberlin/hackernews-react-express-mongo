import { useState } from 'react';
import backend from '../helper/backend';

const PostComment = ({ story }) => {
  const [text, setText] = useState('');
  
  const onSubmitHandler = async (e) => {
    const data = {
      by: null,
      id: Math.floor(Math.random() * 10000),
      storyId: +story.id,
      parent: +story.id,
      kids: [],
      time: Math.floor(Date.now() /1000),
      text,
      type: 'comment',
    }
    e.preventDefault();
    try {
      await backend({
        method: 'post',
        url: '/comment',
        data,
      });
      console.log('submit!', text);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div >
      <form onSubmit={onSubmitHandler}>
        <div>
          <label className="form-label">Comment</label>
        </div>
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Submit" 
        />
      </form>
    </div>
  );
};

export default PostComment;
