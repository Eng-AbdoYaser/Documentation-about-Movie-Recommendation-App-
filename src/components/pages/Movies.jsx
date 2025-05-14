import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Movies({ movies }) {
  const [featuredItem, setFeaturedItem] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');
  const apiKey = '12750e83790c14a1a9c1acd50ff6bf8a';

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
        media_type: item.media_type || 'movie',
        genre: getGenreName(item.genre_ids?.[0])
      }]);
    }
  };

  useEffect(() => {
    if (movies.length > 0 && !featuredItem) {
      const randomItem = movies[Math.floor(Math.random() * movies.length)];
      setFeaturedItem(randomItem);

      const mediaType = randomItem.media_type || 'movie';
      fetch(`https://api.themoviedb.org/3/${mediaType}/${randomItem.id}/videos?api_key=${apiKey}`)
        .then(res => res.json())
        .then(data => {
          const trailer = data.results?.find(v => 
            v.type === 'Trailer' && 
            v.site === 'YouTube' &&
            v.official
          );
          if (trailer) setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        })
        .catch(error => console.error('Trailer fetch error:', error));
    }
  }, [movies]);

  return (
    <div>
      {featuredItem && (
        <section className="featured-movie">
          <div className="container-fluid">
            <div className="row featured-card">
              <div className="col-12 position-relative">
                <img
                  src={`https://image.tmdb.org/t/p/w1280${featuredItem.backdrop_path}`}
                  className="img-fluid featured-background"
                  alt={`Featured ${featuredItem.title}`}
                />
                <div className="featured-overlay" />
                <div className="featured-content">
                  <h2 className="display-4 fw-bold mb-3">
                    {featuredItem.title}
                  </h2>
                  <p className="lead featured-description">
                    {featuredItem.release_date?.substring(0, 4)}
                  </p>
                  <div className="d-flex gap-3">
                    <button 
                      className="btn btn-lg netflix-play-btn"
                      onClick={() => trailerUrl && window.open(trailerUrl, '_blank')}
                    >
                      <i className="bi bi-play-fill" /> Play Now
                    </button>
                    <Link
                      to={`/${featuredItem.media_type || 'movie'}/${featuredItem.id}`}
                      className="btn btn-lg netflix-info-btn"
                    >
                      <i className="bi bi-info-circle" /> More Info
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="movie-grid py-5">
        <div className="container">
          <h2 className="mb-4 text-white">All Movies</h2>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-4">
            {movies
              .filter(movie => featuredItem?.id !== movie.id)
              .map((movie) => {
                const isInList = myList.some(listItem => listItem.id === movie.id);
                return (
                  <div key={movie.id} className="col">
                    <div className="movie-card-container h-100">
                      <Link 
                        to={`/movie/${movie.id}`}
                        className="movie-card h-100 d-block"
                      >
                        <div className="position-relative">
                          <img
                            src={movie.poster_path 
                              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                              : '/placeholder-movie.jpg'}
                            className="img-fluid card-image w-100"
                            alt={movie.title}
                            style={{ aspectRatio: '2/3' }}
                          />
                          <div className="card-overlay">
                            <h5 className="mb-2">{movie.title}</h5>
                            <div className="genre-tags d-flex gap-1 mb-2">
                              {movie.genre_ids?.slice(0, 2).map(genreId => (
                                <span key={genreId} className="badge bg-netflix-red">
                                  {getGenreName(genreId)}
                                </span>
                              ))}
                            </div>
                            <button 
                              className={`btn netflix-add-btn w-100 ${isInList ? 'added' : ''}`}
                              onClick={(e) => {
                                e.preventDefault();
                                toggleMyList(movie);
                              }}
                            >
                              <i className="bi bi-plus-lg" /> 
                              {isInList ? ' Remove' : ' My List'}
                            </button>
                          </div>
                        </div>
                      </Link>
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

function getGenreName(genreId) {
  const genreMap = {
    28: "Action", 
    12: "Adventure", 
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
  };
  return genreMap[genreId] || 'Movie';
}

export default Movies;