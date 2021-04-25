import { useState } from 'react';
import moment from 'moment';
import PostReply from './PostReply';
moment().format();

const Comment = ({ item, getKids, story }) => {
  const [showComment, setShowComment] = useState(true);
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <li className="mt-3 pl-0" key={item.id}>
      <div className="text-secondary d-flex flex-wrap justify-content-start align-items-center">
        <div onClick={() => setShowComment(!showComment)}>
          {showComment ? (
            <i className="fas fa-caret-down"></i>
          ) : (
            <i className="fas fa-caret-up"></i>
          )}
        </div>
        <div style={{ fontSize: 14 }} className="ml-2">
          {item.by}
        </div>
        <div style={{ fontSize: 14 }} className="ml-2">
          {moment(item.time * 1000).fromNow()}
        </div>
        {!showComment && item.kids ? (
          <div
            style={{ fontSize: 14 }}
            className="ml-2"
            onClick={() => setShowComment(!showComment)}
          >
            [...more]
          </div>
        ) : null}
      </div>
      <div dangerouslySetInnerHTML={{ __html: item.text }}></div>
      {showReplyForm ? (
        <>
        <PostReply comment={item} story={story} key={item.id}/>
        <div onClick={() => setShowReplyForm(!showReplyForm)}>Hide</div>
        </>
      ) : null}
      {!showReplyForm ? (
        <button
          type="button"
          className="btn btn-light btn-sm"
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          Reply
        </button>
      ) : null}
      {showComment ? (
        <ul style={{ listStyleType: "none" }}>
          {getKids(item)}
        </ul>
      ) : null}
    </li>
)};

export default Comment;
