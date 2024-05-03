'use client'
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/Listings/ListingHead";
import ListingInfo from "@/app/components/Listings/ListingInfo";
import { categories } from "@/app/components/Navbar/Categories";
import { safeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client"
import { useMemo } from "react";

interface ListingClientProps {
    reservations?: Reservation[];
    listing: Listing & {
        user: safeUser
    };
    currentUser?: safeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser
}) => {
    const category = useMemo(() => {
        return categories.find((item) =>
            item.label === listing.category);
    }, [listing.category]);
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomcount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient