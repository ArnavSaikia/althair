import { useRef } from "react"
import Draggable from "react-draggable"

function DraggableItem({ item, onScale, onSelect, isSelected }) {
  const nodeRef = useRef(null)
  const lastDistance = useRef(null)

  const getDistance = (t1, t2) => {
    const dx = t1.clientX - t2.clientX
    const dy = t1.clientY - t2.clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const handleTouchMove = (e) => {
    if (e.touches.length !== 2) return

    const dist = getDistance(e.touches[0], e.touches[1])

    if (lastDistance.current !== null) {
      const delta = (dist - lastDistance.current) / 200
      onScale(item.canvasId, delta)
    }

    lastDistance.current = dist
  }

  const handleTouchEnd = () => {
    lastDistance.current = null
  }

  return (
    <Draggable nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        className="absolute touch-none"
        style={{ zIndex: item.zIndex }}
        onPointerDown={(e) => {
          e.stopPropagation()
          onSelect(item.canvasId)
        }}
      >
        <div
          style={{
            transform: `scale(${item.scale}) translateZ(0)`,
            filter: isSelected
                ? "drop-shadow(0 0 0.5px rgba(0,0,0,0.9)) drop-shadow(0 0 8px rgba(0,0,0,0.15))"
                : "none",
            opacity: isSelected ? 1 : 0.96,
            outlineOffset: "4px",
            borderRadius: "8px"
          }}
        >
          <img
            src={item.src}
            draggable={false}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-32 select-none cursor-grab"
          />
        </div>
      </div>
    </Draggable>
  )
}

export default DraggableItem
