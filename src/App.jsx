import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../src/Components/Navbar/Navbar";
import { MovieProvider } from "./Components/Context/MovieContext";
import PopularMovie from "./Components/Popular/Popular";

import "./App.css";
import MovieDetail from "./Components/MovieDetail/MovieDetail";
import TopRated from "./Components/TopRated/Toprated";
import UpcomingMovies from "./Components/Upcoming/Upcoming";

function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Navbar />
        <Routes className="app">
          <Route path="/" exact element={<PopularMovie />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/up-coming" element={<UpcomingMovies />} />
        </Routes>
      </BrowserRouter>
    </MovieProvider>
  );
}

export default App;
