import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";


export function useCheckOut () {
    const queryClient = useQueryClient()

    const {mutate: checkout, isPending: isCheckingOut} = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId, {
            status: 'checked-out',
        }),
        onSuccess: (data) => {
            toast.success(`Booking ${data.id} successfully checked out`),
            queryClient.invalidateQueries({active: true}) //true to refresh
        }, onError: (err) => {
            toast.error(`There was an error while checking in ${err.message}`)
        }
    })

    return {checkout, isCheckingOut}
}