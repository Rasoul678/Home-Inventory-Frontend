import React, {useState} from 'react';
import Axios from 'axios';
import {queryCache} from 'react-query';

const AddImage = ({id}) => {

    const [image, setImage] = useState('');

    const sendImage = () =>{

        const formData = new FormData();

        formData.append("image", image);
        formData.append("id", id);

        Axios.post('/api/v1/item_images', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            queryCache.invalidateQueries('images');
            console.log(response);
        })
        .catch(error => console.log(error));
    }

    return (
        <form className="border-2 border-gray-100 inline-block rounded">
            <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
            <button type="button" onClick={() => sendImage()} className="bg-blue-600 py-1 px-2">Upload Image</button>
        </form>
    )
}

export default AddImage
