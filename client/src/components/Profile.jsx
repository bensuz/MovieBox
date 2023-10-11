// user profile for user to be able to see their info on their account

import defaultAvatar from "../assets/useravatar.png";
import "./Profile.css";
import { useAuth } from "../context/Auth";

const Profile = () => {
    window.scrollTo(0, 0);
    const { user, uploadAvatar, uploading, deleteAvatar } = useAuth();

    //uploading avatar finctionality - backend handled in context
    const handleFileChange = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        if (file) {
            const formData = new FormData();
            formData.append("avatar", file);
            uploadAvatar(formData);
        }
    };
    //deleting avatar functionality - backend handled in context
    const handleDeleteAvatar = () => {
        deleteAvatar();
    };

    return (
        <div className="flex flex-col items-center justify-center gap-10 min-h-screen pt-[150px] pb-20  bg-mb-tertiary ">
            <div>
                <div className=" my-10 flex items-center gap-8 max-md:flex-col">
                    <div className="avatar-animation-div overflow-hidden max-md:w-[200px] max-md:h-[200px]">
                        <img
                            src={user.avatar || defaultAvatar}
                            alt="User Avatar"
                            className="w-84 h-84 "
                        />
                    </div>
                    <div className="flex justify-center items-center lg:gap-4 max-lg:flex-col max-lg:gap-4">
                        <div className="flex flex-col items-center justify-center ">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                id="avatar-input"
                                disabled={uploading}
                            />
                            <label
                                htmlFor="avatar-input"
                                className={` border rounded-xl bg-mb-quartery hover:bg-pink-800 text-white p-3 w-40 flex justify-center items-center ${
                                    uploading ? "opacity-50 " : ""
                                }`}
                            >
                                Change Picture
                            </label>
                            {uploading ? (
                                <span className="ml-2 text-white font-bold ">
                                    Uploading...
                                </span>
                            ) : null}
                        </div>{" "}
                        <button
                            onClick={handleDeleteAvatar}
                            className="border rounded-xl bg-mb-quartery hover:bg-pink-800 text-white p-3 w-40 flex justify-center items-center"
                        >
                            Delete Picture
                        </button>
                    </div>
                </div>
            </div>

            <form
                action=""
                className="max-w-[900px] flex flex-col items-center justify-center gap-8 mx-auto pb-20 max-md:gap-2"
            >
                <div className="flex flex-wrap -mx-3 mb-6 max-md:flex-col">
                    <div className=" w-1/2 px-3 mb-6 md:mb-0 max-md:w-full">
                        <label
                            className="block uppercase tracking-wide text-white  text-md font-thin mb-2"
                            htmlFor="grid-first-name"
                        >
                            First Name
                        </label>
                        <input
                            className="appearance-none block w-full bg-[#f6e8f7] text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white  "
                            id="grid-first-name"
                            type="text"
                            defaultValue={user.first_name}
                            readOnly
                        />
                    </div>
                    <div className="w-1/2 px-3 max-md:w-full">
                        <label
                            className="block uppercase tracking-wide text-white  text-md font-thin mb-2"
                            htmlFor="grid-last-name"
                        >
                            Last Name
                        </label>
                        <input
                            className="appearance-none block w-full bg-[#f6e8f7] text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                            id="grid-last-name"
                            type="text"
                            defaultValue={user.last_name}
                            readOnly
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6 max-md:flex-col ">
                    <div className="w-1/2 px-3 max-md:w-full">
                        <label
                            className="block uppercase tracking-wide text-white  text-md font-thin mb-2"
                            htmlFor="grid-password"
                        >
                            Password
                        </label>
                        <input
                            className="appearance-none block w-full bg-[#f6e8f7] text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 max-md:mb-8"
                            id="grid-password"
                            type="password"
                            placeholder="******************"
                            readOnly
                        />
                    </div>
                    <div className="w-1/2 px-3 max-md:w-full">
                        <label
                            className="block uppercase tracking-wide text-white  text-md font-thin mb-2"
                            htmlFor="user-name"
                        >
                            User Name
                        </label>
                        <input
                            className=" block w-full bg-[#f6e8f7] text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                            id="user-name"
                            type="text"
                            defaultValue={user.user_name}
                            readOnly
                        />
                    </div>
                </div>

                <div className="w-1/2 md:w-full px-3 mb-6 md:mb-0 max-md:w-full">
                    <label
                        className="block uppercase tracking-wide text-white  text-md font-thin mb-2"
                        htmlFor="email"
                    >
                        E-mail
                    </label>
                    <input
                        className="appearance-none block w-full bg-[#f6e8f7] text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                        id="email"
                        type="text"
                        defaultValue={user.email}
                        readOnly
                    />
                </div>
            </form>
        </div>
    );
};

export default Profile;
