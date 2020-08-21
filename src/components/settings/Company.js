import React, { useState, useRef } from 'react';
import {Link} from 'react-router-dom';
import {Arrow} from '../../helpers/svgIcons';
import { useQuery } from 'react-query';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {Axios, refreshAuthLogic, options} from '../../helpers/axiosMiddleware';


const Company = () => {

    const formRef = useRef(null);

    const [name, setName] = useState(false);
    const [email, setEmail] = useState(false);
    const [description, setDescription] = useState(false);
    const [web, setWeb] = useState(false);
    const [type, setType] = useState(false);
    const [countryId, setCountryId] = useState(false);
    const [stateId, setStateId] = useState(false);
    const [addressId, setAddressId] = useState(false);
    
    createAuthRefreshInterceptor(Axios, refreshAuthLogic, options);

    const addCompany = () => {
        const company = {
            address_id: Number(addressId),
            name,
            email,
            description,
            type,
            website_url: web
        }

        for(let param in company){
            if(!company[param]) delete company[param];
        }

        Axios({
            method: 'POST',
            url: '/api/v1/companies',
            data: company
        })
        .then(response => {
            console.log(response);
            formRef.current.reset();
        })
        .catch(error => console.log(error))
    }

    const {data:countries} = useQuery('countries', () => 
        Axios.get('/api/v1/countries')
        .then(response => response.data)
        .catch(error => console.log(error))
    );

    return (
        <div className="m-10">
            <div className="grid grid-cols-6 my-6 ">
                <div className="col-span-6 sm:col-span-4 xl:col-span-5 flex items-center text-2xl">
                    <Link to="/items" className="hover:underline">Inventory</Link>
                    <img src={Arrow} alt="arrow"/>
                    <span>Settings</span>
                    <img src={Arrow} alt="arrow"/>
                    <span className="font-bold">Company/Retailer</span>
                </div>
            </div>
            <div className="bg-gray-800 rounded p-5 shadow-xl m-auto text-white">
                <h1 className="text-5xl text-center">New Company/Retailer</h1>
                <form ref={formRef} onSubmit={(e) => {
                    e.preventDefault();
                    addCompany();
                    }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 my-5 gap-4">
                    <div >
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
                        <label className="text-md " htmlFor="email">Email: </label>
                        <input 
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        className ="text-md px-4 py-1 rounded text-black w-full" 
                        id="email"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea 
                    className="w-full rounded text-white p-2 bg-gray-700" 
                    placeholder="Say somthing about the item" 
                    id="description" 
                    rows="4"
                    onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-5 gap-4">
                    <div>
                        <label className="text-md" htmlFor="website">Website: </label>
                        <input 
                        onChange={(e) => setWeb(e.target.value)}
                        type="url" 
                        className ="text-md px-4 py-1 rounded text-black w-full" 
                        id="website"
                        />
                    </div>
                    <div>
                        <label className="text-md " htmlFor="type">Type:</label>
                        <select 
                        onChange={(e) => setType(e.target.value)} 
                        className ="text-md px-4 py-2 rounded text-black w-full" 
                        id="type" 
                        required>
                            <option value="">select...</option>
                            <option value="retailer">Retailer</option>
                            <option value="producer">Producer</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-md " htmlFor="country">Country:</label>
                        <select 
                        onChange={(e) => setCountryId(e.target.value)} 
                        className ="text-md px-4 py-2 rounded text-black w-full" 
                        id="country" 
                        required>
                            <option value="">select...</option>
                            {
                                countries?.map(country => {
                                    return (
                                        <option 
                                        value={country.id} 
                                        key={country.id}
                                        >
                                            {country.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label className="text-md " htmlFor="state">State:</label>
                        <select 
                        onChange={(e) => setStateId(e.target.value)} 
                        className ="text-md px-4 py-2 rounded text-black w-full" 
                        id="state" 
                        required>
                            <option value="">select...</option>
                            {
                                countries?.find((country) => country.id === Number(countryId))?.states.map(state => {
                                    return (
                                        <option 
                                        value={state.id} 
                                        key={state.id}
                                        >
                                            {state.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div>
                        <label className="text-md " htmlFor="address">Address:</label>
                        <select 
                        onChange={(e) => setAddressId(e.target.value)} 
                        className ="text-md px-4 py-2 rounded text-black w-full" 
                        id="state" 
                        required>
                            <option value="">select...</option>
                            {
                                countries?.find((country) => country.id === Number(countryId))?.states.find((state) => state.id === Number(stateId))?.addresses.map(address => {
                                    return (
                                        <option 
                                        value={address.id} 
                                        key={address.id}
                                        >
                                            {address.city} -
                                            {address.street_address_1} -
                                            {address.street_address_2} -
                                            {address.zipcode}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                <div className="text-center mt-5">
                    <button 
                        className="bg-teal-500 rounded px-8 py-1 text-black text-xl w-full md:w-64">
                        ADD
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default Company

