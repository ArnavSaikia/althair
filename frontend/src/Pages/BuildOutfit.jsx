import { useState, useRef, useEffect} from "react"
import DraggableItem from "@/Components/DraggableItem"
import Navbar from "../Components/Navbar"
import Footer from "@/Components/Footer"
import SaveOutfitModal from "@/Components/SaveOutfitModal"
import { useNavigate } from "react-router-dom"

const wardrobeCategories = [
    { key: "Upperwear", label: "Upperwear" },
    { key: "Bottomwear", label: "Bottomwear" },
    { key: "Footwear", label: "Footwear" },
    { key: "Accessories", label: "Accessories" }
];


function BuildOutfit() {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    const [isWardrobeOpen, setIsWardrobeOpen] = useState(false)
    const [canvasItems, setCanvasItems] = useState([])  //the x and y here are normalized w.r.t to the canvas' width nd height respectively
    const [selectedId, setSelectedId] = useState(null)
    const [referenceImageFile, setReferenceImageFile] = useState(null);
    const [referenceImagePreview, setReferenceImagePreview] = useState(null);
    const fileInputRef = useRef(null)   //for reference outfit image upload

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`${API_URL}/users/profile`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if(!response.ok) navigate('/login');
        }
        fetchUser();
    }, []);

    const [wardrobeItems, setWardrobeItems] = useState([]);
    useEffect(() => {
        const fetchWardrobe = async () => {
            const response = await fetch(`${API_URL}/wardrobe/`, {
                method: "GET",
                credentials: "include",
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) setWardrobeItems(data);
        };

        fetchWardrobe();
    }, []);


    //for propagating x and y values of each item back to main page component
    const canvasRef = useRef(null);
    const handleDragEnd = (id , xRaw , yRaw, scaleRef) => {
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const itemRect = scaleRef.current.getBoundingClientRect();
        const xNormalized = xRaw / canvasRect.width;
        const yNormalized = yRaw / canvasRect.height;
        
        const centerX =
            itemRect.left + itemRect.width / 2 - canvasRect.left

        const centerY =
            itemRect.top + itemRect.height / 2 - canvasRect.top

        const normalizedXCenter = centerX / canvasRect.width
        const normalizedYCenter = centerY / canvasRect.height
        
        setCanvasItems(prev =>
            prev.map(item =>
                item.canvasId === id
                    ? { ...item, x: xNormalized, y: yNormalized, xCenter: normalizedXCenter, yCenter: normalizedYCenter}
                    : item
            )
        )
    }

    //for propagating width values (for scaling) of each item back to main page component
    const handleScaleEnd = (id, width) => {
        if (!canvasRef.current) return

        const canvasWidth = canvasRef.current.getBoundingClientRect().width
        const normalizedScale = width / canvasWidth

        setCanvasItems(prev =>
            prev.map(item =>
                item.canvasId === id
                    ? { ...item, normalizedScale }
                    : item
            )
        )

        console.log(canvasItems);
    }

    //for wardrobe grab pill animations
    const [dragOffset, setDragOffset] = useState(0)
    const startYRef = useRef(null)
    const CLOSE_THRESHOLD = 250
    const sheetRef = useRef(null)
    const closeSheet = () => {
        if (!sheetRef.current) {
            setIsWardrobeOpen(false)
            return
        }

        const sheetHeight = sheetRef.current.offsetHeight

        setDragOffset(sheetHeight)

        setTimeout(() => {
            setIsWardrobeOpen(false)
            setDragOffset(0)
            startYRef.current = null
        }, 300)
    }

    //for wardrobe sheet styling
    const [activeWardrobeId, setActiveWardrobeId] = useState(null);

    //for save modal
    const [isSaveOpen, setIsSaveOpen] = useState(false);


    const addToCanvas = (item) => {
        const canvasWidth =
            canvasRef.current.getBoundingClientRect().width;
        const canvasHeight =
            canvasRef.current.getBoundingClientRect().height;

        const DEFAULT_WIDTH = 128;

        setCanvasItems(prev => [
            ...prev,
            {
                ...item,
                clothingId: item._id,
                src: item.imageUrl,
                type: item.category,
                canvasId: crypto.randomUUID(),
                x: 0,
                y: 0,
                scale: 1,
                normalizedScale: 128/canvasRef.current.getBoundingClientRect().width,
                // because default image size is w-32 in the code which is equal to 128 pixels
                zIndex: canvasItems.length,
                xCenter: (DEFAULT_WIDTH / 2) / canvasWidth,
                yCenter: (DEFAULT_WIDTH / 2) / canvasHeight,
            }
        ])
        setIsWardrobeOpen(false)
    }

    const handleDelete = (canvasId) => {
        setCanvasItems(prev =>
            prev.filter(item => item.canvasId !== canvasId)
        )
    }

    const cleanCanvasItems = (canvasItems) => { //cleans the canvasItems array for abiding by the backend api so it can be POSTed
        return canvasItems.map(item => ({
            clothingId: item.clothingId,
            src: item.src,
            type: item.type,

            canvasId: item.canvasId,

            x: item.x,
            y: item.y,

            scale: item.scale,
            normalizedScale: item.normalizedScale,

            zIndex: item.zIndex,

            xCenter: item.xCenter ?? null,
            yCenter: item.yCenter ?? null,
        }));
    };



    return (
        <div className="min-h-screen flex flex-col">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    setReferenceImageFile(file);
                    setReferenceImagePreview(URL.createObjectURL(file));
                }}
            />
            {/* hidden element only for image upload */}


            <Navbar />

            {/* Editor */}
            <div className="flex-1 flex flex-col lg:flex-row">
                
                {/* Canvas */}
                <div className="
                    flex-1
                    lg:flex-none
                    lg:h-[80vh]
                    lg:aspect-[9/16]
                    lg:m-10
                    lg:mx-40
                    lg:rounded-2xl
                    lg:shadow-[0_10px_30px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.06)]
                    relative
                    overflow-hidden
                    bg-[#f5f4f1]
                    before:pointer-events-none
                    before:absolute
                    before:inset-0
                    before:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.04),transparent_60%)]
                    after:pointer-events-none
                    after:absolute
                    after:inset-0
                    after:bg-[url('/noise.png')]
                    after:opacity-[0.03]
                "
                ref={canvasRef}

                onClick={() => setSelectedId(null)}
                >
                    {canvasItems.map(item => (
                        <DraggableItem
                            key={item.canvasId}
                            item={item}
                            isSelected={item.canvasId === selectedId}

                            onSelect={(id) => {
                                setSelectedId(id)
                                setCanvasItems(prev => {
                                    const maxZ = Math.max(0, ...prev.map(i => i.zIndex ?? 0))
                                    return prev.map(it =>
                                        it.canvasId === id
                                            ? { ...it, zIndex: maxZ + 1 }
                                            : it
                                    )
                                })
                            }}

                            onScale={(id, delta) => {
                                setCanvasItems(prev =>
                                    prev.map(it =>
                                        it.canvasId === id
                                            ? {
                                                ...it,
                                                scale: Math.max(0.4, Math.min(3, it.scale + delta))
                                            }
                                            : it
                                    )
                                )
                            }}

                            onDelete={handleDelete}

                            onDragEnd={handleDragEnd}

                            onScaleEnd={handleScaleEnd}
                        />
                    ))}

                </div>

                <div className="
                    hidden
                    lg:flex
                    lg:flex-col
                    lg:flex-1
                    lg:border-l
                    lg:border-black/10
                    lg:px-8
                    lg:overflow-y-auto
                    lg:max-h-[90vh]
                    hide-scroll
                ">
                    <div className="
                        sticky
                        top-0
                        z-10
                        bg-white
                        flex
                        gap-3
                        py-5
                    ">
                        {/* Upload image */}
                        <button
                            onClick={() => {
                                    fileInputRef.current.click();
                                }
                            }
                            className="
                                flex-1
                                px-6
                                py-3.5
                                text-xs
                                font-medium
                                tracking-wider
                                whitespace-nowrap
                                text-neutral-800
                                border
                                border-neutral-300
                                rounded-full
                                hover:border-neutral-500
                                transition
                                cursor-pointer
                            "
                        >
                            Attach Reference
                        </button>

                        {/* Save */}
                        <button
                            className={`
                                cursor-pointer
                                flex-1
                                px-6
                                py-3.5
                                text-xs
                                font-medium
                                tracking-wider
                                whitespace-nowrap
                                rounded-full
                                transition
                                ${canvasItems.length === 0 ? "bg-neutral-300 text-neutral-500 cursor-not-allowed" : "bg-neutral-800 text-white hover:bg-neutral-800"}
                            `}
                            onClick={() => canvasItems.length != 0 ? setIsSaveOpen(true) : null}
                        >
                            Save
                        </button>
                    </div>

                    {wardrobeCategories.map(category => {
                        const items = wardrobeItems.filter(
                            item => item.category === category.key
                        )

                        if (items.length === 0) return null

                        return (
                            <div key={category.key} className="mb-10">
                                <p className="mb-4 text-2xl font-['Cormorant_Garamond'] text-neutral-600">
                                    {category.label}
                                </p>

                                <div className="grid grid-cols-4 gap-4">
                                    {items.map(item => (
                                        <button
                                            key={item._id}
                                            onClick={() => addToCanvas(item)}
                                            className="
                                                group
                                                aspect-[3/4]
                                                cursor-pointer
                                            "
                                        >
                                            <img
                                                src={item.imageUrl}
                                                className="w-full h-full object-contain transition-transform duration-200 ease-out group-hover:scale-[1.06]"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Toolbar */}
                <div className={`
                    lg:hidden
                    w-full
                    bg-white/80
                    backdrop-blur-md
                    border-t
                    border-black/5
                    px-4
                    py-3
                    shadow-[0_-4px_12px_rgba(0,0,0,0.04)]
                    transition-transform duration-300 ease-out delay-50
                    ${isWardrobeOpen ? "translate-y-full" : "translate-y-0"}
                `}>
                    <div className="flex gap-3">
                        {/* Upload image */}
                        <button
                            onClick={() => {
                                    fileInputRef.current.click();

                                }
                            }
                            className="
                                flex-1
                                px-6
                                py-3.5
                                text-xs
                                font-medium
                                tracking-wider
                                whitespace-nowrap
                                text-neutral-800
                                border
                                border-neutral-300
                                rounded-full
                                hover:border-neutral-500
                                transition
                            "
                        >
                            Attach Reference
                        </button>

                        {/* Wardrobe */}
                        <button
                            onClick={() => setIsWardrobeOpen(true)}
                            className="
                                flex-1
                                px-6
                                py-3.5
                                text-xs
                                font-medium
                                tracking-wider
                                whitespace-nowrap
                                text-neutral-800
                                border
                                border-neutral-300
                                rounded-full
                                hover:border-neutral-500
                                transition
                            "
                        >
                            Wardrobe
                        </button>

                        {/* Save */}
                        <button
                            className={`
                                flex-1
                                px-6
                                py-3.5
                                text-xs
                                font-medium
                                tracking-wider
                                whitespace-nowrap
                                rounded-full
                                transition
                                ${canvasItems.length === 0 ? "bg-neutral-300 text-neutral-500 cursor-not-allowed" : "bg-neutral-800 text-white hover:bg-neutral-800"}
                            `}
                            onClick={() => canvasItems.length!=0 ? setIsSaveOpen(true) : null}
                        >
                            Save
                        </button>
                    </div>
                </div>

            </div>

            {/* Wardrobe Bottom Sheet */}
            <div
                className={`
                    lg:hidden
                    fixed inset-0 z-50 flex items-end
                    transition-opacity duration-300
                    ${isWardrobeOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                `}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/40"
                    onClick={closeSheet}
                />

                {/* Sheet */}
                <div
                    ref={sheetRef}
                    className={`
                        relative w-full bg-white rounded-t-2xl p-4
                        max-h-[70%] overflow-y-auto
                        transition-transform duration-300 ease-out
                        ${isWardrobeOpen ? "translate-y-0" : "translate-y-full"}
                    `}

                    style={{
                        transform: isWardrobeOpen
                            ? `translateY(${dragOffset}px)`
                            : "translateY(100%)",
                        transition: dragOffset === 0 ? "transform 300ms ease-out" : "none"
                    }}
                >
                    {/* Grab handle */}
                    <div 
                        className="w-full flex justify-center mb-3 sticky top-0 z-10"
                        style={{ touchAction: "none" }}

                        onPointerDown={(e) => {
                            startYRef.current = e.clientY
                            e.currentTarget.setPointerCapture(e.pointerId)
                        }}
                        onPointerMove={(e) => {
                            if (startYRef.current === null) return

                            const delta = e.clientY - startYRef.current
                            if (delta > 0) {
                                setDragOffset(delta)
                            }
                        }}
                        onPointerUp={() => {
                            if (!sheetRef.current) return

                            const sheetHeight = sheetRef.current.offsetHeight
                            const closeThreshold = sheetHeight * 0.55

                            if (dragOffset > closeThreshold) {
                                closeSheet();
                            } else {
                                setDragOffset(0)
                                startYRef.current = null
                            }
                        }}
                        onPointerCancel={() => {
                            setDragOffset(0)
                            startYRef.current = null
                        }}
                    >
                        <div
                            className="w-20 h-1.5 rounded-full bg-neutral-300 cursor-grab active:cursor-grabbing"   
                        />
                    </div>

                    {
                        wardrobeItems.length===0 ? (
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

                                <p className="text-sm max-w-sm mx-2">
                                    Start adding garments or explore common pieces from{" "}
                                    <span
                                        onClick={() => {
                                            closeSheet();
                                            navigate('/curated');
                                        }}
                                        className="underline cursor-pointer hover:text-black transition"
                                    >
                                        Collections
                                    </span>.
                                </p>
                            </div>
                        ) : ""
                    }


                    {wardrobeCategories.map(category => {
                        const items = wardrobeItems.filter(
                            item => item.category === category.key
                        )

                        if (items.length === 0) return null

                        return (
                            <div key={category.key} className="mb-10">
                                {/* Category label */}
                                <p className="
                                    mb-4
                                    tracking-[0.1em]
                                    text-xl
                                    text-neutral-600
                                    font-['Cormorant_Garamond']
                                ">
                                    {category.label}
                                </p>

                                {/* Items */}
                                <div className="grid grid-cols-3 gap-4">
                                    {items.map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                    addToCanvas(item);
                                                    setActiveWardrobeId(item.id);
                                                }
                                            }
                                            className="
                                                group
                                                relative
                                                aspect-[3/4]
                                                overflow-hidden
                                                transition-transform
                                            "
                                        >
                                            <img
                                                src={item.imageUrl}
                                                alt=""
                                                className="
                                                    w-full h-full object-contain
                                                    transition-transform duration-300
                                                    group-hover:scale-[1.03]
                                                "
                                                style={{
                                                    opacity: activeWardrobeId === item.id ? 1 : 0.9,
                                                    filter: activeWardrobeId === item.id
                                                        ? "drop-shadow(0 0 0.5px rgba(0,0,0,0.8)) drop-shadow(0 8px 20px rgba(0,0,0,0.12))"
                                                        : "none",
                                                    transform: activeWardrobeId === item.id ? "scale(1.02)" : "scale(1)",
                                                    transition: "all 150ms ease"
                                                }}
                                            />

                                            <div className="
                                                pointer-events-none
                                                absolute inset-0
                                                bg-gradient-to-t
                                                from-black/5
                                                to-transparent
                                                opacity-0
                                                group-hover:opacity-100
                                                transition
                                            " />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>

            <SaveOutfitModal
                isOpen={isSaveOpen}
                onClose={() => setIsSaveOpen(false)}
                referenceImagePreview={referenceImagePreview}
                referenceImage={referenceImageFile}
                onSave={async (name, description) => {
                    const formData = new FormData();
                    formData.append("name", name.trim());
                    if (description?.trim()) formData.append("description", description.trim());
                    if (referenceImageFile) formData.append("referenceImage", referenceImageFile);

                    const cleanedCanvasItems = cleanCanvasItems(canvasItems);
                    formData.append(
                        "canvasItems",
                        JSON.stringify(cleanedCanvasItems)
                    );

                    const response = await fetch(`${API_URL}/outfits/`, {
                        method: "POST",
                        credentials: "include",
                        body: formData,
                    });
                    const data = await response.json();
                    if(response.ok) console.log("Successfully uploaded");
                    else throw new Error(data.message || "Failed to save outfit");
                }}
            />

            <div className="hidden xl:block">
                <Footer/>
            </div>
        </div>
    )
}

export default BuildOutfit;
