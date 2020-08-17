import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import ExternalLink from '../../images/external-link.svg';
import Arrow from '../../images/chevrons-right.svg';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {Axios, refreshAuthLogic, options} from '../../helpers/axiosMiddleware';

const Items = () => {

    const [items, setItems] = useState([]);

    createAuthRefreshInterceptor(Axios, refreshAuthLogic, options);

    useEffect(() => {
        Axios({
            method: 'GET',
            url: '/api/v1/items'
        })
        .then(response => {
            console.log(response.data)
            setItems(response.data);
        })
        .catch(error => console.log(error));
    }, []);


    return (
        <div className="m-10">
            <div className="flex items-center justify-between my-6">
                <div className="flex items-center text-2xl">
                    <Link to="/" className="hover:underline" >Inventory</Link>
                    <img src={Arrow} alt="arrow"/>
                    <span className="font-bold">Items</span>
                </div>
                <button className="px-5 py-2 rounded-full bg-green-400 text-xl">Add item</button>
            </div>
            <div className ="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    <div className="col-span-1 grid grid-cols-2 xl:grid-cols-3 gap-2 items-center">
                                        {
                                            item.item_images.map((image) => {
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
