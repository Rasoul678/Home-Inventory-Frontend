import Axios from 'axios';

const getAccessToken = () => {
    return localStorage.getItem('accessToken');
}
 
Axios.interceptors.request.use(request => {
    request.headers['Authorization'] = `Bearer ${getAccessToken()}`;
    return request;
});



const refreshAuthLogic = (failedRequest) => Axios.post('/api/v1/auth/refresh_token')
    .then((tokenRefreshResponse) => {
        localStorage.setItem('accessToken', tokenRefreshResponse.data.accessToken);
        failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.accessToken;
        return Promise.resolve();
});

const options = {statusCodes: [ 401, 403, 500]}


export {Axios, refreshAuthLogic, options}