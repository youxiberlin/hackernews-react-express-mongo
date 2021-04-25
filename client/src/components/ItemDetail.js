import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';
import StoryItem from './StoryItem';
import PostComment from './PostComment';
import CommentsList from './CommentsList';
import backend from '../helper/backend';

const ItemDetail = () => {
  let { itemId } = useParams();
  const [story, setStory] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const getStory = async (id) => {
      try {
        const { data } = await backend.get(`/story/${id}`);
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
      const getComments = async (story) => {
        try {
          const { data } = await backend.get(`/comments/${story.id}`);
          const comments = data.data;
          setComments(comments);
        } catch (e) {
          console.log(e);
          setComments(comments);
        }
      };

      getComments(story);
    }
  }, [story]);

  return (
    comments ? (
        <div className="container bg-light py-3">
          <div className="pl-md-4">
            {story ? <StoryItem story={story} pageType="comments" /> : null}
          </div>
          <PostComment story={story} />
          <CommentsList comments={comments} story={story} />
        </div>
      ) : <Spinner />
  );
};

export default ItemDetail;
