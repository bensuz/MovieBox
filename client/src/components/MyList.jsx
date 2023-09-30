import { useState, useEffect } from "react";
import axios from "axios";
import "./movies.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Link, useNavigate } from "react-router-dom";
import { Spinner, Button, Input } from "@material-tailwind/react";
import { AuthContext } from "../context/Auth";
import { useContext } from "react";

const MyList = () => {
    const [movies, setMovies] = useState(null);
    const navigate = useNavigate();
    const context = useContext(AuthContext);

    console.log("useridfrontend", context.user.id);
    useEffect(() => {
        axios
            .get(
                `${import.meta.env.VITE_SERVER_BASE_URL}/api/usermovies/${
                    context.user.id
                }`
            )
            .then((res) => {
                console.log(res.data);
                setMovies(res.data);
            })
            .catch((e) => console.log(e));
    }, []);

    if (!movies) {
        return <Spinner className="h-16 w-16 text-mb-quartery" />;
    }

    const handleAddMovie = () => {
        navigate(`/movies/new`);
    };
    return (
        <>
            {movies.length > 0 ? (
                <>
                    {" "}
                    <div className=" bg-slate-800 pt-[150px] flex flex-col justify-center items-center gap-20">
                        <div className="relative flex w-full gap-2 md:w-max text-white ">
                            <Input
                                type="search"
                                label="Search in My List"
                                className="pr-20 border-t-white h-11 min-w-[400px] "
                            />
                            <Button
                                size="sm"
                                className="!absolute right-1 top-1 rounded bg-mb-primary text-mb-secondary font-bold h-8"
                            >
                                Search
                            </Button>
                        </div>
                        <div className="card w-full shadow-xl text-white flex flex-wrap justify-center items-center  gap-8 ">
                            {movies.map((movie) => (
                                <div
                                    key={movie.id}
                                    className="w-64 h-[430px] bg-gray-100 rounded-xl overflow-hidden hover:scale-105 transition-all duration-200"
                                >
                                    <Link to={`/movies/discover/${movie.id}`}>
                                        <figure className="h-2/3 overflow-hidden">
                                            <img
                                                src={movie.poster}
                                                alt={movie.title}
                                            />
                                        </figure>
                                        <div className="card-body h-1/3 px-3 text-black flex flex-col justify-between items-start">
                                            <h2 className="card-title pt-2 text-lg font-medium text-slate-700 h-2/4">
                                                {movie.title}
                                            </h2>
                                            <div className="h-2/4">
                                                <div>
                                                    <i
                                                        className="fas fa-star text-yellow-400 text-lg mr-1 "
                                                        title="Rating"
                                                    ></i>
                                                    {movie.rating}
                                                </div>
                                                <div className="card-actions flex justify-between items-center gap-11">
                                                    <Link
                                                        to={`/movies/${movie.id}`}
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
                    </div>
                    <div className=" bg-slate-800 flex justify-around pb-24 pt-10">
                        <button
                            className=" rounded-xl bg-mb-quartery hover:bg-pink-800 text-white p-3 self-end "
                            onClick={handleAddMovie}
                        >
                            <i
                                className="fas fa-heart text-lg leading-none mr-3"
                                title="Add to My List"
                            ></i>{" "}
                            Add New Movie
                        </button>
                    </div>
                </>
            ) : (
                <div>
                    <div className=" bg-slate-800 flex flex-col gap-16 justify-around items-center pb-96 pt-96 min-h-screen">
                        <div className="flex flex-col justify-center items-center gap-4">
                            <p className="text-white text-xl font-medium animate-fade-left animate-once animate-duration-[2000ms]">
                                You do not have any movies saved in your list.{" "}
                            </p>
                            <p className="text-white text-xl font-medium animate-fade-left animate-once animate-duration-[2000ms]">
                                Click to the button for adding movies.{" "}
                            </p>
                        </div>
                        <button
                            className=" rounded-xl bg-mb-quartery hover:bg-pink-800 text-white p-3  "
                            onClick={handleAddMovie}
                        >
                            <i
                                className="fas fa-heart text-lg leading-none mr-3"
                                title="Add to My List"
                            ></i>{" "}
                            Add New Movie
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyList;
