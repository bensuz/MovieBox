/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Discover = () => {
    const [publicMovies, setPublicMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_BASE_URL
                    }/api/publicmovies/public`
                );
                setPublicMovies(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    const handleAddMovie = () => {
        console.log("added to the list");
    };

    return (
        <div className="card w-full shadow-xl text-white flex flex-wrap justify-center items-center my-3 gap-8 ">
            {publicMovies.map((movie) => (
                <div
                    key={movie.id}
                    className="w-64 h-[430px] bg-gray-100 rounded-xl overflow-hidden hover:scale-105 transition-all duration-200"
                >
                    <Link to={`/movies/discover/${movie.id}`}>
                        <figure className="h-2/3 overflow-hidden">
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={movie.title}
                            />
                        </figure>
                        <div className="card-body h-1/3 px-3 text-black flex flex-col justify-between items-start">
                            <h2 className="card-title pt-2 text-lg font-medium text-slate-700 h-2/4 overflow-hidden">
                                {movie.title}
                            </h2>
                            <div className="h-2/4">
                                <div>
                                    <i
                                        className="fas fa-star text-yellow-400 text-lg mr-1 "
                                        title="Rating"
                                    ></i>
                                    {movie.vote_average}
                                </div>
                                <div className="card-actions flex justify-between items-center gap-11">
                                    <button
                                        onClick={handleAddMovie}
                                        className="middle none center flex items-center justify-center rounded-lg p-3 font-sans text-xs font-bold uppercase text-mb-quartery transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        data-ripple-dark="true"
                                    >
                                        <i
                                            className="fas fa-heart text-lg leading-none"
                                            title="Add to My List"
                                        ></i>{" "}
                                    </button>
                                    <Link
                                        to={`/movies/discover/${movie.id}`}
                                        className="text-mb-secondary hover:text-mb-quartery"
                                    >
                                        See Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Discover;
