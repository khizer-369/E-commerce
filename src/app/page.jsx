import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import Marquee from 'react-fast-marquee';
import Popular from "@/components/Popular";
import BlankSpace from '@/components/BlankSpace';
import Footer from '@/components/Footer';

const Page = () => {

  return (
    <div>
      <NavBar />
      <BlankSpace />
      <HeroSection />
      <Marquee className='h-9 bg-black text-white z-0'>
        <p className='text-sm font-semibold pr-17'>CRAFTED FOR THE MODERN GENTLEMAN</p>
        <p className='text-sm font-semibold pr-17'>FOR MEN WHO VALUE STYLE</p>
        <p className='text-sm font-semibold pr-17'>TIMELESS DESIGN</p>
        <p className='text-sm font-semibold pr-17'>A STATEMENT OF REFINED TASTE</p>
        <p className='text-sm font-semibold pr-17'>DESIGNED FOR THE DISCERNING MAN</p>
      </Marquee>
      <Popular />
      <Footer />
    </div>
  )
}

export default Page
