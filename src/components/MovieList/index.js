import React, { useEffect } from "react"
import "../MovieList/MovieList.css"
import { useParams } from "react-router-dom"
import Cards from "../MovieCard"
import { getApiCall } from "../../helpers/Utils"
import { ActionTypes } from "../../redux/Actions/movieActions"
import { useDispatch, useSelector } from "react-redux"

const MovieList = () => {

    const { type } = useParams()
    const dispatch = useDispatch();

    const updateState = (actionType, value) => () => {
        dispatch({ type: actionType, payload: value });
        return Promise.resolve();
    };

    const movieReduxStore  = useSelector((state) => state?.movie);
    const getMovies = movieReduxStore?.movieList;

    useEffect(() => {
        getMovieList()
    }, [type])

    const getMovieList = () => {
        getApiCall(`/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
            (response) => {
                dispatch(
                    updateState(ActionTypes.GET_MOVIE_LIST, {
                        movieList: response?.results,
                    })
                );
            });
    }

    // Emptying The Redux InitialState
    const ReduxStoreEmpty = () => {
        dispatch(updateState(ActionTypes.GET_MOVIE_LIST, { movieList: [] }));
    };
    //USE EFFECT FOR EMPTY REDUX STATE
    useEffect(() => {
        ReduxStoreEmpty();
    }, []);

    return (
        <div className="container">
            <div className="movie__list">
                <h2 className="list__title text-warning">{(type === 'popular' ? 'POPULAR' : type === 'top_rated' ? 'TOP RATED' : type === 'upcoming' ? 'UPCOMING' : "POPULAR")}</h2>
                <div className="list__cards">
                    {
                        getMovies?.map((movie, m) => (
                            <Cards key={m} movie={movie} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default MovieList