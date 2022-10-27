import React, { useState, useEffect } from 'react'

import Navbar from './components/NavBar';
import ShowBlogs from './components/ShowBlogs';
import Footer from './components/Footer'


function App() {

  return (
    <div className='max-w-[1640px] mx-auto px-5' >
      <Navbar />
      <ShowBlogs />
      <Footer />
    </div>
  );
}

export default App;
