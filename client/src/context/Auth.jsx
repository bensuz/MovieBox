/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import axios from "../axiosInstance";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const setState = (user, loading, errors) => {
        setUser(user);
        setLoading(loading);
        setErrors(errors);
    };

    // Are we logged in?
    useEffect(() => {
        axios
            .get("api/auth/currentUser")
            .then((res) => setState(res.data.user, false, null))
            .catch((error) => {
                setState(null, false, null);
            });
    }, []);

    const login = async (user) => {
        setLoading(true);
        try {
            const res = await axios.post("api/auth/login", user);
            console.log("user loggin in", res);
            setState(res.data.user, false, null);
            navigate("/");
        } catch (error) {
            console.log(error.response);
            setState(null, false, error.response.data);
        }
    };
    const register = async (user) => {
        setLoading(true);
        try {
            const res = await axios.post("api/auth/register", user);
            setState(res.data.user, false, null);
            navigate("/");
        } catch (error) {
            console.log(error.response);
            setState(null, false, error.response.data.errors);
        }
    };
    const logout = async () => {
        setLoading(true);
        try {
            const res = await axios.post("api/auth/logout", {});
            setState(null, false, null);
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.log(error.response);
            setState(null, false, error.response.errors);
        }
    };
    const uploadAvatar = (formData) => {
        setUploading(true);
        console.log("this is for the formdata", formData);
        axios
            .post("api/auth/upload-avatar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log("this is response.data for img upload", res.data);

                setUser({ ...user, avatar: res.data.user.avatar });
                setUploading(false);
            })
            .catch((error) => {
                console.log(error);
                setUploading(false);
            });
    };

    const deleteAvatar = () => {
        axios
            .delete("api/auth/delete-avatar") 
            .then((res) => {
                setUser({ ...user, avatar: null });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                errors,
                login,
                register,
                logout,
                uploadAvatar,
                uploading,
                deleteAvatar,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
