// form for adding new movie
import { useState } from "react";
import axios from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import RegularHeader from "./RegularHeader";
import { AuthContext } from "../context/Auth";
import { useContext } from "react";
import Swal from "sweetalert2";
import GenreSelection from "./GenreSelection";
import LanguageSelection from "./LanguageSelection";

const NewMovie = () => {
    window.scrollTo(0, 0);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [rating, setRating] = useState("");
    const [poster, setPoster] = useState("");
    const [overview, setOverview] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const context = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        //fetching the user movies to check if the new addition is already exist on the db or not
        axios
            .get(
                `/api/usermovies/${
                    context.user.id
                }`
            )
            .then((res) => {
                const existingMovies = res.data;

                // Check if the movie already exists in the list
                const movieExists = existingMovies.some(
                    (movie) => movie.title === title
                );

                if (movieExists) {
                    // Display a message indicating that the movie already exists
                    Swal.fire({
                        icon: "warning",
                        title: "Movie Already Exists",
                        text: "This movie is already in your list.",
                    });
                } else {
                    // Movie does not exist, proceed to add it
                    console.log(rating);
                    const selectedGenreLabels = selectedGenres.map(
                        (genre) => genre.label
                    );
                    //adding the movie to db
                    axios
                        .post(
                            `/api/usermovies`,
                            {
                                user_id: context.user.id,
                                title,
                                genre: selectedGenreLabels,
                                releaseDate,
                                rating,
                                language: selectedLanguage.value,
                                poster,
                                overview,
                            }
                        )
                        .then((res) => {
                            console.log(res.data);
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Movie has been added to My List",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            navigate("/");
                        })
                        .catch((e) => console.log(e));
                }
            })
            .catch((e) => console.log(e));
    };

    const handleGenreChange = (selectedGenres) => {
        setSelectedGenres(selectedGenres);
    };
    const handleLanguageChange = (selectedLanguage) => {
        setSelectedLanguage(selectedLanguage);
    };

    return (
        <>
            <RegularHeader />

            <div className="min-h-scrren">
                {" "}
                <div className=" flex flex-col items-center justify-center py-36 ">
                    <h2 className="text-slate-900 py-6 font-bold">NEW MOVIE</h2>
                    <form
                        onSubmit={handleSubmit}
                        className=" flex flex-col w-1/3 gap-12 justify-center items-center "
                    >
                        <div className="relative h-10 w-full min-w-[200px] ">
                            <label
                                htmlFor="title"
                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-slate-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t-2 before:border-slate-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t-2 after:border-r-2 after:border-slate-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-slate-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-mb-quartery peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-mb-quartery peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-mb-quartery peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-slate-500"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className=" peer h-full  w-full rounded-[7px] border-2 border-slate-500 border-t-transparent bg-transparent px-5 py-6 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-mb-quartery focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                        </div>
                        <div className="relative h-fit  w-full min-w-[200px] ">
                            <label
                                htmlFor="genre"
                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-slate-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t-2 before:border-slate-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t-2 after:border-r-2 after:border-slate-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-slate-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-mb-quartery peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-mb-quartery peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-mb-quartery peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-slate-500"
                            >
                                Genre
                            </label>
                            <div className=" peer min-h-fit w-full rounded-[7px] border-2 border-slate-500 border-t-transparent bg-transparent px-5 py-6 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-mb-quartery focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                                <GenreSelection
                                    onGenreChange={handleGenreChange}
                                />
                            </div>
                        </div>

                        <div className="relative h-10 w-full min-w-[200px]">
                            <label
                                htmlFor="releaseDate"
                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-slate-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t-2 before:border-slate-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t-2 after:border-r-2 after:border-slate-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-slate-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-mb-quartery peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-mb-quartery peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-mb-quartery peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-slate-500"
                            >
                                Release Date
                            </label>
                            <input
                                type="date"
                                name="releaseDate"
                                value={releaseDate}
                                onChange={(e) => setReleaseDate(e.target.value)}
                                className=" peer h-full w-full rounded-[7px] border-2 border-slate-500 border-t-transparent bg-transparent px-5 py-6 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-mb-quartery focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                        </div>
                        <div className="relative h-10 w-full min-w-[200px]">
                            <label
                                htmlFor="rating"
                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-slate-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t-2 before:border-slate-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t-2 after:border-r-2 after:border-slate-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-slate-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-mb-quartery peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-mb-quartery peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-mb-quartery peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-slate-500"
                            >
                                Rating
                            </label>
                            <div className="flex justify-center items-center h-full pt-4 -pb-2">
                                <input
                                    type="number"
                                    max="10"
                                    min="0.1"
                                    step="0.1"
                                    name="rating"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    className="peer h-full w-full rounded-[7px] border-2 border-slate-500 border-t-transparent bg-transparent px-5 py-6 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-mb-quartery focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    placeholder=" "
                                />
                            </div>
                        </div>
                        <div className="relative h-10 w-full min-w-[200px]">
                            <label
                                htmlFor="language"
                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-slate-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t-2 before:border-slate-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t-2 after:border-r-2 after:border-slate-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-slate-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-mb-quartery peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-mb-quartery peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-mb-quartery peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-slate-500"
                            >
                                Language
                            </label>
                            <div className=" peer h-full w-full rounded-[7px] border-2 border-slate-500 border-t-transparent bg-transparent px-5 py-6 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-mb-quartery focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                                <LanguageSelection
                                    onLanguageChange={handleLanguageChange}
                                />
                            </div>
                        </div>
                        <div className="relative h-10 w-full min-w-[200px]">
                            <label
                                htmlFor="poster"
                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-slate-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t-2 before:border-slate-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t-2 after:border-r-2 after:border-slate-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-slate-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-mb-quartery peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-mb-quartery peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-mb-quartery peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-slate-500"
                            >
                                Poster URL
                            </label>
                            <input
                                type="url"
                                name="poster"
                                value={poster}
                                onChange={(e) => setPoster(e.target.value)}
                                className=" break-normal peer h-full w-full rounded-[7px] border-2 border-slate-500 border-t-transparent bg-transparent px-5 py-6 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-mb-quartery focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                        </div>
                        <div className="relative h-30 w-full min-w-[200px]">
                            <label
                                htmlFor="overview"
                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-slate-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t-2 before:border-slate-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t-2 after:border-r-2 after:border-slate-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-slate-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-mb-quartery peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-mb-quartery peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-mb-quartery peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-slate-500"
                            >
                                Overview
                            </label>
                            <textarea
                                type="textarea"
                                name="overview"
                                value={overview}
                                onChange={(e) => setOverview(e.target.value)}
                                className=" break-normal peer h-full w-full rounded-[7px] border-2 border-slate-500 border-t-transparent bg-transparent px-5 py-6 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-mb-quartery focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                        </div>
                        <button className=" border rounded-xl bg-mb-quartery p-2 my-4 w-36 font-bold  text-mb-secondary">
                            Add Movie
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default NewMovie;
