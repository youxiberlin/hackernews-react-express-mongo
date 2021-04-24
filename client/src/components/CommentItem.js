import { useState } from 'react';
import PostReply from './PostReply';

const CommentItem = ({ comment, story }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  return (
    <div className="my-3">
    <div>{comment.text}</div>
    {showReplyForm ? (
      <>
      <PostReply comment={comment} story={story} key={comment.id}/>
      <div onClick={() => setShowReplyForm(!showReplyForm)}>Hide</div>
      </>
     ) : null}
    {!showReplyForm ? (
      <button
        type="button"
        class="btn btn-light btn-sm"
        onClick={() => setShowReplyForm(!showReplyForm)}
      >
        Reply
      </button>
    ) : null}
  </div>
  );
};

export default CommentItem;
