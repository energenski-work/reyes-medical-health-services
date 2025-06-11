import { Link } from 'react-router-dom';
import { useState } from 'react';
import './PatientRecords.css';

function PatientRecords() {
    const [records, setRecords] = useState([]);
    const [newRecord, setNewRecord] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState(null);
    const [showRecord, setShowRecord] = useState(false);

    const [patientNum, setPatientNum] = useState('');
    const [patientFirstName, setPatientFirstName] = useState('');
    const [patientLastName, setPatientLastName] = useState('');
    const [patientAge, setPatientAge] = useState('');
    const [patientBirthdate, setPatientBirthdate] = useState('');
    const [patientGender, setPatientGender] = useState('');
    const [patientAddress, setPatientAddress] = useState('');
    const [patientPhone, setPatientPhone] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [patientFB, setPatientFB] = useState('');
    
    const handleAddPatient = (e) => {
        e.preventDefault();
        // Remove patientNum from validation if not required
        if (
            patientFirstName &&
            patientLastName &&
            patientBirthdate &&
            patientAge &&
            patientGender &&
            patientAddress &&
            patientPhone
            // patientFB and patientEmail is NOT required here
        ) {
            setRecords([
                ...records,
                {
                    patientNum, // You can remove this if not needed
                    patientFirstName,
                    patientLastName,
                    patientBirthdate,
                    patientAge,
                    patientGender,
                    patientAddress,
                    patientPhone,
                    patientEmail,
                    patientFB,
                    appointments: []
                }
            ]);
            setPatientNum('');
            setPatientFirstName('');
            setPatientLastName('');
            setPatientBirthdate('');
            setPatientAge('');
            setPatientGender('');
            setPatientAddress('');
            setPatientPhone('');
            setPatientEmail('');
            setPatientFB('');
            setNewRecord(false);
        }
    };

    return (
        <>
            <div className="patientrecs-container">
                <nav className="patientrecs-navbar">
                    <ul>
                    <li><Link to='/'>Dashboard</Link></li>
                    <li><Link to='/route2'>Appointments</Link></li>
                    <li><Link to='/patients'>Patients</Link></li>
                    <li><Link to='/employees'>Employees</Link></li>
                    </ul>
                </nav>
                <div className="patientrecs-content">
                    <h1 style={{ color: '#fff' }}>Patients</h1>
                    <p style={{ color: '#fff' }}>Records</p>
                    <button onClick={() => { setNewRecord(true) }}>Add Patient</button>
                    {newRecord && (
                    <div className="patientrecs-modal">
                        <div className="patientrecs-modal-content">
                        <button className="patientrecs-modal-close" onClick={() => setNewRecord(false)}>×</button>
                        <form onSubmit={handleAddPatient} style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px' }}>
                            <input type="text" placeholder="Patient First Name" value={patientFirstName} onChange={e => setPatientFirstName(e.target.value)} required />
                            <input type="text" placeholder="Patient Last Name" value={patientLastName} onChange={e => setPatientLastName(e.target.value)} required />
                            <input type="date" placeholder="Patient Birthdate" value={patientBirthdate} onChange={e => setPatientBirthdate(e.target.value)} required />
                            <input type="number" placeholder="Patient Age" value={patientAge} onChange={e => setPatientAge(e.target.value)} required />
                            <input type="text" placeholder="Patient Gender" value={patientGender} onChange={e => setPatientGender(e.target.value)} required />
                            <input type="text" placeholder="Patient Address" value={patientAddress} onChange={e => setPatientAddress(e.target.value)} required />
                            <input type="text" placeholder="Patient Phone" value={patientPhone} onChange={e => setPatientPhone(e.target.value)} required />
                            <input type="email" placeholder="Patient Email" value={patientEmail} onChange={e => setPatientEmail(e.target.value)} />
                            <input type="text" placeholder="Patient Facebook" value={patientFB} onChange={e => setPatientFB(e.target.value)} />
                            <button type="submit" style={{ marginTop: '1rem' }}>Add Patient</button>
                        </form>
                        </div>
                    </div>
                    )}
                    <table style={{ width: '100%', marginTop: '2rem', background: '#fff', borderRadius: '0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Appointments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((rec, idx) => (
                                <tr key={idx}>
                                    <td>
                                        {rec.patientNum ? rec.patientNum : idx + 1}
                                    </td>
                                    <td>
                                        <button
                                            className="patientrecs-name-btn"
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#000',
                                                textDecoration: 'none',
                                                cursor: 'pointer',
                                                padding: 0,
                                                font: 'inherit'
                                            }}
                                            onClick={() => { setSelectedIdx(idx); setShowRecord(true); }}
                                        >
                                            {rec.patientFirstName} {rec.patientLastName}
                                        </button>
                                    </td>
                                    <td>
                                        {rec.appointments && rec.appointments.length > 0 ? (
                                            <ul style={{ margin: 0, paddingLeft: '1.2em', }}>
                                                {rec.appointments.map((appt, apptIdx) => (
                                                    <li key={apptIdx}>{appt.appointmentNum || appt.id || apptIdx + 1}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span>None</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Patient Details Modal */}
                    {showRecord && selectedIdx !== null && records[selectedIdx] && (
                        <div className="patientrecs-modal">
                            <div className="patientrecs-modal-content">
                                <button className="patientrecs-modal-close" onClick={() => setShowRecord(false)}>×</button>
                                <div className="patient-details">
                                    <h3>Patient Details</h3>
                                    <div><strong>ID:</strong> {records[selectedIdx].patientNum ? records[selectedIdx].patientNum : selectedIdx + 1}</div>
                                    <div><strong>First Name:</strong> {records[selectedIdx].patientFirstName}</div>
                                    <div><strong>Last Name:</strong> {records[selectedIdx].patientLastName}</div>
                                    <div><strong>Birthdate:</strong> {records[selectedIdx].patientBirthdate}</div>
                                    <div><strong>Age:</strong> {records[selectedIdx].patientAge}</div>
                                    <div><strong>Gender:</strong> {records[selectedIdx].patientGender}</div>
                                    <div><strong>Address:</strong> {records[selectedIdx].patientAddress}</div>
                                    <div><strong>Phone:</strong> {records[selectedIdx].patientPhone}</div>
                                    <div><strong>Email:</strong> {records[selectedIdx].patientEmail}</div>
                                    <div><strong>Facebook:</strong> {records[selectedIdx].patientFB}</div>
                                    <div><strong>Appointments:</strong> {records[selectedIdx].appointments ? records[selectedIdx].appointments.length : 0}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="patientrecs-footer">
                    <p>&copy; 2023 Reyes Medical Health Services</p>
                </div>
            </div>
        </>
    )
}

export default PatientRecords;