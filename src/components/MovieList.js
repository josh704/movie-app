import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; 

function MovieList({ movies }) {
  return (
    <div>
      <h2>Movie List</h2>
      <div className="movie-list">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <img 
              src={movie.image} 
              alt={movie.title} 
              className="movie-image" 
            />
            <div className="movie-details">
              <h3>
                <Link to={`/movie/${movie.id}`} className="movie-title">
                  {movie.title}
                </Link>
              </h3>
              <p><strong>Genre:</strong> {movie.genre || 'N/A'}</p>
              <p><strong>Director:</strong> {movie.director || 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;

