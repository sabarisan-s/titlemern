import React, { useState } from "react";
import Header from "../components/Header/Header";
import Password from "../components/Password/Password";
import toast from "react-hot-toast";
import axiosInstance from "../utilities/axiosInstance";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const { data } = await axiosInstance.post("signup", {
                ...user,
            });
            console.log(data);
            if (data && data.accessToken) {
                localStorage.setItem("token", data.accessToken);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
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
                    <label htmlFor="fullName" className="">
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        value={user.fullName}
                        className=" outline-none focus:border-slate-800  border border-slate-500 p-1 rounded-md "
                        onChange={(e) =>
                            setUser({ ...user, fullName: e.target.value })
                        }
                    />
                </div>
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
                <button className="btn mt-4" onClick={handleSignUp}>
                    SignUp
                </button>
            </div>
        </>
    );
};

export default SignUp;
