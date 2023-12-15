import React from "react"
import "./home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import MovieList from "../../components/MovieList";
import UpNextCards from "../../components/UpNextCard";
import { formatNum, roundOff } from "../../helpers/Utils";
import {useSelector } from "react-redux";
import MovieCrud from "../../components/MovieCrud";

const Home = () => {
    const movieReduxStore  = useSelector((state) => state?.movie);
    const getMovies = movieReduxStore?.movieList;

    return (
        <>
            <div className="container">
                <MovieCrud />
                <div className="row">
                    <div className="col-md-8  mt-3">
                        <div className="poster ">
                            <Carousel
                                showThumbs={false}
                                autoPlay={true}
                                infiniteLoop={true}
                                showStatus={false}
                                interval={5000}
                                autoFocus={true}
                            >
                                {
                                    getMovies.map((movie, p) => (
                                        <Link key={p} style={{ textDecoration: "none", color: "white" }} to={`/movie/${movie.id}`} >
                                            <div className="posterImage">
                                                <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                                            </div>
                                            <div className="posterImage__overlay">
                                                <div className="posterImage__title">{movie ? movie.original_title : ""}</div>
                                                <div className="posterImage__runtime d-flex">
                                                    {movie ? movie.release_date : ""}
                                                    <span className="posterImage__rating align-items-center d-flex">
                                                        <i className="bi bi-star-fill fs-5 me-2 text-warning" />{" "}
                                                        {movie ? roundOff(movie?.vote_average) + "/10" : ""}
                                                        <span className="fs-6 ms-2">({movie ? formatNum(movie.vote_count) + " votes" : ""})</span>
                                                    </span>
                                                </div>
                                                <div className="posterImage__description">{movie ? movie.overview.slice(0, 150) + "..." : ""}</div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </Carousel>
                        </div>
                    </div>
                    <div className="col-md-4  mt-3">
                        <h5 className="text-warning">Up Next</h5>
                        <UpNextCards />
                    </div>
                </div>
                <MovieList />
            </div>
        </>
    )
}
export default Home