import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";

const Password = ({ user, setUser }) => {
    const [eyeOpen, setEyeOpen] = useState(true);
    return (
        <>
            <div className="flex flex-col relative">
                <label htmlFor="" className="">
                    Password
                </label>

                <input
                    type={eyeOpen ? "password" : "text"}
                    value={user.password}
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                    className=" outline-none focus:border-slate-800  border border-slate-500 p-1 rounded-md "
                />

                <div
                    className="absolute top-5 m-3 right-1"
                    onClick={() => setEyeOpen(() => !eyeOpen)}
                >
                    {eyeOpen ? <FaRegEyeSlash /> : <MdRemoveRedEye />}
                </div>
            </div>
        </>
    );
};

export default Password;
