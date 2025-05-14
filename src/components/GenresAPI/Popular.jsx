import { useEffect } from 'react';

function PopularFetcher({ onDataReady }) {
  useEffect(() => {
    async function fetchData() {
      try {
        const apiKey = '12750e83790c14a1a9c1acd50ff6bf8a';
        
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );
        const movieData = await movieRes.json();
        
        const seriesRes = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
        );
        const seriesData = await seriesRes.json();

        onDataReady({
          genre: 'Popular',
          items: [...(movieData.results || []), ...(seriesData.results || [])]
        });
      } catch (error) {
        console.error('Error fetching Popular data:', error);
      }
    }
    fetchData();
  }, [onDataReady]);

  return null;
}

export default PopularFetcher;