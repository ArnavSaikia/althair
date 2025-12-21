function CanvasPreview({ items }) {
    return (
        <div className="
            relative
            w-full
            h-full
            bg-[#f2f0ec]
            overflow-hidden
        ">
            {items
                .slice()
                .sort((a, b) => a.z - b.z)
                .map(item => (
                    <img
                        key={item.id}
                        src={item.image}
                        alt=""
                        className="absolute select-none"
                        style={{
                            left: item.x,
                            top: item.y,
                            transform: `
                                scale(${item.scale ?? 1})
                                rotate(${item.rotation ?? 0}deg)
                            `,
                            transformOrigin: "top left"
                        }}
                    />
                ))}

            {/* subtle paper depth */}
            <div className="absolute inset-0 shadow-inner pointer-events-none" />
        </div>
    )
}

export default CanvasPreview
