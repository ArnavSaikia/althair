function CollectionHeader({ count, title, quantifier }) {
    return (
        <div className="mb-12 text-center">
            <h1 className="
                text-[36px]
                lg:text-[42px]
                leading-tight
                font-['Cormorant_Garamond']
                font-light
                text-neutral-800
                mb-2
            ">
                {title}
            </h1>

            <p className="
                text-sm
                text-neutral-500
                tracking-wide
            ">
                {count} {count === 1 ? quantifier : `${quantifier}s`}
            </p>
        </div>
    )
}

export default CollectionHeader;
