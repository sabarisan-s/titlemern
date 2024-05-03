import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import axiosInstance from "../utilities/axiosInstance";
import firstLetter from "../utilities/firstLetter";
import toast from "react-hot-toast";

const Dashboard = () => {
    const [isUser, setIsUser] = useState(null);
    const [title, setTitle] = useState("");
    const [isFirstLetter, setIsFirstLetter] = useState(null);
    const [userData, setUserData] = useState([]);
    const [updateData, setUpdateData] = useState([]);

    useEffect(() => {
        handleUser();
        getData();

        return () => {};
    }, [updateData]);

    const handleUser = async () => {
        try {
            const { data } = await axiosInstance.get("/user");
            setIsFirstLetter(firstLetter(data.user.fullName));
            setIsUser(data.user);
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

    const handleAddDate = async () => {
        try {
            const { data } = await axiosInstance.post("/create-post", {
                title,
            });
            setTitle("");
            toast.success(data.message);
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

    const getData = async () => {
        try {
            const { data } = await axiosInstance.get("/get-post");
            console.log(data.note);
            setUserData(data.note);
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

    const handleUpdate = async (noteUpdate) => {
        const updatedTitle = prompt("update", noteUpdate.title);
        try {
            const { data } = await axiosInstance.put(
                `/update-post/${noteUpdate._id}`,
                { title: updatedTitle }
            );
            console.log(data);
            setUpdateData(data.note.title);
            toast.success(data.message);
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
    const handleDelete = async (noteDelete) => {
        try {
            if (confirm("Confirm you want delete!")) {
                const { data } = await axiosInstance.delete(
                    `/delete-post/${noteDelete}`
                );
                console.log(data);
                setUpdateData(data);
                toast.success(data.message);
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
            <Header isUser={isUser} isFirstLetter={isFirstLetter} />
            <div className="px-5 sm:w-2/3 lg:w-1/3 mx-auto mt-16">
                <div className="flex flex-row mb-5 justify-center items-center gap-2">
                    <label htmlFor="title" className="font-bold text-xl">
                        Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        className=" outline-none focus:border-slate-800  border border-slate-500 p-1 rounded-md "
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button className="btn" onClick={handleAddDate}>
                        Add
                    </button>
                </div>
            </div>

            {userData.map((item) => (
                <li key={item._id}>
                    {item.title}{" "}
                    <button
                        onClick={() => handleUpdate(item)}
                        className="btn bg-slate-500 px-1"
                    >
                        edit
                    </button>
                    <button
                        onClick={() => handleDelete(item._id)}
                        className="btn bg-slate-500 px-1"
                    >
                        delete
                    </button>
                </li>
            ))}
        </>
    );
};

export default Dashboard;
