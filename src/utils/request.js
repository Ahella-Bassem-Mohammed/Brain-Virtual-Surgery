import axios from  'axios';

const request = axios.create({
    baseURL: "https://virtual-surgery.onrender.com"
})

export default request;