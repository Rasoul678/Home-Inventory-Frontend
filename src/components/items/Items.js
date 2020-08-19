import React from 'react';
import {Link} from 'react-router-dom';
import {Arrow ,ExternalLink} from '../../helpers/svgIcons';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {Axios, refreshAuthLogic, options} from '../../helpers/axiosMiddleware';
import { useQuery } from 'react-query';

const Items = () => {

    createAuthRefreshInterceptor(Axios, refreshAuthLogic, options);

    const {data:items} = useQuery('items', () => 
        Axios.get('/api/v1/items')
        .then(response => response.data)
        .catch(error => console.log(error))
    );


    return (
        <div className="m-10">
            <div className="grid grid-cols-6 my-6">
                <div className="col-span-6 sm:col-span-4 xl:col-span-5 flex items-center text-2xl">
                    <div>Inventory</div>
                    <img src={Arrow} alt="arrow"/>
                    <span className="font-bold">Items</span>
                </div>
                <Link to="/items/create" className="col-span-6 sm:col-span-2 xl:col-span-1 text-center px-5 py-2 rounded-full bg-green-400 text-xl">New item</Link>
            </div>
            <div className ="grid grid-cols-1 md:grid-cols-2 gap-12">
                {
                    items?.map((item) => {
                        return (
                            <div className="col-span-1 bg-gray-800 rounded p-5 shadow-xl text-white" key={item.id}>
                                <div className="flex items-center justify-between">
                                    <div className="border-l-8 border-blue-400 px-1 text-3xl m-2 rounded">
                                        <Link to={`/items/${item.id}/details`}>
                                            {item.name}
                                        </Link>
                                    </div>
                                    <Link to={`/items/${item.id}/details`}>
                                        <img src={ExternalLink} alt="item details" title="details"/>
                                    </Link>
                                </div>
                                <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="col-span-1 text-xl">
                                    <h1 className="border-l-4 border-red-500 px-1 m-2 ml-5 rounded">type: {item.item_type.name}</h1>
                                    <h1 className="border-l-4 border-blue-500 px-1 m-2 ml-5 rounded">Company: {item.company.name}</h1>
                                    <h1 className="border-l-4 border-orange-500 px-1 m-2 ml-5 rounded">Size: {item.size.name}</h1>
                                    <h1 className="border-l-4 border-green-500 px-1 m-2 ml-5 rounded">Added by: {item.user.name}</h1>
                                    </div>
                                    <div className="col-span-1 grid grid-cols-1 sm:grid-cols-3  md:grid-cols-1 xl:grid-cols-2 gap-2 items-center">
                                        {
                                            item.item_images.filter(image => !image.deleted_at).map((image, index) => {
                                                if(index > 1) return '';
                                                return (
                                                    <img className="h-32 rounded border-2 border-gray-500 m-auto" src={image.image_url} alt={item.name} title={item.name} key={image.id} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Items
