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
                                left: item.xCenter * size.width,
                                top: item.yCenter * size.height,
                                transform: "translate(-50%, -50%)",
                                width: item.normalizedScale * size.width,
                                transformOrigin: "center",
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
