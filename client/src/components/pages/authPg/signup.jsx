import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import { UseContext } from "../../../storage/auth";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const navigate= useNavigate();
    const {StoreTokenInLs}= UseContext();
    const [user, setUser] = useState({
        uname: "",
        email: "",
        password: "",
        gender: "",
        profile: null // Use null initially for file
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setUser({
            ...user,
            profile: e.target.files[0] // Only one file expected
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('uname', user.uname);
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('gender', user.gender);

        if (user.profile) {
            formData.append('profile', user.profile);
        }

        try {
            const response = await axios.post("http://localhost:1010/api/auth/user/signup", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            const data = response.data;

            if (response.status === 200) {
                StoreTokenInLs(data.jwt);
                toast.success(data.message);
                navigate("/");
            } else {
                console.log(data.message);
            }
        } catch (err) {
            // Check for response status and display error message
            if (err.response) {
                const { status, data } = err.response;
                if (status === 401) {
                    toast.error(data.message);
                } else {
                    console.log("An error occurred: " + (data.message || err.message));
                }
            } else {
                console.log("An error occurred: " + err.message);
            }
        }
    };


    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-center">Create New Account</h1>
                        <br />
                        <div className="flex justify-center">
                            <img src="/chat1.jpg" width="580px" alt="Chat" />
                        </div>
                        <p className="py-6 text-center">
                            Sign up to start chatting with friends and the community. Fill in the details to get started.
                        </p>
                    </div>

                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="uname" placeholder="Name" className="input input-bordered" onChange={handleInput} value={user.uname} required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Email" className="input input-bordered" onChange={handleInput} value={user.email} required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="Password" className="input input-bordered" onChange={handleInput} value={user.password} required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Gender</span>
                                </label>
                                <select name="gender" className="input input-bordered" onChange={handleInput} value={user.gender} required>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Profile</span>
                                </label>
                                <input type="file" name="profile" className="file-input w-full max-w-xs" onChange={handleFileChange} />
                            </div>

                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>
                            <label className="label text-center">
                                <span className="">Already have an account! <Link to="/" className="text-blue-500">Login</Link></span>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </> 
    );
};
