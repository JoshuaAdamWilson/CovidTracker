import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000'

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL
});

export const uploadUser = async (data, config) => {
    const res = await axiosInstance.post("/api/users", data, config);
    return res
}

export const signInUser = async () => {
    const res = await axios.get("/api/auth");
    return res
}

export const loginUser = async (data, config) => {
    const res = await axios.post("/api/auth", data, config);
    return res
}

export const getProfile = async () => {
    const res = await axios.get("/api/profile/me");
    return res
}

export const postToProfile = async (data) => {
    const res = await axios.put("/api/profile/listedstates", data);
    return res
}
