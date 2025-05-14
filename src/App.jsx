import { useCallback, useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./components/pages/Register.jsx";
import Login from "./components/pages/Login.jsx";
import Movies from "./components/pages/Movies.jsx";
import Home from './components/pages/Home.jsx';
import Trending from "./components/pages/Trending.jsx";
import UserList from "./components/pages/UserList.jsx";
import Navbar from "./components/shared/Navbar.jsx";
import Footer from "./components/shared/Footer.jsx";
import NotMatch from "./components/error404/NotMatch.jsx";
import DetailsPage from './components/pages/DetailsPage.jsx';

// Data Fetchers
import ActionFetcher from './components/GenresAPI/Action.jsx';
import AdventureFetcher from './components/GenresAPI/Adventure.jsx';
import AnimationFetcher from './components/GenresAPI/Animation.jsx';
import ComedyFetcher from './components/GenresAPI/Comedy.jsx';
import MovieFetcher from './components/GenresAPI/Movies.jsx';
import PopularFetcher from './components/GenresAPI/Popular.jsx';
import RomanceFetcher from './components/GenresAPI/Romance.jsx';

function App() {
  const [genreData, setGenreData] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const location = useLocation();

  // Check if current route is auth page
  const isAuthPage = ['/', '/register'].includes(location.pathname);

  const handleDataReady =(data) => {
    if (data.genre) { 
      setGenreData(prev => ({
        ...prev,
        [data.genre]: data
      }));
    } else { 
      setAllMovies(data);
    }
  }
  // useCallback is used to memoize the function to prevent unnecessary re-renders

  return (
    <div>
      <ActionFetcher onDataReady={handleDataReady} />
      <AdventureFetcher onDataReady={handleDataReady} />
      <AnimationFetcher onDataReady={handleDataReady} />
      <ComedyFetcher onDataReady={handleDataReady} />
      <MovieFetcher onDataReady={movies => setAllMovies(movies)} />
      <PopularFetcher onDataReady={handleDataReady} />
      <RomanceFetcher onDataReady={handleDataReady} />

      {/* Conditionally render navbar */}
      {!isAuthPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home genres={genreData} />} />
        <Route path="/movies" element={<Movies movies={allMovies} />} />
        <Route 
          path="/trending" 
          element={<Trending trendingItems={genreData.Popular?.items || []} />} 
        />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/:mediaType/:id" element={<DetailsPage />} />
        <Route path="*" element={<NotMatch />} />
      </Routes>

      {/* Conditionally render footer */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;