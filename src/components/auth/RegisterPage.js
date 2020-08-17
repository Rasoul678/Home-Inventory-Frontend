import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import Axios from "axios";

const RegisterPage = () => {

    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const signup = () => {
        Axios({
            method: 'POST',
            url: '/api/v1/auth/signup',
            credentials: 'include',
            data: {name, email, password, role}
        })
        .then((response) => {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            history.goBack();
        });
    }

    if(localStorage.getItem('accessToken')){
        history.goBack();
        return (
            <div className="grid justify-center text-6xl align-middle mt-32">Loading ...</div>
        )
    }else{
        return (
            <div className="grid justify-center">
            <h1 className="text-4xl text-center my-6">Register</h1>
            <form>
            <div className="my-4">
                    <label htmlFor="name" className="font-bold">Name</label>
                    <input
                        id="name"
                        type="text"
                        className="border-2 border-black rounded-md p-1 w-full"
                        name="name"
                        required
                        onChange={(e) => setName(e.target.value)}
                        autoFocus />
                </div>
                <div className="my-4">
                    <label htmlFor="email" className="font-bold">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        className="border-2 border-black rounded-md p-1 w-full"
                        name="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        />
                </div>
                <div className="my-4">
                    <label htmlFor="password" className="font-bold">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="border-2 border-black rounded-md p-1 w-full"
                        name="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        />
                </div>
                <div className="my-4">
                    <label htmlFor="role" className="font-bold">Role</label>
                    <select 
                    id="role" 
                    onChange={(e) => setRole(e.target.value)} 
                    className="border-2 border-black rounded-md p-1 w-full">
                        <option value=''>Choose ...</option>
                        <option value='user'>User</option>
                        <option value='admin'>Admin</option>
                    </select>
                </div>
                <div className="my-3 text-center">
                    <button 
                    type="button" 
                    className="py-2 px-6 bg-blue-300 hover:bg-green-400 border-2 border-black w-full rounded-full mr-4"
                    onClick={() => signup()}
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
        )
    }
}


export default RegisterPage;