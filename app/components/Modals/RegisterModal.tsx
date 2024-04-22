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

const RegisterModal = () => {

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

        axios.post('/api/register', data)
            .then(() => {
                RegisterModal.onClose();
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setisLoading(false);
            })
    }

    return (
        <Modal
            disabled={isLoading}
            isOpen={RegisterModal.isOpen}
            title="Register"
            actionLable="Continue"
            onClose={RegisterModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
        />
    )
}

export default RegisterModal