import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

// Attach token to every request automatically
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

export const registerUser  = (data)    => API.post('/auth/register', data);
export const loginUser     = (data)    => API.post('/auth/login', data);
export const getTemples    = (search)  => API.get(`/temples${search ? `?search=${search}` : ''}`);
export const getTemple     = (id)      => API.get(`/temples/${id}`);
export const createBooking = (data)    => API.post('/bookings', data);
export const getMyBookings = ()        => API.get('/bookings/my');
export const cancelBooking = (id)      => API.put(`/bookings/${id}/cancel`);
