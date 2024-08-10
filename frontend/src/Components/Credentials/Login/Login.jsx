import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useChangeTitle from "../../../hooks/useChangeTitle";
import { useFormik } from "formik";
import InputField from "../Fields/InputField.jsx";
import { loginSchema } from "../schemas.js";
import axios from './../../../API/axios';
import { toast } from "react-toastify";
import LoadingScreen from "../../../common/Loading.jsx";


export default function Login({ validateUser }) {
    useChangeTitle("Login");

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const sendData = async (values) => {
        setIsLoading(true);
        try {
            const response = await axios.post("/auth/signin", values);
            if (response.status === 200) {
                toast.success("Logged in!..", { theme: "dark" });
                await validateUser()
                navigate("/")
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong", {
                theme: "dark",
            });
        } finally {
            setIsLoading(false);
        }
    };

    //formik
    const formik = useFormik({
        initialValues: {
            userName: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: values => sendData(values)
    });

    return (
        <>
            {isLoading && <LoadingScreen fullScreen={true} />}
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                                <InputField
                                    key='userName'
                                    field='userName'
                                    formik={formik}
                                    labelName="Username"
                                />

                                <InputField
                                    key='password'
                                    field='password'
                                    type="password"
                                    formik={formik}
                                    labelName="Password"
                                />

                                {isLoading ?
                                    <button disabled={true}
                                        type="submit" className="cursor-not-allowed w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800">
                                        loading...</button>
                                    :
                                    <button
                                        type="submit" className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-primary-800">
                                        Login</button>

                                }
                            </form>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?
                                <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Sign up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
