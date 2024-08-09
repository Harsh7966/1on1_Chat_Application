import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import react-toastify for notifications
import { UseContext } from "../../../storage/auth";

export const Login = () => {
    const {StoreTokenInLs}= UseContext();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate(); // For navigation after login

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:1010/api/auth/user/login",{
                method: "POST",
                headers: {
                    "Content-type":"application/json"
                },
                body: JSON.stringify(user)
            });

            const data= await response.json();

            if (response.status === 200) {
                StoreTokenInLs(data.jwt)
                toast.success(data.msg);
                navigate("/home")
            }else if(response.status === 400){
                toast.error(data.msg)
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Welcome Back!</h1>
                        <br />
                        <h4 className="text-2xl font-bold">Log in to Your Account</h4>
                        <p className="py-6">
                            Stay connected with your friends and the community. Enter your details to access your chats.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="input input-bordered"
                                    onChange={handleInput}
                                    value={user.email}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="input input-bordered"
                                    onChange={handleInput}
                                    value={user.password}
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                            <label className="label text-center">
                                <span className="">
                                    Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
                                </span>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
