'use client'

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { safeUser, safeReservation } from "../types";

import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/Listings/ListingCard";

interface ReservationsClientProps {
    reservations: safeReservation[];
    currentUser?: safeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        // Optimistically update UI before the request is completed
        const updatedReservations = reservations.filter(reservation => reservation.id !== id);

        // Simulate refreshing UI without waiting for the request
        toast.promise(
            axios.delete(`/api/reservations/${id}`),
            {
                loading: 'Cancelling reservation...',
                success: 'Reservation cancelled',
                error: 'Something went wrong.'
            }
        ).then(() => {
            router.refresh(); // Still refresh the page for accurate data
        }).finally(() => {
            setDeletingId('');
        });
    }, [reservations, router]);

    const reservationList = useMemo(() => reservations, [reservations]);

    return (
        <Container>
            <Heading
                title="Reservations"
                subtitle="Bookings on your properties"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservationList.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel guest reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
};

export default ReservationsClient;
