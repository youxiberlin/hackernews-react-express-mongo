import { useState } from 'react';
import backend from '../helper/backend';

const PostReply = ({ comment, story }) => {
  const [text, setText] = useState('');
  
  const onSubmitHandler = async (e) => {
    const data = {
      by: null,
      id: Math.floor(Math.random() * 10000),
      parent: +comment.id,
      storyId: +story.id,
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
    <div className="m-3">
      <form onSubmit={onSubmitHandler}>
        <div>
          <label className="form-label">Reply</label>
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

export default PostReply;
