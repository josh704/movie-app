import React from 'react';
import { useParams } from 'react-router-dom';

function MovieDetail({ movies }) {
  const { id } = useParams();
  const movie = movies.find(movie => movie.id === parseInt(id));

  if (!movie) {
    return <div>Movie not found!</div>;
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      <img src={movie.image} alt={movie.title} />
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Director:</strong> {movie.director}</p>
    </div>
  );
}

export default MovieDetail;
