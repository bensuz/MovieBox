import { TypeAnimation } from "react-type-animation";
import movie from "../assets/movie_scene.mp4";

const Hero = () => {
    return (
        <>
            <div className="top-24 bg-mb-gray overflow-hidden relative mb-24">
                <div className="max-h-[800px] overflow-hidden ">
                    <video
                        autoPlay
                        loop
                        muted
                        className=" w-full  "
                        src={movie}
                    ></video>
                    <div className=" inset-0 absolute flex justify-center items-center text-md sm:text-xl md:text-3xl top-50  max-[400px]:hidden ">
                        <TypeAnimation
                            sequence={[
                                "FIND GREATEST MOVIES",
                                2000,
                                "CREATE YOUR OWN MOVIE LIST",
                                2000,
                            ]}
                            speed={10}
                            repeat={Infinity}
                            className="text-white font-bold text-md sm:text-xl md:text-3xl"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
