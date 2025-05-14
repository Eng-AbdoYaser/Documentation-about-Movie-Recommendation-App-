import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlay, FaPlus } from 'react-icons/fa';

function DetailsPage() {
  const { mediaType, id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');
  const apiKey = '12750e83790c14a1a9c1acd50ff6bf8a';

  const [myList, setMyList] = useState(() => {
    const savedList = localStorage.getItem('myList');
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(myList));
  }, [myList]);

  const toggleMyList = () => {
    if (!details) return;

    const isInList = myList.some(item => item.id === details.id);
    if (isInList) {
      setMyList(prev => prev.filter(item => item.id !== details.id));
    } else {
      setMyList(prev => [...prev, {
        id: details.id,
        title: details.title || details.name,
        poster_path: details.poster_path,
        media_type: mediaType,
        genre: details.genres?.[0]?.name || 'Unknown'
      }]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailsResponse = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}&language=en-US`
        );
        const detailsData = await detailsResponse.json();
        setDetails(detailsData);

        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${apiKey}`
        );
        const creditsData = await creditsResponse.json();
        setCredits(creditsData);

        const videosResponse = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${apiKey}`
        );
        const videosData = await videosResponse.json();
        const trailer = videosData.results?.find(
          v => v.type === 'Trailer' && v.site === 'YouTube'
        );
        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/');
      }
    };

    fetchData();
  }, [mediaType, id, navigate]);

  if (!details) return <div className="container py-5 text-white">Loading...</div>;

  const isInList = myList.some(item => item.id === details.id);

  return (
    <div className="details-page">
      <section className="details-hero mb-5">
        <div className="container-fluid position-relative">
          <img
            src={`https://image.tmdb.org/t/p/w1280${details.backdrop_path}`}
            alt={details.title || details.name}
            className="img-fluid hero-background"
          />
          <div className="hero-overlay" />
          
          <div className="hero-content position-relative text-white py-5">
            <h1 className="display-4 fw-bold mb-3">{details.title || details.name}</h1>
            
            <div className="d-flex gap-3 mb-4">
              {details.genres?.map(genre => (
                <span key={genre.id} className="badge bg-netflix-red">{genre.name}</span>
              ))}
            </div>

            <p className="lead mb-4">{details.overview}</p>
            
            <div className="d-flex gap-3">
              {trailerUrl && (
                <a
                  href={trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-lg netflix-play-btn"
                >
                  <FaPlay className="me-2" /> Watch Trailer
                </a>
              )}
              <button 
                className={`btn btn-lg netflix-info-btn ${isInList ? 'added' : ''}`}
                onClick={toggleMyList}
              >
                <FaPlus className="me-2" /> 
                {isInList ? ' Remove from My List' : ' Add to My List'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5 text-white">
        <div className="row">
          <div className="col-md-8">
            <h2 className="mb-4">Details</h2>
            <p className="text-muted">Release Date: {details.release_date || details.first_air_date}</p>
            <p className="text-muted">Rating: {details.vote_average}/10</p>
            <p>{details.overview}</p>
          </div>

          <div className="col-md-4">
            <h3 className="mb-4">Cast</h3>
            <div className="cast-grid">
              {credits?.cast?.slice(0, 6).map(actor => (
                <div key={actor.id} className="cast-member">
                  {actor.profile_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      className="img-fluid rounded mb-2"
                    />
                  )}
                  <p className="mb-0">{actor.name}</p>
                  <small className="text-muted">{actor.character}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetailsPage;