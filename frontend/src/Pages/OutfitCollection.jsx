import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import CollectionHeader from "../Components/CollectionHeader"
import OutfitGrid from "@/Components/OutiftGrid"

function OutfitCollection() {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`${API_URL}/users/profile`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (!response.ok) navigate('/login');
        }
        fetchUser();
    }, []);

    const [outfits , setOutfits] = useState([]);
    async function fetchOutfits() {
        const response = await fetch(`${API_URL}/outfits` , {
            "method": "GET",
            "credentials": "include"
        });
        const data  = await response.json();
        console.log(data);
        
        if(response.ok){
            setOutfits(data.outfits);
        }
    }

    useEffect(() => {
        fetchOutfits();
    } , []);

    const [sortBy, setSortBy] = useState("newest")
    // "newest" | "oldest"

    const sortedOutfits = [...outfits].sort((a, b) => {
        const da = new Date(a.createdAt)
        const db = new Date(b.createdAt)

        return sortBy === "newest" ? db - da : da - db
    })


    return (
        <>
            <Navbar />
            <div className="
                min-h-screen
                pt-12
                pb-20

                lg:max-w-[1100px]
                xl:max-w-[1200px]
                mx-auto

                px-4
                lg:px-8

                lg:py-12
            ">
                <CollectionHeader count={outfits.length} title={"Collection"} quantifier="outfit"/>

                {sortedOutfits.length === 0 ? (
                    <div className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        text-center
                        py-24
                        text-neutral-600
                    ">
                        <p className="
                            text-xl
                            font-['Cormorant_Garamond']
                            font-light
                            text-neutral-800
                            mb-2
                        ">
                            Your collection is empty
                        </p>

                        <p className="text-sm max-w-sm">
                            Start building outfits to see them collected here.
                        </p>
                    </div>
                ) : (
                    <>
                            <div className="flex justify-center gap-2 mb-10">
                                {["newest", "oldest"].map(option => (
                                    <button
                                        key={option}
                                        onClick={() => setSortBy(option)}
                                        className={`
                                            px-5
                                            py-2
                                            rounded-full
                                            text-xs
                                            tracking-wide
                                            transition
                                            cursor-pointer
                                            ${sortBy === option
                                                                    ? "bg-neutral-800 text-white"
                                                : "bg-white/70 text-neutral-600 hover:bg-white border border-neutral-300"
                                                                }
                                        `}
                                    >
                                        {option === "newest" ? "Newest first" : "Oldest first"}
                                    </button>
                                ))}
                            </div>
                        <OutfitGrid outfits={sortedOutfits} />
                    </>
                )}
            </div>
            <Footer/>
        </>
    )
}

export default OutfitCollection
