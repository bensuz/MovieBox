import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        axios
            .get(
                `${
                    import.meta.env.VITE_SERVER_BASE_URL
                }/api/usermovies/details/${id}`
            )
            .then((res) => setMovie(res.data))
            .catch((e) => setError(e.response?.data?.message));
    }, []);

    console.log("for movie details page", movie);
    const handleDelete = () => {
        axios
            .delete(
                `${
                    import.meta.env.VITE_SERVER_BASE_URL
                }/api/usermovies/details/${id}`
            )
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

    const backgroundImageStyle = movie
        ? {
              backgroundImage: `url(${movie.poster})`,
              backgroundSize: "cover",
          }
        : {};

    const overlayStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
    };

    const releaseDate = new Date(movie?.year);
    const formattedReleaseDate = releaseDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <>
            {/* <div className="py-[600px] h-96 flex flex-col justify-center items-center">
                {error && <p>{error}</p>}
                {movie && (
                    <>
                        <div className="flex flex-col justify-center items-start ">
                            <div className="flex flex-col justify-center items-center">
                                <h2 className="text-6xl py-5 font-bold">
                                    {movie.title}
                                </h2>
                                <img src={movie.poster} alt="" width={400} />
                            </div>
                            <div>
                                <p className="text-xl font-bold p-2">
                                    Director: {movie.director}
                                </p>
                                <p className="text-xl font-bold p-2">
                                    Year: {movie.year}
                                </p>
                                <p className="text-xl font-bold p-2">
                                    Rating: {movie.rating}
                                </p>
                            </div>
                        </div>
                        <div className="my-5 flex gap-8 text-white font-bold">
                            <Link
                                to={`/movies/${id}/update`}
                                className=" border rounded-xl bg-mb-quartery  p-2"
                            >
                                Update Movie
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="border rounded-xl bg-slate-900 text-white p-2"
                            >
                                Delete Movie
                            </button>
                        </div>
                    </>
                )}
            </div> */}
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
                            <div className="flex justify-center items-center max-sm:min-h-fit  min-h-[600px] overflow-hidden min-w-1/3">
                                <img
                                    src={`${movie.poster}`}
                                    alt=""
                                    className="xl:rounded-l-xl max-xl:rounded-t-xl shadow-2xl shadow-gray-400 w-full"
                                />
                            </div>
                            <div className=" font-scada  min-h-[600px] overflow-hidden pl-10 max-sm:pl-0  flex flex-col justify-start  items-start  max-xl:justify-center max-xl:items-center bg-slate-900 xl:rounded-r-xl max-xl:rounded-b-xl">
                                <h2 className="text-6xl xl:pt-20 font-medium uppercase max-md:text-4xl">
                                    {movie?.title}
                                </h2>
                                {movie.genre && (
                                    <div className="flex items-center gap-4 max-sm:gap-1 pt-2 ">
                                        <p className="text-lg max-md:text-sm font-thin p-2 uppercase">
                                            {movie?.genre}
                                        </p>
                                    </div>
                                )}
                                <div className="flex justify-start items-start max-xl:w-full max-xl:">
                                    <div className="w-full flex flex-col gap-16 max-xl:w-full max-xl:p-2">
                                        <div className=" flex justify-start items-center max-sm:gap-2 gap-12 max-xl:self-center max-xl:gap-10">
                                            <div className="flex justify-start items-center">
                                                <i
                                                    className="fas fa-calendar-days text-blue-200 text-xl  mr-0 "
                                                    title="Rating"
                                                ></i>
                                                <p className="text-lg font-thin p-2 max-md:text-sm ">
                                                    {movie.release_date}
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
