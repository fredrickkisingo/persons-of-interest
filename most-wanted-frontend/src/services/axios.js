import axios from 'axios';

const apiUrl = process.env.VUE_APP_API_URL;


axios.defaults.baseURL = apiUrl;  // Set the base URL for all Axios requests
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;
