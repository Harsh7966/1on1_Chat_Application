import { useEffect, useState } from "react";
import { UseContext } from "../storage/auth";
import { NavLink } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";

export const Navbar = () => {
    const { userDetails, isUserLogin, userAuthentication } = UseContext();
    const [profileImage, setProfileImage] = useState(""); // State to store profile image URL

    useEffect(() => {
        userAuthentication();
    }, []);

    useEffect(() => {
        if (userDetails) {
            setProfileImage(`http://localhost:1010${userDetails.profile}`);
        } else {
            setProfileImage("/picon.webp");
        }
    }, [userDetails]);

    return (
        <div className="navbar bg-base-300 px-4 py-2">
            <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <img src="./icon.png" width="70px" alt="Logo" />
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User profile"
                                    src={
                                        isUserLogin
                                            ? profileImage
                                            : "/picon.webp"
                                    }
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box absolute z-50 mt-2 w-52 p-2 shadow-lg"
                        >
                            {/* <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li>
                                <a>Settings</a>
                            </li> */}
                            <li>
                                <NavLink to="/logout">Logout</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
