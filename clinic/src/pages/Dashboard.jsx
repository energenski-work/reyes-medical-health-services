import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <nav className="dashboard-navbar">
        <ul>
          <li><Link to='/'>Dashboard</Link></li>
          <li><Link to='/route2'>Appointments</Link></li>
          <li><Link to='/patients'>Patients</Link></li>
          <li><Link to='/employees'>Employees</Link></li>
        </ul>
      </nav>
      <div className="dashboard-content">
        <h1 style={{ color: '#fff' }}>Reyes Medical Health Services</h1>
        <p style={{ color: '#fff' }}>Welcome to your clinic dashboard</p>
      </div>
      <div className="dashboard-main">
        <div className="dashboard-cards">
          <div className="card">
            <h1>Current Patient</h1>
            <p>*Name of Patient*</p>
          </div>
          <div className="card">
            <h2>Appointments</h2>
            <p>Manage your appointments here.</p>
            <Link to='/appointments'>View Appointments</Link>
          </div>
          <div className="card">
            <h2>Patients</h2>
            <p>View and manage patient records.</p>
            <Link to='/patients'>View Patients</Link>
          </div>
          <div className="card">
            <h2>Employees</h2>
            <p>Manage employee details.</p>
            <Link to='/employees'>View Employees</Link>
          </div>
        </div>
        <div className="dashboard-footer">
          <p>&copy; 2023 Reyes Medical Health Services</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;