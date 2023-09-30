import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const DiscoverDetails = () => {
    const { id } = useParams();

    const [error, setError] = useState(null);
    const [movie, setMovie] = useState(null);
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [rating, setRating] = useState("");
    const [poster, setPoster] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [director, setDirector] = useState("");

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
                setYear(response.data.release_date);
                setRating(response.data.vote_average);
                setPoster(
                    `https://image.tmdb.org/t/p/original/${response.data.poster_path}`
                );
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
        const yearInt = parseInt(year.slice(0, 4));
        const ratingInt = parseInt(rating);
        console.log(yearInt);
        axios
            .post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/movies`, {
                title,
                year: yearInt,
                rating: ratingInt,
                poster,
                director,
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
    return (
        <>
            <div className=" py-[475px] h-72 w-3/5 mx-auto flex flex-col justify-center items-center  ">
                {error && <p>{error}</p>}
                {movie && (
                    <>
                        <div className="  h-fit flex flex-col justify-center items-start rounded-xl border-4 shadow-2xl shadow-gray-400 border-mb-quartery gap-5 px-16 ">
                            <h2 className="text-4xl py-5 font-bold">
                                {movie.title}
                            </h2>
                            <div className="flex justify-start items-start gap-10 pb-8">
                                <div className="flex flex-col justify-center items-center">
                                    <img
                                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                        alt=""
                                        width={320}
                                        className="rounded-md shadow-2xl shadow-gray-400"
                                    />
                                </div>
                                <div className="w-1/2 flex flex-col gap-16">
                                    <div className=" flex flex-col gap-2">
                                        <p className="text-lg font-medium p-2">
                                            Genre: {movie.genres[0].name}
                                        </p>
                                        <p className="text-lg font-medium p-2">
                                            Release Date: {movie.release_date}
                                        </p>
                                        <div className="flex justify-start items-center">
                                            <i
                                                className="fas fa-star text-yellow-400 text-2xl mr-0 "
                                                title="Rating"
                                            ></i>
                                            <p className="text-lg font-medium p-2">
                                                Rating: {movie.vote_average}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-lg  p-2">
                                            {movie.overview}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleAddMyList}
                                        className="border rounded-xl bg-mb-quartery hover:bg-pink-800 text-white p-3 self-end "
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
                    </>
                )}
            </div>
        </>
    );
};

export default DiscoverDetails;
