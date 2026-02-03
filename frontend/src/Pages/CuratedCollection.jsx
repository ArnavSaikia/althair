import { useState , useEffect} from "react"
import Navbar from "@/Components/Navbar"
import Footer from "@/Components/Footer";
import { useSearchParams } from "react-router-dom";

function CuratedCollection() {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const [searchParams] = useSearchParams();
    const scrollToCategory = searchParams.get("category");

    useEffect(() => {
        if (!scrollToCategory) return;

        const el = document.getElementById(scrollToCategory);
        if (!el) return;

        el.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [scrollToCategory]); //add curatedClothing var as a dependency too once fetching from api has been implemented

    // fake curated data for now
    // const curatedClothing = [
    //     {
    //         id: 1,
    //         name: "Ivory linen shirt",
    //         category: "Upperwear",
    //         preview: "./BuildOutfit/dress.png",
    //         gender: "men",
    //     },
    //     {
    //         id: 2,
    //         name: "Charcoal trousers",
    //         category: "Bottomwear",
    //         preview: "./BuildOutfit/jeans.png",
    //         gender: "men",
    //     },
    //     {
    //         id: 3,
    //         name: "Black leather loafers",
    //         category: "Footwear",
    //         preview: "./BuildOutfit/boots.png",
    //         gender: "women",
    //     },
    //     {
    //         id: 4,
    //         name: "Silver chain",
    //         category: "Accessories",
    //         preview: "./BuildOutfit/watch.png",
    //         gender: "women",
    //     },
    // ]

    const [curatedClothing , setCuratedClothing] = useState([]);

    async function fetchCurated() {
        const response = await fetch(`${API_URL}/wardrobe/curated`, {
            "method": "GET",
            "credentials": "include"
        });
        const data = await response.json();
        console.log(data);
        if(response.ok) setCuratedClothing(data)
    }

    useEffect(() => {
        fetchCurated();
    }, []);

    const CATEGORIES = [
        "Upperwear",
        "Bottomwear",
        "Footwear",
        "Accessories",
    ]

    const [genderFilter, setGenderFilter] = useState("all")
    // "all" | "men" | "women"

    const filteredClothing =
        genderFilter === "all"
            ? curatedClothing
            : curatedClothing.filter(item => item.gender === genderFilter || item.gender === 'unisex')

    const groupedByCategory = CATEGORIES.map(category => ({
        category,
        items: filteredClothing.filter(item => item.category === category),
    }))

    return (
        <>
            <Navbar />

            <div className="min-h-screen px-4 py-12">
                {/* Intro text */}
                <div className="mb-10 text-center">
                    <h1 className="
                        text-[42px]
                        leading-tight
                        font-['Cormorant_Garamond']
                        font-light
                        text-neutral-800
                        mb-2
                    ">
                        Curations
                    </h1>

                    <p className="
                        text-sm
                        text-neutral-500
                        tracking-wide
                    ">
                        Selected pieces you may add to your archive
                    </p>
                </div>

                {/* Gender filter */}
                <div className="flex justify-center gap-2 mb-10">
                    {["all", "men", "women"].map(option => (
                        <button
                            key={option}
                            onClick={() => setGenderFilter(option)}
                            className={`
                                px-5
                                py-2
                                rounded-full
                                text-xs
                                tracking-wide
                                transition
                                ${genderFilter === option
                                    ? "bg-neutral-800 text-white"
                                    : "bg-white/70 text-neutral-600 hover:bg-white border border-neutral-300"
                                }
                            `}
                        >
                            {option === "all"
                                ? "All"
                                : option === "men"
                                    ? "Men"
                                    : "Women"}
                        </button>
                    ))}
                </div>

                {filteredClothing.length === 0 ? (
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
                            No pieces in this selection
                        </p>

                        <p className="text-sm max-w-sm">
                            Curations will expand over time.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {groupedByCategory.map(({ category, items }) =>
                            items.length > 0 ? (
                                <section key={category} id={category}>
                                    <h2 className="
                                        mb-6
                                        text-[22px]
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
                                                key={item.id}
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
                                            />
                                        ))}
                                    </div>
                                </section>
                            ) : null
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </>
    )
}

export default CuratedCollection
