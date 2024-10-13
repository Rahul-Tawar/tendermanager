import React, { useRef } from 'react';
import HeroBanner from './HeroBanner';
import TenderList from './TenderList';
import Features from './Features';
import Nav from '../../components/Nav';
import { Footer } from '../../components/Footer';


const Home = () => {
  // Create a ref for the TenderList section
  const tenderListRef = useRef(null);

  return (
    <>
      <Nav />
      <HeroBanner /> {/* Pass ref to HeroBanner */}
      <TenderList/> 
      <Features />
      <Footer />
    </>
  );
};

export default Home;
