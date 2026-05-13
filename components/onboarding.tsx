'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { onboardingSlides } from '@/lib/mock-data'
import { ChevronRight, ArrowRight } from 'lucide-react'

interface OnboardingProps {
  onComplete: () => void
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const nextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(prev => prev + 1)
    } else {
      onComplete()
    }
  }
  
  const slide = onboardingSlides[currentSlide]
  
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white to-otau-neutral-50 overflow-hidden">
      {/* Skip */}
      <motion.button
        type="button"
        className="absolute z-20 text-otau-neutral-500 text-sm font-semibold px-5 py-3 active:opacity-70 touch-manipulation bg-white/50 backdrop-blur-md rounded-full"
        style={{ top: 'calc(env(safe-area-inset-top, 12px) + 8px)', right: '16px' }}
        onClick={onComplete}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        Пропустить
      </motion.button>
      
      {/* Image - 52% */}
      <div className="relative h-[52%] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.15, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: -50 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
            
            {/* Floating decorative elements */}
            <motion.div
              className="absolute top-24 right-8 w-24 h-24 rounded-3xl bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-xl border border-white/20"
              animate={{ 
                y: [0, -15, 0], 
                rotate: [0, 8, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-48 left-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-otau-primary-500/40 to-otau-primary-600/20 backdrop-blur-xl"
              animate={{ 
                y: [0, 12, 0], 
                rotate: [0, -8, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.div
              className="absolute bottom-24 right-12 w-12 h-12 rounded-xl bg-gradient-to-br from-otau-accent-500/30 to-otau-accent-600/10 backdrop-blur-xl"
              animate={{ 
                y: [0, -8, 0], 
                x: [0, 5, 0],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Content card */}
      <motion.div 
        className="relative flex-1 -mt-10 bg-white rounded-t-[36px] px-6 pt-8 pb-10 flex flex-col"
        style={{
          boxShadow: '0 -12px 40px rgba(0,0,0,0.08)',
          paddingBottom: 'max(env(safe-area-inset-bottom), 32px)',
        }}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Dots */}
        <div className="flex justify-center gap-2.5 mb-8">
          {onboardingSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`h-2.5 rounded-full transition-all duration-400 touch-manipulation ${
                index === currentSlide 
                  ? 'w-10 bg-gradient-to-r from-otau-primary-500 to-otau-primary-600' 
                  : index < currentSlide
                    ? 'w-2.5 bg-otau-primary-200'
                    : 'w-2.5 bg-otau-neutral-200'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
        
        {/* Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="flex-1 flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="text-[28px] font-bold text-otau-neutral-900 text-center mb-4 leading-tight text-balance">
              {slide.title}
            </h2>
            <p className="text-[16px] text-otau-neutral-500 text-center leading-relaxed px-2 text-pretty">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>
        
        {/* Button */}
        <motion.button
          type="button"
          className="w-full h-[58px] bg-gradient-to-r from-otau-primary-500 to-otau-primary-600 text-white font-bold text-[17px] rounded-2xl flex items-center justify-center gap-2 mt-auto active:opacity-90 touch-manipulation transition-opacity"
          onClick={nextSlide}
          whileTap={{ scale: 0.97 }}
          style={{
            boxShadow: '0 12px 32px rgba(31,79,168,0.3)',
          }}
        >
          {currentSlide === onboardingSlides.length - 1 ? (
            <>
              Начать
              <ArrowRight className="w-5 h-5" />
            </>
          ) : (
            <>
              Далее
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </motion.div>
    </div>
  )
}
