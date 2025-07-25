import { useSearchParams } from "react-router-dom";
import {subDays} from 'date-fns'
import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
    const [searchParams] = useSearchParams()

    const numDays = !searchParams.get('last') ? 7 : searchParams.get('last');
    
    const queryDate = subDays(new Date(), numDays).toISOString()
    
    // console.log(queryDate)

    const {data: stays, isPending} = useQuery({
        queryKey: ['stays', `last-${numDays}`],
        queryFn: () => getStaysAfterDate(queryDate)
    })

    const confirmedStays = stays?.filter(stay => stay.status === 'checked-in' || stay.status === 'checked-out')

    return {confirmedStays, stays, isPending, numDays}
}