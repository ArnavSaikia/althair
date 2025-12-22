import { useRef, useLayoutEffect, useState } from "react";

function CanvasPreview({ items, extraCSS = "" }) {
    const ref = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        console.log(items)
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        setSize({
            width: rect.width,
            height: rect.height
        });
    }, []);

    return (
        <div
            ref={ref}
            className={`
                relative
                w-full
                h-full
                bg-[#f2f0ec]
                overflow-hidden
                ${extraCSS}
            `}
        >
            {size.width > 0 &&
                items
                    .slice()
                    .sort((a, b) => a.zIndex - b.zIndex)
                    .map(item => (
                        <img
                            key={item.canvasId}
                            src={item.src}
                            draggable={false}
                            style={{
                                position: "absolute",
                                transform: `translate(${item.x * size.width}px, ${item.y * size.height}px)`,
                                width: item.normalizedScale * size.width,
                                zIndex: item.zIndex
                            }}
                        />
                    ))}

            {/* subtle paper depth */}
            <div className="absolute inset-0 shadow-inner pointer-events-none" />
        </div>
    );
}

export default CanvasPreview;
