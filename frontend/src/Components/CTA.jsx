import { useNavigate } from "react-router-dom";

function CTA() {
    const navigate = useNavigate();

    return (
        <section className="
            w-full
            lg:w-full
            py-16
            flex
            justify-center
            bg-[linear-gradient(180deg,#f2f0ec 0%,#edeae4 100%)]

        ">
            <div className="text-center max-w-[32ch]">
                <span className="
                    block
                    font-['Cormorant_Garamond']
                    text-2xl
                    font-light
                    tracking-wide
                    text-neutral-900
                ">
                    Your clothes, styled once, remembered forever
                </span>

                <span className="
                    block
                    mt-3
                    text-sm
                    text-neutral-600
                    tracking-wide
                ">
                    Outfits you’ve curated, kept in one place.
                </span>

                <div className="mt-8 flex justify-center gap-3">
                    {/* Primary */}
                    <button className="
                        px-6
                        py-2.5
                        text-xs
                        font-medium
                        tracking-wider
                        whitespace-nowrap
                        text-white
                        bg-neutral-900
                        rounded-full
                        hover:bg-neutral-800
                        transition
                        cursor-pointer
                    "
                        onClick={() => navigate('/outfits/build')}
                    >
                        Start building
                    </button>

                    {/* Secondary */}
                    <button className="
                        px-6
                        py-2.5
                        text-xs
                        font-medium
                        tracking-wider
                        whitespace-nowrap
                        text-neutral-800
                        border
                        border-neutral-400
                        rounded-full
                        hover:border-neutral-600
                        transition
                        cursor-pointer
                    "
                        onClick={() => navigate('wardrobe/new')}
                    >
                        Upload clothing
                    </button>
                </div>


            </div>
        </section>
    );
}

export default CTA;
