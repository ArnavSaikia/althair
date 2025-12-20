function CollectionHeader({ count }) {
    return (
        <div className="mb-14 text-center">
            <h1 className="
                text-[42px]
                leading-tight
                font-['Cormorant_Garamond']
                font-light
                text-neutral-800
                mb-2
            ">
                Collection
            </h1>

            <p className="
                text-sm
                text-neutral-500
                tracking-wide
            ">
                {count} {count === 1 ? "outfit" : "outfits"}
            </p>
        </div>
    )
}

export default CollectionHeader;
