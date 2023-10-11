//user list component that is acccessible with /mylist route

import { useState, useEffect, useRef } from "react";
import axios from "../axiosInstance";
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
    const [loading, setLoading] = useState(true);
    const context = useContext(AuthContext);
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [searchResults, setSearchResults] = useState([]);
    const [value, setValue] = useState("");

    // fetch user specific movies as user movie list
    useEffect(() => {
        window.scrollTo(0, 0);
        axios
            .get(
                `/api/usermovies/${
                    context.user.id
                }`
            )
            .then((res) => {
                // console.log(res.data);
                setMovies(res.data);
                // setGenre(res.data.genre.toLowerCase())
                setLoading(false);
            })
            .catch((e) => console.log(e));
    }, []);

    //filter movies according the category with the dropdown menu that user can select a category
    const filterMovies = () => {
        if (selectedCategory === "ALL") {
            return movies;
        } else {
            return movies?.filter((movie) =>
                movie?.genre
                    ?.replace(/[{}"]/g, "")
                    ?.split(",")
                    ?.map((genre) => genre?.toLowerCase().trim())
                    .includes(selectedCategory?.toLowerCase())
            );
        }
    };

    //search functionality combined woth filter
    useEffect(() => {
        const filteredMovies = filterMovies();
        // Filter the filtered articles based on the search input value
        const searchFilteredMovies = filteredMovies
            ? filteredMovies?.filter((movie) =>
                  movie?.title?.toLowerCase().includes(value.toLowerCase())
              )
            : [];

        setSearchResults(searchFilteredMovies);
    }, [value, selectedCategory, movies]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    if (loading) {
        return <Spinner className="h-16 w-16 text-mb-quartery pt-[150px]" />;
    }

    const handleAddMovie = () => {
        navigate(`/movies/new`);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {movies.length > 0 ? (
                <>
                    {" "}
                    <div className=" bg-slate-800 pt-[200px] flex flex-col justify-start items-center gap-20 min-h-screen  pb-10 ">
                        <div className="flex gap-4 items-center justify-start max-lg:flex-col-reverse ">
                            <div
                                className="flex gap-4 relative"
                                ref={dropdownRef}
                            >
                                <button
                                    id="dropdown-button"
                                    onClick={toggleDropdown}
                                    className="flex justify-start pl-4 items-center text-sm border rounded-lg text-white border-white h-10 min-w-[160px]"
                                    type="button"
                                >
                                    All categories
                                    <svg
                                        className={`   w-2.5 h-2.5 ml-2.5 ${
                                            isOpen ? "transform rotate-180" : ""
                                        }`}
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 4 4 4-4"
                                        />
                                    </svg>
                                </button>
                                <div
                                    id="_id"
                                    className={`absolute z-10 ${
                                        isOpen ? "block" : "hidden"
                                    } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 top-12 left-0 `}
                                >
                                    <ul
                                        className="py-2 text-sm text-gray-700  "
                                        aria-labelledby="dropdown-button"
                                    >
                                        <li>
                                            <button
                                                type="button"
                                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                                onClick={() =>
                                                    setSelectedCategory("ALL")
                                                }
                                            >
                                                ALL
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                                onClick={() =>
                                                    setSelectedCategory(
                                                        "ACTION"
                                                    )
                                                }
                                            >
                                                ACTION
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                                onClick={() =>
                                                    setSelectedCategory(
                                                        "SCIENCEFICTION"
                                                    )
                                                }
                                            >
                                                SCIENCE FICTION
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                                onClick={() =>
                                                    setSelectedCategory(
                                                        "HORROR"
                                                    )
                                                }
                                            >
                                                HORROR
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                                onClick={() =>
                                                    setSelectedCategory("DRAMA")
                                                }
                                            >
                                                DRAMA
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                                onClick={() =>
                                                    setSelectedCategory(
                                                        "COMEDY"
                                                    )
                                                }
                                            >
                                                COMEDY
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                                onClick={() =>
                                                    setSelectedCategory(
                                                        "ROMANCE"
                                                    )
                                                }
                                            >
                                                ROMANCE
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                                onClick={() =>
                                                    setSelectedCategory(
                                                        "THRILLER"
                                                    )
                                                }
                                            >
                                                THRILLER
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                                onClick={() =>
                                                    setSelectedCategory(
                                                        "ADVENTURE"
                                                    )
                                                }
                                            >
                                                ADVENTURE
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="relative flex w-full gap-2 md:w-max text-white ">
                                <Input
                                    type="search"
                                    label="Search in My List"
                                    className="pr-20 border-t-white h-11 min-w-[400px] max-md:min-w-[100px] "
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                <Button
                                    size="sm"
                                    className="!absolute right-1 top-1 rounded bg-mb-primary text-mb-secondary font-bold h-8 "
                                >
                                    Search
                                </Button>
                            </div>
                        </div>
                        {searchResults.length === 0 ? (
                            <p className="text-white text-xl font-medium font-scada ">
                                No movies match the selected category.
                            </p>
                        ) : (
                            <div className="card w-full shadow-xl text-white flex flex-wrap justify-center items-center  gap-8 pb-20">
                                {searchResults.map((movie) => (
                                    <div
                                        key={movie.id}
                                        className="w-64 h-[430px] bg-gray-100 rounded-xl overflow-hidden hover:scale-105 transition-all duration-200"
                                    >
                                        <Link to={`/movies/${movie.id}`}>
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
                                                        <p
                                                            to={`/movies/${movie.id}`}
                                                            className="text-mb-secondary hover:text-mb-quartery"
                                                        >
                                                            See Details
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
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
