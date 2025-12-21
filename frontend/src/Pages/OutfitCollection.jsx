import { useState } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import CollectionHeader from "../Components/CollectionHeader"
import OutfitGrid from "@/Components/OutiftGrid"

function OutfitCollection() {
    // later this comes from backend
    const outfits = [
        {
            id: 1,
            name: "Evening neutrals",
            preview: "/upperwear_landing3.jpg",
            createdAt: "12 Dec 2025"
        },
        {
            id: 2,
            name: "Monochrome work fit",
            preview: "/accessories_landing1.jpg",
            createdAt: "25 Dec 2025"
        },
        {
            id: 3,
            name: "Casual weekend vibes",
            preview: "/upperwear_landing1.jpg",
            createdAt: "8 Jan 2026"
        },
        {
            id: 4,
            name: "Minimalist chic",
            preview: "/accessories_landing2.jpg",
            createdAt: "15 Jan 2026"
        },
        {
            id: 5,
            name: "Urban street style",
            preview: "/upperwear_landing2.jpg",
            createdAt: "3 Feb 2026"
        },
        {
            id: 6,
            name: "Summer pastels",
            preview: "/accessories_landing3.jpg",
            createdAt: "10 Feb 2026"
        },
        {
            id: 7,
            name: "Classic office look",
            preview: "/upperwear_landing3.jpg",
            createdAt: "18 Feb 2026"
        },
        {
            id: 8,
            name: "Bohemian dreams",
            preview: "/accessories_landing1.jpg",
            createdAt: "22 Feb 2026"
        },
        {
            id: 9,
            name: "Edgy leather jacket",
            preview: "/upperwear_landing1.jpg",
            createdAt: "1 Mar 2026"
        },
        {
            id: 10,
            name: "Soft romantic",
            preview: "/accessories_landing2.jpg",
            createdAt: "7 Mar 2026"
        }
    ]

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
            <div className="min-h-screen bg-[linear-gradient(180deg,#f2f0ec 0%,#edeae4 100%)] px-4 pb-20 pt-12">
                <CollectionHeader count={outfits.length} />

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
