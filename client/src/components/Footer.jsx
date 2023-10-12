import MailIcon from "@mui/icons-material/Mail";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import logo from "../assets/logo_new.png";
import Swal from "sweetalert2";

const Footer = () => {
    const handleSendMail = () => {
        const emailInput = document.getElementById("email-input");
        const email = emailInput.value;
        if (validateEmail(email)) {
            Swal.fire("Subscription is successful!", "Thank you!", "success");
        } else {
            Swal.fire(
                "Invalid email!",
                "Please enter a valid email address.",
                "error"
            );
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailRegex.test(email);
    };

    return (
        <div className="bg-slate-900 font-figtree text-white min-h-56 px-64 py-10 max-xl:py-10 max-xl:gap-2 max-xl:px-10 max-xl:flex max-xl:flex-col max-xl:items-center max-xl:justify-center">
            {" "}
            <div className="flex justify-between items-center max-xl:flex-col max-xl:items-center max-xl:justify-center max-xl:gap-2">
                <div className="flex items-center gap-2 my-2">
                    <img
                        src={logo}
                        alt=""
                        className="text-white   text-xl font-bold w-10"
                    />
                    <h2 className=" text-white  text-2xl font-bold">
                        MovieBox
                    </h2>
                </div>
                <div className="max-xl:flex max-xl:flex-col max-xl:items-center max-xl:justify-center ">
                    <label className="text-md lg:text-lg">
                        Subscribe to our newsletter!
                    </label>
                    <Paper
                        component="form"
                        sx={{
                            p: "2px 4px",
                            display: "flex",
                            alignItems: "center",
                            width: 300,
                        }}
                    >
                        <InputBase
                            id="email-input"
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="enter your e-mail"
                            inputProps={{
                                "aria-label": "enter your e-mail",
                                type: "email",
                            }}
                        />
                        <Divider
                            sx={{ height: 28, m: 0.5 }}
                            orientation="vertical"
                        />
                        <IconButton
                            onClick={handleSendMail}
                            color="primary"
                            sx={{ p: "10px" }}
                            aria-label="directions"
                        >
                            <MailIcon />
                        </IconButton>
                    </Paper>
                </div>
            </div>
            <div className="flex items-center md:justify-start gap-5 my-5 max-xl:gap-4 max-xl:items-center max-xl:justify-center max-md:justify-center ">
                <p>Privacy</p>
                <p>Contact Us</p>
                <p>Cookie Preferences</p>
            </div>
            <div className="text-xs flex flex-col justify-end items-end max-xl:items-center max-xl:justify-center max-md:justify-center w-full">
                <p className="w-full text-center xl:text-end">
                    All rights reserved. 2023.
                </p>
                <p className="w-full text-center xl:text-end">
                    This site is protected by reCAPTCHA and the Google Privacy
                    Policy and Terms of Service apply.
                </p>
            </div>
        </div>
    );
};

export default Footer;
