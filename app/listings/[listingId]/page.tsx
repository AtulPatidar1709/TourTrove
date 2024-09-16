import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParam {
    listingId?: string,
}

const ListingPage = async ({ params }: { params: IParam }) => {

    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if (!listing || currentUser === undefined) {
        return (
            <>
                <EmptyState />
            </>
        )
    }

    return (
        <>
            <ListingClient
                reservations={reservations}
                listing={listing}
                currentUser={currentUser}
            />
        </>
    )
}

export default ListingPage;