import React from 'react';
import Banner from '../../../Components/Banner/Banner';
import NewArrival from '../../../Components/NewArrival/NewArrival';
import Airpods from '../../../Components/Airpods/Airpods';
import Clock from '../../../Components/Clock/Clock';
import Speaker from '../../../Components/Speaker/Speaker';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <NewArrival></NewArrival>
            <Airpods></Airpods>
            <Clock></Clock>
            <Speaker></Speaker>
        </div>
    );
};

export default Home;