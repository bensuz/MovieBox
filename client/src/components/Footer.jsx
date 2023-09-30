import MailIcon from "@mui/icons-material/Mail";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import logo from "../assets/logo_new.png";

const Footer = () => {
    return (
        <div className="bg-slate-900 text-white h-56 px-64 py-10">
            {" "}
            <div className="flex justify-between items-center">
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
                <div>
                    <label className="text-lg">
                        Subscribe to our newsletter!
                    </label>
                    <Paper
                        component="form"
                        sx={{
                            p: "2px 4px",
                            display: "flex",
                            alignItems: "center",
                            width: 400,
                        }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="enter your e-mail"
                            inputProps={{ "aria-label": "enter your e-mail" }}
                        />
                        <Divider
                            sx={{ height: 28, m: 0.5 }}
                            orientation="vertical"
                        />
                        <IconButton
                            color="primary"
                            sx={{ p: "10px" }}
                            aria-label="directions"
                        >
                            <MailIcon />
                        </IconButton>
                    </Paper>
                </div>
            </div>
            <div className="flex gap-5 my-5">
                <p>Privacy</p>
                <p>Contact Us</p>
                <p>Cookie Preferences</p>
            </div>
            <div className="text-xs flex flex-col justify-end items-end ">
                <p>All rights reserved. 2023.</p>
                <p>
                    This site is protected by reCAPTCHA and the Google Privacy
                    Policy and Terms of Service apply.
                </p>
            </div>
        </div>
    );
};

export default Footer;
