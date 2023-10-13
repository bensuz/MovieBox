/* eslint-disable no-unused-vars */

//updating the existing movie information
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axiosInstance";
import Swal from "sweetalert2";
import GenreSelection from "./GenreSelection";
import LanguageSelection from "./LanguageSelection";
import { AuthContext } from "../context/Auth";
import { useContext } from "react";

const UpdateMovie = () => {
    const { id } = useParams();
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [movie, setMovie] = useState();
    const [error, setError] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [parsedGenre, setParsedGenre] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [formattedReleaseDate, setFormattedReleaseDate] = useState("");
    const [fetchedRating, setFetchedRating] = useState("");
    const [title, setTitle] = useState("");
    const genreOptions = [
        {
            value: "adventure",
            label: "Adventure",
            color: "#00B8D9",
        },
        {
            value: "thriller",
            label: "Thriller",
            color: "#0052CC",
        },
        { value: "horror", label: "Horror", color: "#5243AA" },
        { value: "romance", label: "Romance", color: "#FF5630" },
        {
            value: "sci-fi",
            label: "Science-Fiction",
            color: "#FF8B00",
        },
        { value: "comedy", label: "Comedy", color: "#36B37E" },
        { value: "drama", label: "Drama", color: "#FFC400" },
        { value: "mistery", label: "Mistery", color: "#00875A" },
        { value: "muscial", label: "Musical", color: "#253858" },
        { value: "western", label: "Western", color: "#896542" },
        { value: "crime", label: "Chrime", color: "#784569" },
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // fetching the movie details from user list db
    useEffect(() => {
        axios
            .get(`/api/usermovies/details/${id}`)
            .then((res) => {
                setMovie(res.data);
                setTitle(res.data.title);
                setFetchedRating(res.data.rating);
                const releaseDate = new Date(res.data.release_date);
                const year = releaseDate.getFullYear();
                const month = String(releaseDate.getMonth() + 1).padStart(
                    2,
                    "0"
                );
                const day = String(releaseDate.getDate()).padStart(2, "0");
                const formattedDate = `${year}-${month}-${day}`;
                setFormattedReleaseDate(formattedDate);
                const genreNow = res.data.genre;
                const validJsonGenre = genreNow
                    .replace(/^{/, "[")
                    .replace(/}$/, "]");
                setParsedGenre(JSON.parse(validJsonGenre));

                // console.log("parsed genre", JSON.parse(validJsonGenre));
                setLoaded(true);
            })
            .catch((e) => setError(e.response?.data?.message));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    //getting the new info from form by submission

    const handleSubmit = (e) => {
        e.preventDefault();
        const rating = parseFloat(fetchedRating).toFixed(1);
        axios
            .put(`/api/usermovies/details/${id}`, {
                ...movie,
                genre: selectedGenres.map((genre) => genre.label),
                releaseDate: formattedReleaseDate,
                language: selectedLanguage.label,
            })
            .then((res) => {
                Swal.fire(
                    "Updated!",
                    "Movie has been updated on My List.",
                    "success"
                );
                navigate(`/movies/${id}`);
            })
            .catch((e) => console.log(e));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie({ ...movie, [name]: value });
    };

    const handleGenreChange = (selectedGenres) => {
        setSelectedGenres(selectedGenres);
    };
    const handleLanguageChange = (selectedLanguage) => {
        setSelectedLanguage(selectedLanguage);
    };

    const handleReleaseDateChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormattedReleaseDate(value); // Update the formatted release date
        setMovie((prevMovie) => ({ ...prevMovie, [name]: value })); // Update the movie state
        // console.log(movie);
    };
    return (
        loaded && (
            <>
                <div className=" min-h-fit">
                    {" "}
                    {error && <p>{error}</p>}
                    <div className=" flex flex-col items-center justify-center py-36 ">
                        <h2 className="text-slate-900 py-6 font-bold">
                            UPDATING MOVIE DETAILS
                        </h2>

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
                                    value={movie?.title || ""}
                                    onChange={handleChange}
                                    required
                                    className=" peer h-full  w-full rounded-[7px] border-2 border-slate-500 border-t-transparent bg-transparent px-5 py-6 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-mb-quartery focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    placeholder=" "
                                />
                            </div>
                            <div className="relative h-fit w-full min-w-[200px] ">
                                <label
                                    htmlFor="genre"
                                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-slate-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t-2 before:border-slate-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t-2 after:border-r-2 after:border-slate-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-slate-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-mb-quartery peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-mb-quartery peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-mb-quartery peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-slate-500"
                                >
                                    Genre
                                </label>
                                <div className=" peer h-fit w-full rounded-[7px] border-2 border-slate-500 border-t-transparent bg-transparent px-5 py-6 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-mb-quartery focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                                    <GenreSelection
                                        onGenreChange={handleGenreChange}
                                        parsedGenre={parsedGenre}
                                    />
                                </div>
                            </div>
                            <div className="relative h-10 w-full min-w-[200px]">
                                <label
                                    htmlFor="formattedReleaseDate"
                                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-slate-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t-2 before:border-slate-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t-2 after:border-r-2 after:border-slate-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-slate-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-mb-quartery peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-mb-quartery peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-mb-quartery peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-slate-500"
                                >
                                    Release Date
                                </label>
                                <input
                                    type="date"
                                    name="formattedReleaseDate"
                                    value={formattedReleaseDate || ""}
                                    onChange={handleReleaseDateChange}
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
                                <input
                                    type="number"
                                    max="10"
                                    min="0.1"
                                    step="0.1"
                                    name="rating"
                                    value={movie?.rating || ""}
                                    onChange={handleChange}
                                    className=" peer h-full w-full rounded-[7px] border-2 border-slate-500 border-t-transparent bg-transparent px-5 py-6 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-mb-quartery focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    placeholder=" "
                                />
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
                                        language={movie?.language}
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
                                    value={movie?.poster || ""}
                                    onChange={handleChange}
                                    className=" break-normal peer h-full w-full rounded-[7px] border-2 border-slate-500 border-t-transparent bg-transparent px-5 py-6 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-mb-quartery focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    placeholder=" "
                                />
                            </div>
                            <div className="relative h-40 w-full min-w-[200px]">
                                <label
                                    htmlFor="overview"
                                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-slate-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t-2 before:border-slate-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t-2 after:border-r-2 after:border-slate-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-slate-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-mb-quartery peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-mb-quartery peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-mb-quartery peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-slate-500"
                                >
                                    Overview
                                </label>
                                <textarea
                                    type="textarea"
                                    name="overview"
                                    value={movie?.overview || ""}
                                    onChange={handleChange}
                                    className=" break-normal peer h-full w-full rounded-[7px] border-2 border-slate-500 border-t-transparent bg-transparent px-5 py-6 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-mb-quartery focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    placeholder=" "
                                />
                            </div>
                            <button className=" border rounded-xl bg-mb-quartery p-2 my-4 w-36 font-bold  text-mb-secondary">
                                Update Movie
                            </button>
                        </form>
                    </div>
                </div>
            </>
        )
    );
};

export default UpdateMovie;
