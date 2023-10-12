import { AuthContext } from "../context/Auth";
import { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "../axiosInstance";
import { Link, useParams } from "react-router-dom";
import noposter from "../assets/noposter.jpg";

const Search = () => {
    const { query } = useParams();
    const context = useContext(AuthContext);
    const [existingTitles, setExistingTitles] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        axios
            .get(`/api/publicmovies/public/search/${query}`)
            .then((res) => {
                setSearchResults(res.data);
            })
            .catch((error) => {
                console.error("Error fetching user movies:", error);
            });
    }, []);

    useEffect(() => {
        if (context.user) {
            axios
                .get(`/api/usermovies/${context.user.id}`)
                .then((res) => {
                    const existingMovies = res.data;
                    const existingTitles = existingMovies.map(
                        (movie) => movie.title
                    );
                    setExistingTitles(existingTitles);
                })
                .catch((error) => {
                    console.error("Error fetching user movies:", error);
                });
        }
    }, []);

    return (
        <div className=" bg-slate-800 pt-[200px] flex flex-col justify-start items-center gap-20 min-h-screen  pb-10 ">
            <p className="text-white text-lg font-scada">
                Results based on your search for: &quot;{query}
                &quot;:
            </p>
            <div className="card w-full shadow-xl text-white flex flex-wrap justify-center items-center my-3 gap-8 pb-20 ">
                {searchResults?.map((movie) => (
                    <div
                        key={movie.id}
                        className="w-64 h-[430px] bg-gray-100 rounded-xl overflow-hidden hover:scale-105 transition-all duration-200"
                    >
                        <Link to={`/movies/discover/${movie.id}`}>
                            <figure className="h-2/3 overflow-hidden">
                                {movie.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                ) : (
                                    <img src={noposter} alt={movie.title} />
                                )}
                            </figure>
                            <div className="card-body h-1/3 px-3 text-black flex flex-col justify-between items-start">
                                <h2 className="card-title pt-2 text-md font-medium text-slate-700 h-2/4 overflow-hidden">
                                    {movie.title}
                                </h2>
                                <div className="h-2/4">
                                    <div className="flex justify-start items-center gap-1">
                                        <i
                                            className="fas fa-star text-yellow-400 text-lg mr-1 "
                                            title="Rating"
                                        ></i>
                                        {movie.vote_average === 0 ? (
                                            <p className="text-md">
                                                Not available
                                            </p>
                                        ) : (
                                            movie.vote_average
                                        )}
                                    </div>
                                    <div className="card-actions flex justify-between items-center gap-11">
                                        {context.user &&
                                            (existingTitles?.includes(
                                                movie?.original_title
                                            ) ? (
                                                <button
                                                    className="middle none center flex items-center justify-center rounded-lg p-3 font-sans text-xs font-bold uppercase text-mb-quartery transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                    data-ripple-dark="true"
                                                >
                                                    <i
                                                        className="fas fa-heart text-lg leading-none"
                                                        title="Add to My List"
                                                    ></i>{" "}
                                                </button>
                                            ) : (
                                                <button
                                                    className="middle none center flex items-center justify-center rounded-lg p-3 font-sans text-xs font-bold uppercase text-gray-400 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                    data-ripple-dark="true"
                                                >
                                                    <i
                                                        className="fas fa-heart text-lg leading-none"
                                                        title="Add to My List"
                                                    ></i>{" "}
                                                </button>
                                            ))}
                                        <p className="text-mb-secondary hover:text-mb-quartery">
                                            See Details
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
