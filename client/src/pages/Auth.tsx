import React, { useCallback, useState } from "react";
import Input from "../components/Input";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Auth = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const navigate = useNavigate();
  const handleSubmit = async () => {
  try {
    const endpoint = variant === "login" ? "/login" : "/register";
    const payload =
      variant === "login"
        ? { email, password }
        : { name: username, email, password }; // note: your backend expects "name"

    const { data } = await axios.post(`http://localhost:3000/api/auth${endpoint}`, payload);

    // Save JWT token to localStorage
    localStorage.setItem("jwtToken", data.token);

    // Redirect to profile page
    navigate("/profile");
  } catch (err: any) {
    console.error("Auth error:", err);
    alert(err?.response?.data?.message || "Something went wrong");
  }
};


  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "login" ? "register" : "login"));
  }, []);

  return (
    <div className="relative h-full w-full bg-[url('./assets/hero.jpg')] bg-center bg-no-repeat bg-fixed bg-cover ">
      <div className="h-full w-full bg-black/50">
        <nav className="px-12 py-4 ">
          <img src="\src\assets\logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center ">
          <div className="px-16 py-16 bg-black/70 self-center rounded lg:w-2/6 mt-20">
            <h2 className="text-white  font-semibold text-4xl">
              {variant == "login" ? "Sign In" : "Register"}
            </h2>
            {variant === "register" ? (
              <Input
                type={"text"}
                placeholder={"username"}
                onChange={(ev) => setUsername(ev.target.value)}
                value={username}
              />
            ) : null}
            <Input
              type={"email"}
              placeholder={"Email"}
              onChange={(ev) => setEmail(ev.target.value)}
              value={email}
            />
            <Input
              type={"password"}
              placeholder={"Password"}
              onChange={(ev) => setPassword(ev.target.value)}
              value={password}
            />
            <div className="flex justify-center gap-6">
              <div
                onClick={() => {
                  window.location.href =
                    "http://localhost:3000/api/auth/google";
                }}
                className="flex items-center justify-center h-12 w-12 mt-8 bg-white rounded-4xl hover:opacity-80 transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => {}}
                className="flex items-center justify-center h-12 w-12 mt-8 bg-white rounded-4xl hover:opacity-80 transition"
              >
                <FaGithub size={30} />
              </div>
            </div>
            <button onClick={handleSubmit} className="text-white bg-red-600 py-3 rounded w-full mt-10 hover:bg-red-800 transition-all cursor-pointer">
              Login
            </button>
            <p className="text-zinc-400 mt-6 text-center ">
              Dont have an Account?{" "}
              <span
                onClick={toggleVariant}
                className="text-white hover:underline cursor-pointer"
              >
                {variant === "login"
                  ? "Create an Account"
                  : "Already have an account"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
