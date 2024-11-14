import React, { useState } from 'react';
import './App.css';  

function MovieForm({ addMovie }) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [genre, setGenre] = useState('');
  const [director, setDirector] = useState('');
  const [error, setError] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !image || !genre || !director) {
      setError('All fields are required');
      return;
    }

    const newMovie = { title, image, genre, director };

    fetch('https://json-server-backend-lln6.onrender.com/movies', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to add movie');
        }
        return res.json();
      })
      .then((data) => {
        addMovie(data); 
        setTitle('');
        setImage('');
        setGenre('');
        setDirector('');
        setError('');
      })
      .catch((error) => {
        console.error('Error adding movie:', error);
        setError('An error occurred while adding the movie. Please try again.');
      });
  };

  return (
    <div className="movie-form-container">
      <h2>Add a New Movie</h2>
      {error && <div className="error-message">{error}</div>} 
      <form onSubmit={handleSubmit} className="movie-form">
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter movie title"
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image URL"
          />
        </label>
        <label>
          Genre:
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Enter movie genre"
          />
        </label>
        <label>
          Director:
          <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            placeholder="Enter director's name"
          />
        </label>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default MovieForm;
