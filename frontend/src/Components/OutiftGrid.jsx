import OutfitCard from "./OutfitCard"

function OutfitGrid({ outfits }) {
    return (
        <div className="
            max-w-6xl
            mx-auto
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            gap-x-4
            gap-y-8
        ">
            {outfits.map((outfit) => (
                <OutfitCard key={outfit.id} outfit={outfit} />
            ))}
        </div>
    )
}

export default OutfitGrid;
