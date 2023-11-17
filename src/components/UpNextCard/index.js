import React, { useEffect, useState } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { Link } from "react-router-dom"
import '../UpNextCard/upNext.css'
import { getApiCall, roundOff } from "../../helpers/Utils"
import { useDispatch, useSelector } from "react-redux"
import { ActionTypes } from "../../redux/Actions/movieActions"

const UpNextCards = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])

    const dispatch = useDispatch();

    const updateState = (actionType, value) => () => {
        dispatch({ type: actionType, payload: value });
        return Promise.resolve();
    };

    const movieReduxStore  = useSelector((state) => state?.movie);
    const getUpNextMovies = movieReduxStore?.movieUpComingList;

    useEffect(() => {
        getUpComingMovieList()
    }, [])

    const getUpComingMovieList = () => {
        getApiCall(`/movie/upcoming?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
            (response) => {
                dispatch(
                    updateState(ActionTypes.GET_UPCOMING_MOVIE_LIST, {
                        movieUpComingList: response?.results,
                    })
                );
            });
    }
    // Emptying The Redux InitialState
    const ReduxStoreEmpty = () => {
        dispatch(updateState(ActionTypes.GET_UPCOMING_MOVIE_LIST, { movieUpComingList: [] }));
    };
    //USE EFFECT FOR EMPTY REDUX STATE
    useEffect(() => {
        ReduxStoreEmpty();
    }, []);

    return (
        <>
            {
                isLoading
                    ?
                    <div className="cards">
                        <SkeletonTheme color="#202020" highlightColor="#444">
                            <Skeleton height={140} duration={2} />
                        </SkeletonTheme>
                    </div>
                    :
                    <>
                        {
                            getUpNextMovies?.splice(0, 3).map((movie, n) => (
                                <div key={n}>
                                    <Link  to={`/movie/${movie?.id}`} style={{ textDecoration: "none", color: "#fff" }}>
                                        <div className="upnext_card card">
                                            <div className="card-body d-flex justify-content-between">
                                                <img style={{ height: "140px", width: "100%" }} src={`https://image.tmdb.org/t/p/original${movie ? movie?.poster_path : ""}`} />
                                                <div className="upnext_content">
                                                    <div className="upnext_title">{movie ? movie?.original_title : ""}</div>
                                                    <div className="upnext__runtime">
                                                        {movie ? movie?.release_date : ""}
                                                        <span className="upnext__rating">{movie ? roundOff(movie?.vote_average) : ""}<i className="bi bi-star-fill ms-1 text-warning" /></span>
                                                    </div>
                                                    <div className="upnext__description">{movie ? movie?.overview.slice(0, 70) + "..." : ""}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>


                            ))
                        }
                    </>
            }
        </>
    )
}

export default UpNextCards