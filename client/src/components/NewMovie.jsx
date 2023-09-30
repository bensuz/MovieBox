import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RegularHeader from "./RegularHeader";
import { AuthContext } from "../context/Auth";
import { useContext } from "react";

const NewMovie = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [year, setYear] = useState("");
    const [rating, setRating] = useState("");
    const [poster, setPoster] = useState("");

    const numericRating = parseFloat(rating);
    const numericYear = parseInt(year);
    const context = useContext(AuthContext);

    console.log("context printing", context);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/usermovies`, {
                user_id: context.user.id,
                title,
                director,
                year: numericYear,
                rating: numericRating,
                poster,
            })
            .then((res) => {
                console.log(res.data);

                navigate("/");
            })
            .catch((e) => console.log(e));
    };

    return (
        <>
            <RegularHeader />

            <div className=" h-[780px]">
                {" "}
                <div className=" flex flex-col items-center justify-center py-36 ">
                    <h2 className="text-slate-900 py-6 font-bold">NEW MOVIE</h2>
                    <form
                        onSubmit={handleSubmit}
                        className=" flex flex-col w-1/3 gap-12 justify-center items-center "
                    >
                        <div className="relative h-10 w-full min-w-[200px] ">
                            <label
                                htmlFor="title"
                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-slate-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t-2 before:border-slate-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t-2 after:border-r-2 after:border-slate-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-slate-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-mb-quartery peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-mb-quartery peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-mb-quartery peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-slate-500"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className=" peer h-full  w-full rounded-[7px] border-2 border-slate-500 border-t-transparent bg-transparent px-5 py-6 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-mb-quartery focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                        </div>
                        <div className="relative h-10 w-full min-w-[200px] ">
                            <label
                                htmlFor="director"
                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-slate-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t-2 before:border-slate-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t-2 after:border-r-2 after:border-slate-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-slate-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-mb-quartery peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-mb-quartery peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-mb-quartery peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-slate-500"
                            >
                                Director
                            </label>
                            <input
                                type="text"
                                name="director"
                                value={director}
                                onChange={(e) => setDirector(e.target.value)}
                                className=" peer h-full w-full rounded-[7px] border-2 border-slate-500 border-t-transparent bg-transparent px-5 py-6 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-mb-quartery focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                        </div>
                        <div className="relative h-10 w-full min-w-[200px]">
                            <label
                                htmlFor="year"
                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-slate-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t-2 before:border-slate-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t-2 after:border-r-2 after:border-slate-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-slate-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-mb-quartery peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-mb-quartery peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-mb-quartery peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-slate-500"
                            >
                                Year
                            </label>
                            <input
                                type="text"
                                name="year"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className=" peer h-full w-full rounded-[7px] border-2 border-slate-500 border-t-transparent bg-transparent px-5 py-6 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-mb-quartery focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                        </div>
                        <div className="relative h-10 w-full min-w-[200px]">
                            <label
                                htmlFor="rating"
                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-slate-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t-2 before:border-slate-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t-2 after:border-r-2 after:border-slate-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-slate-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-mb-quartery peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-mb-quartery peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-mb-quartery peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-slate-500"
                            >
                                Rating
                            </label>
                            <input
                                type="text"
                                name="rating"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className=" peer h-full w-full rounded-[7px] border-2 border-slate-500 border-t-transparent bg-transparent px-5 py-6 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-mb-quartery focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                        </div>
                        <div className="relative h-10 w-full min-w-[200px]">
                            <label
                                htmlFor="poster"
                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-slate-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t-2 before:border-slate-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t-2 after:border-r-2 after:border-slate-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-slate-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-mb-quartery peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-mb-quartery peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-mb-quartery peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-slate-500"
                            >
                                Poster URL
                            </label>
                            <input
                                type="text"
                                name="poster"
                                value={poster}
                                onChange={(e) => setPoster(e.target.value)}
                                className=" break-normal peer h-full w-full rounded-[7px] border-2 border-slate-500 border-t-transparent bg-transparent px-5 py-6 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-mb-quartery focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                        </div>
                        <button className=" border rounded-xl bg-mb-quartery p-2 my-4 w-1/4 font-bold  text-mb-secondary">
                            Add Movie
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default NewMovie;
