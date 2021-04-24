import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';
import StoryList from './StoryList';
import PostStory from './PostStory';
import getTopStories from '../helper/getTopStories';

const Home = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        // const data = await getTopStories(0);
        const { data } = await axios.get('http://localhost:8080/topStories');
        setStories(data.data);
      } catch (e) {
        console.log(e);
        setStories(stories);
      }
    })();
  }, []);

  return (
    stories.length ? (
      <div className="container bg-light py-3">
        <PostStory />
        <StoryList stories={stories} pageType="home" />
        <div>
          <Link to='news/1'>More</Link>
        </div>
      </div>
    ) : <Spinner />
   );
};

export default Home;
