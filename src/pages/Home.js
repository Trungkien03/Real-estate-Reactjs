import React from 'react';

//import components
import Banner from '../components/Banner';
import HouseList from '../components/HouseList';

const Home = () => {
  return <div className='min-h-[1080px]'>
    <Banner/>
    <HouseList/>
  </div>;
};

export default Home;
