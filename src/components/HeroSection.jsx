import { cormorantGaramond } from '@/app/layout';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
    return (
        <div className='relative h-[91vh] w-full flex justify-center items-end'>
            <Image className='hidden sm:inline' src={"/hero_section_image.jpeg"} fill priority sizes='full' alt='hero section image' />
            <Image className='inline sm:hidden' src={"/2nd_hero_section_image.png"} fill priority sizes='full' alt='hero section image' />
            <div className='h-[60%] absolute flex flex-col justify-end sm:justify-around items-center pb-15 sm:pb-0'>
                <div className='text-orange-50 hidden sm:flex flex-col items-center text-3xl'>
                    <h2 className={cormorantGaramond.className}>OLD MONEY ELEGANCE. MODERN STYLE.</h2>
                    <h2 className={cormorantGaramond.className}>THE TRENCH COLLECTION</h2>
                </div>
                <Link href={"/products"} className='h-10 w-30 bg-black text-white tracking-wide cursor-pointer text-center pt-2 hover:text-gray-200 transition duration-150'>SHOP NOW</Link>
            </div>
        </div>
    )
}

export default HeroSection
