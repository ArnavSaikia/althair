import { useState, useEffect } from "react"

function SaveOutfitModal({ isOpen, onClose, onSave, referenceImage }) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("idle")
    // "idle" | "loading" | "success" | "error"

    async function handleSave() {
        if (name.length === 0 || status === "loading") return

        setStatus("loading")

        try {
            await onSave({ name, description });
            setStatus("success");

            setTimeout(() => {
                onClose()
                // later: navigate("/outfits")
            }, 1300)
        } catch (e) {
            setStatus("error")
        }
    }



    useEffect(() => {
        if (isOpen) {
        setName("")
        setDescription("")
        setStatus("idle")
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
        {/* Backdrop */}
        <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={status === "loading" || status === "success" ? null : onClose}
        />

        {/* Modal */}
        <div className="
            relative
            w-[90%]
            max-w-md
            bg-white
            rounded-2xl
            p-6
            shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        ">
            {/* Title */}
            <h2 className="
            text-sm
            font-medium
            tracking-widest
            uppercase
            text-neutral-700
            mb-6
            ">
            Save outfit
            </h2>

            {/* Reference image preview */}
            {referenceImage && (
            <div className="mb-5">
                <img
                src={referenceImage}
                alt="Reference"
                className="w-full h-40 object-cover rounded-lg opacity-95"
                />
            </div>
            )}

            {/* Name */}
            <div className="mb-4">
                <label className="block text-xs tracking-wide text-neutral-500 mb-2">
                    Outfit name
                </label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Summer evening fit"
                    className="
                    w-full
                    border
                    border-neutral-300
                    rounded-md
                    px-3
                    py-2.5
                    text-sm
                    focus:outline-none
                    focus:border-neutral-700
                    "
                />
            </div>

            {/* Description */}
            <div className="mb-6">
                <label className="block text-xs tracking-wide text-neutral-500 mb-2">
                    Description
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Loose fit, neutral tones, everyday wear"
                    className="
                    w-full
                    border
                    border-neutral-300
                    rounded-md
                    px-3
                    py-2.5
                    text-sm
                    resize-none
                    focus:outline-none
                    focus:border-neutral-700
                    "
                />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <button
                    onClick={status === "loading" || status === "success" ? null : onClose}
                    className="
                    flex-1
                    px-6
                    py-3
                    text-xs
                    font-medium
                    tracking-wider
                    text-neutral-700
                    border
                    border-neutral-300
                    rounded-full
                    hover:border-neutral-500
                    transition
                    "
                >
                    Cancel
                </button>

                <button
                    onClick={handleSave}
                    className={`
                    flex-1
                    px-6
                    py-3
                    text-xs
                    font-medium
                    tracking-wider
                    rounded-full
                    transition
                    ${name.length === 0 ? "bg-neutral-300 text-neutral-500 cursor-not-allowed" : "bg-neutral-800 text-white hover:bg-neutral-800"}
                    `}
                >
                    Save
                </button>
            </div>

            {status === "loading" && (
                <div className="
                    absolute inset-0
                    flex flex-col items-center justify-center
                    bg-white
                    backdrop-blur-sm
                    rounded-2xl
                ">
                    <div className="
                    w-6 h-6
                    border-2 border-neutral-300
                    border-t-neutral-800
                    rounded-full
                    animate-spin
                    " />
                    <span className="mt-3 text-lg tracking-wide text-neutral-600 font-['Cormorant_Garamond'] font-medium">
                    Saving outfit…
                    </span>
                </div>
            )}

            {status === "success" && (
                <div className="
                    absolute inset-0
                    flex items-center justify-center
                    bg-white
                    backdrop-blur-sm
                    rounded-2xl
                ">
                    <span className="
                    text-lg
                    tracking-wide
                    text-neutral-700
                    font-['Cormorant_Garamond']
                    font-medium
                    ">
                    Outfit successfully uploaded
                    </span>
                </div>
            )}

            {status === "error" && (
                <div className="
                    absolute inset-0
                    flex flex-col items-center justify-center
                    bg-white
                    backdrop-blur-sm
                    rounded-2xl
                ">
                    <span className="text-lg text-red-600 mb-3 font-['Cormorant_Garamond'] font-medium">
                        Something went wrong
                    </span>
                    <button
                    onClick={() => setStatus("idle")}
                    className="text-sm underline"
                    >
                        Try again
                    </button>
                </div>
            )}

        </div>
 
        </div>
    )
}

export default SaveOutfitModal
