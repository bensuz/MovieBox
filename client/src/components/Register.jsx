import { useState, useContext } from "react";
import { AuthContext } from "../context/Auth";
import { Link, Navigate } from "react-router-dom";
import logo from "../assets/logo_new.png";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Animations from "./Animations";

const Register = () => {
    window.scrollTo(0, 0);
    const [isPopupTCOpen, setIsPopupTCOpen] = useState(false);
    const [isPopupPOpen, setIsPopupPOpen] = useState(false);

    const openTCPopup = () => {
        setIsPopupTCOpen(true);
    };
    const openPPopup = () => {
        setIsPopupPOpen(true);
    };
    // Handler function to close the popup
    const closePopup = () => {
        setIsPopupTCOpen(false);
        setIsPopupPOpen(false);
    };

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
        <section className=" w-full flex flex-col bg-[#222D5B] py-40 ">
            <div className="py-5 px-5 flex  item-center justify-center w-full max-xl:flex-col max-xl:items-center max-xl:justify-center">
                <div className="h-auto  xl:w-1/3 bg-white xl:rounded-l-3xl  flex flex-col items-center justify-center gap-16 max-xl:rounded-t-3xl max-xl:w-1/2 max-xl:min-h-[500px] max-lg:w-[483px] max-sm:w-[350px] max-sm:min-h-[400px]">
                    <Animations />
                </div>

                <div className="h-auto xl:w-1/3 bg-slate-400 xl:rounded-r-3xl flex flex-col items-center justify-around max-xl:rounded-b-3xl max-xl:w-1/2 max-lg:w-[483px] max-sm:w-[350px] max-lg:pb-20 ">
                    {/* Left column container */}
                    <div className="px-4 md:px-0 lg:w-full flex flex-col justify-center items-center">
                        <div className="md:mx-6 md:p-12 w-full ">
                            {/* Logo */}
                            <div className="text-center w-full">
                                <img
                                    className="mx-auto w-32 max-md:w-24 max-md:mt-8 h-auto"
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
                                <div className="flex justify-center items-center">
                                    <input
                                        className=" -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                        type="checkbox"
                                        value=""
                                        id="checkboxDefault"
                                        required
                                    />
                                    <label
                                        className=" pl-[0.15rem] hover:cursor-pointer text-sm text-mb-secondary w-3/4"
                                        htmlFor="checkboxDefault"
                                    >
                                        I accept the{" "}
                                        <a
                                            onClick={openTCPopup}
                                            className="font-bold text-blue-700"
                                        >
                                            {" "}
                                            Terms and Conditions
                                        </a>{" "}
                                        and the{" "}
                                        <a
                                            onClick={openPPopup}
                                            className="font-bold text-blue-700"
                                        >
                                            Privacy Notice
                                        </a>
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
            <Popup
                open={isPopupTCOpen}
                closeOnDocumentClick
                onClose={closePopup}
            >
                <div className="w-[900px] flex flex-col items-start justify-start p-6 gap-2 text-justify h-[600px] overflow-scroll ">
                    <h1 className="font-bold self-center ">
                        Terms and Conditions
                    </h1>
                    <p className="">
                        Welcome to our website. If you continue to browse and
                        use this website, you are agreeing to comply with and be
                        bound by the following terms and conditions of use,
                        which together with our privacy policy govern MovieBoxs
                        relationship with you in relation to this website. If
                        you disagree with any part of these terms and
                        conditions, please do not use our website.
                    </p>
                    <p>
                        The term MovieBox or us or we refers to the owner of the
                        website whose registered office is UK. Our company
                        registration number is 00000. The term you refers to the
                        user or viewer of our website.
                    </p>
                    <p>
                        The use of this website is subject to the following
                        terms of use:
                    </p>
                    <ul className="list-disc pl-12 flex flex-col gap-4">
                        <li className="pl-2">
                            This website uses cookies to monitor browsing
                            preferences. If you do allow cookies to be used, the
                            following personal information may be stored by us
                            for use by third parties: e-mail.
                        </li>
                        <li className="pl-2">
                            Neither we nor any third parties provide any
                            warranty or guarantee as to the accuracy,
                            timeliness, performance, completeness or suitability
                            of the information and materials found or offered on
                            this website for any particular purpose. You
                            acknowledge that such information and materials may
                            contain inaccuracies or errors and we expressly
                            exclude liability for any such inaccuracies or
                            errors to the fullest extent permitted by law.
                        </li>{" "}
                        <li className="pl-2">
                            Your use of any information or materials on this
                            website is entirely at your own risk, for which we
                            shall not be liable. It shall be your own
                            responsibility to ensure that any products, services
                            or information available through this website meet
                            your specific requirements.
                        </li>
                        <li className="pl-2">
                            This website contains material which is owned by or
                            licensed to us. This material includes, but is not
                            limited to, the design, layout, look, appearance and
                            graphics. Reproduction is prohibited other than in
                            accordance with the copyright notice, which forms
                            part of these terms and conditions.
                        </li>
                        <li className="pl-2">
                            All trade marks reproduced in this website which are
                            not the property of, or licensed to, the operator
                            are acknowledged on the website.
                        </li>
                        <li className="pl-2">
                            Unauthorised use of this website may give rise to a
                            claim for damages and/or be a criminal offence.
                        </li>
                        <li className="pl-2">
                            From time to time this website may also include
                            links to other websites. These links are provided
                            for your convenience to provide further information.
                            They do not signify that we endorse the website(s).
                            We have no responsibility for the content of the
                            linked website(s).
                        </li>
                        <li className="pl-2">
                            Your use of this website and any dispute arising out
                            of such use of the website is subject to the laws of
                            England, Northern Ireland, Scotland and Wales.
                        </li>
                    </ul>
                </div>
            </Popup>
            <Popup
                open={isPopupPOpen}
                closeOnDocumentClick
                onClose={closePopup}
            >
                <div className="w-[900px] flex flex-col items-start justify-start p-6 gap-2 text-justify h-[600px] overflow-scroll ">
                    <h1 className="font-bold self-center ">Provacy Notice</h1>
                    <p className="">
                        This website is operated by MovieBox and whose
                        registered address is MovieBox, UK (“We”) are committed
                        to protecting and preserving the privacy of our visitors
                        when visiting our site or communicating electronically
                        with us.
                    </p>
                    <p>
                        This policy sets out how we process any personal data we
                        collect from you or that you provide to us through our
                        website. We confirm that we will keep your information
                        secure and that we will comply fully with all applicable
                        UK Data Protection legislation and regulations. Please
                        read the following carefully to understand what happens
                        to personal data that you choose to provide to us, or
                        that we collect from you when you visit this site. By
                        visiting MovieBox (our website) you are accepting and
                        consenting to the practices described in this policy.
                    </p>
                    <p>
                        We may collect, store and use the following kinds of
                        personal information about individuals who visit and use
                        our website:
                    </p>
                    <ul className="list-disc pl-12 flex flex-col gap-4">
                        <li className="pl-2">
                            Information you supply to us. You may supply us with
                            information about you by filling in forms on our
                            website. This includes information you provide when
                            you submit a contact/enquiry form. The information
                            you give us may include your name, address, e-mail
                            address and phone number.
                        </li>
                        <li className="pl-2">
                            Information our website automatically collects about
                            you. With regard to each of your visits to our
                            website we may automatically collect information
                            including the following: technical information,
                            including a truncated and anonymised version of your
                            Internet protocol (IP) address, browser type and
                            version, operating system and platform; information
                            about your visit, including what pages you visit,
                            how long you are on the site, how you got to the
                            site (including date and time); page response times,
                            length of visit, what you click on, documents
                            downloaded and download errors.
                        </li>{" "}
                        <li className="pl-2">
                            Our website uses cookies to distinguish you from
                            other users of our website. This helps us to provide
                            you with a good experience when you browse our
                            website and also allows us to improve our site. For
                            detailed information on the cookies we use and the
                            purposes for which we use them see our Cookie Policy
                        </li>
                        <li className="pl-2">
                            We will use information you supply to us: to provide
                            you with information and/or services that you
                            request from us; to administer our site including
                            troubleshooting and statistical purposes;to improve
                            our site to ensure that content is presented in the
                            most effective manner for you and for your computer;
                            security and debugging as part of our efforts to
                            keep our site safe and secure.
                        </li>
                        <li className="pl-2">
                            You have the right to ensure that your personal data
                            is being processed lawfully (“Subject Access
                            Right”). Your subject access right can be exercised
                            in accordance with data protection laws and
                            regulations. Any subject access request must be made
                            in writing to [insert school/Trust Data Controller
                            contact details]. We will provide your personal data
                            to you within the statutory time frames. To enable
                            us to trace any of your personal data that we may be
                            holding, we may need to request further information
                            from you. If you have a complaint about how we have
                            used your information, you have the right to
                            complain to the Information Commissioners Office
                            (ICO).
                        </li>
                        <li className="pl-2">
                            Any changes we may make to our privacy policy in the
                            future will be posted on this page and, where
                            appropriate, notified to you by e-mail. Please check
                            back frequently to see any updates or changes to our
                            privacy policy.
                        </li>
                    </ul>
                </div>
            </Popup>
        </section>
    );
};

export default Register;
