import { useState } from "react"
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
// import { useNavigate } from "react-router-dom"

export default function ClothingUpload() {
    // const navigate = useNavigate()

    const [imageUrl, setImageUrl] = useState("")
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [color, setColor] = useState("")
    const [fit, setFit] = useState("")
    const [size, setSize] = useState("")
    const [notes, setNotes] = useState("")
    const [status, setStatus] = useState("idle")
    // idle | loading | success

    const canSave = imageUrl && name && category

    async function handleSave() {
        if (!canSave || status !== "idle") return

        setStatus("loading")

        // fake save delay
        setTimeout(() => {
            setStatus("success")

            setTimeout(() => {
                // later: navigate(`/clothing/${id}`) or `/clothing`
                // navigate("/clothing")
            }, 900)
        }, 1200)
    }

    return (
        <main className="w-full">
            <Navbar/>

            {/* Image Section */}
            <section
                className="
                    w-full
                    min-h-[60vh]
                    flex
                    items-center
                    justify-center
                    bg-[radial-gradient(ellipse_at_22%_16%,#fdfbf8_0%,#f3efe9_35%,#ebe6df_60%,#e2ddd6_75%)]
                "
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt=""
                        className="max-h-[420px] w-auto object-contain"
                    />
                ) : (
                    <button
                        onClick={() =>
                            setImageUrl(
                                "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf"
                            )
                        }
                        className="
                            text-[14px]
                            tracking-wide
                            text-[#6f6c66]
                            hover:text-[#2c2b28]
                            transition
                        "
                    >
                        Add image
                    </button>
                )}
            </section>

            {/* Content */}
            <section className="max-w-md mx-auto px-6 pt-6 pb-16">

                {/* Name */}
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="
                        w-full
                        border-b
                        border-neutral-300
                        pb-2
                        mb-4
                        text-[28px]
                        leading-tight
                        font-light
                        text-[#2c2b28]
                        placeholder-neutral-400
                        focus:outline-none
                        focus:border-neutral-700
                    "
                />

                {/* Category */}
                <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category"
                    className="
                        w-full
                        border-b
                        border-neutral-200
                        pb-2
                        mb-6
                        text-[11px]
                        tracking-wide
                        text-[#6f6c66]
                        placeholder-neutral-400
                        focus:outline-none
                        focus:border-neutral-500
                    "
                />

                {/* Quiet attributes */}
                <div className="space-y-4 mb-10">
                    <input
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        placeholder="Color"
                        className="
                            w-full
                            border-b
                            border-neutral-200
                            pb-1
                            text-[14px]
                            text-[#3a3936]
                            placeholder-neutral-400
                            focus:outline-none
                        "
                    />

                    <input
                        value={fit}
                        onChange={(e) => setFit(e.target.value)}
                        placeholder="Fit"
                        className="
                            w-full
                            border-b
                            border-neutral-200
                            pb-1
                            text-[14px]
                            text-[#3a3936]
                            placeholder-neutral-400
                            focus:outline-none
                        "
                    />

                    <input
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        placeholder="Size"
                        className="
                            w-full
                            border-b
                            border-neutral-200
                            pb-1
                            text-[14px]
                            text-[#3a3936]
                            placeholder-neutral-400
                            focus:outline-none
                        "
                    />
                </div>

                {/* Notes */}
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    placeholder="Notes on wear, texture, memory"
                    className="
                        w-full
                        border-b
                        border-neutral-300
                        pb-2
                        mb-12
                        font-['Cormorant_Garamond']
                        text-[16px]
                        leading-[1.6]
                        text-[#5a5853]
                        placeholder-neutral-400
                        resize-none
                        focus:outline-none
                        focus:border-neutral-700
                    "
                />

                {/* Save */}
                <button
                    onClick={handleSave}
                    disabled={!canSave}
                    className={`
                        w-full
                        py-3
                        rounded-full
                        text-xs
                        tracking-wider
                        transition
                        ${canSave
                            ? "bg-neutral-800 text-white hover:bg-neutral-900"
                            : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                        }
                    `}
                >
                    Save
                </button>
            </section>

            {/* Overlay state */}
            {status !== "idle" && (
                <div
                    className="
                        fixed
                        inset-0
                        z-[70]
                        flex
                        items-center
                        justify-center
                        bg-white/90
                        backdrop-blur-sm
                    "
                >
                    {status === "loading" && (
                        <span className="
                            text-[22px]
                            tracking-wide
                            text-neutral-700
                            font-['Cormorant_Garamond']
                            font-light
                        ">
                            Saving…
                        </span>
                    )}

                    {status === "success" && (
                        <span className="
                            text-[22px]
                            tracking-wide
                            text-neutral-700
                            font-['Cormorant_Garamond']
                            font-light
                        ">
                            Added to your wardrobe
                        </span>
                    )}
                </div>
            )}

            <Footer/>
        </main>
    )
}
