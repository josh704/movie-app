import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; 

function MovieList({ movies, setMovies }) {
    const handleDelete = (id) => {
        fetch(`http://localhost:3001/movies/${id.toString()}`, {
          method: 'DELETE',
        })
          .then((res) => {
            if (res.ok) {
              setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
            }
          })
          .catch((err) => console.error('Error deleting movie:', err));
      };
  return (
    <div>
      <h2>Movie List</h2>
      <div className="movie-list">{movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <img className="movie-image" src={movie.image} alt={movie.title} />
            <div className="movie-details">
              <h3>
                <Link to={`/movie/${movie.id}`} className="movie-title">{movie.title}</Link>
              </h3>
              <button onClick={() => handleDelete(movie.id)}>Delete</button>
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

