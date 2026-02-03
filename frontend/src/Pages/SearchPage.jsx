import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { useState , useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function SearchPage(){
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q").trim();

    const [wardrobeResults , setWardrobeResults] = useState([]);
    const [outfitResults , setOutfitResults] = useState([]);

    async function fetchSearches(){
        const responseWardrobe = await fetch(`${API_URL}/wardrobe/search?q=${encodeURIComponent(query)}`,{
            "method": "GET",
            "credentials": "include"
        });
        const dataWardrobe = await responseWardrobe.json();
        if(responseWardrobe.ok) setWardrobeResults(dataWardrobe);
        console.log(dataWardrobe);

        const responseOutfit = await fetch(`${API_URL}/outfits/search?q=${encodeURIComponent(query)}`,{
            "method": "GET",
            "credentials": "include"
        });
        const dataOutfit = await responseOutfit.json();
        if(responseOutfit.ok) setOutfitResults(dataOutfit);
        console.log(dataOutfit)
    };

    useEffect( () => {
        if (!query || !query.trim()) return;
        fetchSearches();
    }, []);

    return(
        <div>

        </div>
    )
}

export default SearchPage;