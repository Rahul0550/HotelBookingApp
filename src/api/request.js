import axios from 'axios';

const BASE_API = 'https://hotels-api-4ltr.onrender.com/api';
const getHotels = ()=> axios.get(`${BASE_API}/hotels`);
const getHotelBySlug = (slug) => axios.get(`${BASE_API}/hotels/${slug}`)

export { getHotels, getHotelBySlug };