import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animation1 from "../assets/animations/animation1.json";
import animation2 from "../assets/animations/animation2.json";
import animation3 from "../assets/animations/animation3.json";

const Animations = () => {
    const animations = [animation1, animation2, animation3];
    const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
    const [paragraphText, setParagraphText] = useState(
        "Find Out About the Most Popular Movies"
    );
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAnimationIndex(
                (prevIndex) => (prevIndex + 1) % animations.length
            );
            if (currentAnimationIndex === 0) {
                setParagraphText("Find Out About the Most Popular Movies");
            } else if (currentAnimationIndex === 1) {
                setParagraphText("Create Your Own Movie List");
            } else {
                setParagraphText("Enjoy the Extensive Movie Selection");
            }
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [animations]);

    return (
        <>
            <div className="max-lg:w-1/3 w-1/2 flex items-start justify-start  ">
                <Lottie
                    animationData={animations[currentAnimationIndex]}
                    loop={true}
                    autoplay={true}
                    speed={1}
                />
            </div>
            <p
                className={
                    "font-poppins text-xl font-medium animate-fade-left animate-infinite animate-duration-[5000ms] max-xl:text-md max-xl:w-2/3 max-xl:text-center    "
                }
            >
                {paragraphText}
            </p>
        </>
    );
};

export default Animations;
