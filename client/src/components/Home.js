import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import StoryList from './StoryList';
import PostStory from './PostStory';
import Login from './Login';
import useToken from './useToken';
import backend from '../helper/backend';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [dataFetching, setDataFetching] = useState(false);
  const { token, setToken } = useToken();

  useEffect(() => {
    (async () => {
      try {
        setDataFetching(true);
        const { data } = await backend.get('/topStories');
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
        {!token ? (
          <Login setToken={setToken}/>
        ) : null}
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
