import Navbar from "@/components/Navbar"
import Footer from "@/Components/Footer"

export default function ClothingPreview() {
    // Temporary boilerplate data
    const item = {
        _id: "mock-clothing-id",
        user: "mock-user-id",

        name: "Draped Red Dress",
        category: "Outerwear",
        color: "Blood Red",
        fit: "Relaxed",
        size: "M",

        additionalNotes:
            "Softened through repeated wear. Slight fading at the cuffs.",

        imageUrl:
            "./BuildOutfit/dress.png",

        // Fake relational data
        usedIn: [
            {
                id: "outfit-1",
                preview:
                    "/redOutfit.jpg",
            },
            {
                id: "outfit-2",
                preview:
                    "/redOutfit2.jpg",
            },
        ],

        editorialNote:
            "A dependable layer. Chosen more often for comfort than intention, yet it quietly anchors most transitional outfits.",

        createdAt: "Mar 2025",
        source: "Personal wardrobe",
    }

    return (
        <main className="w-full">
            <Navbar />

            {/* Image / Gallery Section */}
            <section
                className="
                    w-full
                    min-h-[60vh]
                    flex
                    items-center
                    justify-center
                    bg-[radial-gradient(ellipse_at_22%_16%,#fdfbf8_0%,#f3efe9_35%,#ebe6df_60%,#e2ddd6_75%),radial-gradient(ellipse_at_85%_85%,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0)_55%)]
                "
            >
                <img
                    src={item.imageUrl}
                    alt=""
                    className="
                        max-h-[420px]
                        w-auto
                        object-contain
                    "
                />
            </section>

            {/* Metadata */}
            <section
                className="
                    max-w-md
                    mx-auto
                    px-6
                    pt-5
                    pb-10
                "
            >
                <h2
                    className="
                        font-['Cormorant_Garamond']
                        text-[28px]
                        leading-tight
                        text-[#2c2b28]
                        font-light
                    "
                >
                    {item.name}
                </h2>

                <p
                    className="
                        mt-2
                        text-[11px]
                        tracking-wide
                        text-[#6f6c66]
                    "
                >
                    {item.category}
                    {item.color && ` · ${item.color}`}
                </p>

                {item.additionalNotes && (
                    <p
                        className="
                            mt-5
                            font-['Cormorant_Garamond']
                            text-[16px]
                            leading-[1.7]
                            text-[#5a5853]
                            max-w-[42ch]
                        "
                    >
                        {item.additionalNotes}
                    </p>
                )}
            </section>

            {/* Appears In */}
            {item.usedIn?.length > 0 && (
                <section
                    className="
                        max-w-md
                        mx-auto
                        px-6
                        pb-10
                    "
                >
                    <h3
                        className="
                            font-['Cormorant_Garamond']
                            text-[22px]
                            leading-tight
                            text-[#2c2b28]
                            font-light
                            mb-5
                        "
                    >
                        Appears in
                    </h3>

                    <div
                        className="
                            flex
                            gap-4
                            overflow-x-auto
                        "
                    >
                        {item.usedIn.map((outfit) => (
                            <button
                                key={outfit.id}
                                className="
                                    flex-shrink-0
                                    w-[96px]
                                    h-[128px]
                                    overflow-hidden
                                    cursor-pointer
                                "
                            >
                                <img
                                    src={outfit.preview}
                                    alt=""
                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                        transition-opacity
                                        duration-200
                                        hover:opacity-80
                                        rounded-lg
                                    "
                                />
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* Reflection */}
            {item.editorialNote && (
                <section
                    className="
                        max-w-md
                        mx-auto
                        px-6
                        pb-10
                    "
                >
                    <h3
                        className="
                            font-['Cormorant_Garamond']
                            text-[22px]
                            leading-tight
                            text-[#2c2b28]
                            font-light
                            mb-5
                        "
                    >
                        Reflection
                    </h3>

                    <p
                        className="
                            font-['Cormorant_Garamond']
                            text-[16px]
                            leading-[1.7]
                            text-[#5a5853]
                            max-w-[42ch]
                        "
                    >
                        {item.editorialNote}
                    </p>
                </section>
            )}

            {/* Provenance */}
            <section
                className="
                    max-w-md
                    mx-auto
                    px-6
                    pb-10
                "
            >
                <p
                    className="
                        text-[11px]
                        tracking-wide
                        text-[#8a877f]
                    "
                >
                    Added {item.createdAt} · {item.source}
                </p>
            </section>

            <Footer/>
        </main>
    )
}
