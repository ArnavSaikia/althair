import { useState, useRef } from "react"
import DraggableItem from "@/Components/DraggableItem"
import Navbar from "../Components/Navbar"
import SaveOutfitModal from "@/Components/SaveOutfitModal"


const wardrobeItems = [
    { id: 1, src: "BuildOutfit/jacket.png", type: "top" },
    { id: 2, src: "BuildOutfit/jeans.png", type: "bottom" },
    { id: 3, src: "BuildOutfit/boots.png", type: "shoes" },
    { id: 4, src: "BuildOutfit/jacket.png", type: "top" },
    { id: 5, src: "BuildOutfit/jeans.png", type: "bottom" },
    { id: 6, src: "BuildOutfit/boots.png", type: "shoes" },
    { id: 7, src: "BuildOutfit/jacket.png", type: "top" },
    { id: 8, src: "BuildOutfit/jeans.png", type: "bottom" },
    { id: 9, src: "BuildOutfit/boots.png", type: "shoes" },
    { id: 10, src: "BuildOutfit/jacket.png", type: "top" },
    { id: 11, src: "BuildOutfit/jeans.png", type: "bottom" },
    { id: 12, src: "BuildOutfit/boots.png", type: "shoes" }
];

const wardrobeCategories = [
    { key: "top", label: "Topwear" },
    { key: "bottom", label: "Bottomwear" },
    { key: "shoes", label: "Footwear" },
    { key: "accessories", label: "Accessories" }
];


function BuildOutfit() {
    const [isWardrobeOpen, setIsWardrobeOpen] = useState(false)
    const [canvasItems, setCanvasItems] = useState([])
    const [selectedId, setSelectedId] = useState(null)
    const [referenceImage, setReferenceImage] = useState(null)
    const fileInputRef = useRef(null)   //for reference outfit image upload

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
        setCanvasItems(prev => [
            ...prev,
            {
                ...item,
                canvasId: crypto.randomUUID(),
                x: 0,
                y: 0,
                scale: 1,
                zIndex: canvasItems.length
            }
        ])
        setIsWardrobeOpen(false)
    }

    const handleDelete = (canvasId) => {
        setCanvasItems(prev =>
            prev.filter(item => item.canvasId !== canvasId)
        )
    }


    return (
        <div className="min-h-screen flex flex-col">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files[0]
                    if (!file) return

                    const url = URL.createObjectURL(file)
                    setReferenceImage(url)
                }}
            />
            {/* hidden element only for image upload */}


            <Navbar />

            {/* Editor */}
            <div className="flex-1 flex flex-col">
                {/* Canvas */}
                <div className="
                    flex-1
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
                        />
                    ))}

                </div>

                {/* Toolbar */}
                <div className={`
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
                            onClick={() => fileInputRef.current.click()}
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
                        relative w-full bg-white/90 rounded-t-2xl p-4
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

                    {wardrobeCategories.map(category => {
                        const items = wardrobeItems.filter(
                            item => item.type === category.key
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
                                                src={item.src}
                                                alt=""
                                                className="
                                                    w-full h-full object-cover
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
                referenceImage={referenceImage}
                onSave={(data) => {
                    console.log("SAVE PAYLOAD", {
                        ...data,
                        canvasItems,
                        referenceImage
                    })

                    setIsSaveOpen(false)
                }}
            />

        </div>
    )
}

export default BuildOutfit;
