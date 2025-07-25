import React from 'react'
import Stat from './Stat'
import {HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar} from 'react-icons/hi2'
import { formatCurrency } from '../../utils/helpers'


const Stats = ({bookings, confirmedStays, numDays, cabinCount}) => {
    const numBookings = bookings.length

    const totalSales = bookings?.reduce((acc, cur) => 
        acc + cur.totalPrice
    , 0)



    const checkIns = confirmedStays.length



    const occupation = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0)/(numDays * cabinCount);


    // const totalCheckIns = confirmedStays.filter(check => check.status === 'checked-in')

    // console.log(totalCheckIns)


    return (
        <>
            <Stat title='bookings' color='blue' icon={<HiOutlineBriefcase />} value={numBookings} />
            <Stat title='Sales' color='green' icon={<HiOutlineBanknotes />} value={formatCurrency(totalSales)} />
            <Stat title='Check ins' color='indigo' icon={<HiOutlineCalendarDays />} value={checkIns} />
            <Stat title='Occupancy rate' color='yellow' icon={<HiOutlineChartBar />} value={Math.round(occupation * 100) + '%'} />
        </>
    )
}

export default Stats