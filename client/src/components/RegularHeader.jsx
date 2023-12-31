//header that containes logo, my list link, user avatar and notifications badge

import { Fragment, useState, useRef } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo_new.png";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { useContext } from "react";
import { Navigate } from "react-router";
import defaultAvatar from "../assets/useravatar.png";
import nowhere from "../assets/nowhere.jpg";
import SearchIcon from "./SearchIcon";
const RegularHeader = () => {
    const context = useContext(AuthContext);

    const [menuOpen, setMenuOpen] = useState(false);
    const [isNotificationVisible, setIsNotificationVisible] = useState(true);

    const mobileMenuRef = useRef(null);

    // Function to close the menu
    const close = () => {
        setMenuOpen(false);
    };

    // Add a click event listener to close the menu when clicking outside

    const handleClickOutside = (event) => {
        if (
            mobileMenuRef.current &&
            !mobileMenuRef.current.contains(event.target)
        ) {
            close();
        }
    };

    document.addEventListener("mousedown", handleClickOutside);

    //logout function from the context
    const handleLogout = () => {
        // console.log("CONTEXT", context);
        context.logout();
        return <Navigate to="/" />;
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <Disclosure
            as="nav"
            className="fixed font-figtree h-28 flex flex-col justify-center items-center gap-x-10  w-full mb-5 z-50 bg-slate-900 shadow-lg shadow-slate-700 min-w-min"
        >
            {({ open }) => (
                <>
                    <div className="mx-auto w-full max-w-8xl px-2 sm:px-6 lg:px-8 ">
                        <div className="relative flex h-16 items-center justify-center w-full">
                            <div className="flex w-full items-center justify-start gap-28 sm:items-center sm:justify-between  ">
                                <Link to="/">
                                    {" "}
                                    <div className="flex gap-5 md:mx-10 items-center justify-center ">
                                        <img
                                            className="text-white top-4 text-xl font-bold  md:w-16 w-12"
                                            src={logo}
                                            alt="MovieBox logo"
                                        />
                                        <p className="text-mb-quartery font-poppins  top-5 lg:text-3xl xl:text-5xl text-2xl font-bold">
                                            MovieBox
                                        </p>
                                    </div>
                                </Link>
                                <div className="flex justify-center items-center ">
                                    <SearchIcon />
                                    {context.user && (
                                        <div className="hidden lg:ml-6 lg:block">
                                            <div className="flex items-center  space-x-4 h-full ">
                                                <NavLink
                                                    to={"/mylist"}
                                                    className="text-mb-quartery flex gap-10 text-xl font-bold p-5 justify-center items-center"
                                                >
                                                    My List
                                                </NavLink>
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute inset-y-0 right-0 flex  items-center lg:hidden ">
                                        {/* Mobile menu button*/}
                                        {context.user && (
                                            <Disclosure.Button
                                                onClick={toggleMenu}
                                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-mb-quartery hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white "
                                            >
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">
                                                    Open main menu
                                                </span>
                                                {open ? (
                                                    <XMarkIcon
                                                        className="block h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <Bars3Icon
                                                        className="block h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                            </Disclosure.Button>
                                        )}
                                    </div>
                                    <div className="absolute inset-y-0 right-10 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:mr-10 xl:mr-2 sm:pr-0">
                                        {/* notifications dropdown */}

                                        {context.user ? (
                                            <>
                                                {" "}
                                                <Menu
                                                    as="div"
                                                    className="relative ml-3"
                                                >
                                                    <div>
                                                        <Menu.Button
                                                            onClick={() =>
                                                                setIsNotificationVisible(
                                                                    false
                                                                )
                                                            }
                                                            className="relative mr-2 rounded-full bg-mb-quartery p-1 text-mb-primary hover:text-white focus:outline-[#8C1960] focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#8C1960] max-[400px]:hidden"
                                                        >
                                                            <span className="sr-only">
                                                                View
                                                                notifications
                                                            </span>
                                                            <BellIcon
                                                                className="md:w-6 md:h-6 w-4 h-4"
                                                                aria-hidden="true"
                                                            />
                                                            {isNotificationVisible && (
                                                                <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-mb-quartery bg-white border-2 border-white rounded-full top-4 -right-3 dark:border-gray-900 max-md:w-4 max-md:h-4">
                                                                    1
                                                                </div>
                                                            )}
                                                        </Menu.Button>
                                                    </div>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="absolute  right-0 z-10 mt-4  origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-[400px] max-[550px]:w-[250px]">
                                                            <Menu.Item>
                                                                <p className="block border-b border-gray-200 px-4 py-2 text-md font-bold  text-mb-quartery mx-1 rounded-md ">
                                                                    One new
                                                                    notification!
                                                                </p>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <Link
                                                                    to="movies/discover/1151534"
                                                                    className="block h-[300px] w-full overflow-hidden border-b border-gray-200 px-4 py-2 text-sm text-gray-700 mx-1 rounded-md  hover:bg-mb-primary  hover:text-mb-secondary "
                                                                >
                                                                    <p>
                                                                        Check
                                                                        out this
                                                                        new
                                                                        released
                                                                        movie
                                                                        starring
                                                                        Anna
                                                                        Castillo!
                                                                    </p>
                                                                    <img
                                                                        src={
                                                                            nowhere
                                                                        }
                                                                        alt=""
                                                                        className="p-4"
                                                                    />
                                                                </Link>
                                                            </Menu.Item>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                                <Menu
                                                    as="div"
                                                    className="relative ml-3"
                                                >
                                                    <div>
                                                        <Menu.Button className="relative flex rounded-full  text-sm overflow-hidden focus:ring-2 focus:ring-[#a57794] lg:w-12 lg:h-12 sm:w-8 sm:h-8 md:w-10 md:h-10 w-8 h-8 max-[400px]:hidden">
                                                            <span className="sr-only">
                                                                Open user menu
                                                            </span>
                                                            {context.user
                                                                .avatar ? (
                                                                <img
                                                                    src={
                                                                        context
                                                                            ?.user
                                                                            ?.avatar
                                                                    }
                                                                    alt="User Avatar"
                                                                    className="w-84 h-84"
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={
                                                                        defaultAvatar
                                                                    }
                                                                    alt=""
                                                                    className="w-84 h-84"
                                                                />
                                                            )}
                                                        </Menu.Button>
                                                    </div>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="absolute  right-0 z-10 mt-4 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                                                            <Menu.Item>
                                                                <p className="block border-b border-gray-200 px-4 py-2 text-md font-bold text-mb-quartery mx-1 rounded-md ">
                                                                    Welcome{" "}
                                                                    {
                                                                        context
                                                                            .user
                                                                            .user_name
                                                                    }
                                                                    !
                                                                </p>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <Link
                                                                    to="/profile"
                                                                    className="block border-b border-gray-200 px-4 py-2 text-sm text-gray-700 mx-1 rounded-md  hover:bg-mb-primary  hover:text-mb-secondary"
                                                                >
                                                                    Your Profile
                                                                </Link>
                                                            </Menu.Item>

                                                            <Menu.Item>
                                                                <Link
                                                                    to="/"
                                                                    className="block border-b border-gray-200 px-4 py-2 text-sm text-gray-700 mx-1 rounded-md hover:bg-mb-primary  hover:text-mb-secondary"
                                                                    onClick={
                                                                        handleLogout
                                                                    }
                                                                >
                                                                    Sign Out
                                                                </Link>
                                                            </Menu.Item>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            </>
                                        ) : (
                                            <Link to="/login">
                                                <button className="m-10 relative inline-flex items-center justify-center max-md:mx-1 max-md:py-1 max-md:px-2 px-4 py-1 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-mb-secondary">
                                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 via-pink-500 to-mb-quartery"></span>
                                                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                                                    <span className="relative text-white text-lg">
                                                        Login
                                                    </span>
                                                </button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {context.user && (
                        <Disclosure.Panel
                            className="lg:hidden "
                            ref={mobileMenuRef}
                        >
                            {" "}
                            <div className="absolute divide-y right-6 z-50 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Transition
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    {" "}
                                    <Disclosure.Button
                                        as="a"
                                        href={"/mylist"}
                                        className="bg-white text-gray border-b border-gray-200 rounded-md px-2 py-2 mb-2 mx-1 text-center text-sm font-medium hover:bg-mb-primary  hover:text-mb-secondary block"
                                    >
                                        My List
                                    </Disclosure.Button>
                                    <Disclosure.Button
                                        as="a"
                                        href={"/profile"}
                                        className="bg-white text-gray border-b border-gray-200 rounded-md px-2 py-2 mb-2 mx-1 text-center text-sm font-medium hover:bg-mb-primary  hover:text-mb-secondary hidden max-sm:block"
                                    >
                                        Your Profile
                                    </Disclosure.Button>
                                    <Disclosure.Button
                                        as="button"
                                        onClick={handleLogout}
                                        className="bg-white text-gray border-b border-gray-200 w-full rounded-md px-2 py-2 mb-2 text-center text-sm font-medium hover:bg-mb-primary  hover:text-mb-secondary hidden max-sm:block"
                                    >
                                        Sign out
                                    </Disclosure.Button>
                                </Transition>
                            </div>
                        </Disclosure.Panel>
                    )}
                </>
            )}
        </Disclosure>
    );
};

export default RegularHeader;
