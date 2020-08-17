import React from 'react';
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link className="bg-orange-600 rounded-full px-5 py-2" to="/companies">Companies</Link>
        </div>
    )
}

export default Home;
