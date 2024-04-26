"use client";
import { useCallback, useState } from "react";

import { signOut } from "next-auth/react";

import useRegisterModel from "@/app/hooks/useRegisterModel";
import useLoginModel from "@/app/hooks/useLoginModel";

import { safeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";

import { AiOutlineMenu } from "react-icons/ai";


interface UserMenuProps {
    currentUser?: safeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const RegisterModal = useRegisterModel();
    const loginModel = useLoginModel();
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);
    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Airbnb your home
                </div>
                <div
                    onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition "
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem onClick={() => { }} label="My trips" />
                                <MenuItem onClick={() => { }} label="My favorites" />
                                <MenuItem onClick={() => { }} label="My reservations" />
                                <MenuItem onClick={() => { }} label="My properties" />
                                <MenuItem onClick={() => { }} label="Airbnb My Home" />
                                <MenuItem onClick={() => signOut()} label="Logout" />
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={loginModel.onOpen} label="Login" />
                                <MenuItem onClick={RegisterModal.onOpen} label="SignUp" />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
