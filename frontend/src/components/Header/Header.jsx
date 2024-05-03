import { useState } from "react";
import { BiAlarm, BiMenu } from "react-icons/bi";
import { MdClose } from "react-icons/md";

const Header = ({ isUser, isFirstLetter }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navLink = [
        {
            name: "LogOut",
            link: "/logout",
        },
    ];
    const navLinkGuest = [
        {
            name: "Login",
            link: "/login",
        },
        {
            name: "SignUp",
            link: "/signup",
        },
    ];
    return (
        <>
            <div className="bg-slate-50 w-full sticky top-0 left-0 sm:shadow-lg px-5 sm:px-10 sm:flex  sm:justify-between z-10 border sm:border-none">
                <div className="flex items-center py-2 justify-center">
                    <div>
                        <BiAlarm className="w-7 h-7" />
                    </div>
                    <div className="font-bold text-xl">Test</div>
                    {isUser && (
                        <div className="text-center w-6 h-6  bg-slate-500 rounded-full">
                            {isFirstLetter}
                        </div>
                    )}
                </div>
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute top-0 right-0 mt-2 mr-5 sm:hidden"
                >
                    {isOpen ? (
                        <MdClose className="w-7 h-7" />
                    ) : (
                        <BiMenu className="w-7 h-7" />
                    )}
                </div>
                <ul
                    className={` absolute w-full bg-slate-100 left-0 transition-all duration-500 top-11 ease-in text-center sm:static sm:flex sm:w-auto sm:bg-slate-50 ${
                        isOpen ? "block" : "hidden"
                    } block  shadow-lg sm:shadow-none`}
                >
                    {isUser &&
                        navLink.map((item, index) => (
                            <li
                                key={index}
                                className="p-2 hover:bg-slate-300 sm:hover:bg-opacity-0"
                            >
                                <a href={item.link}>{item.name}</a>
                            </li>
                        ))}
                    {!isUser &&
                        navLinkGuest.map((item, index) => (
                            <li
                                key={index}
                                className="p-2 hover:bg-slate-300 sm:hover:bg-opacity-0"
                            >
                                <a href={item.link}>{item.name}</a>
                            </li>
                        ))}
                </ul>
            </div>
        </>
    );
};

export default Header;
