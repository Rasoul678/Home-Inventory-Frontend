import React from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import Axios from 'axios';
import {LogOutLogo, LoginLogo,RegisterLogo, Settings } from '../helpers/svgIcons';

const Header = () => {

  const history = useHistory();

  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    Axios({
      method: 'DELETE',
      url: '/api/v1/auth/signout',
    })
    .then(response => {
      console.log(response);
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      history.push('/');
    })
    .catch(error => {
      console.error(error);
    })
  }


  return (
    <div className="flex justify-between items-center bg-purple-600 h-16 px-10">
      <Link to="/" className="text-3xl text-gray-200 mr-8">Home</Link>
      {
        user ? (
          <div className="flex items-center">
            <Link to={`/profile/${user.name}`} className ="text-2xl text-gray-200 mr-5" title="Profile">{user.name}</Link>
            <Link to="/settings" className ="text-2xl text-gray-200 mr-5">
              <img src={Settings} alt="settings" title="Settings"/>
            </Link>
            <Link to="#" onClick={() => logout()} className ="text-2xl text-gray-200">
              <img src={LogOutLogo} alt="logout" title="Logout"/>
            </Link>
          </div>
        ) : (
          <div className="flex">
            <Link to="/register" className ="text-2xl text-gray-200 mr-5">
            <img src={RegisterLogo} alt="register" title="Register"/>
            </Link>
            <Link to="/login" className ="text-2xl text-gray-200">
            <img src={LoginLogo} alt="login" title="Login"/>
            </Link>
          </div>
        )
      }
    </div>
  );
};

export default withRouter(Header);
