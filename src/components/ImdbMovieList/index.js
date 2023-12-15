import React from 'react';
import "./ImdbMovieList.css"
import { formatNum, roundOff, textCapitalize, textUppercase } from '../../helpers/Utils';

const ImdbMovieList = ({ movies, onEditMovie, onDeleteMovie }) => {
    return (
        <div>
            <div className='imdbmovie_card'>
                <ul className='movie-ul'>
                    {movies.length > 0 ?
                        <>
                            {movies.map((movie, i) => (
                                <li className='movie-li' key={movie?.id}>
                                    <div className='list_poster'>
                                        <img src={movie?.image} alt={`${movie.title} Poster`} width={180} height={130}/>
                                    </div>
                                    <div className='list_item'>
                                        <div className='list_content'>
                                            <div className='list_item_title'>
                                                {i + 1}.{textCapitalize(movie?.title)}
                                            </div>
                                            <div className='list_item_detail'><span>{movie?.releaseYear}</span><span>{(movie?.durationHours) + "Hrs"} {movie?.durationMinutes + "m"}</span></div>
                                            <div className='list_item_detail'>
                                                <span><i className="bi bi-star-fill me-1 text-warning" />{movie ? roundOff(movie?.rating) + " /10" : ""}</span>
                                                <span>({movie ? formatNum(movie.votes) + " votes" : ""})</span>
                                            </div>
                                        </div>
                                        <div className='movie_actions'>
                                            <button className="btn btn-info btn-sm mx-2 edit-btn" onClick={() => onEditMovie(movie)}>
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm trash-btn"
                                                onClick={() => onDeleteMovie(movie.id)}
                                            >
                                                <i className="bi bi-trash3"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </>
                        :
                        <h5>Add Your Movies <i className="ms-2 bi bi-arrow-right-circle" /></h5>
                    }
                </ul>
            </div>

        </div>
    );
};

export default ImdbMovieList;
