function Card({ image, title }) {
    return (
        <div className="
            flex-none
            w-[45vw]
        ">
            <div className="
                relative
                aspect-[3/4]
                rounded-[14px]
                overflow-hidden
                transition
                duration-500
                hover:scale-[1.02]
            ">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="mt-0">
                <span className="
                    block
                    font-sans
                    text-[0.95rem]
                    font-normal
                    tracking-[0.01em]
                    text-neutral-900
                    text-center
                ">
                    {title}
                </span>
            </div>
        </div>
    );
}

export default Card;
