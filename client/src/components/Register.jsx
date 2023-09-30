import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/Auth";
import { Link, Navigate } from "react-router-dom";
import logo from "../assets/logo_new.png";
import Lottie from "lottie-react";
import animation1 from "../assets/animations/animation1.json";
import animation2 from "../assets/animations/animation2.json";
import animation3 from "../assets/animations/animation3.json";

const Register = () => {
    const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
    const [paragraphText, setParagraphText] = useState(
        "Find Out About the Most Popular Movies"
    );

    useEffect(() => {
        const animations = [animation1, animation2, animation3];

        const interval = setInterval(() => {
            // Change the current animation index to the next one in the array
            const nextIndex = (currentAnimationIndex + 1) % animations.length;
            setCurrentAnimationIndex(nextIndex);

            // Set the paragraph text based on the current animation
            if (nextIndex === 0) {
                setParagraphText("Find Out About the Most Popular Movies");
            } else if (nextIndex === 1) {
                setParagraphText("Create Your Own Movie List");
            } else {
                setParagraphText("Enjoy the Extensive Movie Selection");
            }
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [currentAnimationIndex]);
    const animations = [animation1, animation2, animation3];
    const currentAnimation = animations[currentAnimationIndex];

    const context = useContext(AuthContext);
    const errors = context.errors;
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log("name", name);
        setUser({ ...user, [name]: value });
        // console.log("user", user);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        context.register(user);
        console.log("submit:", user);
    };

    if (!context.loading && context.user) {
        return <Navigate to="/dashboard" />;
    }
    return (
        <section className=" w-full flex flex-col bg-[#222D5B] py-40  ">
            <div className="py-5 px-5 flex item-center justify-center w-full">
                <div className="h-auto w-1/3 xl:w-1/3 bg-white rounded-l-3xl flex flex-col items-center justify-center gap-16 ">
                    <Lottie
                        animationData={currentAnimation}
                        loop={true}
                        autoplay={true}
                        className="w-1/2 "
                        speed={1}
                    />
                    <p
                        className={
                            "font-poppins text-xl font-medium animate-fade-left animate-infinite animate-duration-[5000ms] "
                        }
                    >
                        {paragraphText}
                    </p>
                </div>

                <div className="h-auto w-1/3 xl:w-1/3 bg-slate-400 rounded-r-3xl flex flex-col items-center justify-around ">
                    {/* Left column container */}
                    <div className="px-4 md:px-0 lg:w-full flex flex-col justify-center items-center">
                        <div className="md:mx-6 md:p-12 w-full">
                            {/* Logo */}
                            <div className="text-center w-full">
                                <img
                                    className="mx-auto w-32 h-auto"
                                    src={logo}
                                    alt="logo"
                                />
                                <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                                    MovieBox
                                </h4>
                            </div>
                            {context.errors?.message}
                            <form
                                className=" rounded-md flex flex-col gap-5 items-center w-full"
                                onSubmit={handleSubmit}
                            >
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor=""
                                        className="text-mb-secondary text-[1rem] font-medium "
                                    >
                                        First Name:
                                    </label>
                                    {errors?.firstName && (
                                        <p className="text-danger ">
                                            {errors?.firstName.message}
                                        </p>
                                    )}
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={user.firstName}
                                        onChange={handleChange}
                                        required
                                        className="w-80 h-8 rounded-md shadow-inner shadow-slate-900"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor=""
                                        className="text-mb-secondary font-medium"
                                    >
                                        Last Name:
                                    </label>
                                    {errors?.lastName && (
                                        <p className="text-danger ">
                                            {errors?.lastName.message}
                                        </p>
                                    )}
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={user.lastName}
                                        onChange={handleChange}
                                        required
                                        className=" w-80 h-8 rounded-md shadow-inner shadow-slate-900 "
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor=""
                                        className="text-mb-secondary font-medium"
                                    >
                                        Username:
                                    </label>
                                    {errors?.userName && (
                                        <p className="text-danger ">
                                            {errors?.userName.message}
                                        </p>
                                    )}
                                    <input
                                        type="text"
                                        name="userName"
                                        value={user.userName}
                                        onChange={handleChange}
                                        required
                                        className="  w-80 h-8 rounded-md shadow-inner shadow-slate-900"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor=""
                                        className="text-mb-secondary font-medium"
                                    >
                                        E-mail:
                                    </label>
                                    {errors?.email && (
                                        <p className="text-danger ">
                                            {errors?.email.message}
                                        </p>
                                    )}
                                    <input
                                        type="text"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        required
                                        className=" w-80 h-8 rounded-md shadow-inner shadow-slate-900"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor=""
                                        className="text-mb-secondary font-medium"
                                    >
                                        Password:
                                    </label>
                                    {errors?.password && (
                                        <p className="text-danger">
                                            {errors?.password.message}
                                        </p>
                                    )}
                                    <input
                                        type="password"
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
                                        required
                                        className=" w-80 h-8 rounded-md shadow-inner shadow-slate-900"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor=""
                                        className="text-mb-secondary font-medium"
                                    >
                                        Confirm Password:
                                    </label>
                                    {errors?.confirmPassword && (
                                        <p className="text-danger">
                                            {errors?.confirmPassword.message}
                                        </p>
                                    )}
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={user.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        className=" w-80 h-8 rounded-md shadow-inner shadow-slate-900"
                                    />
                                </div>
                                <div className="flex justify-start items-center">
                                    <input
                                        className=" -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                        type="checkbox"
                                        value=""
                                        id="checkboxDefault"
                                    />
                                    <label
                                        className=" pl-[0.15rem] hover:cursor-pointer text-sm text-mb-secondary"
                                        htmlFor="checkboxDefault"
                                    >
                                        Remember Me
                                    </label>
                                </div>
                                <div className="p-10 mt-7 text-mb-secondary">
                                    <button className="bg-white text-mb-secondary font-bold text-sm border-none rounded-xl h-10 w-54 lg:h-10 lg: w-72 lg:text-lg  shadow-slate-600 hover:shadow-lg hover:shadow-slate-700 shadow-inner">
                                        Sign Up
                                    </button>
                                </div>
                                <div className="flex flex-wrap justify-center align-center gap-2">
                                    <p>Already have an account?</p>
                                    <Link
                                        className="text-mb-quartery font-bold"
                                        to="/login"
                                    >
                                        Sign In!
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
