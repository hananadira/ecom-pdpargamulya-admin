import axios from "axios";

const Api = axios.create({
    // set default endpoint API 
    baseURL: 'https://positive-cat-smiling.ngrok-free.app/'
})

export default Api