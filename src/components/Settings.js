import React from 'react';
import {Arrow} from '../helpers/svgIcons';


const Settings = () => {
    return (
        <div className="m-10">
            <div className="grid grid-cols-6 my-6">
                <div className="col-span-6 sm:col-span-4 xl:col-span-5 flex items-center text-2xl">
                    <div>Inventory</div>
                    <img src={Arrow} alt="arrow"/>
                    <span className="font-bold">Settings</span>
                </div>
            </div>
            <div className="grid grid-cols-3 ">
                <h>tab 1</h>
                <h>tab 2</h>
                <h>tab 3</h>
            </div>
        </div>
    )
}

export default Settings
