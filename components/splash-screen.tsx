'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SplashScreenProps {
  onComplete: () => void
}

// Animated Shanyrak "O" component
function AnimatedShanyrak() {
  return (
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* Outer circle (blue ring) */}
      <motion.circle
        cx="50"
        cy="50"
        r="48"
        fill="#1F4FA8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      
      {/* Inner white circle */}
      <motion.circle
        cx="50"
        cy="50"
        r="38"
        fill="white"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />
      
      {/* Shanyrak crosshatch pattern — drawn together for a calmer reveal */}
      <motion.g 
        stroke="#1F4FA8" 
        strokeWidth="3" 
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
      >
        <motion.path d="M 18 35 Q 50 42 82 35" fill="none" />
        <motion.path d="M 15 50 Q 50 55 85 50" fill="none" />
        <motion.path d="M 18 65 Q 50 58 82 65" fill="none" />
        <motion.line x1="22" y1="22" x2="78" y2="78" />
        <motion.line x1="35" y1="18" x2="82" y2="65" />
        <motion.line x1="18" y1="35" x2="65" y2="82" />
        <motion.line x1="78" y1="22" x2="22" y2="78" />
        <motion.line x1="65" y1="18" x2="18" y2="65" />
        <motion.line x1="82" y1="35" x2="35" y2="82" />
      </motion.g>
    </motion.svg>
  )
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 50)
    
    const timer = setTimeout(() => {
      onComplete()
    }, 3000)
    
    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [onComplete])

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Premium white/light gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(165deg, #FFFFFF 0%, #F7F8FA 40%, #EEF3FB 100%)',
        }}
      />
      
      {/* Soft background glows (static, no pulsing) */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(31,79,168,0.10) 0%, transparent 70%)',
          top: '-15%',
          right: '-15%',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(200,38,30,0.06) 0%, transparent 70%)',
          bottom: '-10%',
          left: '-10%',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-8">
        {/* Animated Logo */}
        <div className="flex items-center gap-1 mb-6">
          {/* Animated Shanyrak O */}
          <AnimatedShanyrak />
          
          {/* TAU letters — single calm reveal */}
          <motion.div
            className="flex items-center -ml-1"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.1, ease: 'easeOut' }}
          >
            <span className="text-[72px] font-extrabold tracking-[-0.03em] text-otau-primary-500">T</span>
            <span className="text-[72px] font-extrabold tracking-[-0.03em] text-otau-primary-500">A</span>
            <span className="text-[72px] font-extrabold tracking-[-0.03em] text-otau-primary-500">U</span>
          </motion.div>
        </div>
        
        {/* GR subtitle — slim, widened horizontally, tucked tightly under OTAU */}
        <motion.div
          className="flex items-center justify-center mb-8 -mt-11"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.5 }}
        >
          <span 
            className="text-otau-accent-500 select-none"
            style={{ 
              fontWeight: 300,
              fontSize: '15px',
              letterSpacing: '0.55em',
              transform: 'scaleX(1.35)',
              transformOrigin: 'center',
              display: 'inline-block',
              paddingLeft: '0.55em',
              fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
            }}
          >
            GR
          </span>
        </motion.div>
        
        {/* Tagline */}
        <motion.p
          className="text-otau-neutral-500 text-base tracking-wide mb-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          Строим будущее Казахстана
        </motion.p>
        
        {/* Progress bar */}
        <motion.div
          className="w-48 h-1.5 bg-otau-neutral-200 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div 
            className="h-full rounded-full"
            style={{ 
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #1F4FA8 0%, #4B78C2 100%)',
            }}
            transition={{ ease: "linear" }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
