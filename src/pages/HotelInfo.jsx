import React from 'react'
// import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getHotelBySlug } from '../api/request';
import NavBar from '../components/NavBar';

export default function HotelInfo() {
    const {slug} = useParams();

    const fetchHotelData = async ()=>{
        const {data} = await getHotelBySlug(slug);
        console.log("slug Data", data);
        return data;
    };
    fetchHotelData();
    // const {isLoading, data} = useQuery('hotel-slug', fetchHotelData)
  return (
    <>
        <NavBar/>
        <h2>Hotel Info</h2>
    </>
  )
}
