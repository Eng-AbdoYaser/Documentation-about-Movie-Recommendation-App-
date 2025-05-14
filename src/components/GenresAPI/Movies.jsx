import { useEffect } from 'react';

function MovieFetcher({ onDataReady }) {
    useEffect(() => {
        async function fetchData() {
            try {
                const apiKey = '12750e83790c14a1a9c1acd50ff6bf8a';
                const movieRes = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
                );
                
                if (!movieRes.ok) {
                    throw new Error(`HTTP error! status: ${movieRes.status}`);
                }

                const movieData = await movieRes.json();
                
                onDataReady(movieData.results || []); 

            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        }
        fetchData();
    }, [onDataReady]);

    return null;
}

export default MovieFetcher;