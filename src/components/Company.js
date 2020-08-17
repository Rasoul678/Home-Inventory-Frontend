import React, {useState, useEffect} from 'react';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {Axios, refreshAuthLogic, options} from '././../helpers/axiosMiddleware';

const Company = () => {

    const [companies, setCompanies] = useState([])
    const [company, setCompany] = useState({});

    createAuthRefreshInterceptor(Axios, refreshAuthLogic, options);

    useEffect(() => {
        Axios({
            method: 'GET',
            url: '/api/v1/companies',
        })
        .then(response => {
            console.log(response);
            setCompanies(response.data);
        })
    }, [ ]);

    return (
        <div>
              <div className="form-group">
                <label className="text-3xl " htmlFor="Company">Select Company:</label>
                <select 
                className ="text-xl mx-2 px-4 py-2 rounded"  
                id="Company" 
                onChange={(e) => {
                    const company =  e.target.value;
                    company ? setCompany(JSON.parse(company)) : setCompany(false);
                    }}>
                <option value="">Choose Company</option>
                {
                    companies?.map((company)=>{
                        return (
                        <option 
                            value={JSON.stringify(company)} 
                            key={company.id}
                        >
                                {company.name}
                        </option>
                        )
                    })
                }
                </select>
                {
                    company.address &&
                    <div className="text-2xl">
                        <h1>City: {company.address?.city}</h1>
                        <h1>Street_1: {company.address?.street_address_1}</h1>
                        <h1>Street_2: {company.address?.street_address_2}</h1>
                        <h1>Zipcode: {company.address?.zipcode}</h1>
                        <h1>Latitude: {company.address?.latitude}</h1>
                        <h1>Longitude: {company.address?.longitude}</h1>
                    </div>
                }
            </div>
        </div>
    )
}

export default Company
