import React, { useState, useRef } from 'react';
import {Arrow} from '../../helpers/svgIcons';
import {Link} from 'react-router-dom';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {Axios, refreshAuthLogic, options} from '../../helpers/axiosMiddleware';

const Location = () => {

    const formRef = useRef(null)

    const [name, setName] = useState(false);
    const [description, setDescription] = useState(false);
    const [imageUrl, setImageUrl] = useState(false);

    createAuthRefreshInterceptor(Axios, refreshAuthLogic, options);

    const addLocation = () => {
        const location = {
            name,
            description,
            image_url: imageUrl
        }

        for(let param in location){
            if(!location[param]) delete location[param];
        }

        Axios({
            method: 'POST',
            url: '/api/v1/inventory_locations',
            data: location
        })
        .then(response => {
            console.log(response);
            formRef.current.reset()
        })
        .catch(error => console.log(error))
    }

    return (
        <div className="m-10">
            <div className="grid grid-cols-6 my-6 ">
                <div className="col-span-6 sm:col-span-4 xl:col-span-5 flex items-center text-2xl">
                    <Link to="/items" className="hover:underline">Inventory</Link>
                    <img src={Arrow} alt="arrow"/>
                    <span>Settings</span>
                    <img src={Arrow} alt="arrow"/>
                    <span className="font-bold">Location</span>
                </div>
            </div>
            <div className="bg-gray-800 rounded p-5 shadow-xl m-auto text-white">
                <h1 className="text-5xl text-center">Inventory Location</h1>
                <form ref={formRef} onSubmit={(e) => {
                    e.preventDefault();
                    addLocation();
                    }}>
                <div className="my-5">
                        <label className="text-md " htmlFor="name">Name: </label>
                        <input 
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className ="text-md px-4 py-1 rounded text-black w-full" 
                        id="name"
                        autoFocus
                        required
                        />
                    </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea 
                    className="w-full rounded text-white p-2 bg-gray-700" 
                    placeholder="Say somthing about the inventory location" 
                    id="description" 
                    rows="4"
                    onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="text-center mt-5">
                    <button 
                        className="bg-teal-500 rounded px-8 py-1 text-black text-xl w-full md:w-64"
                        >
                        ADD
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default Location
