import { useState } from "react"
import Draggable from "react-draggable"
import Navbar from "../Components/Navbar"
import { Button } from "@/components/ui/button"

const wardrobeItems = [
    { id: 1, src: "/upperwear_landing.jpg", type: "top" },
    { id: 2, src: "/bottomwear_landing.jpg", type: "bottom" },
    { id: 3, src: "/footwear_landing5.jpg", type: "shoes" }
]

function BuildOutfit() {
    const [isWardrobeOpen, setIsWardrobeOpen] = useState(false)
    const [canvasItems, setCanvasItems] = useState([])

    const addToCanvas = (item) => {
        setCanvasItems(prev => [
            ...prev,
            {
                ...item,
                canvasId: crypto.randomUUID(),
                x: 0,
                y: 0
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
                ">
                    {canvasItems.map(item => (
                        <Draggable
                            key={item.canvasId}
                            defaultPosition={{ x: 0, y: 0 }}
                        >
                            <img
                                src={item.src}
                                className="
                                    absolute
                                    w-32
                                    select-none
                                    cursor-grab
                                "
                                draggable={false}
                            />
                        </Draggable>
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

export default BuildOutfit
