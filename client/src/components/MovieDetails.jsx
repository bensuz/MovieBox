//movie details page that displays selected movie details from user movie list

import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import Swal from "sweetalert2";
import noposter from "../assets/noposter.jpg";

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [movie, setMovie] = useState(null);
    const [genres, setGenres] = useState([]);

    //fetching the user movies and converting genres to array
    useEffect(() => {
        window.scrollTo(0, 0);
        axios
            .get(`/api/usermovies/details/${id}`)
            .then((res) => {
                setMovie(res.data);
                const genresArray = res.data.genre
                    .replace(/[{}]/g, "")
                    .split(",");
                setGenres(genresArray);
            })
            .catch((e) => setError(e.response?.data?.message));
    }, []);
    const genresWithoutQuotes = genres.map((genre) => genre.replace(/"/g, ""));

    //deleting the movie from db if pressed delete button
    const handleDelete = () => {
        axios
            .delete(`/api/usermovies/details/${id}`)
            // eslint-disable-next-line no-unused-vars
            .then((res) => {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            "Deleted!",
                            "Movie has been deleted from My List.",
                            "success"
                        );
                        navigate("/");
                    }
                });
            })
            .catch((e) => console.log(e));
    };
    //for blurred background
    const backgroundImageStyle = movie
        ? {
              backgroundImage: movie.poster
                  ? `url(${movie.poster})`
                  : `url(${noposter})`,
              backgroundSize: "cover",
          }
        : {};

    const overlayStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
    };

    //formatting the date to display properly
    const releaseDate = new Date(movie?.release_date);
    const formattedReleaseDate = releaseDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return (
        <>
            <div
                className=" relative py-72 w-full min-h-fit flex items-center justify-center"
                style={backgroundImageStyle}
            >
                <div
                    style={overlayStyle}
                    className="absolute inset-0 z-0"
                ></div>{" "}
                {error && <p>{error}</p>}
                {movie && (
                    <>
                        {" "}
                        <div className="z-10 flex max-xl:flex-col  rounded-l-xl  max-xl:rounded-t-xl shadow-xl shadow-slate-500  w-5/6 text-white">
                            <div className="flex justify-center items-center max-sm:min-h-fit  min-h-[600px] overflow-hidden min-w-1/3 xl:w-1/2">
                                <img
                                    src={`${movie.poster}`}
                                    alt=""
                                    className="xl:rounded-l-xl max-xl:rounded-t-xl shadow-2xl shadow-gray-400 w-full"
                                />
                            </div>
                            <div className=" font-scada  xl:w-1/2 min-h-[600px] overflow-hidden pl-10 max-sm:pl-0  flex flex-col justify-start  items-start  max-xl:justify-center max-xl:items-center bg-slate-900 xl:rounded-r-xl max-xl:rounded-b-xl">
                                <h2 className="text-6xl xl:pt-20 font-medium uppercase max-md:text-4xl">
                                    {movie?.title}
                                </h2>
                                {genresWithoutQuotes.length > 0 && (
                                    <div className="flex items-center gap-4 max-sm:gap-1 pt-2 ">
                                        {genresWithoutQuotes.map(
                                            (genre, index) => (
                                                <p
                                                    key={index}
                                                    className="text-lg max-md:text-sm font-thin p-2 uppercase"
                                                >
                                                    {genre}
                                                </p>
                                            )
                                        )}
                                    </div>
                                )}
                                <div className="flex justify-start items-start max-xl:w-full ">
                                    <div className="w-full flex flex-col gap-16 max-xl:w-full max-xl:p-2">
                                        <div className=" flex justify-start items-center max-sm:gap-2 gap-12 max-xl:self-center max-xl:gap-10">
                                            <div className="flex justify-start items-center">
                                                <i
                                                    className="fas fa-calendar-days text-blue-200 text-xl  mr-0 "
                                                    title="Rating"
                                                ></i>
                                                <p className="text-lg font-thin p-2 max-md:text-sm ">
                                                    {formattedReleaseDate}
                                                </p>
                                            </div>
                                            <div className="flex justify-start items-center">
                                                <i
                                                    className="fas fa-star text-yellow-400 text-xl mr-0 "
                                                    title="Rating"
                                                ></i>
                                                <p className="text-lg font-thin p-2 max-md:text-sm ">
                                                    {movie?.rating}
                                                </p>
                                            </div>
                                            <div className="flex justify-start items-center">
                                                <i
                                                    className="fas fa-comments text-blue-300 text-xl mr-0 "
                                                    title="Language"
                                                ></i>
                                                <p className="text-lg font-thin p-2 uppercase max-md:text-sm ">
                                                    {movie?.language}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-lg xl:pr-20 p-2 max-md:text-base ">
                                                {movie?.overview}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-end gap-5 max-sm:flex-col max-sm:justify-center max-sm:items-center">
                                            <Link
                                                to={`/movies/${id}/update`}
                                                className="border border-slate-900 rounded-xl bg-mb-quartery hover:bg-pink-800 text-white p-3 self-end  max-xl:self-center w-52 "
                                            >
                                                <i
                                                    className="fas fa-pen-to-square text-lg leading-none mr-1"
                                                    title="Update"
                                                ></i>{" "}
                                                Update Movie Info
                                            </Link>
                                            <button
                                                onClick={handleDelete}
                                                className="border border-slate-900 rounded-xl bg-mb-quartery hover:bg-pink-800 text-white p-3 self-end mr-10 max-sm:mr-0 max-xl:self-center xl:mr-24 w-52"
                                            >
                                                <i
                                                    className="fas fa-trash-can text-lg leading-none mr-1"
                                                    title="Add to My List"
                                                ></i>{" "}
                                                Delete From My List
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default MovieDetails;
