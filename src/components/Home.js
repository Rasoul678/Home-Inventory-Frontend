import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div className="text-center mt-20">
            <h1 className="text-3xl sm:text-5xl font-bold">Welcome</h1>
            <h1 className="text-3xl sm:text-5xl mt-10 font-bold">Manage Your Stuff in Home</h1>
            <Link to='items' className="bg-teal-400 rounded px-16 py-3 mt-10 inline-block text-xl">Inventory</Link>
        </div>
    )
}

export default Home;
