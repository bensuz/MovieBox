import { TypeAnimation } from "react-type-animation";
import movie from "../assets/movie_scene.mp4";

const Hero = () => {
    return (
        <>
            <div className="top-24 bg-mb-gray overflow-hidden relative mb-24">
                <div className="h-144 overflow-hidden ">
                    <video
                        autoPlay
                        loop
                        muted
                        className=" w-full  "
                        src={movie}
                    ></video>
                    <div className=" inset-0 absolute flex justify-center items-center mx-20 ">
                        <TypeAnimation
                            sequence={[
                                "FIND GREATEST MOVIES",
                                2000,
                                "CREATE YOUR OWN MOVIE LIST",
                                2000,
                            ]}
                            speed={10}
                            repeat={Infinity}
                            className="text-white font-bold text-5xl"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
