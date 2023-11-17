import React, { useEffect, useState } from "react"
import "./movie.css"
import { useParams } from "react-router-dom"
import { getApiCall, roundOff } from "../../helpers/Utils"
import { useDispatch, useSelector } from "react-redux"
import { ActionTypes } from "../../redux/Actions/movieActions"

const Movie = () => {
    const { id } = useParams()

    const dispatch = useDispatch();

    const updateState = (actionType, value) => () => {
        dispatch({ type: actionType, payload: value });
        return Promise.resolve();
    };

    const movieReduxStore = useSelector((state) => state?.movie);
    const getMoviesInfo = movieReduxStore?.movieDetails;

    useEffect(() => {
        getMovieDetails()
    }, [])

    const getMovieDetails = () => {
        getApiCall(`/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
            (response) => {
                dispatch(
                    updateState(ActionTypes.GET_MOVIE_DETAIL, {
                        movieDetails: response,
                    })
                );
            });
    }

    // Emptying The Redux InitialState
    const ReduxStoreEmpty = () => {
        dispatch(updateState(ActionTypes.GET_MOVIE_DETAIL, { movieDetails: [] }));
    };
    //USE EFFECT FOR EMPTY REDUX STATE
    useEffect(() => {
        ReduxStoreEmpty();
    }, []);

    return (
        <div className="container">
            <div className="movie_section">
                <div className="movie_bg_poster">
                    <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${getMoviesInfo ? getMoviesInfo?.backdrop_path : ""}`} />
                    <div className="movie__detail_overlay row m-0">
                        <div className="col-sm-6 col-md-5 col-xl-2">
                            <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${getMoviesInfo ? getMoviesInfo?.poster_path : ""}`} />
                        </div>
                        <div className="movie__detailRight col-sm-6 col-md-7 col-xl-10">
                            <div className="movie__detailRightTop">
                                <div className="movie__name">{getMoviesInfo ? getMoviesInfo?.original_title : ""}</div>
                                <div className="movie__tagline">{getMoviesInfo ? getMoviesInfo?.tagline : ""}</div>
                                <div className="movie__rating">
                                    {getMoviesInfo ? roundOff(getMoviesInfo?.vote_average) : ""} <i className="bi bi-star-fill text-warning" />
                                    <span className="movie__voteCount">{getMoviesInfo ? "(" + getMoviesInfo?.vote_count + ") votes" : ""}</span>
                                </div>
                                <div className="movie__runtime">{getMoviesInfo ? getMoviesInfo?.runtime + " mins" : ""}</div>
                                <div className="movie__releaseDate">{getMoviesInfo ? "Release date: " + getMoviesInfo.release_date : ""}</div>
                                <div className="movie__genres">
                                    {
                                        getMoviesInfo && getMoviesInfo?.genres
                                            ?
                                            getMoviesInfo?.genres?.map((genre, g) => (
                                                <><span key={g} className="movie__genre" id={genre?.id}>{genre?.name}</span></>
                                            ))
                                            :
                                            ""
                                    }
                                </div>
                            </div>
                            <div className="movie__detailRightBottom">
                                <div className="synopsisText">Synopsis</div>
                                <div>{getMoviesInfo ? getMoviesInfo?.overview : ""}</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="movie__heading text-warning">Useful Links</div>
            <div className="movie__links">
                {
                    getMoviesInfo && getMoviesInfo?.homepage && <a href={getMoviesInfo?.homepage} target="_blank" style={{ textDecoration: "none" }}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    getMoviesInfo && getMoviesInfo?.imdb_id && <a href={"https://www.imdb.com/title/" + getMoviesInfo?.imdb_id} target="_blank" style={{ textDecoration: "none" }}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            <div className="movie__heading text-warning">Production Companies</div>
            <div className="movie__production">
                {
                    getMoviesInfo && getMoviesInfo?.production_companies && getMoviesInfo?.production_companies.map((company, c) => (
                        <div key={c}>
                            {
                                company?.logo_path
                                &&
                                <span className="productionCompanyImage">
                                    <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company?.logo_path} />
                                    <span>{company?.name}</span>
                                </span>
                            }
                        </div>
                    ))
                }
            </div>
        </div>

    )
}

export default Movie