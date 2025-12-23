import Navbar from "@/Components/Navbar"
import Footer from "@/Components/Footer"
import CanvasPreview from "@/Components/CanvasPreview"
import {TitleOverlay, DateOverlay, DateOverlay2, DescriptionOverlay} from "@/Components/EditorialOverlay";

function OutfitPreview() {
    // mock backend response
    const outfit = {
        name: "Evening neutrals",
        description: "Loose silhouettes, warm neutrals, winter evening lalalalalalalalalalalalal when i popped off then ur girl gave me just a little bit of lock jaw",
        createdAt: "12 Dec 2025",
        referenceImage: "/hero2.jpg",
        canvasItems: [
            {
                "id": 4,
                "src": "BuildOutfit/jacket.png",
                "type": "top",
                "canvasId": "49d0dc5c-2b24-4d21-98b9-e9f7ca5ac94a",
                "x": 0.33285018772754854,
                "y": 0.16960228379897793,
                "scale": 2.804259766483157,
                "normalizedScale": 0.8712264125786938,
                "zIndex": 34,
                "xCenter": 0.4881900167002261,
                "yCenter": 0.24753436762253844
            },
            {
                "id": 8,
                "src": "BuildOutfit/jeans.png",
                "type": "bottom",
                "canvasId": "e9ecb023-9d45-4ac0-9931-0b733f1971e5",
                "x": 0.3390812364596765,
                "y": 0.397851591633719,
                "scale": 1.7906428693858527,
                "normalizedScale": 0.5563162646247345,
                "zIndex": 33,
                "xCenter": 0.49442104228491923,
                "yCenter": 0.5482564731661236
            },
            {
                "id": 3,
                "src": "BuildOutfit/boots.png",
                "type": "shoes",
                "canvasId": "459d9b86-b939-433d-a180-6ad5e5e4adba",
                "x": 0.34777536669981135,
                "y": 0.7203131371754828,
                "scale": 1.5406721981119091,
                "normalizedScale": 0.4786554725424757,
                "zIndex": 32,
                "xCenter": 0.5031151632660801,
                "yCenter": 0.8052726601630019
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

                        <TitleOverlay outfit={outfit} />
                        <DateOverlay outfit={outfit} />
                    </div>

                    {/* Slide 2 – reconstructed canvas */}
                    <div className="min-w-full h-full snap-center relative 
                        bg-[radial-gradient(ellipse_at_22%_16%,#fdfbf8_0%,#f3efe9_35%,#ebe6df_60%,#e2ddd6_75%),radial-gradient(ellipse_at_85%_85%,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0)_55%)]


                    ">
                        <CanvasPreview items={outfit.canvasItems} />

                        {/* <DateOverlay2 outfit={outfit} /> */}
                        <DescriptionOverlay outfit={outfit} />
                    </div>
                </div>

                {/* rest of page later */}
            </div>

            <Footer />
        </>
    )
}

export default OutfitPreview
