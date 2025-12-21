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
                id: "shirt",
                image: "/BuildOutfit/jacket.png",
                x: 120,
                y: 80,
                z: 2,
                scale: 1,
                rotation: 0
            },
            {
                id: "pants",
                image: "/BuildOutfit/jeans.png",
                x: 110,
                y: 260,
                z: 1,
                scale: 1,
                rotation: 0
            }
        ]
    }

    return (
        <>
            <Navbar />

            <div className="
                min-h-screen
                pt-14
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
                    rounded-xl
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
