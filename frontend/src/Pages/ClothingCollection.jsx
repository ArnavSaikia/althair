import { useState, useEffect} from "react"
import Navbar from "@/Components/Navbar"
import Footer from "@/Components/Footer"
import CollectionHeader from "@/Components/CollectionHeader"
import OutfitGrid from "@/Components/OutiftGrid"
import { useNavigate } from "react-router-dom"

function ClothingCollection() {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const [clothing, setClothing] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        async function fetchClothing() {
            try {
                const response = await fetch(`${API_URL}/wardrobe/`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    if (isMounted) setClothing([]);
                    return;
                }

                const data = await response.json();
                if (isMounted) setClothing(data);
            } catch (err) {
                if (isMounted) setClothing([]);
            }
        }

        fetchClothing();

        return () => {
            isMounted = false;
        };
    }, []);



    const CATEGORIES = [
        "Upperwear",
        "Bottomwear",
        "Footwear",
        "Accessories",
    ]

    const [sortBy, setSortBy] = useState("newest")
    // "newest" | "oldest"

    const sortedClothing = [...clothing].sort((a, b) => {
        const da = new Date(a.createdAt)
        const db = new Date(b.createdAt)

        return sortBy === "newest" ? db - da : da - db
    })

    const groupedByCategory = CATEGORIES.map(category => ({
        category,
        items: sortedClothing.filter(item => item.category?.toLowerCase() === category.toLowerCase()),
    }))

    return (
        <>
            <Navbar />

            <div className="
                min-h-screen
                py-12

                lg:max-w-[1100px]
                xl:max-w-[1200px]
                mx-auto

                px-4
                lg:px-8
            ">

                <CollectionHeader count={clothing.length} title="Wardrobe" quantifier="piece"/>

                {clothing.length === 0 ? (
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
                            Your wardrobe is empty
                        </p>

                        <p className="text-sm max-w-sm">
                            Start adding garments to see them collected here.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Sort */}
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

                        {/* Category sections */}
                        <div className="space-y-8">
                            {groupedByCategory.map(({ category, items }) =>
                                items.length > 0 ? (
                                    <section key={category} className="lg:mb-18">
                                        <h2 className="
                                            mb-6
                                            lg:mb-10
                                            text-[22px]
                                            lg:text-[28px]
                                            font-['Cormorant_Garamond']
                                            font-light
                                            tracking-wide
                                            text-neutral-800
                                        ">
                                            {category}
                                        </h2>

                                        <div
                                            className="
                                                grid
                                                grid-cols-2
                                                sm:grid-cols-3
                                                md:grid-cols-4
                                                gap-4
                                            "
                                        >
                                            {items.map(item => (
                                                <img
                                                    key={item._id}
                                                    src={item.imageUrl}
                                                    alt=""
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
                                    </section>
                                ) : null
                            )}
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </>
    )
}

export default ClothingCollection
