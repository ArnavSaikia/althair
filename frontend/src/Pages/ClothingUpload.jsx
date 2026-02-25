import { useState, useRef } from "react"
import Navbar from "@/Components/Navbar"
import Footer from "@/Components/Footer";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom"

export default function ClothingUpload() {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    // const navigate = useNavigate()
    const CATEGORIES = [
        "Upperwear",
        "Bottomwear",
        "Footwear",
        "Accessories",
    ]

    const fileInputRef = useRef(null)

    const [imageFile, setImageFile] = useState(null)
    const [imagePreviewUrl, setImagePreviewUrl] = useState("")
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [color, setColor] = useState("")
    const [fit, setFit] = useState("")
    const [size, setSize] = useState("")
    const [notes, setNotes] = useState("")
    const [status, setStatus] = useState("idle")
    const [statusMessage, setStatusMessage] = useState("");
    // idle | loading | success

    const canSave = imageFile && name && category

    function handleImageSelect(e) {
        const file = e.target.files?.[0]
        if (!file) return

        setImageFile(file)
        setImagePreviewUrl(URL.createObjectURL(file))
    }

    // async function handleSave() {
    //     if (!canSave || status !== "idle") return

    //     setStatus("loading")

    //     setTimeout(() => {
    //         setStatus("success")

    //         setTimeout(() => {
    //             // navigate("/clothing")
    //         }, 900)
    //     }, 1200)
    // }

    async function handleSave({name,category,color,fit,size,notes,imageFile}) {
        if(!canSave || status !== "idle") return;
        setStatus('loading');

        const formData = new FormData();

        if (name?.trim()) formData.append("name", name.trim());
        if (category) formData.append("category", category);
        if (color?.trim()) formData.append("color", color.trim());
        if (fit) formData.append("fit", fit);
        if (size) formData.append("size", size);
        if (notes?.trim()) formData.append("additionalNotes", notes.trim());
        if (imageFile) formData.append("image", imageFile);

        const response = await fetch(`${API_URL}/wardrobe/`, {
            "method": "POST",
            "credentials": "include",
            "body": formData
        });

        const data  = await response.json();

        if(response.ok){
            console.log("success");
            setStatus("success");
            setStatusMessage("");
            setTimeout(() => {
                navigate('/wardrobe');
            }, 900);
        }

        if (response.status >= 500) {
            console.log(data.message);
            setStatus("idle");
            setStatusMessage("An internal error occurred");
        } else if (response.status >= 400) {
            setStatus("idle");
            setStatusMessage(data.message);
        }
    }

    const fieldBase = `
        font-['Cormorant_Garamond']
        font-light
        tracking-[0.02em]
        text-[#3b3a36]/80
        placeholder-[#3b3a36]/70
        bg-transparent
        focus:outline-none
        transition-colors
    `

    return (
        <main className="w-full">
            <Navbar />

            <div className="
                lg:max-w-[1100px]
                xl:max-w-[1200px]
                mx-auto

                lg:grid
                lg:grid-cols-2
                lg:gap-16

                lg:px-8
                lg:py-10
            ">
            {/* Image Section */}
            <section
                className="
                w-full
                min-h-[60vh]

                flex
                flex-col
                items-center
                justify-center

                bg-[radial-gradient(ellipse_at_22%_16%,#fdfbf8_0%,#f3efe9_35%,#ebe6df_60%,#e2ddd6_75%)]

                lg:min-h-[520px]
                lg:rounded-[8px]
            "
            >
                {imagePreviewUrl ? (
                    <img
                        src={imagePreviewUrl}
                        alt=""
                        className="max-h-[420px] w-auto object-contain cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    />
                ) : (
                    <>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="
                                font-['Cormorant_Garamond']
                                text-[20px]
                                tracking-wide
                                text-[#3b3a36]/70
                                hover:text-[#3b3a36]
                                transition
                                cursor-pointer
                            "
                        >
                            Add image
                        </button>

                            <p
                                className="
                                    mt-3
                                    font-['Cormorant_Garamond']
                                    text-[14px]
                                    leading-snug
                                    text-[#8a877f]
                                    text-center
                                    px-6
                                "
                            >
                                Images work best when the garment fills the frame, with little space around it.
                            </p>

                </>
                    
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageSelect}
                />
            </section>

            {/* Content */}
                <section className="
                    max-w-md
                    mx-auto

                    px-6
                    pt-6
                    pb-10

                    lg:px-0
                    lg:pt-0
                    lg:pb-0
                    lg:max-w-none
                    lg:flex
                    lg:flex-col
                    lg:justify-center
                ">

                {/* Name */}
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className={`
                        w-full
                        border-b
                        border-neutral-300/60
                        pb-2
                        mb-4
                        text-[25px]
                        leading-tight
                        ${fieldBase}
                        focus:border-[#6a6761]/70
                    `}
                />

                {/* Category */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`
                        w-full
                        border-b
                        border-neutral-300/50
                        pb-2
                        mb-6
                        text-[16px]
                        
                        ${fieldBase}
                        appearance-none
                        cursor-pointer
                        focus:border-[#6a6761]/60
                    `}
                >
                    <option value="" disabled hidden>
                        Category
                    </option>

                    {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>

                {/* Quiet attributes */}
                <div className="space-y-4 mb-10">
                    <input
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        placeholder="Color"
                        className={`
                            w-full
                            border-b
                            border-neutral-300/40
                            pb-1
                            text-[16px]
                            ${fieldBase}
                        `}
                    />

                    <input
                        value={fit}
                        onChange={(e) => setFit(e.target.value)}
                        placeholder="Fit"
                        className={`
                            w-full
                            border-b
                            border-neutral-300/40
                            pb-1
                            text-[16px]
                            ${fieldBase}
                        `}
                    />

                    <input
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        placeholder="Size"
                        className={`
                            w-full
                            border-b
                            border-neutral-300/40
                            pb-1
                            text-[16px]
                            ${fieldBase}
                        `}
                    />
                </div>

                {/* Notes */}
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    placeholder="Notes on wear, texture, memory"
                    className={`
                        w-full
                        border-b
                        border-neutral-300/50
                        pb-2
                        mb-12
                        text-[16px]
                        leading-[1.75]
                        resize-none
                        ${fieldBase}
                        focus:border-[#6a6761]/60
                    `}
                />

                {statusMessage && (
                    <span
                        className="
                        block
                        mb-4
                        max-w-md
                        text-center
                        font-['Cormorant_Garamond']
                        text-[14px]
                        tracking-wide
                        text-[#8a877f]
                        leading-relaxed
                    "
                    >{statusMessage}</span>
                )}

                {/* Save */}
                <button
                    onClick={() => handleSave({name,category,color,fit,size,notes,imageFile})}
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
                    Add to Wardrobe
                </button>
            </section>
            </div>

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
                    <span
                        className="
                            text-[22px]
                            tracking-wide
                            text-[#3b3a36]/80
                            font-['Cormorant_Garamond']
                            font-light
                        "
                    >
                        {status === "loading" ? "Saving…" : "Added to your wardrobe"}
                    </span>
                </div>
            )}

            <Footer />
        </main>
    )
}
