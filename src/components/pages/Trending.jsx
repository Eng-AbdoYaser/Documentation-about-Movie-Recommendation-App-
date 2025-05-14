import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Trending({ trendingItems }) {
  const [myList, setMyList] = useState(() => {
    const savedList = localStorage.getItem('myList');
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(myList));
  }, [myList]);

  const toggleMyList = (item) => {
    const isInList = myList.some(listItem => listItem.id === item.id);
    if (isInList) {
      setMyList(prev => prev.filter(listItem => listItem.id !== item.id));
    } else {
      setMyList(prev => [...prev, {
        id: item.id,
        title: item.title || item.name,
        poster_path: item.poster_path,
        media_type: item.media_type || (item.title ? 'movie' : 'tv'),
        genre: 'Popular'
      }]);
    }
  };

  return (
    <div>
      <section className="movie-grid my-5 py-5">
        <div className="container">
          <h2 className="mb-4 text-white">Trending Now</h2>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-4">
            {trendingItems.map((item) => {
              const mediaType = item.media_type || (item.title ? 'movie' : 'tv');
              const isInList = myList.some(listItem => listItem.id === item.id);
              
              return (
                <div key={item.id} className="col">
                  <div className="movie-card-container h-100">
                    <div className="movie-card position-relative h-100">
                      <Link 
                        to={`/${mediaType}/${item.id}`}
                        className="h-100 d-block"
                      >
                        <img
                          src={item.poster_path 
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : '/placeholder-movie.jpg'}
                          className="img-fluid card-image h-100 w-100"
                          alt={item.title || item.name}
                          style={{ aspectRatio: '2/3' }}
                        />
                        <div className="card-overlay">
                          <h5>{item.title || item.name}</h5>
                          <div className="genre-tags">
                            <span>{mediaType === 'movie' ? 'Movie' : 'TV Show'}</span>
                          </div>
                          <button 
                            className={`btn netflix-add-btn ${isInList ? 'added' : ''}`}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleMyList(item);
                            }}
                          >
                            <i className="bi bi-plus-lg" /> 
                            {isInList ? ' Remove' : ' My List'}
                          </button>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Trending;