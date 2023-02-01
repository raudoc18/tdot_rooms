import axios from 'axios';

const api = axios.create({
  baseURL: process.env.CMS_SERVER,
});

export default api;
