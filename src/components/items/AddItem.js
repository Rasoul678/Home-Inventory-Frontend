import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {Axios, refreshAuthLogic, options} from '../../helpers/axiosMiddleware';
import Arrow from '../../images/chevrons-right.svg';
import { useQuery } from 'react-query';

const AddItem = () => {

    const [error, setError] = useState('');

    const [name, setName] = useState('');
    const [sku, setSku] = useState(false);
    const [description, setDescription] = useState(false);
    const [length, setLength] = useState(false);
    const [width, setWidth] = useState(false);
    const [height, setHeight] = useState(false);
    const [volume, setVolume] = useState(false);
    const [companyId, setCompanyId] = useState('');
    const [typeId, setTypeId] = useState('');
    const [shapeId, setShapeId] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));
    const history = useHistory();

    createAuthRefreshInterceptor(Axios, refreshAuthLogic, options);

    const {data:companies} = useQuery('companies', () => 
        Axios.get('/api/v1/companies')
        .then(response => response.data)
    );

    const {data:types} = useQuery('types', () => 
        Axios.get('/api/v1/item_types')
        .then(response => response.data)
    );

    const {data:shapes} = useQuery('shapes', () => 
        Axios.get('/api/v1/shapes')
        .then(response => response.data)
    );

    const createItem = () => {
        const size = {
            name: `${name}_size`,
            shape_id: Number(shapeId),
            length,
            width,
            height,
            volume
        };

        for(let param in size){
            if(!size[param]) delete size[param];
        }

        Axios({
            method: 'POST',
            url: '/api/v1/sizes',
            data: size
        })
        .then(response => {
            const sizeId = response.data.id;
            if(sizeId){
                const item = {
                    name,
                    user_id: user.id,
                    company_id: Number(companyId),
                    item_type_id: Number(typeId),
                    size_id: sizeId,
                    description,
                    sku
                }

                for(let param in item){
                    if(!item[param]) delete item[param];
                }

                Axios({
                    method: 'POST',
                    url: '/api/v1/items',
                    data: item
                })
                .then(() => history.push('/items'))
                .catch(error => console.log(error));
            }
        })
        .catch(error => {
            console.log(error.message);
            if((error.message).includes("409")){
                setError('Item Already Exists.');
                setTimeout(() => {
                    setError('');
                }, 4000);
            }
        });
    }

    return (
        <div className="m-10">
            <div className="grid grid-cols-1 md:grid-cols-8 items-center justify-between my-6">
                <div className="flex items-center text-sm sm:text-xl md:text-2xl md:col-span-6">
                    <div>Inventory</div>
                    <img src={Arrow} alt="arrow"/>
                    <Link to="/items" className="hover:underline" >Items</Link>
                    <img src={Arrow} alt="arrow"/>
                    <span className="font-bold">New Item</span>
                </div>
            </div>
            <div className="bg-gray-800 rounded p-5 shadow-xl m-auto text-white">
                <h1 className="text-5xl text-center">Create Item</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    createItem();
                    }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 my-5 gap-4">
                    <div >
                        <label className="text-md " htmlFor="item-name">Name: </label>
                        <input 
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className ="text-md px-4 py-1 rounded text-black w-full" 
                        id="item-name"
                        autoFocus
                        required
                        />
                    </div>
                    <div>
                        <label className="text-md " htmlFor="sku">SKU: </label>
                        <input 
                        onChange={(e) => setSku(e.target.value)}
                        type="text"
                        className ="text-md px-4 py-1 rounded text-black w-full" 
                        id="sku"
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
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-5 gap-4">
                    <div>
                        <label className="text-md" htmlFor="length">Length: </label>
                        <input 
                        onChange={(e) => setLength(e.target.value)}
                        type="number" 
                        className ="text-md px-4 py-1 rounded text-black w-full" 
                        id="length" />
                    </div>
                    <div>
                        <label className="text-md" htmlFor="width">Width: </label>
                        <input 
                        onChange={(e) => setWidth(e.target.value)}
                        type="number" 
                        className ="text-md px-4 py-1 rounded text-black w-full" 
                        id="width" />
                    </div>
                    <div>
                        <label className="text-md" htmlFor="height">Height: </label>
                        <input 
                        onChange={(e) => setHeight(e.target.value)}
                        type="number" 
                        className ="text-md px-4 py-1 rounded text-black w-full" 
                        id="height" />
                    </div>
                    <div>
                        <label className="text-md" htmlFor="volume">Volume: </label>
                        <input 
                        onChange={(e) => setVolume(e.target.value)}
                        type="number" 
                        className ="text-md px-4 py-1 rounded text-black w-full" 
                        id="volume" />
                    </div>
                    <div>
                        <label className="text-md " htmlFor="company">Company:</label>
                        <select 
                        onChange={(e) => setCompanyId(e.target.value)} 
                        className ="text-md px-4 py-2 rounded text-black w-full" 
                        id="company" 
                        required>
                            <option value="">select...</option>
                            {
                                companies?.filter((company) => company.type === 'producer')?.map(company => {
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
                        <label className="text-md" htmlFor="company">Type:</label>
                        <select 
                        onChange={(e) => setTypeId(e.target.value)} 
                        className ="text-md px-4 py-2 rounded text-black w-full" 
                        id="company" 
                        required>
                            <option value="">select...</option>
                            {
                                types?.map(type => {
                                    return (
                                        <option 
                                        value={type.id} 
                                        key={type.id}
                                        >
                                            {type.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label className="text-md" htmlFor="company">Shape:</label>
                        <select 
                        onChange={(e) => setShapeId(e.target.value)} 
                        className ="text-md px-4 py-2 rounded text-black w-full" 
                        id="company" 
                        required>
                            <option value="">select...</option>
                            {
                                shapes?.map(shape => {
                                    return (
                                        <option 
                                        value={shape.id} 
                                        key={shape.id}
                                        >
                                            {shape.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="text-center mt-5">
                    <button className="bg-teal-500 rounded px-8 py-1 text-black text-xl w-full md:w-64">ADD ITEM</button>
                </div>
                {
                    error &&
                    <div className="text-center text-2xl mt-5 rounded border-2 border-red-400">{error}</div>
                }
                </form>
            </div>
        </div>
    )
}

export default AddItem;
