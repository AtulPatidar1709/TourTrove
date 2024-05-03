import { safeUser } from './../types/index';
import axios from "axios";
import { useRouter } from "next/navigation";
import { ReactEventHandler, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import useLoginModel from './useLoginModel';

interface IUseFavorite {
    listingId: string;
    currentUser?: safeUser | null;
}

const useFavorite = ({
    listingId,
    currentUser
}: IUseFavorite) => {
    const router = useRouter();
    const loginModel = useLoginModel();

    const hasFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!currentUser) {
            return loginModel.onOpen();
        }
        try {
            let request;

            if (hasFavorite) {
                request = () => axios.delete(`/api/favorites/${listingId}`)
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`)
            }
            await request();
            router.refresh();
            toast.success('Success');

        } catch (error) {
            toast.error('Something went wrong')
        }
    }, [currentUser, hasFavorite, listingId, router, loginModel]);

    return { hasFavorite, toggleFavorite }
}

export default useFavorite;