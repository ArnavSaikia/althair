function OutfitCard({ outfit }) {
    return (
        <button className="group text-left">
            <div className="
                relative
                aspect-[3/4]
                overflow-hidden
                rounded-[14px]
                shadow-[0_8px_20px_rgba(0,0,0,0.1)]
                border border-white/20
                transition
                duration-500
                hover:scale-[1.03]
            ">
                <img
                    src={outfit.preview}
                    alt={outfit.name}
                    className="
                        w-full
                        h-full
                        object-cover
                        transition
                        duration-500
                        group-hover:scale-[1.03]
                        group-hover:contrast-[1.02]
                    "
                />

                {/* Title overlay */}
                <div className="
                    absolute
                    inset-x-0
                    bottom-0
                    px-3
                    pt-8
                    pb-3
                    bg-gradient-to-t
                    from-black/60
                    via-black/20
                    to-transparent
                ">
                    <p className="
                        text-white
                        tracking-wide
                        font-['Cormorant_Garamond']
                        text-lg
                        truncate
                    ">
                        {outfit.name}
                    </p>

                    <p className="
                        mt-0.5
                        text-[10px]
                        tracking-wide
                        text-white/70
                    ">
                        {outfit.createdAt}
                    </p>
                </div>
            </div>
        </button>
    )
}

export default OutfitCard
