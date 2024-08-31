import axios from 'axios';

// Create an instance of axios with default settings
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Replace with your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor to handle errors
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    // Handle unauthorized access, e.g., redirect to login
  }
  return Promise.reject(error);
});

export const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token } = response.data;
      localStorage.setItem('token', token); // Store the token
      return response.data;
    } catch (error) {
      throw error.response.data; // Re-throw the error message from the server
    }
  };
  export const signup = async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
// Get all tasks
export const getTasks = async () => {
    try {
      const response = await api.get('/tasks');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  // Create a new task
  export const createTask = async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  // Update an existing task
  export const updateTask = async (taskId, taskData) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  // Delete a task
  export const deleteTask = async (taskId) => {
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
      
export default api;
