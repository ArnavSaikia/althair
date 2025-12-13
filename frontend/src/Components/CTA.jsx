function CTA() {
    return (
        <section className="
            w-full
            py-16
            flex
            justify-center
            bg-[#f2f0ec]
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
                    Build an outfit from your wardrobe
                </span>

                <span className="
                    block
                    mt-3
                    text-sm
                    text-neutral-600
                    tracking-wide
                ">
                    Combine pieces you own or upload new ones
                </span>

                <button className="
                    mt-6
                    text-sm
                    text-neutral-700
                    tracking-wide
                    underline
                    underline-offset-4
                    hover:text-neutral-900
                    transition
                ">
                    Upload clothing
                </button>
            </div>
        </section>
    );
}

export default CTA;
