import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import Arrow from '../../images/chevrons-right.svg';
import DeleteIcon from '../../images/trash.svg';
import EditIcon from '../../images/edit.svg';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {Axios, refreshAuthLogic, options} from '../../helpers/axiosMiddleware';
import {useParams} from 'react-router-dom';

const ShowItem = () => {
    const {id} = useParams();

    const [item, setItem] = useState({});

    createAuthRefreshInterceptor(Axios, refreshAuthLogic, options);

    const deleteItem = () => {
        const confirmation = window.confirm('Do you really want to delete this item?');
        if(!confirmation) return;
        console.log('deleted');
    }

    useEffect(() => {
        Axios({
            method: 'GET',
            url: `/api/v1/items/${id}`
        })
        .then(response => {
            console.log(response.data)
            setItem(response.data);
        })
        .catch(error => console.log(error));
    }, []);

    return (
        <div className="m-10">
            <div className="grid grid-cols-1 md:grid-cols-8 items-center justify-between my-6">
                <div className="flex items-center text-sm sm:text-xl md:text-2xl md:col-span-6">
                    <Link to="/" className="hover:underline" >Inventory</Link>
                    <img src={Arrow} alt="arrow"/>
                    <Link to="/items" className="hover:underline" >Items</Link>
                    <img src={Arrow} alt="arrow"/>
                    <span className="font-bold">{item?.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 md:col-span-2">
                <button title="edit item" className="p-2 rounded-full w-full bg-green-400 text-xl mr-2">
                    <img src={EditIcon} alt="edit" className="m-auto"/>
                </button>
                <button title="delete item" onClick={() => deleteItem()} className="p-2 rounded-full w-full bg-red-400 text-xl">
                    <img src={DeleteIcon} alt="delete" className="m-auto"/>
                </button>
                </div>
            </div>
            <div>
                {
                    item &&
                    <div className="bg-gray-800 rounded p-5 shadow-xlmax-w-5xl m-auto text-white" key={item.id}>
                        <div className="text-3xl text-center mb-10">
                                {item?.name}
                            </div>
                        <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 justify-center text-black">
                            <div className="bg-gray-200 rounded p-3">
                                <h1 className="text-2xl">Type: {item.item_type?.name}</h1>
                            </div>
                            <div className="bg-gray-200 rounded p-3">
                                <h1 className="text-2xl">Company: {item.company?.name}</h1>
                            </div>
                            <div className="bg-gray-200 rounded p-3">
                                <h1 className="text-2xl">Shape: {item.size?.shape.name}</h1>
                            </div>
                            <div className="bg-gray-200 rounded p-3">
                                <h1 className="text-2xl">Length: {item.size?.shape.length ?? ("undefined")}</h1>
                            </div>
                            <div className="bg-gray-200 rounded p-3">
                                <h1 className="text-2xl">Height: {item.size?.shape.height ?? ("undefined")}</h1>
                            </div>
                            <div className="bg-gray-200 rounded p-3">
                                <h1 className="text-2xl">Width: {item.size?.shape.width ?? ("undefined")}</h1>
                            </div>
                            <div className="bg-gray-200 rounded p-3">
                                <h1 className="text-2xl">Volume: {item.size?.shape.volume ?? ("undefined")}</h1>
                            </div>
                        </div>
                        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 text-xl">
                            <h1 className="border-l-4 border-red-500 px-1 rounded">Added by: {item.user?.name}</h1>
                            <h1 className="border-l-4 border-red-500 px-1 rounded">Added at: {moment(item?.created_at).format('MMMM Do YYYY')}</h1>
                            <h1 className="border-l-4 border-red-500 px-1 rounded">Company email: {item.company?.email}</h1>
                            <h1 className="border-l-4 border-red-500 px-1 rounded">Company website: {item.company?.website_url}</h1>
                            <h1 className="border-l-4 border-red-500 px-1 rounded">Company address: {item.company?.address?.state?.country.name}, {item.company?.address?.state.name}, {item.company?.address?.city}, {item.company?.address?.street_address_1}</h1>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-2 items-center mt-5">
                                {
                                    item.item_images?.map((image) => {
                                        return (
                                            <img className="h-48 rounded border-2 border-gray-500 m-auto" src={image.image_url} alt={item.name} title={item.name} key={image.id} />
                                        )
                                    })
                                }
                            </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ShowItem;
