import React from 'react';
import { Link, Route } from 'react-router-dom'



const Dashboard = () => {
    return (
        <div>
             <h1>Dashboard</h1>
             <ul>
                 <li><Link to="/dashboard">Welcome</Link></li>
                 <li><Link to="/dashboard/data">Data</Link></li>
             </ul>
        </div>
           
)
   
}

export default Dashboard;
