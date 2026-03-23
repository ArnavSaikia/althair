import Navbar from "@/Components/Navbar"
import Footer from "@/Components/Footer";
import CanvasPreview from "@/Components/CanvasPreview";
import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/Components/ui/skeleton"
import { useNavigate } from "react-router-dom";

export default function ClothingPreview() {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const {id} = useParams();
    const navigate = useNavigate();

    async function fetchOutfit(id){
        const response = await fetch(`${API_URL}/wardrobe/${id}`, {
            "method": "GET",
            "credentials": "include"
        });
        const data = await response.json();
        if(response.ok) {
            setItem(data);
            console.log(data)
            setIsLoading(false);
        }
        if(response.status == 404){
            // navigate to 404 page
        }
    }

    async function addToWardrobe(){
        const response = await fetch(`${API_URL}/wardrobe/add-curated/${id}` , {
            "method": "POST",
            "credentials": "include"
        });
        const data  = await response.json();
        if(response.ok){
            navigate('/wardrobe');
        }
    }

    async function removeFromWardrobe(){
        const response = await fetch(`${API_URL}/wardrobe/${id}`, {
            "method": "DELETE",
            "credentials": "include"
        });
        const data = await response.json();
        if(response.ok) navigate('/wardrobe');
    }

    useEffect(() => {
        fetchOutfit(id)
    }, [id]);

    const [item , setItem] = useState({});
    const [isLoading , setIsLoading ] = useState(true);

    const [inWardrobe, setInWardrobe] = useState(false);

    async function loadWardrobe() {
        const response = await fetch(`${API_URL}/wardrobe`, {
            method: "GET",
            credentials: "include"
        });

        const data = await response.json();

        if (response.ok) {
            const exists = data.some(item => item._id === id);
            setInWardrobe(exists);
        }
    }

    useEffect(() => {
        loadWardrobe()
    }, []);

    return (
        <main className="w-full">
            <Navbar />

            {/* Image / Gallery Section */}

            <div className="lg:max-w-6xl lg:mx-auto lg:px-8 lg:py-12 lg:grid lg:grid-cols-2 lg:gap-16">
            
                <section
                    className="
                    w-full
                    min-h-[60vh]
                    flex
                    items-center
                    justify-center
                    bg-[radial-gradient(ellipse_at_22%_16%,#fdfbf8_0%,#f3efe9_35%,#ebe6df_60%,#e2ddd6_75%),radial-gradient(ellipse_at_85%_85%,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0)_55%)]

                    lg:min-h-[70vh]
                    lg:sticky
                    lg:top-24
                    lg:rounded-[8px]
                "
                >
                    {isLoading ? (
                        <Skeleton className="h-[320px] w-[220px] rounded-xl" />
                    ) : (
                        <img
                            src={item.imageUrl}
                            alt=""
                            className="max-h-[420px] w-auto object-contain"
                        />
                    )}

                </section>

                {/* Metadata */}
                <div className="lg:max-w-none lg:px-0">
                    <section
                        className="
                            max-w-md
                            mx-auto
                            px-6
                            pt-5
                            pb-10
                        "
                    >
                        {isLoading ? (
                            <Skeleton className="h-8 w-[220px]" />
                        ) : (
                            <h2
                                className="
                                font-['Cormorant_Garamond']
                                text-[28px]
                                lg:text-[34px]
                                leading-tight
                                text-[#2c2b28]
                                font-light
                            "
                            >
                                {item.name}
                            </h2>
                        )}


                        {isLoading ? (
                            <Skeleton className="mt-2 h-3 w-[160px]" />
                        ) : (
                            <p
                                className="
                                mt-2
                                text-[11px]
                                tracking-wide
                                text-[#6f6c66]
                            "
                            >
                                {item.category ? item.category : "Unknown Category"}
                                {item.color ? ` · ${item.color}` : " · Unknown color"}
                            </p>
                        )}


                        {isLoading ? (
                            <div className="mt-5 space-y-2">
                                <Skeleton className="h-4 w-[240px]" />
                                <Skeleton className="h-4 w-[200px]" />
                                <Skeleton className="h-4 w-[180px]" />
                            </div>
                        ) : (
                            (
                                <p
                                    className="
                                    mt-5
                                    font-['Cormorant_Garamond']
                                    text-[16px] lg:text-[17px]
                                    leading-[1.7]
                                    text-[#5a5853]
                                    max-w-[42ch]
                                "
                                >
                                    {item.additionalNotes ? item.additionalNotes : "Piece Not Described"}
                                </p>
                            )
                        )}

                    </section>

                    {/* Appears In */}
                    {isLoading ? (
                        <section className="max-w-md mx-auto px-6 lg:max-w-none lg:mx-0 lg:px-0 pb-10">
                            <Skeleton className="h-6 w-[120px] mb-5" />
                            <div className="flex gap-4">
                                {[...Array(3)].map((_, i) => (
                                    <Skeleton
                                        key={i}
                                        className="w-[96px] h-[128px] rounded-lg"
                                    />
                                ))}
                            </div>
                        </section>
                        ) : (
                            item.presentIn?.length > 0 && (
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
                                            no-scrollbar
                                            scrollbar-hide
                                        "
                                    >
                                        {item.presentIn.map((outfit) => (
                                            <button
                                                key={outfit.id}
                                                className="
                                                    flex-shrink-0
                                                    w-[96px]
                                                    h-[128px]
                                                    overflow-hidden
                                                    cursor-pointer
                                                "
                                                onClick={() => navigate(`/outfits/${outfit._id}`)}
                                            >
                                                {outfit.referenceImage ? (<img
                                                    src={outfit.referenceImage}
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
                                                    />) :
                                                    (
                                                        <CanvasPreview items={outfit.canvasItems}/>
                                                    )
                                            
                                                }
                                            </button>
                                        ))}
                                    </div>
                                </section>
                        )
                    )}


                    {/* Reflection */}
                    <section
                        className="
                            max-w-md
                            mx-auto
                            px-6
                            pb-10
                        "
                    >
                        {isLoading ? (
                            <div className="space-y-3 max-w-[42ch]">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-[90%]" />
                                <Skeleton className="h-4 w-[75%]" />
                            </div>
                        ) : (
                            (
                                <>
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
                                            text-[16px] lg:text-[17px]
                                            leading-[1.7]
                                            text-[#5a5853]
                                            max-w-[42ch]
                                        "
                                    >
                                        {item.editorialNote ? item.editorialNote : "Recommendations not available at the moment"}
                                    </p>
                                </>
                            )
                        )}
                    </section>

                    {item.isCurated && !inWardrobe && (
                        <section className="max-w-md mx-auto px-6 pb-12">
                            <button
                                onClick={addToWardrobe}
                                className="
                                    cursor-pointer
                                    w-full
                                    py-3
                                    rounded-full
                                    border
                                    border-neutral-800
                                    text-[13px]
                                    tracking-wide
                                    font-['Cormorant_Garamond']
                                    text-neutral-900
                                    transition
                                    hover:bg-neutral-900
                                    hover:text-white
                                    active:bg-neutral-900
                                    active:text-white
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                "
                            >
                                Add to wardrobe
                            </button>
                        </section>
                    )}

                    {inWardrobe && (
                        <section className="max-w-md mx-auto px-6 pb-12">
                            <button
                                onClick={removeFromWardrobe}
                                className="
                                    cursor-pointer
                                    w-full
                                    py-3
                                    rounded-full
                                    border
                                    border-neutral-800
                                    text-[13px]
                                    tracking-wide
                                    font-['Cormorant_Garamond']
                                    text-neutral-900
                                    transition
                                    hover:bg-neutral-900
                                    hover:text-white
                                    active:bg-neutral-900
                                    active:text-white
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                "
                            >
                                Remove from wardrobe
                            </button>
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
                        {isLoading ? (
                            <Skeleton className="h-3 w-[220px]" />
                        ) : (
                            <p
                            x className="
                                    text-[11px]
                                    tracking-wide
                                    text-[#8a877f]
                                "
                            >
                                    Added {new Date(item.createdAt).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })} ·
                            </p>
                        )}
                    </section>
                </div>
            </div>
            <Footer/>
        </main>
    )
}
