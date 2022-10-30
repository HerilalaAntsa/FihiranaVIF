import axios from "axios";

console.log(process.env.NODE_ENV );

const API_ENDPOINT = process.env.NODE_ENV === "development" ? "http://localhost:3001/" : "http://localhost:3001/" 

export default axios.create({
    baseURL: API_ENDPOINT,
    headers: {
        "Content-type": "application/json"
    }
});