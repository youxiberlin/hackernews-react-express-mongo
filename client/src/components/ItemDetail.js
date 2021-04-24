import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';
import StoryItem from './StoryItem';
import PostComment from './PostComment';
import CommentItem from './CommentItem';

const ItemDetail = () => {
  let { itemId } = useParams();
  const [story, setStory] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const getStory = async (id) => {
      try {
        const { data } = await axios.get(`http://localhost:8080/story/${id}`);
        setStory(data.data);
      } catch (e) {
        console.log(e);
        setStory(story);
      }
    };
    getStory(itemId);
  }, []);

  useEffect(() => {
    if (story) {
      const getCommentsTree = async (parent) => {
        try {
          const { data } = await axios.get(`http://localhost:8080/topComments/${story.id}`);;
          setComments(data.data);
        } catch (e) {
          console.log(e);
          setComments(comments);
        }
      };

      getCommentsTree(story);
    }
  }, [story]);

  return (
    comments ? (
        <div className="container bg-light py-3">
          <div className="pl-md-4">
            {story ? <StoryItem story={story} pageType="comments" /> : null}
          </div>
          <PostComment story={story} />
          {comments.map((comment) => (
            <CommentItem comment={comment} story={story}/>
          ))}
        </div>
      ) : <Spinner />
  );
};

export default ItemDetail;
