import Lottie from "lottie-react";
import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import loginAnim from "../../assets/Animation/login_animation.json";
import toast, { Toaster } from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { createAccount } = use(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newData = Object.fromEntries(formData.entries());
    const { name, email, password, cPassword, photoUrl } = newData;

    // Password validation regex
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    // Validation
    if (password !== cPassword) {
      setErrorMessage("Passwords do not match");
      return;
    } else if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    } else if (!hasUppercase) {
      setErrorMessage("Password must contain at least one uppercase letter");
      return;
    } else if (!hasLowercase) {
      setErrorMessage("Password must contain at least one lowercase letter");
      return;
    }

    try {
      const userCredential = await createAccount(email, password);
      const user = userCredential.user;

      // update profile
      await updateProfile(user, {
        displayName: name,
        photoURL: photoUrl,
      });
      navigate("/");
      toast.success("Account create successfully.");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center items-center my-8">
        {/* Row */}
        <div className="flex ">
          {/* Col */}
          <div className="bg-white/0  bg-cover rounded-l-lg">
            <Lottie
              animationData={loginAnim}
              loop={true}
              style={{ background: "transparent" }}
            ></Lottie>
          </div>
          {/* Col */}
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 className="pt-4 text-2xl font-bold text-center">
              Create an Account!
            </h3>
            <form
              onSubmit={handleSignup}
              className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
            >
              <div className="mb-4">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="firstName"
                  >
                    Name
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    name="name"
                    placeholder="Enter Name "
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  Photo Url
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  name="photoUrl"
                  type="text"
                  placeholder="Photo url..."
                  required
                />
              </div>
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    name="password"
                    type="password"
                    placeholder="******************"
                    required
                  />
                  <p className="text-xs italic text-red-500">{errorMessage}</p>
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="c_password"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    name="cPassword"
                    type="password"
                    placeholder="******************"
                    required
                  />
                </div>
              </div>
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Register Account
                </button>
              </div>
              <hr className="mb-6 border-t" />
              <div className="text-center">
                <a
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="text-center">
                Already have an account?
                <Link
                  to={"/login"}
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                >
                  Login!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false}></Toaster>
    </div>
  );
};

export default Register;
