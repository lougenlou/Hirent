import React, { useState, useContext } from "react";
import "../../assets/Auth.css";
import hirentLogo from "../../assets/hirent-logo-purple.png";
import bg from "../../assets/auth-bg.gif";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


const AuthForm = ({ mode }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const validateName = (name) => {
        const words = name.trim().split(" ").filter((w) => w.length > 1);
        return words.length >= 2;
    };

    const validateEmail = (email) => {
        // simple regex for email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const { login } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        // required fields
        if (mode === "signup" && !formData.name) {
            setError("Name is required.");
            return;
        }
        if (!formData.email || !formData.password) {
            setError("Email and password are required.");
            return;
        }

        // name validation
        if (mode === "signup") {
            if (!formData.name) {
                setError("Full name is required.");
                return;
            }
            if (!validateName(formData.name)) {
                setError("Enter your first and last name (min 2 characters each).");
                return;
            }
        }

        // email validation
        if (!formData.email) {
            setError("Email is required.");
            return;
        }
        if (!validateEmail(formData.email)) {
            setError("Enter a valid email address.");
            return;
        }

        // password validation
        if (!formData.password) {
            setError("Password is required.");
            return;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        if (!/[0-9]/.test(formData.password)) {
            setError("Password must include at least one number.");
            return;
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
            setError("Password must include at least one special character.");
            return;
        }

        // TODO: add error handling for email and password correctness later

        setError("");

        // TODO: Integrate with backend Axios request here
        if (mode === "signup") {
            console.log("Signup data:", formData);
            navigate("/onboarding1");
        } else {
            console.log("Login data:", formData);
<<<<<<< HEAD
            navigate("/browse"); // change this to redirect to homepage after login
=======

            // ✅ Add this line to mark user as logged in
            login("fake_token_123"); // stores in localStorage + updates context state

            navigate("/browse"); // redirect to homepage after login
>>>>>>> main
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div
                className="min-h-screen w-full flex flex-col items-center justify-center relative"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Centered main container */}
                <div
                    className={`z-10 bg-white w-[780px] max-w-[100%] ${mode === "signup" ? "h-[520px]" : "h-[480px]"
                        } rounded-2xl shadow-2xl flex flex-row overflow-hidden hover:shadow-2xl hover:scale-[1.01] transition-all duration-300`}
                >


                    <div className="hidden md:flex w-1/2 items-center justify-center bg-white p-10 ml-3">
                        <img
                            src={require('../../assets/ecommerce-vector.png')}
                            alt="Ecommerce Illustration"
                            className="w-[150%] max-w-[360px]"
                        />
                    </div>


                    {/* Right Side – Login/Signup Form */}
                    <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 -ml-6">
                        <img src={hirentLogo} alt="Hirent Logo" className="w-24 h-auto mb-6" />

                        <h2 className="text-[21px] font-bold text-gray-900 mb-1 text-center">
                            {mode === "signup" ? "Create an account" : "Log In to Hirent"}
                        </h2>
                        <p className="text-[13px] text-gray-600 mb-3 text-center">
                            {mode === "signup" ? "Enter your details below" : "Enter your login details"}
                        </p>

                        <form className="space-y-2 w-[90%]" onSubmit={handleSubmit}>
                            {mode === "signup" && (
                                <div className="relative w-full mx-auto rounded-b-md overflow-hidden">
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder=" "
                                        className="block rounded-t-lg px-2 pb-2 pt-4 w-full text-[13px] text-gray-900 bg-white border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#bb84d6] peer"
                                    />
                                    <label
                                        htmlFor="name"
                                        className="absolute text-[13px] duration-300 transform -translate-y-3 scale-75 top-2.5 z-10 origin-[0] left-1
                    peer-placeholder-shown:translate-y-1.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500
                    peer-focus:-translate-y-3 peer-focus:scale-90 peer-focus:text-[#bb84d6]"
                                    >
                                        Full Name
                                    </label>
                                </div>
                            )}

                            <div className="relative w-full mx-auto rounded-b-md overflow-hidden">
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder=" "
                                    className="block rounded-t-lg px-2 pb-2 pt-4 w-full text-[13px] text-gray-900 bg-white border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#bb84d6] peer"
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute text-[13px] duration-300 transform -translate-y-3 scale-75 top-2.5 z-10 origin-[0] left-1
                  peer-placeholder-shown:translate-y-1.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500
                  peer-focus:-translate-y-3 peer-focus:scale-90 peer-focus:text-[#bb84d6]"
                                >
                                    Email
                                </label>
                            </div>

                            <div className="relative w-full mx-auto rounded-b-md overflow-hidden">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder=" "
                                    className="block rounded-t-lg px-2 pb-2 pt-4 w-full text-[13px] text-gray-900 bg-white border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#bb84d6] peer"
                                />
                                <label
                                    htmlFor="password"
                                    className="absolute text-[13px] duration-300 transform -translate-y-3 scale-75 top-2.5 z-10 origin-[0] left-1
                  peer-placeholder-shown:translate-y-1.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500
                  peer-focus:-translate-y-3 peer-focus:scale-90 peer-focus:text-[#bb84d6]"
                                >
                                    Password
                                </label>

                                {formData.password.length > 0 && (
                                    <input
                                        type="checkbox"
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
                                        checked={showPassword}
                                        onChange={() => setShowPassword(!showPassword)}
                                    />
                                )}
                            </div>

                            {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                            <div className="flex flex-col gap-2">
                                <button
                                    type="submit"
                                    className="relative w-full mx-auto bg-[#7A1CA9] text-white py-2.5 text-[13px] font-medium rounded-md overflow-hidden group transition-all duration-300 hover:bg-[#65188a] mt-2"
                                >
                                    {/* Gradient swipe layer */}
                                    <span className="absolute inset-0 bg-gradient-to-r from-pink-700 to-purple-600 opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700 ease-in-out"></span>
                                    <span className="absolute inset-0 bg-white opacity-20 rotate-45 translate-x-[-150%] group-hover:translate-x-[150%] blur-sm transition-transform duration-700 ease-in-out"></span>
                                    <span className="relative z-10">
                                        {mode === "signup" ? "Create Account" : "Log In"}
                                    </span>
                                </button>


                                <button
                                    type="button"
                                    className="w-full mx-auto border border-gray-400 flex items-center justify-center gap-2 py-2.5 text-[13px] rounded-md text-gray-700 hover:text-[#9935cb] hover:border-[#9935cb] hover:bg-gray-10 transition-all"
                                >
                                    <img
                                        src="https://www.svgrepo.com/show/355037/google.svg"
                                        alt="Google"
                                        className="w-5 h-5"
                                    />
                                    {mode === "signup" ? "Sign up" : "Sign in"} with Google
                                </button>
                            </div>
                        </form>

                        <p className="text-[13px] text-gray-600 text-center mt-5">
                            {mode === "signup" ? "Already have an account?" : "Don’t have an account?"}{" "}
                            <Link
                                to={mode === "signup" ? "/login" : "/signup"}
                                className="text-[#862bb3] hover:underline font-medium"
                            >
                                {mode === "signup" ? "Login" : "Signup"}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AuthForm;
