import axios from "axios";

export default axios.create({
    withCredentials: true,
    baseURL: 'https://internship-assessment-xi.vercel.app/api'
});