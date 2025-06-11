import { Link } from 'react-router-dom';
import './Employees.css';
import { useState } from 'react';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [detailsIdx, setDetailsIdx] = useState(null);
  const [showLogs, setShowLogs] = useState(false);

  // Employee fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [age, setAge] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [facebook, setFacebook] = useState('');

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (name.trim() && role.trim()) {
      setEmployees([
        ...employees,
        {
          name, role, age, birthdate, gender, address, phone, email, facebook,
          logs: []
        }
      ]);
      setName('');
      setRole('');
      setAge('');
      setBirthdate('');
      setGender('');
      setAddress('');
      setPhone('');
      setEmail('');
      setFacebook('');
      setShowForm(false);
    }
  };

  const handleTimeIn = (idx) => {
    const today = new Date().toLocaleDateString();
    setEmployees(prev => prev.map((emp, i) => {
      if (i !== idx) return emp;
      const logs = emp.logs || [];
      const existingLog = logs.find(log => log.date === today);
      if (existingLog) return emp;
      return {
        ...emp,
        logs: [...logs, { date: today, timeIn: new Date().toLocaleTimeString(), timeOut: '' }]
      };
    }));
  };

  const handleTimeOut = (idx) => {
    const today = new Date().toLocaleDateString();
    setEmployees(prev => prev.map((emp, i) => {
      if (i !== idx) return emp;
      const logs = (emp.logs || []).map(log =>
        log.date === today && !log.timeOut
          ? { ...log, timeOut: new Date().toLocaleTimeString() }
          : log
      );
      return { ...emp, logs };
    }));
  };

  return (
    <>
      <div className="employee-container">
        <nav className="employee-navbar">
          <ul>
            <li><Link to='/'>Dashboard</Link></li>
            <li><Link to='/appointments'>Appointments</Link></li>
            <li><Link to='/patients'>Patients</Link></li>
            <li><Link to='/employees'>Employees</Link></li>
          </ul>
        </nav>
        <div className="employee-content">
          <h1 style={{ color: '#fff' }}>Employees</h1>
          <p style={{ color: '#fff' }}>Records</p>
          <button onClick={() => setShowForm(true)}>Add Employee</button>
          {showForm && (
            <div className="employee-modal">
              <div className="employee-modal-content">
                <button className="employee-modal-close" onClick={() => setShowForm(false)}>×</button>
                <form onSubmit={handleAddEmployee} style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px' }}>
                  <input type="text" placeholder="Employee Name" value={name} onChange={e => setName(e.target.value)} required />
                  <input type="text" placeholder="Role" value={role} onChange={e => setRole(e.target.value)} required />
                  <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} required />
                  <input type="date" placeholder="Birthdate" value={birthdate} onChange={e => setBirthdate(e.target.value)} required />
                  <input type="text" placeholder="Gender" value={gender} onChange={e => setGender(e.target.value)} required />
                  <input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required />
                  <input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required />
                  <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                  <input type="text" placeholder="Facebook" value={facebook} onChange={e => setFacebook(e.target.value)} required />
                  <button type="submit" style={{ marginTop: '1rem' }}>Add Employee</button>
                </form>
              </div>
            </div>
          )}
          <table
            style={{
              width: '100%',
              marginTop: '2rem',
              background: '#fff',
              borderRadius: '0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, idx) => {
                const today = new Date().toLocaleDateString();
                const todayLog = (emp.logs || []).find(log => log.date === today);
                return (
                  <tr key={idx}>
                    <td>
                      <button
                        className="employee-name-btn"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#1976d2',
                          textDecoration: 'none',
                          cursor: 'pointer',
                          padding: 0,
                          font: 'inherit'
                        }}
                        onClick={() => { setDetailsIdx(idx); setShowDetails(true); }}
                      >
                        {emp.name}
                      </button>
                    </td>
                    <td>{today}</td>
                    <td>{todayLog?.timeIn || (
                      <button onClick={() => handleTimeIn(idx)}>Time In</button>
                    )}</td>
                    <td>{todayLog?.timeOut || (
                      <button
                        onClick={() => handleTimeOut(idx)}
                        disabled={!todayLog?.timeIn || !!todayLog?.timeOut}
                      >
                        Time Out
                      </button>
                    )}</td>
                    <td>
                      <button onClick={() => { setDetailsIdx(idx); setShowLogs(true); }}>
                        Show Logs
                      </button>
                      {showLogs && detailsIdx === idx && (
                        <div className="employee-modal">
                          <div className="employee-modal-content">
                            <button className="employee-modal-close" onClick={() => setShowLogs(false)}>×</button>
                            <div className="employee-details">
                              <h4>Attendance Log for {emp.name}</h4>
                              {(emp.logs && emp.logs.length > 0) ? (
                                <table style={{ width: '100%', background: '#fff', borderRadius: '8px', marginTop: '1rem' }}>
                                  <thead>
                                    <tr>
                                      <th>Date</th>
                                      <th>Time In</th>
                                      <th>Time Out</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {emp.logs.map((log, logIdx) => (
                                      <tr key={logIdx}>
                                        <td>{log.date}</td>
                                        <td>{log.timeIn || '--'}</td>
                                        <td>{log.timeOut || '--'}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              ) : (
                                <p>No logs available.</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Employee Details Modal */}
          {showDetails && detailsIdx !== null && employees[detailsIdx] && (
            <div className="employee-modal">
              <div className="employee-modal-content">
                <button className="employee-modal-close" onClick={() => setShowDetails(false)}>×</button>
                <div className="employee-details">
                  <h3>Employee Details</h3>
                  <div><strong>Name:</strong> {employees[detailsIdx].name}</div>
                  <div><strong>Role:</strong> {employees[detailsIdx].role}</div>
                  <div><strong>Age:</strong> {employees[detailsIdx].age}</div>
                  <div><strong>Birthdate:</strong> {employees[detailsIdx].birthdate}</div>
                  <div><strong>Gender:</strong> {employees[detailsIdx].gender}</div>
                  <div><strong>Address:</strong> {employees[detailsIdx].address}</div>
                  <div><strong>Phone:</strong> {employees[detailsIdx].phone}</div>
                  <div><strong>Email:</strong> {employees[detailsIdx].email}</div>
                  <div><strong>Facebook:</strong> {employees[detailsIdx].facebook}</div>
                  <div><strong>Attendance Logs:</strong> {employees[detailsIdx].logs ? employees[detailsIdx].logs.length : 0}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="employee-footer">
          <p>&copy; 2023 Reyes Medical Health Services</p>
        </div>
      </div>
    </>
  );
}

export default Employees;
