import prisma from "@/app/libs/Prismadb";

export default async function getListings() {
    try {
        const listings = await prisma?.listing.findMany({
            orderBy: {
                createAt: 'desc'
            }
        });
        // const safeListings = listings.map((listing) => ({
        //     ...listing,
        //     createAt: listing.createAt.toISOString(),
        // }));

        return listings;

    } catch (error: any) {
        throw new Error(error);
    }
}