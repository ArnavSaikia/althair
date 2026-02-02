import { useNavigate } from "react-router-dom"

function GarmentGrid({ items }) {
    // console.log("Items from garment grid: " , items);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    return (
        <section className="
            max-w-md
            mx-auto
            px-6
            pb-10
        ">
            <h2 className="
                        font-['Cormorant_Garamond']
                        text-[22px]
                        leading-tight
                        text-[#2c2b28]
                        font-light
                        mb-5
                        
                    ">
                Pieces
            </h2>

            <div className="
                grid
                grid-cols-3
                gap-x-6
                gap-y-10
            ">
                {items.length !== 0 && items.map((item) => (
                    <button
                        key={item.clothingId._id}
                        className="
                            relative
                            flex
                            items-center
                            justify-center
                            cursor-pointer
                            focus:outline-none
                        "
                        onClick={() => {
                            navigate(`/wardrobe/${item.clothingId._id}`);
                        }}
                    >
                        <img
                            src={item.src}
                            alt=""
                            className="
                                max-h-[120px]
                                w-auto
                                object-contain
                                transition-opacity
                                duration-200
                                hover:opacity-80
                            "
                        />
                    </button>
                ))}
            </div>
        </section>
    )
}

export default GarmentGrid
