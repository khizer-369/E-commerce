import React from 'react';
import NavBar from '@/components/NavBar';
import BlankSpace from '@/components/BlankSpace';
import Footer from "@/components/Footer";

const layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <BlankSpace />
      {children}
      <Footer />
    </div>
  )
}

export default layout
