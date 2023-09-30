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
// import { AuthContext } from "../context/Auth";
// import { useContext } from "react";

const Movies = () => {
    const [movies, setMovies] = useState(null);
    const [userMovies, setUserMovies] = useState(null);
    // const context = useContext(AuthContext);

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

    // useEffect(() => {
    //     axios
    //         .get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/usermovies/`)
    //         .then((res) => {
    //             console.log(res.data);
    //             setUserMovies(res.data);
    //         })
    //         .catch((e) => console.log(e));
    // }, []);

    if (!movies) {
        return <Spinner className="h-16 w-16 text-mb-quartery" />;
    }

    return (
        <>
            <Hero />
            {/* My List */}
            {userMovies?.length > 0 && (
                <div className="bg-slate-800 p-10">
                    ;<h2 className="text-white text-2xl font-bold ">MY LIST</h2>
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
                        className="mySwiper"
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
                </div>
            )}
            {/* Discover */}
            <div className="p-10 bg-mb-tertiary ">
                <h2 className="text-white text-2xl font-bold ">DISCOVER</h2>
                <Discover />
            </div>
        </>
    );
};

export default Movies;
