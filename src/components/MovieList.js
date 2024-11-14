import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function MovieList({ movies, setMovies }) {
  const [editingMovie, setEditingMovie] = useState(null); 
  const [error, setError] = useState('');
  
  const [updatedMovie, setUpdatedMovie] = useState({
    title: '',
    image: '',
    genre: '',
    director: ''
  });
  const handleDelete = (id) => {
    fetch(`http://localhost:3001/movies/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
        }
      })
      .catch((err) => console.error('Error deleting movie:', err));
  };
  const handleEditClick = (movie) => {
    setEditingMovie(movie.id); 
    setUpdatedMovie(movie); 
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMovie((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/movies/${updatedMovie.id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovie),
    })
      .then((res) => res.json())
      .then((updatedData) => {
        setMovies((prevMovies) =>
          prevMovies.map((movie) => (movie.id === updatedData.id ? updatedData : movie))
        );
        setEditingMovie(null); 
      })
      .catch((err) => {
        console.error('Error updating movie:', err);
        setError('Failed to update movie. Please try again.');
      });
  };

  return (
    <div>
      <h2>Movie List</h2>
      {error && <div className="error-message">{error}</div>}
      
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img className="movie-image" src={movie.image} alt={movie.title} />
            <div className="movie-details">
              <h3>
                <Link to={`/movie/${movie.id}`} className="movie-title">
                  {movie.title}
                </Link>
              </h3>
              <p><strong>Genre:</strong> {movie.genre || 'N/A'}</p>
              <p><strong>Director:</strong> {movie.director || 'N/A'}</p>

              <button
                className="edit-button" onClick={() => handleEditClick(movie)} >Edit </button>
              <button className="delete-button" onClick={() => handleDelete(movie.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      
      {editingMovie && (
        <div className="edit-form-container">
          <h3>Edit Movie</h3>
          <form onSubmit={handleSubmitEdit} className="edit-movie-form">
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={updatedMovie.title}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                name="image"
                value={updatedMovie.image}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Genre:
              <input
                type="text"
                name="genre"
                value={updatedMovie.genre}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Director:
              <input
                type="text"
                name="director"
                value={updatedMovie.director}
                onChange={handleInputChange}
                required
              />
            </label>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditingMovie(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default MovieList;
