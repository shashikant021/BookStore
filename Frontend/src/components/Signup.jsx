import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {

    // const host = 'http://localhost:4001';
    const host = 'https://bookstore-o02g.onrender.com';

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    }
    await axios.post(`${host}/user/signup`, userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Signup successfully")
          navigate(from, {replace: true});
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        localStorage.setItem('Users', JSON.stringify(res.data.user));
      }).catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Wait : " + err.response.data.message);
        }
      });
  }
  return (
    <>
      <div className="flex h-screen items-center justify-center dark:bg-slate-800 dark:text-white">
        <div className=" lg:w-[600px] w-[500px] ">
          <div className="modal-box dark:bg-slate-700 dark:text-white">
            <form className="dark:bg-slate-700 dark:text-white"
              onSubmit={handleSubmit(onSubmit)} method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 dark:bg-slate-700 dark:text-white"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg text-center">Signup</h3>
              <div className="mt-4 space-y-2 lg:pl-10 pl-4">
                <span>Name</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="lg:w-96 w-72 px-3 py-1 border rounded-md outline-none dark:bg-slate-700 dark:text-white"
                  {...register("fullname", { required: true })}
                />
                <br />
                {errors.fullname && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Email */}
              <div className="mt-4 space-y-2 lg:pl-10 pl-4">
                <span>Email</span>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="lg:w-96 w-72 px-3 py-1 border rounded-md outline-none dark:bg-slate-700 dark:text-white"
                  {...register("email", { required: true })}
                />
                <br />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Password */}
              <div className="mt-4 space-y-2 lg:pl-10 pl-4">
                <span>Password</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your password"
                  className="lg:w-96 w-72 px-3 py-1 border rounded-md outline-none dark:bg-slate-700 dark:text-white"
                  {...register("password", { required: true })}
                />
                <br />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Button */}
              <div className="flex justify-around mt-4 ">
                <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                  Signup
                </button>
                {/* <p className="text-xl">
                  Have account?{" "}
                  <button
                    className="underline text-blue-500 cursor-pointer"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Login
                  </button>{" "}
                  <Login />
                </p> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;