import React from 'react';
import { Link, Route } from 'react-router-dom'
import Welcome from './Welcome';

const links = [
    {
        name: 'Main',
        id: 'main-component',
        description: 'Main page for dashboard'
    },
    {
        name: 'Charts',
        id: 'Charts display',
        description: "Display site charts with generated data",
        resources: [
           {
            name: 'Users data',
            id: 'users-data',
            description: 'All users data generated by ...',
            url: 'https://www.google.com'
           },
           {
            name: 'Posts data',
            id: 'posts-data',
            description: 'When building a site display all posts',
            url: 'https://www.medium.com'
           }
        ]
    },
    {
        name: 'Data',
        id: 'data',
        description: 'site-data generated',
    }
]


const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>

            <ul>
                {links.map(({ name, id}) => (
                    <li key={id}>
                        <Link to={`/dashboard/${id}`}>{name}</Link>
                    </li>
                )
                )}
            </ul>

            <hr/>

            <Route path={ `/dashboard/:dashboardId`} component={Welcome} />
        </div>
    );
}

export default Dashboard;
