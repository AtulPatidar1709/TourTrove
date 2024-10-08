"use client"

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";

import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";

import useRegisterModel from "@/app/hooks/useRegisterModel";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Input/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModel from "@/app/hooks/useLoginModel";


const RegisterModal = () => {
    const loginModel = useLoginModel();
    const RegisterModal = useRegisterModel();
    const [isLoading, setisLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setisLoading(true);

        // console.log('Form Data:', data); // Add this log

        axios.post('/api/register', data)
            .then(() => {
                toast.success('User Created');
                RegisterModal.onClose();
                loginModel.onOpen();
            })
            .catch((error) => {
                console.error('Error:', error.response?.data); // Log the error details
                toast.error('Something went wrong');
            })
            .finally(() => {
                setisLoading(false);
            });
    };


    const toggle = useCallback(
        () => {
            RegisterModal.onClose();
            loginModel.onOpen();
        },
        [loginModel, RegisterModal],
    )

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb"
                subtitle="Create an account!"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )
    const footeContent = (
        <div className={`flex flex-col gap-4 mt-3`}>
            <hr />
            <Button outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div
                className="
                text-neutral-500
                text-center
                mt-4
                font-light
                "
            >
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Already have an account?
                    </div>
                    <div
                        onClick={toggle}
                        className="
                        text-neutral-800
                        cursor-pointer
                        hover:underline"
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={RegisterModal.isOpen}
            title="Register"
            actionLable="Continue"
            onClose={RegisterModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footeContent}
        />
    )
}

export default RegisterModal