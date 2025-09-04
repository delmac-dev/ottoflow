import React, { useEffect, useRef, useState } from 'react'
import { Layer, Rect, Image as KonvaImage, Group } from 'react-konva';

export default function Example2() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const imageRef = useRef<any>(null);

  // load the image
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src ="/avatars/blue.jpg";
    img.onload = () => {
      setImage(img);
    };
  }, []);

  const clipRect = { x: 30, y: 30, width: 420, height: 340 };

  return (
    <Layer draggable>
        {/* background */}
        <Rect
          x={0}
          y={0}
          width={500}
          height={500}
          fill="gold"
          opacity={0.1}
          listening={false}
        />

        {/* border for clipping area */}
        <Rect
          x={clipRect.x - 1}
          y={clipRect.y - 1}
          width={clipRect.width + 2}
          height={clipRect.height + 2}
          stroke="#00008B"
          strokeWidth={1}
        />

        {/* semi-transparent full image (boundsRect equivalent) */}
        {image && (
          <KonvaImage
            image={image}
            opacity={0.2}
            stroke="black"
            strokeWidth={1}
            dash={[2, 2]}
            listening={false}
          />
        )}

        {/* group with clip region */}
        <Group clip={clipRect}>
          {image && (
            <KonvaImage
              ref={imageRef}
              image={image}
              x={pos.x}
              y={pos.y}
              draggable
              onDragMove={(e) => {
                // basic bound logic so it doesn’t leave clip completely
                const node = e.target;
                const newX = Math.min(
                  clipRect.x,
                  Math.max(
                    clipRect.x + clipRect.width - node.width(),
                    node.x()
                  )
                );
                const newY = Math.min(
                  clipRect.y,
                  Math.max(
                    clipRect.y + clipRect.height - node.height(),
                    node.y()
                  )
                );

                setPos({ x: newX, y: newY });
              }}
            />
          )}
        </Group>
      </Layer>
  )
}
