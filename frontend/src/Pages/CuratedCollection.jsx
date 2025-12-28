import Navbar from "@/Components/Navbar"
import Footer from "@/Components/Footer"

function CuratedCollection() {
    // fake curated data for now
    const curatedClothing = [
        {
            id: 1,
            name: "Ivory linen shirt",
            category: "Upperwear",
            preview: "./BuildOutfit/dress.png",
        },
        {
            id: 2,
            name: "Charcoal trousers",
            category: "Bottomwear",
            preview: "./BuildOutfit/jeans.png",
        },
        {
            id: 3,
            name: "Black leather loafers",
            category: "Footwear",
            preview: "./BuildOutfit/boots.png",
        },
        {
            id: 4,
            name: "Silver chain",
            category: "Accessories",
            preview: "./BuildOutfit/watch.png",
        },
    ]

    const CATEGORIES = [
        "Upperwear",
        "Bottomwear",
        "Footwear",
        "Accessories",
    ]

    const groupedByCategory = CATEGORIES.map(category => ({
        category,
        items: curatedClothing.filter(item => item.category === category),
    }))

    return (
        <>
            <Navbar />

            <div className="min-h-screen px-4 py-12">
                {/* Intro text */}
                <div className="mb-12 text-center">
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
                        Selected pieces you can add to your own archive
                    </p>
                </div>


                {curatedClothing.length === 0 ? (
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
                            No curated pieces yet
                        </p>

                        <p className="text-sm max-w-sm">
                            This space will evolve with editor-selected garments.
                        </p>
                    </div>
                ) : (
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
                )}
            </div>

            <Footer />
        </>
    )
}

export default CuratedCollection;
