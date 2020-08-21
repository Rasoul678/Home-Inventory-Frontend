import React, { useState, useRef } from 'react';
import {Link} from 'react-router-dom';
import {Arrow} from '../../helpers/svgIcons';
import AddressMap from './AddressMap';
import { useQuery } from 'react-query';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {Axios, refreshAuthLogic, options} from '../../helpers/axiosMiddleware';


const Address = () => {

    const formRef = useRef(null);

    const [street_1, setStreet_1] = useState(false);
    const [street_2, setStreet_2] = useState(false);
    const [city, setCity] = useState(false);
    const [zipcode, setZipcode] = useState(false);
    const [countryId, setCountryId] = useState(false);
    const [stateId, setStateId] = useState(false);
    const [latitude, setLatitude] = useState(false);
    const [longitude, setLongitude] = useState(false);
    
    createAuthRefreshInterceptor(Axios, refreshAuthLogic, options);

    const addAddress = () => {
        const address = {
            state_id: Number(stateId),
            street_address_1: street_1,
            street_address_2: street_2,
            city,
            zipcode,
            latitude,
            longitude
        }

        for(let param in address){
            if(!address[param]) delete address[param];
        }

        Axios({
            method: 'POST',
            url: '/api/v1/addresses',
            data: address
        })
        .then(response => {
            console.log(response);
            formRef.current.reset();
        })
        .catch(error => console.log(error))
    }

    const setLatLng = (latlng) => {
        setLatitude(latlng.lat);
        setLongitude(latlng.lng);
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
                    <span className="font-bold">Address</span>
                </div>
            </div>
            <div className="bg-gray-800 rounded p-5 shadow-xl m-auto text-white">
                <h1 className="text-5xl text-center">New Address</h1>
                <form ref={formRef} onSubmit={(e) => {
                    e.preventDefault();
                    addAddress();
                    }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 my-5 gap-4">
                    <div >
                        <label className="text-md " htmlFor="street-1">Street_1: </label>
                        <input 
                        onChange={(e) => setStreet_1(e.target.value)}
                        type="text"
                        className ="text-md px-4 py-1 rounded text-black w-full" 
                        id="street-1"
                        autoFocus
                        required
                        />
                    </div>
                    <div>
                        <label className="text-md " htmlFor="street-2">Street_2: </label>
                        <input 
                        onChange={(e) => setStreet_2(e.target.value)}
                        type="text"
                        className ="text-md px-4 py-1 rounded text-black w-full" 
                        id="street-2"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-5 gap-4">
                    <div>
                        <label className="text-md" htmlFor="city">City: </label>
                        <input 
                        onChange={(e) => setCity(e.target.value)}
                        type="text" 
                        className ="text-md px-4 py-1 rounded text-black w-full" 
                        id="city"
                        required
                        />
                    </div>
                    <div>
                        <label className="text-md" htmlFor="zipcode">Zipcode: </label>
                        <input 
                        onChange={(e) => setZipcode(e.target.value)}
                        type="text" 
                        className ="text-md px-4 py-1 rounded text-black w-full" 
                        id="zipcode"
                        required
                        />
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
                <AddressMap setLatLng={setLatLng}/>
                <div className="text-center mt-5">
                    <button 
                        className="bg-teal-500 rounded px-8 py-1 text-black text-xl w-full md:w-64">
                        ADD
                    </button>
                </div>
                {/* {
                    error &&
                    <div className="text-center text-2xl mt-5 rounded border-2 border-red-400">{error}</div>
                } */}
                </form>
            </div>
        </div>
    )
}

export default Address
