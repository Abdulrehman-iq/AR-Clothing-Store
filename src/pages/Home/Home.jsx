// Home.jsx
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import HeroSection from '../../components/HeroSection/HeroSection';
import Banner from '../../components/Banner/Banner';
import Featured from '../../components/Featured/Featured.jsx';
import AboutStore from '../../components/AboutStore/AboutStore.jsx';

const Home = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden"> {/* Add overflow-x-hidden */}
      <Navbar />
      <HeroSection />
      
      <Featured/>
      <Banner />  
      <AboutStore/>
      <Footer />
    </div>
  );
};

export default Home;