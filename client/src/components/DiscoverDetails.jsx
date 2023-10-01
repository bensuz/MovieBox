import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../context/Auth";
import { useContext } from "react";

const DiscoverDetails = () => {
    const { id } = useParams();

    const [error, setError] = useState(null);
    const [movie, setMovie] = useState(null);
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [date, setDate] = useState("");
    const [rating, setRating] = useState("");
    const [poster, setPoster] = useState("");
    const [overview, setOverview] = useState("");
    const [language, setLanguage] = useState("");
    const context = useContext(AuthContext);
    const numericRating = parseFloat(rating);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_BASE_URL
                    }/api/publicmovies/public/${id}`
                );
                setMovie(response.data);
                setTitle(response.data.title);
                setGenre(response.data.genres[0].name);
                setDate(response.data.release_date);
                setRating(response.data.vote_average);
                setPoster(
                    `https://image.tmdb.org/t/p/original/${response.data.poster_path}`
                );
                setOverview(response.data.overview);
                setLanguage(response.data.original_language);
                console.log(parseInt(rating));
            } catch (error) {
                console.error("Error fetching movie details:", id);
                setError(error);
            }
        };

        fetchMovie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAddMyList = () => {
        // Make a POST request to your server with the movie data
        const ratingInt = parseInt(rating);

        axios
            .post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/usermovies`, {
                user_id: context.user.id,
                title,
                genre,
                date,
                rating,
                language,
                poster,
                overview,
            })
            .then((res) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Movie has been added to My List",
                    showConfirmButton: false,
                    timer: 1500,
                });
                console.log("Movie added to the list:", res.data);
            })
            .catch((e) => {
                console.log("Error adding movie to the list:", e);
            });
    };

    const backgroundImageStyle = movie
        ? {
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
              backgroundSize: "cover",
          }
        : {};

    const overlayStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
    };

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
                            <div className="flex justify-center items-center max-sm:min-h-fit  min-h-[600px] overflow-hidden min-w-1/3">
                                <img
                                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                    alt=""
                                    className="xl:rounded-l-xl max-xl:rounded-t-xl shadow-2xl shadow-gray-400 w-full"
                                />
                            </div>
                            <div className="  min-h-[600px] overflow-hidden pl-10 max-sm:pl-0  flex flex-col justify-start  items-start  max-xl:justify-center max-xl:items-center bg-slate-900 xl:rounded-r-xl max-xl:rounded-b-xl">
                                <h2 className="text-6xl xl:pt-20 font-medium uppercase max-md:text-4xl">
                                    {movie.title}
                                </h2>
                                <div className="flex items-center gap-4 max-sm:gap-1 pt-2 ">
                                    <p className="text-lg max-md:text-sm font-thin p-2 uppercase">
                                        {movie.genres[0].name}
                                    </p>
                                    <i className="fas fa-diamond text-sm max-sm:hidden"></i>
                                    <p className="text-lg max-md:text-sm  font-thin p-2 uppercase">
                                        {movie.genres[1].name}
                                    </p>
                                    <i className="fas fa-diamond text-sm max-sm:hidden"></i>
                                    <p className="text-lg max-md:text-sm font-thin p-2 uppercase">
                                        {movie.genres[2].name}
                                    </p>
                                </div>
                                <div className="flex justify-start items-start max-xl:w-full max-xl:">
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
                                                    {movie.vote_average.toFixed(
                                                        1
                                                    )}
                                                </p>
                                            </div>
                                            <div className="flex justify-start items-center">
                                                <i
                                                    className="fas fa-comments text-blue-300 text-xl mr-0 "
                                                    title="Language"
                                                ></i>
                                                <p className="text-lg font-thin p-2 uppercase max-md:text-sm ">
                                                    {movie.original_language}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-lg xl:pr-20 p-2 max-md:text-base ">
                                                {movie.overview}
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleAddMyList}
                                            className="border rounded-xl bg-mb-quartery hover:bg-pink-800 text-white p-3 self-end mr-10 max-xl:self-center xl:mr-24 "
                                        >
                                            <i
                                                className="fas fa-heart text-lg leading-none mr-3"
                                                title="Add to My List"
                                            ></i>{" "}
                                            Add to My List
                                        </button>
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

export default DiscoverDetails;
