import React, { useEffect, useState } from 'react';
import AddEditMovieModal from '../AddEditMovieModal';
import ImdbMovieList from '../ImdbMovieList';
const MovieCrud = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
        setMovies(storedMovies);
    }, []);

    const toggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleEditMovie = (movie) => {
        setSelectedMovie(movie);
        toggle();
    };

    const handleDeleteMovie = (movieId) => {
        const updatedMovies = movies.filter((movie) => movie.id !== movieId);
        setMovies(updatedMovies);
        localStorage.setItem('movies', JSON.stringify(updatedMovies));
    };

    const handleSaveMovie = (updatedMovie) => {
        const updatedMovies = selectedMovie
            ? movies.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie))
            : [...movies, { ...updatedMovie, id: Date.now() }];
        console.log(updatedMovies, 'updates');
        setMovies(updatedMovies);
        localStorage.setItem('movies', JSON.stringify(updatedMovies));
        toggle();
    };

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center my-1'>
                <div className='imdb-movie-list'>IMDb Movies</div>
                <button className="btn btn-warning fw" onClick={() => { toggle(); setSelectedMovie(null); }} style={{ fontWeight: "600" }}>
                    <i className="bi bi-plus-circle me-1" />Add Movie
                </button>
            </div>

            <ImdbMovieList
                movies={movies}
                onEditMovie={handleEditMovie}
                onDeleteMovie={handleDeleteMovie}
            />
            <AddEditMovieModal
                isModalOpen={isModalOpen}
                onToggle={toggle}
                onSave={handleSaveMovie}
                movie={selectedMovie}
            />
        </div>
    );
};

export default MovieCrud;
