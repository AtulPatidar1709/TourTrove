import { error } from 'console';
import prisma from "@/app/libs/Prismadb";

interface IParams {
    listingId?: string,
    userId?: string,
    authorId?: string,
}

export default async function getReservations(
    params: IParams
) {
    try {
        const { listingId, userId, authorId } = params;

        const query: any = {};

        if (listingId) {
            query.listingId = listingId;
        }

        if (userId) {
            query.userId = userId;
        }
        if (authorId) {
            query.listing = { userId: authorId }
        }

        const reservation = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // const safeReservations = reservation.map((reservation) => ({
        //     ...reservation,
        //     createdAt: reservation.createdAt.toISOString(),
        //     startDate: reservation.endDate.toISOString(),
        //     endDate: reservation.endDate.toISOString(),
        //     listing: {
        //         ...reservation.listing,
        //         createAt: reservation.listing.createAt.toISOString()
        //     }
        // }));

        return reservation;
    } catch (error: any) {
        throw new Error(error);
    }
}
