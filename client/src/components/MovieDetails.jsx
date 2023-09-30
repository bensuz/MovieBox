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
                }/api/publicmovies/public/${id}`
            )
            .then((res) => setMovie(res.data))
            .catch((e) => setError(e.response?.data?.message));
    }, []);

    const handleDelete = () => {
        axios
            .delete(
                `${
                    import.meta.env.VITE_SERVER_BASE_URL
                }/api/publicmovies/public/${id}`
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

    return (
        <>
            <div className="py-[600px] h-96 flex flex-col justify-center items-center">
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
            </div>
        </>
    );
};

export default MovieDetails;
