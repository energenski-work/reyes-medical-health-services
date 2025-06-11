import { useState } from "react";

export default function usePatients() {

    // Create hooks for cart total
    // Create hooks for cart (items)
    const [patientTotal, setPatientTotal] = useState(0);
    const [patientList, setPatientList] = useState([]);

    const handleSubmit = (patient) => {
        // Output added to cart
        // SetCart
        // Set Cart Total
        console.log(patient + " added to list");
        setPatientList((patientIndex) => [...patientIndex, patient]);
        setPatientTotal((patientTotal) => patientTotal + 1);
        
    }
    
    return {
        handleSubmit,
        patientTotal,
        patientList
    }
}