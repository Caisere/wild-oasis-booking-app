import { useSearchParams } from "react-router-dom";
import {subDays} from 'date-fns'
import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
    const [searchParams] = useSearchParams()

    const numDays = !searchParams.get('last') ? 7 : searchParams.get('last');
    
    const queryDate = subDays(new Date(), numDays).toISOString()
    
    // console.log(queryDate)

    const {data: bookings, isPending} = useQuery({
        queryKey: ['bookings', `last-${numDays}`],
        queryFn: () => getBookingsAfterDate(queryDate)
    })

    return {bookings, isPending}
}