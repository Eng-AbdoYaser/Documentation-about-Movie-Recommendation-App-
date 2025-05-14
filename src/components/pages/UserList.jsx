import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../MyStyles/UserList.css'

function UserList() {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const savedList = localStorage.getItem('myList');
    if (savedList) {
      setMyList(JSON.parse(savedList));
    }
  }, []);

  const removeFromList = (itemId) => {
    const updatedList = myList.filter(item => item.id !== itemId);
    setMyList(updatedList);
    localStorage.setItem('myList', JSON.stringify(updatedList));
  };

  return (
    <div className="container py-5 my-5">
      <h1 className="text-white mb-4">My List</h1>
      
      {myList.length > 0 ? (
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-4">
          {myList.map((item) => (
            <div key={item.id} className="col">
              <div className="movie-card-container h-100">
                <div className="movie-card position-relative h-100">
                  <Link 
                    to={`/${item.media_type}/${item.id}`}
                    className="h-100 d-block"
                  >
                    <img
                      src={item.poster_path 
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : '/placeholder-movie.jpg'}
                      className="img-fluid card-image h-100 w-100"
                      alt={item.title}
                      style={{ aspectRatio: '2/3' }}
                    />
                    <div className="card-overlay">
                      <h5>{item.title}</h5>
                      <div className="genre-tags">
                        <span>{item.genre}</span>
                      </div>
                      <button 
                        className="btn netflix-add-btn added"
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromList(item.id);
                        }}
                      >
                        <i className="bi bi-dash-lg" /> Remove
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <h3 className="text-white mb-3">Your list is empty</h3>
          <p className="text-muted">
            Add movies and TV shows to your list by clicking the "My List" button
          </p>
          <Link to="/home" className="btn netflix-play-btn mt-3">
            Browse Content
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserList;