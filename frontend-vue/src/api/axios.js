import axios from 'axios';

const instance = axios.create({
  // Dynamically uses Laravel environment API endpoint or fallback to localhost
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default instance;
