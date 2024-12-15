// Home.jsx
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import HeroSection from '../../components/HeroSection/HeroSection';
import Banner from '../../components/Banner/Banner';
import Featured from '../../components/Banner/Featured/Featured.jsx';

const Home = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden"> {/* Add overflow-x-hidden */}
      <Navbar />
      <HeroSection />
      <Featured/>
      <Banner />  
      <Footer />
    </div>
  );
};

export default Home;