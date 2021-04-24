import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';
import StoryItem from './StoryItem';
import CommentList from './CommentList';
import PostComment from './PostComment';
import makeCommentsTree from '../helper/makeCommentsTree';

const ItemDetail = () => {
  let { itemId } = useParams();
  const [story, setStory] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const getStory = async (id) => {
      try {
        const { data } = await axios.get(`http://localhost:8080/story/${itemId}`);
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
          const commentsTree = await makeCommentsTree(parent);
          setComments(commentsTree);
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
            <StoryItem story={story} pageType="comments" />
          </div>
          <PostComment story={story} />
          <CommentList comments={comments} />
        </div>
      ) : <Spinner />
  );
};

export default ItemDetail;
