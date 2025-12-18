import { useRef } from "react"
import Draggable from "react-draggable"

function DraggableItem({ src }) {
    const nodeRef = useRef(null)

    return (
        <Draggable nodeRef={nodeRef} defaultPosition={{ x: 0, y: 0 }}>
            <img
                ref={nodeRef}
                src={src}
                draggable={false}
                className="
                    absolute
                    w-32
                    cursor-grab
                    select-none
                "
            />
        </Draggable>
    )
}

export default DraggableItem;