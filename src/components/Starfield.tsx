'use client'

import { useState, useEffect, useMemo } from 'react'

export default function Starfield() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const stars = useMemo(() => {
    if (!isMounted) return null // Don't generate stars on the server or before mount

    const starArray = []
    for (let i = 0; i < 200; i++) {
      const size = Math.random() * 2 + 1
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 200}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${Math.random() * 30}s`,
        animationDuration: `${Math.random() * 20 + 30}s`,
      }
      starArray.push(<div key={i} className="absolute bg-white rounded-full animate-star-fall" style={style}></div>)
    }
    return starArray
  }, [isMounted]) // Re-run memo when isMounted changes

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div className="absolute w-full h-full">
        {stars}
      </div>
    </div>
  )
}