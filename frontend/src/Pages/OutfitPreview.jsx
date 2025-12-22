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
                "canvasId": "9036ab7e-fa28-4e75-8e6a-19b63e0e9bc1",
                "x": 0.3274888529360873,
                "y": 0.14899627428695697,
                "scale": 2.719322778666097,
                "normalizedScale": 0.8448381146180977,
                "zIndex": 29,
                "xCenter": 0.482828663390817,
                "yCenter": 0.22692836823848064
            },
            {
                "id": 5,
                "src": "BuildOutfit/jeans.png",
                "type": "bottom",
                "canvasId": "27022562-67c7-4d8a-a0b0-926be23748d1",
                "x": 0.33618313131980526,
                "y": 0.31859807194370277,
                "scale": 1.6005647243081693,
                "normalizedScale": 0.49726289915807037,
                "zIndex": 28,
                "xCenter": 0.4915229649219698,
                "yCenter": 0.46900301424388635
            },
            {
                "id": 6,
                "src": "BuildOutfit/boots.png",
                "type": "shoes",
                "canvasId": "18a2f506-0034-40f6-a508-c9f8de4b1cd6",
                "x": 0.3535721417769645,
                "y": 0.597569475194066,
                "scale": 1.3113784692758368,
                "normalizedScale": 0.4074185936196337,
                "zIndex": 24,
                "xCenter": 0.5089119476022073,
                "yCenter": 0.6825289576697323
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
                    aspect-[9/16]
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
