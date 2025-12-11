import Navbar from '../Components/Navbar.jsx';
import Card from '../Components/Card.jsx'
import Footer from '../Components/Footer.jsx';
import { useState, useEffect, useRef } from 'react';

function Landing(){

    const heroSlides = [
        { 
            image: "/hero33.jpg", 
            title: "Dress Like You Mean It", 
            text: "Fresh fits crafted for everyday confidence."
        },
        { 
            image: "/hero2.jpeg", 
            title: "Find Your Daily Uniform", 
            text: "Minimal silhouettes, maximum comfort."
        },
        { 
            image: "/hero3.jpg", 
            title: "Wear What Moves You", 
            text: "Pieces built to match your rhythm." 
        }
    ];


    const [index, setIndex] = useState(0);

    //for the parallax bit of the hero section
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY * 0.4;  // tweak the factor for intensity
            const hero = document.getElementById("hero-parallax");
            if (hero) hero.style.transform = `translateY(${offset}px)`;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    //for the hero image transition bit
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % heroSlides.length);
        }, 6000); // 4 seconds

        return () => clearInterval(interval);
    }, []);

    return(
        <>
            <Navbar/>
            <div className='size-max'>
                <div className="relative w-screen h-[80vh] overflow-hidden">
                {heroSlides.map((slide, i) => (
                        <div
                            key={i}
                            className={`
                                absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms]
                                will-change-transform
                                ${i === index ? "opacity-100" : "opacity-0"}
                            `}
                            style={{ backgroundImage: `url('${slide.image}')` }}
                            id={i === index ? "hero-parallax" : undefined}
                        />
                    ))}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none gap-0"></div>


                    {/* centered slide text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-1">
                        <h1
                            className="
                                font-['Cormorant_Garamond']
                                text-white/95
                                text-5xl
                                font-light
                                leading-[1.05]
                                tracking-wide
                                max-w-[18ch]
                                drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]
                                transition-opacity duration-700
                                mb-2
                            "
                        >
                            {heroSlides[index].title}
                        </h1>
                        <p
                            className="
                                font-sans
                                text-white/80
                                text-lg
                                leading-snug
                                tracking-wide
                                max-w-[35ch]
                                drop-shadow-[0_3px_6px_rgba(0,0,0,0.55)]
                                transition-opacity duration-700
                            "
                        >
                            {heroSlides[index].text}
                        </p>
                    </div>
            </div>

                <div className='w-screen p-4 pt-4'>
                    <span className='text-3xl font-light tracking-wide font-["Cormorant_Garamond"]'>Categories</span>
                    <div className='grid grid-cols-2 gap-4 mt-3'>
                        <div className='flex flex-col gap-4'>
                            <img src='/upperwear_landing2.jpg' className='h-[auto] flex-none aspect-2/3' alt="upperwear" />
                            <img src='/bottomwear_landing.jpg' className='h-[auto] grow aspect-2/3' alt="bottomwear" />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <img src='/footwear_landing3.jpg' className='grow-[2] flex-none aspect-2/3' alt="footwear" />
                            <img src='/footwear_landing.jpg' className='h-[40%] flex-none aspect-2/3' alt="footwear" />
                        </div>
                    </div>
                </div>

                <div className='w-screen p-4'>
                    <span className='text-lg'>Featured Outfits</span>
                    <div className='h-[35vh] flex gap-[1rem] overflow-scroll'>
                        <Card image="/upperwear_landing.jpg" title={"template"} />
                        <Card image="/upperwear_landing.jpg" title={"template"} />
                        <Card image="/upperwear_landing.jpg" title={"template"} />
                        <Card image="/upperwear_landing.jpg" title={"template"} />
                    </div>
                </div>

                <div className='w-screen p-4'>
                    <span className='text-lg'>Featured Clothing</span>
                    <div className='h-[35vh] flex gap-[1rem] overflow-scroll'>
                        <Card image="/upperwear_landing.jpg" title={"template"} />
                        <Card image="/upperwear_landing.jpg" title={"template"} />
                        <Card image="/upperwear_landing.jpg" title={"template"} />
                        <Card image="/upperwear_landing.jpg" title={"template"} />
                    </div>
                </div>

                <Footer/>
            </div>
        </> 
    )
}

export default Landing;