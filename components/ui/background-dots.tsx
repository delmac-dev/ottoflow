import { cn } from '@/lib/utils'
import React from 'react'

const BackgroundDot = () => {
  return (
    <div
      className={cn(
        "absolute inset-0",
        "[background-size:20px_20px]",
        "[background-image:radial-gradient(var(--color-dark-600)_1px,transparent_1px)]",
      )}
    />
  )
}

export default BackgroundDot