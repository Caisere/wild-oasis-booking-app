import { useBookings } from "./useBookings";

//ui components
import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Empty from '../../ui/Empty'
import Pagination from "../../ui/Pagination";

function BookingTable() {
    // datat from the useBooking hook
    const { isLoading, bookings, count } = useBookings()

    // on loading state
    if (isLoading) return <Spinner />
    
    // ui when there is no booking
    if (!bookings?.length) <Empty resourceName='bookings' />


    return (
        <Menus>
            <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
                <Table.Header>
                    <div>Cabin</div>
                    <div>Guest</div>
                    <div>Dates</div>
                    <div>Status</div>
                    <div>Amount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={bookings}
                    render={(booking) => (
                        <BookingRow key={booking.id} booking={booking} />
                    )}
                />

                <Table.Footer>
                    <Pagination count={count } params='page' />
                </Table.Footer>
            </Table>
        </Menus>
    );
}

export default BookingTable;
