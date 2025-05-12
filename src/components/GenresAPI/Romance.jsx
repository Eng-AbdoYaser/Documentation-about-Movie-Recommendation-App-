// ActionFetcher.jsx
import { useEffect } from 'react';

function ActionFetcher({ onDataReady }) {
  useEffect(() => {
    async function fetchData() {
      try {
        const apiKey = '12750e83790c14a1a9c1acd50ff6bf8a';
        
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=10749`
        );
        const movieData = await movieRes.json();
        

        onDataReady({
          genre: 'Drama',
          items: [...(movieData.results || [])]
        });
      } catch (error) {
        console.error('Error fetching Action data:', error);
      }
    }
    fetchData();
  }, [onDataReady]);

  return null;
}

export default ActionFetcher;