import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";
import styled from "styled-components";

const StyledDiv = styled.div`
	margin-top: auto;
	background-color: #e0e7ff;
	padding: 8px;
	border-radius: 5px;
	text-align: center;
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const H3 = styled.h3`
    color: #000;
`

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

// delete all existing guests 
async function deleteGuests() {
	const { error } = await supabase.from("guest").delete().gt("id", 0);
	if (error) console.log(error.message);
}

// delete all existing cabins
async function deleteCabins() {
	const { error } = await supabase.from("cabins").delete().gt("id", 0);
	if (error) console.log(error.message);
}

// delete all existing bookings
async function deleteBookings() {
	const { error } = await supabase.from("bookings").delete().gt("id", 0);
	if (error) console.log(error.message);
}

// create guests using the guests array from data-guests
async function createGuests() {
	const { error } = await supabase.from("guest").insert(guests);
	if (error) console.log(error.message);
}

// create cabins using the cabins array from data-cabins
async function createCabins() {
	const { error } = await supabase.from("cabins").insert(cabins);
	if (error) console.log(error.message);
}

// create bookings using the cabins and guests (matching cabins with guests using each cabin and guest id)
async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
	const { data: guestsIds } = await supabase
		.from("guest")
		.select("id")
		.order("id");
		
		const allGuestIds = guestsIds.map((cabin) => cabin.id);
		console.log(allGuestIds)

	const { data: cabinsIds } = await supabase
		.from("cabins")
		.select("id")
		.order("id");

	const allCabinIds = cabinsIds.map((cabin) => cabin.id);

	const finalBookings = bookings.map((booking) => {
		// Here relying on the order of cabins, as they don't have and ID yet
		const cabin = cabins.at(booking.cabinId - 1);

		const numNights = subtractDates(booking.endDate, booking.startDate);

		const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);

		const extrasPrice = booking.hasBreakfast ? numNights * 15 * booking.numGuests : 0; // hardcoded breakfast price

		const totalPrice = cabinPrice + extrasPrice;

		let status;

		if (isPast(new Date(booking.endDate)) && !isToday(new Date(booking.endDate))) status = "checked-out";
		
		if (isFuture(new Date(booking.startDate)) || isToday(new Date(booking.startDate))) status = "unconfirmed";
		
		if ((isFuture(new Date(booking.endDate)) || isToday(new Date(booking.endDate))) && isPast(new Date(booking.startDate)) && !isToday(new Date(booking.startDate))) status = "checked-in";

		return {
			...booking,
			numNights,
			cabinPrice,
			extrasPrice,
			totalPrice,
			guestId: allGuestIds.at(booking.guestId - 1),
			cabinId: allCabinIds.at(booking.cabinId - 1),
			status,
		};
	});

	console.log(finalBookings);

	const { error } = await supabase.from("bookings").insert(finalBookings);
	if (error) console.log(error.message);
}

function Uploader() {
	const [isLoading, setIsLoading] = useState(false);

	async function uploadAll() {
		setIsLoading(true);
		// Bookings need to be deleted FIRST
		await deleteBookings();
		await deleteGuests();
		await deleteCabins();

		// Bookings need to be created LAST
		await createGuests();
		await createCabins();
		await createBookings();

		setIsLoading(false);
	}

	async function uploadBookings() {
		setIsLoading(true);
		await deleteBookings();
		await createBookings();
		setIsLoading(false);
	}

	return (
		<StyledDiv>
			<H3>SAMPLE DATA</H3>

			<Button onClick={uploadAll} disabled={isLoading}>
				Upload ALL
			</Button>

			<Button onClick={uploadBookings} disabled={isLoading}>
				Upload bookings ONLY
			</Button>
		</StyledDiv>
	);
}

export default Uploader;

// style={{
//     marginTop: "auto",
//     backgroundColor: "#e0e7ff",
//     padding: "8px",
//     borderRadius: "5px",
//     textAlign: "center",
//     display: "flex",
//     flexDirection: "column",
//     gap: "8px",
// }}
