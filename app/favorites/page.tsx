import EmptyState from "../components/EmptyState"

import getCurrentUser from "../actions/getCurrentUser"
import getFavoriteLisings from "../actions/getFavoritesListings"
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {

    const listings = await getFavoriteLisings();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <>
                <EmptyState
                    title="No favorites found"
                    subtitle="Looks like you have no favorite listing"
                />
            </>
        )
    }

    return (
        <>
            <FavoritesClient
                listings={listings}
                currentUser={currentUser}
            />
        </>
    )
}

export default ListingPage
