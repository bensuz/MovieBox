import { useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/Auth";
import { useContext } from "react";

const SearchIcon = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [inputVisible, setInputVisible] = useState(false);
    const navigate = useNavigate();
    const context = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery !== "") {
            navigate(`./search/${searchQuery}`);
            setSearchQuery("");
        }
    };
    const handleSearchClick = () => {
        if (inputVisible) {
            setInputVisible(false);
        } else {
            setInputVisible(true);
        }
    };
    return (
        <form
            onSubmit={handleSubmit}
            className={`absolute max-md:right-32  flex md:items-center md:justify-center gap-4 max-md:flex-col-reverse max-md:items-end max-md:gap-2 max-md:justify-end max-[400px]:hidden ${
                context.user
                    ? "max-md:top-4 md:top-[19px] md:right-36  lg:right-72"
                    : "max-md:top-4 md:top-[19px] md:right-40  lg:right-40 "
            }`}
        >
            <input
                type="text"
                placeholder="Search for movies"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`border border-mb-quartery rounded-xl bg-transparent p-1 text-mb-primary focus:border-mb-quartery ${
                    inputVisible ? "" : "hidden"
                }`}
            />
            <button onClick={handleSearchClick}>
                <i
                    className="fas fa-magnifying-glass text-lg text-mb-quartery mr-3"
                    title="Add to My List"
                ></i>
            </button>
        </form>
    );
};

export default SearchIcon;
