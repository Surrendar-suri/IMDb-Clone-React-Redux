import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/home/home';
import Movie from './pages/movieDetail/movie';
import MovieList from './components/MovieList';
function App() {
  return (
    <>
      <Router>
          <Header />
            <Routes>
                <Route index element={<Home />}></Route>
                <Route path="movie/:id" element={<Movie />}></Route>
                <Route path="movies/:type" element={<MovieList />}></Route>
                <Route path="/*" element={<h1 className='text-white'>Error Page</h1>}></Route>
            </Routes>
        </Router>
    </>
  );
}

export default App;
