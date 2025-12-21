function EditorialOverlay({ outfit }) {
    return (
        <div className="
            absolute
            inset-x-0
            bottom-0
            px-4
            pt-10
            pb-4
            bg-gradient-to-t
            from-black/60
            via-black/25
            to-transparent
        ">
            <h1 className="
                text-white
                font-['Cormorant_Garamond']
                text-2xl
                font-light
                leading-snug
            ">
                {outfit.name}
            </h1>

            <p className="
                mt-1
                text-[11px]
                tracking-wide
                text-white/70
            ">
                {outfit.createdAt}
            </p>

            {outfit.description && (
                <p className="
                    mt-2
                    text-xs
                    text-white/80
                    max-w-[90%]
                ">
                    {outfit.description}
                </p>
            )}
        </div>
    )
}

export default EditorialOverlay;