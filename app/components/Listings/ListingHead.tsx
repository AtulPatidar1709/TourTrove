'use client'

import useCountries from "@/app/hooks/useCountries"
import { safeUser } from "@/app/types"
import Heading from "../Heading"
import Image from "next/image"
import HeartButton from "../HeartButton"

interface ListingHeadPrpos {
    title: string,
    locationValue: string,
    imageSrc: string,
    id: string,
    currentUser?: safeUser | null

}

const ListingHead: React.FC<ListingHeadPrpos> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
}) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue)
    return (
        <>
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image
                    alt="Image"
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                />
            </div>
            <div className="absolute top-5 right-5">
                <HeartButton
                    listingId={id}
                    currentUser={currentUser}
                />
            </div>
        </>
    )
}

export default ListingHead