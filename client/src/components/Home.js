import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';
import StoryList from './StoryList';
import PostStory from './PostStory';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [dataFetching, setDataFetching] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setDataFetching(true);
        const { data } = await axios.get('http://localhost:8080/topStories');
        setStories(data.data);
        setDataFetching(false);
      } catch (e) {
        setDataFetching(false);
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
    ) : dataFetching ? (
      <Spinner />
    ) : (
      <PostStory />
    )
   );
};

export default Home;
