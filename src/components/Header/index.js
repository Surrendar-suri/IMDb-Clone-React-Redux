// src/components/Header.js
import React from 'react';
import '../Header/Header.css';
import { imagePath } from '../../helpers/ImagePath';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img width='60' height='32'
                            src={imagePath('./imdbLogo.png')} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center header-hover-bg">
                            <li className='nav-item'>
                                <Link className="nav-link text-white" to="/movies/popular">Popular</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className="nav-link text-white  d-flex text-white align-items-center" to="/movies/top_rated">TopRated</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className="nav-link text-white  d-flex text-white align-items-center" to="/movies/upcoming">Upcoming</Link>
                            </li>
                        </ul>
                        <div className="input-group search-bar mx-3">
                            <button className="btn all-btn" type="button">All</button>
                            <input type="text" className="form-control " placeholder='Search IMDb' />
                            <i className="bi bi-search" />
                        </div>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center header-hover-bg">
                            <li className="nav-item">
                                <Link className="nav-link px-3" to="#">
                                    <img width='60' height='32'
                                        src={imagePath('./IMDbPro-logo.png')} />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link d-flex text-white align-items-center" role="button" to="#"><i className="bi bi-bookmark-plus-fill me-1 fs-6" />Watchlist<span className="badge bg-warning text-dark ms-1" >1</span></Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link text-white dropdown-toggle d-flex align-items-center" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-person-circle me-2 fs-5" /> Surendar
                                </Link>
                                <ul className="dropdown-menu dropdown-color-dark" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="#">Your Activity</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-white" to="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    EN
                                </Link>
                                <ul className="dropdown-menu dropdown-color-dark" aria-labelledby="navbarScrollingDropdown">
                                    <li><Link className="dropdown-item" to="#">English</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
