import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../context/Auth";
import { useContext } from "react";

const DiscoverDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [movie, setMovie] = useState(null);
    const [title, setTitle] = useState("");
    const [releaseYear, setReleaseYear] = useState("");
    const [genre, setGenre] = useState([]);
    const [fetchedRating, setFetchedRating] = useState("");
    const [poster, setPoster] = useState("");
    const [overview, setOverview] = useState("");
    const [language, setLanguage] = useState("");
    const context = useContext(AuthContext);
    const [trailer, setTrailer] = useState("");
    const [userMovies, setUserMovies] = useState(null);
    const [movieExists, setMovieExists] = useState(false);
    const [userMovieId, setUserMovieId] = useState(null);

    //fetching public movies from tmdb
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchMovie = async () => {
            try {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_BASE_URL
                    }/api/publicmovies/public/${id}`
                );
                setMovie(response.data);
                setTitle(response.data.title);
                setGenre(response.data.genres.map((genre) => genre.name));
                setFetchedRating(parseFloat(response.data.vote_average));
                setReleaseYear(response.data.release_date.slice(0, 4));
                setPoster(
                    `https://image.tmdb.org/t/p/original/${response.data.poster_path}`
                );
                setOverview(response.data.overview);
                setLanguage(response.data.original_language);
                // console.log(response.data);
            } catch (error) {
                console.error("Error fetching movie details:", id);
                setError(error);
            }
        };

        fetchMovie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //fetching trailers from youtube data api
    useEffect(() => {
        const fetchTrailers = async () => {
            console.log("Youtube API called");
            try {
                // Make a request to the YouTube Data API to get trailers based on the movie title
                const response = await axios.get(
                    "https://www.googleapis.com/youtube/v3/search",
                    {
                        params: {
                            key: import.meta.env.VITE_YOUTUBE_API_KEY,
                            q: `${title} official trailer ${releaseYear}`,
                            part: "snippet",
                            type: "video",
                            maxResults: 1,
                        },
                    }
                );

                // Extract the video IDs from the API response
                const trailerId = response.data.items[0]?.id?.videoId;

                // Set the trailers state variable with the video URLs
                setTrailer(trailerId);
            } catch (error) {
                console.error("Error fetching trailers:", error);
            }
        };

        if (title && trailer == "") {
            fetchTrailers(); // Call the fetchTrailers function
        }
    }, [title]);

    //fetching user movies to compare to see if the tmdb movie is already on the list

    if (context.user) {
        console.log(context.user);
        axios
            .get(
                `${import.meta.env.VITE_SERVER_BASE_URL}/api/usermovies/${
                    context.user.id
                }`
            )
            .then((res) => {
                const matchingUserMovie = res.data.find(
                    (movie) => movie.title === title
                );

                if (matchingUserMovie) {
                    setUserMovieId(matchingUserMovie?.id);
                    setMovieExists(true);
                }
            })
            .catch((e) => console.log(e));
    }

    //adding movie to the list if not already exists
    const handleAddMyList = () => {
        const rating = parseFloat(fetchedRating).toFixed(1);

        if (movieExists) {
            // Display a message indicating that the movie already exists
            Swal.fire({
                icon: "warning",
                title: "Movie Already Exists",
                text: "This movie is already in your list.",
            });
        } else {
            axios
                .post(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/api/usermovies`,
                    {
                        user_id: context.user.id,
                        title,
                        genre,
                        releaseDate,
                        rating,
                        language: languageMappings[language] || language,
                        poster,
                        overview,
                    }
                )
                .then((res) => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Movie has been added to My List",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setMovieExists(true);
                    // console.log("Movie added to the list:", res.data);
                })
                .catch((e) => console.log(e));
        }
    };

    const deleteFromMyList = () => {
        axios
            .delete(
                `${
                    import.meta.env.VITE_SERVER_BASE_URL
                }/api/usermovies/details/${userMovieId}`
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
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
              backgroundSize: "cover",
          }
        : {};

    const overlayStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
    };

    const releaseDateChanging = new Date(movie?.release_date);
    const formattedReleaseDate = releaseDateChanging.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );

    const releaseDateForPg = releaseDateChanging
        .toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        })
        .replace(/\//g, "-");
    const parts = releaseDateForPg.split("-");
    const releaseDate = `${parts[2]}-${parts[0]}-${parts[1]}`;

    const handleLoginClick = () => {
        navigate("/login");
    };

    const languageMappings = {
        en: "English",
        it: "Italian",
        de: "German",
        ru: "Russian",
        es: "Spanish",
        pt: "Portuguese",
        gr: "Greek",
        fr: "French",
        ja: "Japon",
        nl: "Dutch",
        hi: "Indian",
        tr: "Turkish",
        uk: "Ukranian",
        ar: "Arabic",
        bg: "Bulgarian",
        da: "Danish",
    };

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
                                    src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                                    alt=""
                                    className="xl:rounded-l-xl max-xl:rounded-t-xl shadow-2xl shadow-gray-400 w-full"
                                />
                            </div>
                            <div className="font-scada xl:w-1/2 min-h-[600px] overflow-hidden pl-10 max-sm:pl-0  flex flex-col justify-start  items-start  max-xl:justify-center max-xl:items-center max-xl:py-14 bg-slate-900 xl:rounded-r-xl max-xl:rounded-b-xl">
                                <h2 className="text-6xl xl:pt-20 font-medium max-sm:text-center uppercase max-md:text-4xl">
                                    {movie?.title}
                                </h2>
                                <div className="flex items-center gap-4 max-sm:gap-1 pt-2 ">
                                    <p className="text-lg max-md:text-sm font-thin p-2 uppercase">
                                        {movie.genres[0]?.name}
                                    </p>
                                    <i className="fas fa-diamond text-sm max-sm:hidden"></i>
                                    <p className="text-lg max-md:text-sm  font-thin p-2 uppercase">
                                        {movie.genres[1]?.name}
                                    </p>
                                    <i className="fas fa-diamond text-sm max-sm:hidden"></i>
                                    <p className="text-lg max-md:text-sm font-thin p-2 uppercase">
                                        {movie.genres[2]?.name}
                                    </p>
                                </div>
                                <div className="flex justify-start items-start max-xl:w-full max-xl:">
                                    <div className="w-full flex flex-col gap-12 max-xl:w-full max-xl:p-2">
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
                                                    {movie?.vote_average.toFixed(
                                                        1
                                                    )}
                                                </p>
                                            </div>
                                            <div className="flex justify-start items-center">
                                                <i
                                                    className="fas fa-comments text-blue-300 text-xl mr-0 "
                                                    title="Language"
                                                ></i>
                                                <p className="text-lg font-thin px-2 uppercase max-md:text-sm ">
                                                    {movie?.original_language}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="2xl:max-w-[550px] 2xl:h-[400px] xl:max-w-[450px] xl:h-[300px]  max-xl:self-center lg:w-[500px] lg:h-[350px] max-lg:w-[350px] max-lg:h-[250px] max-sm:w-[200px] max-sm:h-[150px] rounded-xl shadow-md shadow-gray-600 overflow-hidden aspect-w-16 aspect-h-9 ">
                                            <iframe
                                                // src={`https://www.youtube.com/embed/${videoId}`}
                                                src={`https://www.youtube.com/embed/${trailer}`}
                                                title="YouTube Video"
                                                className="w-full h-full"
                                                allowFullScreen
                                            />
                                        </div>
                                        <div>
                                            <p className="text-lg xl:pr-20 px-2 max-md:text-base ">
                                                {movie?.overview}
                                            </p>
                                        </div>
                                        {context.user ? (
                                            !movieExists ? (
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
                                            ) : (
                                                <button
                                                    onClick={deleteFromMyList}
                                                    className="border rounded-xl bg-mb-quartery hover:bg-pink-800 text-white p-3 self-end mr-10 max-xl:self-center xl:mr-24 "
                                                >
                                                    <i
                                                        className="fas fa-trash-can text-lg leading-none mr-3"
                                                        title="Remove from My List"
                                                    ></i>{" "}
                                                    Remove From My List
                                                </button>
                                            )
                                        ) : (
                                            <button
                                                onClick={handleLoginClick}
                                                className="border rounded-xl bg-mb-quartery hover:bg-pink-800 text-white p-3 self-end mr-10 max-xl:self-center xl:mr-24 "
                                            >
                                                <i
                                                    className="fas  fa-right-to-bracket text-lg leading-none mr-2"
                                                    title="Add to My List"
                                                ></i>{" "}
                                                Login to add to your list
                                            </button>
                                        )}
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
