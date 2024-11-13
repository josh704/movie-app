import React, { useState } from 'react';
function MovieForm({ addMovie }) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [genre, setGenre] = useState('');
  const [director, setDirector] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newMovie = { title, image, genre };

    fetch('http://localhost:3001/movies', {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON", 
      },
      body: JSON.stringify(newMovie)
    })
      .then((res) => res.json())
      .then((data) => {
        addMovie(data);
        setTitle('');
        setImage('');
        setGenre('');
      });
  };

  return (
    <div>
      <h2>Add a New Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Image:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label>
          Genre:
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </label>
        <label>
        Director:
          <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
        </label>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default MovieForm;
