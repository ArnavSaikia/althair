import { forwardRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NavbarMobileDrawer = forwardRef((props, ref) => {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const [user, setUser] = useState({
        name: "Visitor",
        wardrobeCount: "0",
        outfitCount: "0"
    });
    const navigate = useNavigate();

    async function fetchUser(){
        const response = await fetch(`${API_URL}/users/profile`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();
        if(response.ok) setUser({
            name: data.name,
            wardrobeCount: data.wardrobeCount,
            outfitCount: data.outfitCount
        });
    }

    useEffect(() => {
        fetchUser();
    })

    return (
        <div
            ref={ref}
            className={`
                fixed top-0 right-0 h-full w-[70vw] bg-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.25)] border-l border-black/10 backdrop-blur-xl shadow-xl z-[102]
                transform transition-transform duration-300
                ${props.isOpen ? "translate-x-0" : "translate-x-[100%]"}
            `}
        >
            <div className="flex justify-end p-4">
                <button onClick={() => props.setisOpen(false)}>
                    <span className="text-3xl">&times;</span>
                </button>
            </div>

            <div className="pb-4">
                <span className="px-6 font-['Cormorant_Garamond'] font-medium text-2xl block hover:translate-x-1 transition-all duration-200 cursor-pointer">{user.name}</span>
                <span className="px-6 text-gray-400 font-inter text-sm hover:translate-x-1 transition-all duration-200 cursor-pointer">{user.outfitCount} Outifts</span>
                <span className="text-gray-400 font-inter text-sm hover:translate-x-1 transition-all duration-200 cursor-pointer">{user.wardrobeCount} Clothing</span>
            </div>
            <div className="flex justify-center">
                <div className="border-b border-black/10 w-[90%] px-6"></div>
            </div>

            <div className="flex flex-col gap-6 p-6 text-lg font-[inter]">
                <a className="navbar-link font-inter text-lg hover:translate-x-1 transition-all duration-200 cursor-pointer" onClick={() => navigate('/')}>Home</a>
                <a className="navbar-link font-inter text-lg hover:translate-x-1 transition-all duration-200 cursor-pointer" onClick={() => navigate('/curated')}>Curated Collection</a>
                <a className="navbar-link font-inter text-lg hover:translate-x-1 transition-all duration-200 cursor-pointer" onClick={() => navigate('/wardrobe')}>My Wardrobe</a>
                <a className="navbar-link font-inter text-lg hover:translate-x-1 transition-all duration-200 pointer-cursor cursor-pointer" onClick={() => navigate('/outfits')}>Outfit</a>
            </div>
        </div>
    );
});

export default NavbarMobileDrawer;
