// MovieContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "23d6e6a8062a27bebdae06c839fbfb54";
const API_BASE_URL = "https://api.themoviedb.org/3";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [topRatedMovies, settopRatedMovies] = useState([]);
  const [topRatedtotalPages, settopRatedTotalPages] = useState(0);
  const [topRatedcurrentPage, settopRatedCurrentPage] = useState(1);

  const [upComingMovies, setupComingMovies] = useState([]);
  const [upComingtotalPages, setupComingTotalPages] = useState(0);
  const [upComingcurrentPage, setupComingCurrentPage] = useState(1);

  const [movieDetails, setMovieDetails] = useState(null);
  const [movieCast, setMovieCast] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [topRatedSearchResults, setTopRatedSearchResults] = useState([]);
  const [upComingSearchResults, setUpComingSearchResults] = useState([]);

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) fetchPopularMovies(currentPage);
  }, [currentPage, query]);

  useEffect(() => {
    if (!query) fetchTopRatedMovies(topRatedcurrentPage);
  }, [topRatedcurrentPage, query]);

  useEffect(() => {
    if (!query) fetchUpcomingMovies(upComingcurrentPage);
  }, [upComingcurrentPage, query]);

  const fetchPopularMovies = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
      );

      setPopularMovies(response.data.results);
      console.log(response.data.results);
      setTotalPages(response.data.total_pages);
      setCurrentPage(page);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopRatedMovies = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`,
      );
      settopRatedMovies(response.data.results);
      settopRatedTotalPages(response.data.total_pages);
      settopRatedCurrentPage(page);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching top-rated movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUpcomingMovies = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`,
      );
      setupComingMovies(response.data.results);
      setupComingTotalPages(response.data.total_pages);
      setupComingCurrentPage(page);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`,
      );
      setMovieDetails(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const fetchMovieCast = async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
      );
      setMovieCast(response.data.cast);
    } catch (error) {
      console.error("Error fetching movie cast:", error);
    }
  };

  const fetchSearchedMovies = async (query, page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`,
      );
      setSearchResults(response.data.results);
      setCurrentPage(page);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching searched movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchedTopRatedMovies = async (query, page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`,
      );
      setTopRatedSearchResults(response.data.results);
      settopRatedCurrentPage(page);
    } catch (error) {
      console.error("Error fetching searched top-rated movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchedUpcomingMovies = async (query, page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`,
      );
      setUpComingSearchResults(response.data.results);
      setupComingCurrentPage(page);
    } catch (error) {
      console.error("Error fetching searched upcoming movies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        popularMovies,
        totalPages,
        setCurrentPage,
        currentPage,

        topRatedMovies,
        topRatedtotalPages,
        topRatedcurrentPage,
        settopRatedCurrentPage,

        upComingMovies,
        upComingtotalPages,
        upComingcurrentPage,
        setupComingCurrentPage,

        movieDetails,
        movieCast,
        query,
        setQuery,
        fetchSearchedTopRatedMovies,
        fetchSearchedUpcomingMovies,
        topRatedSearchResults,
        upComingSearchResults,

        fetchTopRatedMovies,
        fetchUpcomingMovies,
        fetchMovieDetails,
        fetchMovieCast,
        searchResults,
        setSearchResults,
        fetchSearchedMovies,
        loading,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
