import React from 'react';
import moment from 'moment';
import AddImage from './AddImage';
import {Link, useParams, useHistory} from 'react-router-dom';
import { useQuery, queryCache } from 'react-query';
import {Arrow, DeleteIcon, EditIcon} from '../../helpers/svgIcons';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {Axios, refreshAuthLogic, options} from '../../helpers/axiosMiddleware';


const ShowItem = () => {
    const {id} = useParams();
    const history = useHistory();

    createAuthRefreshInterceptor(Axios, refreshAuthLogic, options);

    const {data:images} = useQuery('images', ()=>
        Axios.get(`/api/v1/item_images/${id}`)
        .then(response => response.data)
    );

    const deleteItem = () => {
        const confirmation = window.confirm('Do you realy want to delete this item?');
        if(!confirmation) return;
        Axios.delete(`/api/v1/items/${id}`)
        .then(() => history.push('/items'))
        .catch(error => console.log(error));
    }

    const deleteImage = (imageId) => {
        const confirmation = window.confirm('Do you realy want to delete this image?');
        if(!confirmation) return;
        Axios.delete(`/api/v1/item_images/${imageId}`)
        .then(() => queryCache.invalidateQueries('images'))
        .catch(error => console.log(error))
    }

    const {data:item} = useQuery('item', () => 
        Axios.get(`/api/v1/items/${id}`)
        .then(response => response.data)
    );

    return (
        <div className="m-10">
            <div className="grid grid-cols-1 md:grid-cols-8 items-center justify-between my-6">
                <div className="flex items-center text-sm sm:text-xl md:text-2xl md:col-span-6">
                    <div>Inventory</div>
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
                    <div className="bg-gray-800 rounded p-5 shadow-xl m-auto text-white" key={item.id}>
                        <div className="text-center mb-10">
                            <span className="text-3xl ">{item?.name}</span>
                            <div>
                                <AddImage id={item?.id}/>
                            </div>
                            </div>
                        <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 justify-center text-black">
                            <div className="bg-gray-200 rounded p-3">
                                <h1 className="text-2xl">Length: {item.size?.length ?? ("undefined")}</h1>
                            </div>
                            <div className="bg-gray-200 rounded p-3">
                                <h1 className="text-2xl">Height: {item.size?.height ?? ("undefined")}</h1>
                            </div>
                            <div className="bg-gray-200 rounded p-3">
                                <h1 className="text-2xl">Width: {item.size?.width ?? ("undefined")}</h1>
                            </div>
                            <div className="bg-gray-200 rounded p-3">
                                <h1 className="text-2xl">Volume: {item.size?.volume ?? ("undefined")}</h1>
                            </div>
                            <div className="bg-gray-200 rounded p-3">
                                <h1 className="text-2xl">Type: {item.item_type?.name ?? ("undefined")}</h1>
                            </div>
                            <div className="bg-gray-200 rounded p-3">
                                <h1 className="text-2xl">Company: {item.company?.name ?? ("undefined")}</h1>
                            </div>
                            <div className="bg-gray-200 rounded p-3">
                                <h1 className="text-2xl">Shape: {item.size?.shape.name ?? ("undefined")}</h1>
                            </div>
                        </div>
                        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 text-xl">
                            <h1 className="border-l-4 border-red-500 px-1 rounded">Added by: {item.user?.name}</h1>
                            <h1 className="border-l-4 border-red-500 px-1 rounded">Added at: {moment(item?.created_at).format('MMMM Do YYYY')}</h1>
                            <h1 className="border-l-4 border-red-500 px-1 rounded">Company email: {item.company?.email}</h1>
                            <h1 className="border-l-4 border-red-500 px-1 rounded">Company website: {item.company?.website_url}</h1>
                            <h1 className="border-l-4 border-red-500 px-1 rounded">Company address: {item.company?.address?.state?.country.name}, {item.company?.address?.state.name}, {item.company?.address?.city}, {item.company?.address?.street_address_1}</h1>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2 items-center mt-5">
                                {
                                    images?.map((image) => {
                                        return (
                                            <div className="relative" key={image.id}>
                                                <button onClick={() => deleteImage(image.id)} className="bg-red-400 opacity-0 absolute inset-0 text-center w-full rounded text-black hover:opacity-75 text-xl font-bold">Delete</button>
                                                <img className="h-48 rounded border-2 border-gray-500 m-auto" src={image.image_url} alt={item.name} title={item.name} />
                                            </div>
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
