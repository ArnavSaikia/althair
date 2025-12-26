import { useState } from "react"
import Navbar from "@/Components/Navbar"
import Footer from "@/Components/Footer"
import CollectionHeader from "@/Components/CollectionHeader"
import OutfitGrid from "@/Components/OutiftGrid"

function ClothingCollection() {
    // fake data for now
    const clothing = [
        {
            id: 1,
            name: "Ivory linen shirt",
            category: "Upperwear",
            preview: "./BuildOutfit/dress.png",
            createdAt: "12 Dec 2025",
        },
        {
            id: 2,
            name: "Charcoal trousers",
            category: "Bottomwear",
            preview: "./BuildOutfit/jeans.png",
            createdAt: "25 Dec 2025",
        },
        {
            id: 3,
            name: "Black leather loafers",
            category: "Footwear",
            preview: "./BuildOutfit/boots.png",
            createdAt: "8 Jan 2026",
        },
        {
            id: 4,
            name: "Silver chain",
            category: "Accessories",
            preview: "./BuildOutfit/watch.png",
            createdAt: "15 Jan 2026",
        },
        {
            id: 5,
            name: "Soft cotton tee",
            category: "Upperwear",
            preview: "./BuildOutfit/blueHoodie.png",
            createdAt: "3 Feb 2026",
        },
    ]

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
        items: sortedClothing.filter(item => item.category === category),
    }))

    return (
        <>
            <Navbar />

            <div className="min-h-screen px-4 pb-20 pt-12">
                <CollectionHeader count={clothing.length} title="Wardrobe" />

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
                        <div className="flex justify-center gap-2 mb-14">
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

                        {/* Category sections */}
                        <div className="space-y-8">
                            {groupedByCategory.map(({ category, items }) =>
                                items.length > 0 ? (
                                    <section key={category}>
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
                                                    src={item.preview}
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
                    </>
                )}
            </div>

            <Footer />
        </>
    )
}

export default ClothingCollection
