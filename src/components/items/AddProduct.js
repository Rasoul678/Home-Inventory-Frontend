import React, { useState, useRef } from 'react';
import {useQuery} from 'react-query';
import {Arrow} from '../../helpers/svgIcons';
import {Link, useParams} from 'react-router-dom';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {Axios, refreshAuthLogic, options} from '../../helpers/axiosMiddleware';

const AddProduct = () => {

    const {id} = useParams();
    const user = JSON.parse(localStorage.getItem('user'));

    const [retailerId, setRetailerId] = useState(false);
    const [inventoryId, setInventoryId] = useState(false);
    const [purchaseDate, setPurchaseDate] = useState(false);
    const [expirationDate, setExpirationDate] = useState(false);
    const [purchasePrice, setPurchasePrice] = useState(false);
    const [msrp, setMsrp] = useState(false);

    const formRef = useRef(null)

    createAuthRefreshInterceptor(Axios, refreshAuthLogic, options);

    const createProduct = () => {
        const product = {
            user_id: Number(user.id),
            item_id: Number(item.id),
            retailer_id: Number(retailerId),
            inventory_location_id: Number(inventoryId),
            purchase_date: purchaseDate,
            expiration_date: expirationDate,
            purchase_price: Number(purchasePrice),
            msrp: Number(msrp)
        }

        for(let param in product){
            if(!product[param]) delete product[param];
        }

        Axios({
            method: 'POST',
            url: '/api/v1/item_infos',
            data: product
        })
        .then(response => {
            console.log(response);
            formRef.current.reset()
        })
        .catch(error => console.log(error))
    }

    const {data:locations} = useQuery('locations', () => 
        Axios.get('/api/v1/inventory_locations')
        .then(response => response.data)
    );

    const {data:companies} = useQuery('companies', () => 
        Axios.get('/api/v1/companies')
        .then(response => {
            console.log(response.data);
            return response.data;
        })
    );

    const {data:item} = useQuery('item', () => 
        Axios.get(`/api/v1/items/${id}`)
        .then(response => response.data)
    );

    return (
        <div className="m-10">
            <div className="grid grid-cols-6 my-6 ">
                <div className="col-span-6 sm:col-span-4 xl:col-span-5 flex items-center text-2xl">
                    <Link to="/items" className="hover:underline">Inventory</Link>
                    <img src={Arrow} alt="arrow"/>
                    <Link to="/items" className="hover:underline">items</Link>
                    <img src={Arrow} alt="arrow"/>
                    <Link to={`/items/${id}/details`} className="hover:underline">{item?.name}</Link>
                    <img src={Arrow} alt="arrow"/>
                    <span className="font-bold">Add Product</span>
                </div>
            </div>
            <div className="bg-gray-800 rounded p-5 shadow-xl m-auto text-white">
                <h1 className="text-5xl text-center">New Product</h1>
                <form ref={formRef} onSubmit={(e) => {
                    e.preventDefault();
                    createProduct();
                    }}>
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 my-5 gap-4">
                        <div>
                            <label className="text-md " htmlFor="retailer">Retailer:</label>
                            <select 
                            onChange={(e) => setRetailerId(e.target.value)} 
                            className ="text-md px-4 py-3 rounded text-black w-full" 
                            id="retailer" 
                            required>
                                <option value="">select...</option>
                                {
                                    companies?.filter((company) => company.type === 'retailer')?.map(company => {
                                        return (
                                            <option 
                                            value={company.id} 
                                            key={company.id}
                                            >
                                                {company.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <label className="text-md " htmlFor="location">Location:</label>
                            <select 
                            onChange={(e) => setInventoryId(e.target.value)} 
                            className ="text-md px-4 py-3 rounded text-black w-full" 
                            id="location" 
                            required>
                                <option value="">select...</option>
                                {
                                    locations?.map(location => {
                                        return (
                                            <option 
                                            value={location.id} 
                                            key={location.id}
                                            >
                                                {location.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <label className="text-md " htmlFor="purchase-date">Purchased At:</label>
                            <input 
                            onChange={(e) => setPurchaseDate(e.target.value)} 
                            type="date"
                            className ="text-md px-4 py-2 rounded text-black w-full" 
                            id="purchase-date" 
                            required />
                        </div>
                        <div>
                            <label className="text-md " htmlFor="expiration-date">Expires In:</label>
                            <input 
                            onChange={(e) => setExpirationDate(e.target.value)} 
                            type="date"
                            className ="text-md px-4 py-2 rounded text-black w-full" 
                            id="expiration-date" 
                            required />
                        </div>
                        <div>
                            <label className="text-md " htmlFor="purchase-price">Price:</label>
                            <input 
                            onChange={(e) => setPurchasePrice(e.target.value)} 
                            type="number"
                            className ="text-md px-4 py-2 rounded text-black w-full" 
                            id="purchase-price" 
                            required />
                        </div>
                        <div>
                            <label className="text-md " htmlFor="msrp">MSRP:</label>
                            <input 
                            onChange={(e) => setMsrp(e.target.value)} 
                            type="number"
                            className ="text-md px-4 py-2 rounded text-black w-full" 
                            id="msrp" 
                            required />
                        </div>
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

export default AddProduct
