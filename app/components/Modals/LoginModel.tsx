"use client"

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";

import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";

import useRegisterModel from "@/app/hooks/useRegisterModel";
import useLoginModel from "@/app/hooks/useLoginModel";
import Modal from "./Modal";

import Heading from "../Heading";
import Input from "../Input/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


const LoginModel = () => {
    const router = useRouter();
    const RegisterModal = useRegisterModel();
    const loginModel = useLoginModel();
    const [isLoading, setisLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: 'Test@gmail.com',
            password: 'Test123',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setisLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
            .then((callback) => {
                setisLoading(false);

                if (callback?.ok) {
                    toast.success('Logged In');
                    router.refresh();
                    loginModel.onClose();
                }

                if (callback?.error) {
                    toast.error(callback.error);
                }
            })
    }

    const toggle = useCallback(
        () => {
            loginModel.onClose();
            RegisterModal.onOpen();
        },
        [loginModel, RegisterModal],
    )


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome Back"
                subtitle="Login to your account!"
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
                        Don&lsquo;t have an account?
                    </div>
                    <div
                        onClick={toggle}
                        className="
                        text-neutral-800
                        cursor-pointer
                        hover:underline"
                    >
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModel.isOpen}
            title="Login"
            actionLable="Continue"
            onClose={loginModel.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footeContent}
        />
    )
}

export default LoginModel;