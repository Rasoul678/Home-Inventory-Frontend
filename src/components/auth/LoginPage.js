import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import Axios from "axios";

const LoginPage = () => {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signin = () => {
        Axios({
            method: 'POST',
            url: '/api/v1/auth/signin',
            credentials: 'include',
            data: {email, password}
        })
        .then((response) => {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            history.goBack();
        })
        .catch(error => {
            console.log(error)
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
            <h1 className="text-4xl text-center my-6">Login</h1>
            <form>
                <div className="my-4">
                    <label htmlFor="email" className="font-bold">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        className="border-2 border-black rounded-md p-1 w-full"
                        name="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus />
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
                <div className="my-3 text-center">
                    <button 
                    type="button" 
                    className="py-2 px-6 bg-blue-300 hover:bg-green-400 border-2 border-black w-full rounded-full mr-4"
                    onClick={() => signin()}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
        )
    }
}


export default LoginPage;