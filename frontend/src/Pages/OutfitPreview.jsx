import Navbar from "@/Components/Navbar"
import Footer from "@/Components/Footer";
import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import CanvasPreview from "@/Components/CanvasPreview"
import {TitleOverlay, DateOverlay, DateOverlay2, DescriptionOverlay} from "@/Components/EditorialOverlay";
import GarmentGrid from "@/Components/GarmentGrid";

function OutfitPreview() {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const { id } = useParams();
    const [outfit , setOutfit] = useState({
        canvasItems: []
    });

    async function fetchOutfit(){
        const response = await fetch(`${API_URL}/outfits/${id}`, {
            "method": "GET",
            "credentials": "include",
        });
        const data = await response.json();
        if(response.ok){
            setOutfit(data.outfit);
        }
    }

    useEffect(() => {
        fetchOutfit();
    }, []);

    return (
        <>
            <Navbar />

            <div className="
                min-h-screen
                md:min-h-0
                md:flex
                md:flex-cols
                md:justify-around
                lg:items-start
                lg:justify-center
                md:py-10
                lg:gap-35
            ">
                {/* Swipe container */}
                <div className="
                    relative
                    max-w-md
                    mx-auto
                    md:mx-0
                    md:h-[45vh]
                    md:max-w-none
                    lg:mx-0
                    lg:h-[80vh]
                    md:rounded-2xl
                    md:shadow-[0_10px_30px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.06)]
                    aspect-[9/16]
                    overflow-x-auto
                    flex
                    snap-x
                    snap-mandatory
                ">
                    {/* Slide 1 – reference image */}
                    {outfit.referenceImage && (
                        <div className="min-w-full h-full snap-center relative">
                            <img
                                src={outfit.referenceImage}
                                alt=""
                                className="w-full h-full object-cover"
                            />

                            {/* <TitleOverlay outfit={outfit} /> */}
                            {/* swap around with DateOverlay see what fits best*/}
                            <DateOverlay2 outfit={outfit} />
                        </div>
                    )}

                    {/* Slide 2 – reconstructed canvas */}
                    <div className="min-w-full h-full snap-center relative 
                        bg-[radial-gradient(ellipse_at_22%_16%,#fdfbf8_0%,#f3efe9_35%,#ebe6df_60%,#e2ddd6_75%),radial-gradient(ellipse_at_85%_85%,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0)_55%)]
                    ">
                        <CanvasPreview items={outfit.canvasItems} />

                        {/* <DateOverlay2 outfit={outfit} /> */}
                        {/* <DescriptionOverlay outfit={outfit} /> */}
                    </div>
                </div>

                {/* Metadata */}
                <div className="md:h-fit">
                    <section className="
                        max-w-md
                        mx-auto
                        px-6
                        pt-5
                        pb-10
                    ">
                        <h2 className="
                            font-['Cormorant_Garamond']
                            text-[28px]
                            leading-tight
                            text-[#2c2b28]
                            font-light
                        ">
                            {outfit.name}
                        </h2>

                        <p className="
                            mt-2
                            text-[11px]
                            tracking-wide
                            text-[#6f6c66]
                        ">
                            {new Date(outfit.createdAt).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </p>

                        {outfit.description && (
                            <p className="
                                mt-5
                                font-['Cormorant_Garamond']
                                text-[16px]
                                leading-[1.7]
                                text-[#5a5853]
                                max-w-[42ch]
                            ">
                                {outfit.description}
                            </p>
                        )}
                    </section>

                    <GarmentGrid items={outfit.canvasItems}/>

                    <section className="
                        max-w-md
                        mx-auto
                        px-6
                        pb-10
                    ">
                        <h2 className="
                            font-['Cormorant_Garamond']
                            text-[22px]
                            leading-tight
                            text-[#2c2b28]
                            font-light
                            mb-5
                        ">
                            Reflection
                        </h2>

                        <p className="
                            font-['Cormorant_Garamond']
                            text-[16px]
                            leading-[1.7]
                            text-[#5a5853]
                            max-w-[42ch]
                        ">
                            {outfit.editorialNote}
                        </p>
                    </section>
                </div>

            </div>

            <Footer />
        </>
    )
}

export default OutfitPreview
