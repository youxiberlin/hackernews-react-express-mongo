import { useState, useEffect } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import Spinner from './Spinner';
import StoryList from './StoryList';
import backend from '../helper/backend';

const News = () => {
  let { pageId } = useParams();
  const [page, setPage] = useState(pageId);
  const [stories, setStories] = useState([]);
  const [totalPage, setTotalPage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await backend.get('/topStories');
        setStories(data.data);
      } catch (e) {
        console.log(e);
        setStories(stories);
      }
    })();
    return () => setStories([]);
  }, [page]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await backend.get('/topStories');
        setTotalPage(Math.ceil(data.data.length / 30));
      } catch (e) {
        console.log(e);
        setTotalPage(totalPage);
      }
    })();
    return () => setTotalPage(totalPage);
  }, []);

  return (
    stories.length ? (
      <div className="container bg-light">
        <StoryList stories={stories} pageType="news" page={page}/>
        {stories.length === 30 ? (
          <div onClick={() => setPage(+pageId + 1)}>
            <Link to={`${page}`}>
              <Redirect push to={`../news/${page}`} />
              More
            </Link>
          </div>
        ) : null}
      </div>
    ) : (+pageId < totalPage || !totalPage) ?
       <Spinner /> : (
        <div className="text-center text-secondary py-5" style={{ fontSize: 36 }}>
          No content exists
        </div>
      )
  );
};

export default News;
