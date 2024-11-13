import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import MovieList from './MovieList';
import MovieForm from './MovieForm';
import MovieDetail from './MovieDetail';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/movies')
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  function addMovie(newMovie) {
    setMovies([...movies, newMovie]);
  }

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieList movies={movies} />} />
          <Route path="/add" element={<MovieForm addMovie={addMovie} />} />
          <Route path="/movie/:id" element={<MovieDetail movies={movies} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
