import React from 'react';
import {useHistory} from 'react-router-dom';

const Profile = () => {

    const history = useHistory();

    const user = JSON.parse(localStorage.getItem('user'));

    if(!user){
        history.goBack();
        return (
            <div className="grid justify-center text-6xl align-middle mt-32">Loading ...</div>
        )
    }else{

    }
    return (
        <div>
            <div className="grid justify-center text-6xl align-middle mt-32">{user.name} Profile</div>
        </div>
    )
}

export default Profile
