import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Swiper, SwiperSlide } from "swiper/react";
import "./movies.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import SwiperCore, { Navigation, Pagination } from "swiper/core";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import Hero from "./Hero";
import Discover from "./Discover";
import { Spinner } from "@material-tailwind/react";
import { AuthContext } from "../context/Auth";
import { useContext } from "react";

const Movies = () => {
    const [movies, setMovies] = useState(null);
    const [userMovies, setUserMovies] = useState(null);
    const context = useContext(AuthContext);

    useEffect(() => {
        axios
            .get(
                `${
                    import.meta.env.VITE_SERVER_BASE_URL
                }/api/publicmovies/public`
            )
            .then((res) => {
                console.log(res.data);
                setMovies(res.data);
            })
            .catch((e) => console.log(e));
    }, []);

    useEffect(() => {
        axios
            .get(
                `${import.meta.env.VITE_SERVER_BASE_URL}/api/usermovies/${
                    context?.user?.id
                }`
            )
            .then((res) => {
                console.log(res.data);
                setUserMovies(res.data);
            })
            .catch((e) => console.log(e));
    }, []);

    if (!movies) {
        return <Spinner className="h-16 w-16 text-mb-quartery" />;
    }

    return (
        <>
            <Hero />
            {/* My List */}
            {userMovies?.length > 0 && (
                <div className="bg-slate-800 p-10 flex flex-col items-center justify-center">
                    <Link
                        to="/mylist"
                        className="text-white text-xl lg:text-2xl font-bold self-start font-scada"
                    >
                        MY LIST
                    </Link>
                    <div className="flex card w-full shadow-xl text-white flex-wrap justify-center items-center my-3 gap-8 lg:hidden">
                        {userMovies?.slice(0, 6).map((movie) => (
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
                                        <h2 className="card-title pt-2 text-lg font-medium text-slate-700 h-2/4 overflow-hidden">
                                            {movie.title}
                                        </h2>
                                        <div className="h-2/4">
                                            <div>
                                                <i
                                                    className="fas fa-star text-yellow-400 text-lg mr-1 "
                                                    title="Rating"
                                                ></i>
                                                {movie.vote_average}
                                            </div>
                                            <div className="card-actions flex justify-between items-center gap-11">
                                                <button
                                                    // onClick={handleAddMovie}
                                                    className="middle none center flex items-center justify-center rounded-lg p-3 font-sans text-xs font-bold uppercase text-mb-quartery transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                    data-ripple-dark="true"
                                                >
                                                    <i
                                                        className="fas fa-heart text-lg leading-none"
                                                        title="Add to My List"
                                                    ></i>{" "}
                                                </button>
                                                <Link
                                                    to={`/movies/discover/${movie.id}`}
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
                    <Swiper
                        effect={"coverflow"}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={"auto"}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        pagination={true}
                        modules={[EffectCoverflow, Pagination]}
                        className="mySwiper max-lg:hidden "
                        // loop={true}
                    >
                        {userMovies &&
                            userMovies.map((movie) => (
                                <SwiperSlide
                                    key={movie.id}
                                    className="swiper-slide"
                                >
                                    <Card
                                        sx={{ maxWidth: 345 }}
                                        className="slider-cards"
                                    >
                                        <CardMedia
                                            sx={{ height: 340 }}
                                            image={movie.poster}
                                            title={movie.title}
                                            className="card-img"
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                            >
                                                {movie.title}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Link
                                                to={`/movies/${movie.id}`}
                                                className=" px-3 text-md text-mb-secondary hover:text-mb-quartery"
                                            >
                                                See Details
                                            </Link>
                                        </CardActions>
                                    </Card>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                    <Link
                        to="/mylist"
                        className="text-white self-end flex items-center justify-center gap-2 hover:animate-wiggle hover:animate-infinite hover:animate-duration-[2000ms] mt-6"
                    >
                        See All Favorites
                        <i
                            className="fas fa-arrow-right text-lg leading-none mr-3 hover:animate-wiggle  hover:animate-infinite hover:animate-duration-[2000ms] "
                            title="See All Favorites"
                        ></i>{" "}
                    </Link>
                </div>
            )}

            {/* Discover */}
            <div className="p-10 bg-mb-tertiary">
                <h2 className="text-white text-xl lg:text-2xl font-bold font-scada">
                    DISCOVER
                </h2>
                <Discover />
            </div>
        </>
    );
};

export default Movies;
