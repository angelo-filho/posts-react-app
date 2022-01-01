import { useCallback, useEffect, useState } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(2);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage > allPosts.length - 1;
  const filteredPosts = searchValue
    ? posts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()))
    : posts;

  const loadPostsData = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    const load = async (posts, postsPerPage) => await loadPostsData(posts, postsPerPage);

    load(0, postsPerPage);

    console.log('Once');
  }, [loadPostsData, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setSearchValue(value);
  };

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>Search value: {searchValue}</h1>}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>
      {filteredPosts.length > 0 ? <Posts posts={filteredPosts} /> : <p>Não existem posts =(</p>}

      <div className="button-container">
        {!searchValue && <Button disabled={noMorePosts} text="Load more posts" onClick={loadMorePosts} />}
      </div>
    </section>
  );
};

export default Home;
