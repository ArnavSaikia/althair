import { useState, useRef } from "react"
import DraggableItem from "@/Components/DraggableItem"
import Navbar from "../Components/Navbar"
import { Button } from "@/components/ui/button"


const wardrobeItems = [
    { id: 1, src: "BuildOutfit/jacket.png", type: "top" },
    { id: 2, src: "BuildOutfit/jeans.png", type: "bottom" },
    { id: 3, src: "BuildOutfit/boots.png", type: "shoes" }
]

function BuildOutfit() {
    const [isWardrobeOpen, setIsWardrobeOpen] = useState(false)
    const [canvasItems, setCanvasItems] = useState([])
    const [selectedId, setSelectedId] = useState(null)

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


    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Editor */}
            <div className="flex-1 flex flex-col">
                {/* Canvas */}
                <div className="
                    flex-1
                    relative
                    bg-neutral-100
                    overflow-hidden
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
                                                scale: Math.max(0.4, Math.min(4, it.scale + delta))
                                            }
                                            : it
                                    )
                                )
                            }}
                        />
                    ))}

                </div>

                {/* Toolbar */}
                <div className="
                    w-full
                    bg-white
                    border-t
                    border-neutral-200
                    px-4
                    py-3
                    flex
                    items-center
                    justify-between
                ">
                    <span className="text-sm text-neutral-600 tracking-wide">
                        Outfit canvas
                    </span>

                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setIsWardrobeOpen(true)}
                        >
                            Wardrobe
                        </Button>

                        <Button>
                            Save
                        </Button>
                    </div>
                </div>
            </div>

            {/* Wardrobe Bottom Sheet */}
            {isWardrobeOpen && (
                <div className="
                    fixed
                    inset-0
                    z-50
                    flex
                    items-end
                ">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setIsWardrobeOpen(false)}
                    />

                    {/* Sheet */}
                    <div className="
                        relative
                        w-full
                        bg-white
                        rounded-t-2xl
                        p-4
                        max-h-[70%]
                        overflow-y-auto
                    ">
                        <span className="
                            block
                            text-sm
                            tracking-wide
                            text-neutral-600
                            mb-4
                        ">
                            Wardrobe
                        </span>

                        <div className="grid grid-cols-3 gap-3">
                            {wardrobeItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => addToCanvas(item)}
                                    className="
                                        aspect-[3/4]
                                        rounded-lg
                                        overflow-hidden
                                        border
                                        hover:border-neutral-900
                                        transition
                                    "
                                >
                                    <img
                                        src={item.src}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BuildOutfit;
