import Navbar from '../Components/Navbar.jsx';
import Card from '../Components/Card.jsx'
import Footer from '../Components/Footer.jsx';
import CTA from '../Components/CTA.jsx';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Landing(){
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_BASE_URL;

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

    const [clothes, setClothes] = useState([]);

    async function fetchRecentlyAdded() {
        const response = await fetch(`${API_URL}/wardrobe`, {
            "method": "GET",
            "credentials": "include"
        });
        const data = await response.json();
        if(response.ok) setClothes(data);
    }

    useEffect(() => {
        fetchRecentlyAdded();
    } , []);

    return(
        <>
            <Navbar/>
            <div className='lg:w-full'>
                <div className="relative w-screen lg:w-full h-[80vh] sm:h-[85vh] md:h-[90vh] lg:h-[95vh] lg:w-full xl:h-[100vh] overflow-hidden">
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
                                sm:text-6xl
                                md:text-7xl
                                lg:text-8xl
                                xl:text-[90px]
                                font-light
                                leading-[1.05]
                                tracking-wide
                                max-w-[18ch]
                                drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]
                                mb-2
                            "
                        >
                            {heroSlides[index].title}
                        </h1>
                        <p
                            className="
                                font-inter
                                font-light
                                text-white/75
                                text-[17px]
                                sm:text-[18px]
                                md:text-[19px]
                                lg:text-[20px]
                                xl:text-[21px]
                                leading-relaxed
                                tracking-[0.01em]
                                max-w-[35ch]
                                drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]
                                transition-opacity duration-700
                            "
                        >
                            {heroSlides[index].text}
                        </p>
                    </div>
            </div>

                <div className="
                    w-screen lg:w-full
                    p-4
                    md:p-6
                    lg:p-8

                    lg:max-w-[1100px]
                    xl:max-w-[1200px]
                    mx-auto
                    pt-4
                ">
                    <span className='text-3xl font-light tracking-wide font-["Cormorant_Garamond"]'>Categories</span>
                    <div className="
                        grid
                        grid-cols-2
                        gap-4

                        md:gap-5
                        lg:grid-cols-4
                        lg:gap-6

                        mt-3
                    ">

                        <div className='flex flex-col gap-4 lg:contents'>
                            <div className="relative rounded-[12px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.1)] border border-white/20 hover:scale-[1.03] transition duration-500 aspect-[2/3] md:aspect-[2/3] lg:aspect-[2/3] xl:aspect-[2/3] cursor-pointer" onClick={() => navigate(`/curated?category=upperwear`)}>
                                <img src="/upperwear_landing2.jpg" className="w-full h-full object-cover" alt="upperwear" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>
                                <span className="absolute bottom-3 left-3 text-white tracking-wide font-['Cormorant_Garamond'] text-lg md:text-xl lg:text-lg xl:text-xl">Upperwear</span>
                            </div>
                            <div className="relative rounded-[12px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.1)] border border-white/20 hover:scale-[1.03] transition duration-500 aspect-[2/3] md:aspect-[2/3] lg:aspect-[2/3] xl:aspect-[2/3] cursor-pointer" onClick={() => navigate(`/curated?category=bottomwear`)}>
                                <img src="/bottomwear_landing.jpg" className="w-full h-full object-cover" alt="bottomwear" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>
                                <span className="absolute bottom-3 left-3 text-white tracking-wide font-['Cormorant_Garamond'] text-lg md:text-xl lg:text-lg xl:text-xl">Bottomwear</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 lg:contents'>
                            <div className="relative grow-[3] min-h-0 rounded-[12px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.1)] border border-white/20 hover:scale-[1.03] transition duration-500 aspect-[2/2.5] md:aspect-[2/2.5] lg:aspect-[2/3] xl:aspect-[2/3] cursor-pointer" onClick={() => navigate(`/curated?category=footwear`)}>
                                <img src="/footwear_landing5.jpg" className="w-full h-full object-cover" alt="footwear" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>
                                <span className="absolute bottom-3 left-3 text-white tracking-wide font-['Cormorant_Garamond'] text-lg md:text-xl lg:text-lg xl:text-xl">Footwear</span>
                            </div> 
                            {/* go with either 5th or 7th one id say */}
                            <div className="relative rounded-[12px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.1)] border border-white/20 hover:scale-[1.03] transition duration-500 aspect-[2/2.5] md:aspect-[2/2.5] lg:aspect-[2/3] xl:aspect-[2/3] cursor-pointer" onClick={() => navigate(`/curated?category=accessories`)}>
                                <img src="/accessories_landing2.jpg" className="w-full h-full object-cover" alt="accessories" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>
                                <span className="absolute bottom-3 left-3 text-white tracking-wide font-['Cormorant_Garamond'] text-lg md:text-xl lg:text-lg xl:text-xl">Accessories</span>
                            </div>
                        </div>
                    </div>
                </div>

                <CTA/>

                {clothes && (
                    <section className="lg:max-w-[1100px] xl:max-w-[1200px] mx-auto px-4 lg:px-8 py-12 pt-4 md:pt-6 lg:pt-8">

                        <h2 className="text-3xl font-light font-['Cormorant_Garamond'] mb-6">
                            Recently Added
                        </h2>

                        <div className="
                            flex gap-6 overflow-x-auto pb-2
                            md:grid md:grid-cols-4 md:gap-8 md:overflow-visible
                            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                        ">

                            {clothes.slice(0, 4).map((item) => (
                                <div
                                    key={item._id}
                                    onClick={() => navigate(`/wardrobe/${item._id}`)}
                                    className="
                                        flex-none w-[40vw]
                                        md:w-auto

                                        cursor-pointer
                                        transition duration-500
                                        hover:scale-[1.05]
                                        hover:-translate-y-1
                                    "
                                >

                                    {/* fixed uniform image frame */}
                                    <div className="
                                        w-full
                                        h-[240px]
                                        md:h-[260px]
                                        lg:h-[280px]

                                        flex items-center justify-center
                                    ">

                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="
                                                max-w-full
                                                max-h-full
                                                object-contain
                                                select-none
                                                pointer-events-none
                                            "
                                                draggable="false"
                                        />

                                    </div>

                                </div>
                            ))}

                        </div>

                    </section>
                )}
                <Footer/>
            </div>
        </> 
    )
}

export default Landing;