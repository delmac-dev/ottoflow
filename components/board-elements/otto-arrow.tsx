import React from 'react'
import { Arrow } from 'react-konva'

const OttoArrow = () => {
  return (
    <Arrow
      x={window.innerWidth / 4}
      y={window.innerHeight / 4}
      points={[0, 0, 100, 100]}
      pointerLength={20}
      pointerWidth={20}
      fill="black"
      stroke="black"
      strokeWidth={4}
    />
  )
}

export default OttoArrow