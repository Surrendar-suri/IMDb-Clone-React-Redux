import React, { useEffect, useState } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "./MovieCard.css"
import { Link } from "react-router-dom"
import { roundOff } from "../../helpers/Utils"

const Cards = ({ movie }) => {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])

    return (
        <>
            {
                isLoading
                    ?
                    <div className="cards">
                        <SkeletonTheme color="#202020" highlightColor="#444">
                            <Skeleton height={300} duration={2} />
                        </SkeletonTheme>
                    </div>
                    :
                    <Link to={`/movie/${movie?.id}`} style={{ textDecoration: "none", color: "#fff" }}>
                        <div className="cards">
                            <img className="cards__img" src={`https://image.tmdb.org/t/p/original${movie ? movie?.poster_path : ""}`} />
                            <div className="cards__overlay">
                                <div className="card__title">{movie ? movie?.original_title : ""}</div>
                                <div className="card__runtime">
                                    {movie ? movie?.release_date : ""}
                                    <span className="card__rating">{movie ? roundOff(movie?.vote_average) : ""}<i className="bi bi-star-fill ms-1 text-warning" /></span>
                                </div>
                                <div className="card__description">{movie ? movie?.overview.slice(0, 70) + "..." : ""}</div>
                            </div>
                        </div>
                    </Link>
            }
        </>
    )
}

export default Cards