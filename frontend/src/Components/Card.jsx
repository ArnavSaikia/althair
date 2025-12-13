function Card({ image, title }) {
    return (
        <div className="flex-none w-[45vw]">
            <div
                className="
                    relative
                    aspect-[3/4]
                    rounded-[14px]
                    overflow-hidden
                    shadow-[0_8px_20px_rgba(0,0,0,0.1)]
                    border border-white/20
                    transition
                    duration-500
                    hover:scale-[1.03]
                "
            >
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />

                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                {/* caption */}
                <span
                    className="
                        absolute
                        bottom-3
                        left-3
                        text-white
                        tracking-wide
                        font-['Cormorant_Garamond']
                        text-lg
                    "
                >
                    {title}
                </span>
            </div>
        </div>
    );
}

export default Card;
