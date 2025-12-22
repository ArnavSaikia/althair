import Navbar from "@/Components/Navbar"
import Footer from "@/Components/Footer"
import CanvasPreview from "@/Components/CanvasPreview"
import EditorialOverlay from "@/Components/EditorialOverlay";

function OutfitPreview() {
    // mock backend response
    const outfit = {
        name: "Evening neutrals",
        description: "Loose silhouettes, warm neutrals, winter evening",
        createdAt: "12 Dec 2025",
        referenceImage: "/bottomwear_landing3.jpg",
        canvasItems: [
            {
                "id": 1,
                "src": "BuildOutfit/jacket.png",
                "type": "top",
                "canvasId": "818e3fb9-42d7-4751-8538-1e1f2c01264e",
                "x": 0.37385904441759427,
                "y": 0.2219091623793648,
                "scale": 2.6001706253550285,
                "normalizedScale": 0.8078199960653064,
                "zIndex": 23
            },
            {
                "id": 5,
                "src": "BuildOutfit/jeans.png",
                "type": "bottom",
                "canvasId": "daa7512f-0c4b-4d86-ae15-db5c131a370e",
                "x": 0.37965456953326476,
                "y": 0.44540322945905253,
                "scale": 1.7547329955055413,
                "normalizedScale": 0.5451597565586127,
                "zIndex": 20
            }
        ]
    }

    return (
        <>
            <Navbar />

            <div className="
                min-h-screen
                bg-[linear-gradient(180deg,#f2f0ec_0%,#edeae4_100%)]
            ">
                {/* Swipe container */}
                <div className="
                    relative
                    max-w-md
                    mx-auto
                    aspect-[3/4]
                    overflow-x-auto
                    flex
                    snap-x
                    snap-mandatory
                ">
                    {/* Slide 1 – reference image */}
                    <div className="min-w-full h-full snap-center relative">
                        <img
                            src={outfit.referenceImage}
                            alt=""
                            className="w-full h-full object-cover"
                        />

                        <EditorialOverlay outfit={outfit} />
                    </div>

                    {/* Slide 2 – reconstructed canvas */}
                    <div className="min-w-full h-full snap-center relative">
                        <CanvasPreview items={outfit.canvasItems} />

                        <EditorialOverlay outfit={outfit} />
                    </div>
                </div>

                {/* rest of page later */}
            </div>

            <Footer />
        </>
    )
}

export default OutfitPreview
