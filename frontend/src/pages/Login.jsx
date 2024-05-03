import React, { useState } from "react";
import Password from "../components/Password/Password";
import Header from "../components/Header/Header";
import axiosInstance from "../utilities/axiosInstance";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleLogin = async () => {
        console.log(user);
        try {
            const { data } = await axiosInstance.post("login", {
                ...user,
            });
            
            if (data && data.accessToken) {
                localStorage.setItem("token", data.accessToken);
                navigate("/dashboard");
            }

        } catch (error) {
            if (
                error &&
                error.response?.data &&
                error.response?.data?.message
            ) {
                toast.error(error.response?.data.message);
                console.log(error.response.data);
            } else {
                toast.error("An unexpected error occurred .Please reload load");
            }
        }
    };
    return (
        <>
            <Header />
            <div className="px-5 sm:w-2/3 lg:w-1/3 mx-auto mt-16">
                <div className="flex flex-col mb-5">
                    <label htmlFor="email" className="">
                        Email
                    </label>

                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={user.email}
                        className=" outline-none focus:border-slate-800  border border-slate-500 p-1 rounded-md "
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                    />
                </div>
                <Password user={user} setUser={setUser} />
                <button className="btn mt-4" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </>
    );
};

export default Login;
