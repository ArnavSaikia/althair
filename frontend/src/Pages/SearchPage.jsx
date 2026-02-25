import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import OutfitGrid from "@/Components/OutiftGrid";
import CollectionHeader from "@/Components/CollectionHeader";
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
        if(responseWardrobe.ok) setWardrobeResults(dataWardrobe.items);
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
    }, [query]);

    return(
        <>
            <Navbar />

            <div className="min-h-[85vh] px-4 pt-12">
                <CollectionHeader
                    title="Search Results"
                    count={wardrobeResults.length + outfitResults.length}
                    quantifier="result"
                />

                <section className="mb-10">
                    <h2 className="
                        mb-6
                        text-[24px]
                        font-['Cormorant_Garamond']
                        font-light
                        tracking-wide
                        text-neutral-800
                    ">
                        Clothing
                    </h2>

                    {wardrobeResults.length === 0 ? (
                        <p className="text-m font-['Cormorant_Garamond'] font-light text-neutral-500 text-center py-8">
                            No matching clothing items found
                        </p>
                    ) : (
                        <div
                            className="
                            grid
                            grid-cols-2
                            sm:grid-cols-3
                            md:grid-cols-4
                            gap-4
                        "
                        >
                            {wardrobeResults.map(item => (
                                <img
                                    key={item._id}
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="
                                        w-full
                                        aspect-[3/4]
                                        object-contain
                                        cursor-pointer
                                        transition
                                        hover:opacity-90
                                    "
                                    onClick={() => navigate(`/wardrobe/${item._id}`)}
                                />
                            ))}
                        </div>
                    )}
                </section>

                <section>
                    <h2 className="
                        mb-6
                        text-[24px]
                        font-['Cormorant_Garamond']
                        font-light
                        tracking-wide
                        text-neutral-800
                    ">
                        Outfits
                    </h2>

                    {outfitResults.length === 0 ? (
                        <p className="text-m font-['Cormorant_Garamond'] font-light text-neutral-500 text-center py-8">
                            No matching outfits found
                        </p>
                    ) : (
                        <OutfitGrid outfits={outfitResults} />
                    )}
                </section>
            </div>

            <Footer />
        </>
    )
}

export default SearchPage;