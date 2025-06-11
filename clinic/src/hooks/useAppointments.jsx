import { useState } from "react";

export default function useAppointments() {

    // Create hooks for cart total
    // Create hooks for cart (items)
    const [appointmentTotal, setAppointmentTotal] = useState(0);
    const [appointmentList, setAppointmentList] = useState([]);

    const handleSubmit = (appointment) => {
        // Output added to cart
        // SetCart
        // Set Cart Total
        console.log(appointment + " added to appointments");
        setAppointmentList((appointmentIndex) => [...appointmentIndex, appointment]);
        setAppointmentTotal((appointmentTotal) => appointmentTotal + 1);
        
    }
    
    return {
        handleSubmit,
        appointmentTotal,
        appointmentList
    }
}