'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowLeft, Heart, Compass, Maximize, Home, Building2, Ruler, ChevronRight, Phone, MessageCircle, X, ZoomIn, ZoomOut } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { formatPrice, type Apartment } from '@/lib/mock-data'

interface ApartmentDetailScreenProps {
  apartment: Apartment
  complexName: string
  onBack: () => void
}

export function ApartmentDetailScreen({ apartment, complexName, onBack }: ApartmentDetailScreenProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [downPayment, setDownPayment] = useState(30)
  const [loanTerm, setLoanTerm] = useState(20)
  const [showFullPlan, setShowFullPlan] = useState(false)
  const [zoom, setZoom] = useState(1)
  
  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 3))
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5))
  const openFullPlan = () => {
    setZoom(1)
    setShowFullPlan(true)
  }
  
  const downPaymentAmount = apartment.price * (downPayment / 100)
  const loanAmount = apartment.price - downPaymentAmount
  const monthlyRate = 0.075 / 12
  const numPayments = loanTerm * 12
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
  
  return (
    <div className="min-h-full bg-white pb-28">
      {/* Fullscreen Floor Plan Modal */}
      <AnimatePresence>
        {showFullPlan && (
          <motion.div
            className="fixed inset-0 z-[100] bg-otau-neutral-900 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="flex items-center justify-between px-4 py-3 bg-black/40 backdrop-blur-md border-b border-white/10"
              style={{ paddingTop: 'max(env(safe-area-inset-top), 12px)' }}
            >
              <div>
                <p className="text-white/60 text-[11px] uppercase tracking-widest font-semibold">Планировка</p>
                <h2 className="text-white font-bold text-base">Квартира №{apartment.number}</h2>
              </div>
              <motion.button
                type="button"
                className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center touch-manipulation"
                onClick={() => setShowFullPlan(false)}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </div>
            
            <div className="flex-1 overflow-auto flex items-center justify-center p-4">
              <motion.div
                className="origin-center"
                style={{ transform: `scale(${zoom})` }}
                animate={{ scale: zoom }}
                transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              >
                <svg 
                  viewBox="0 0 200 150" 
                  className="w-[88vw] max-w-[640px] h-auto drop-shadow-2xl"
                >
                  <rect x="10" y="10" width="180" height="130" fill="#0B0E16" stroke="#4B78C2" strokeWidth="1.5"/>
                  
                  <rect x="10" y="10" width="90" height="80" fill="#1F4FA8" fillOpacity="0.28" stroke="#6B94D6" strokeWidth="0.75"/>
                  <text x="55" y="48" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">Гостиная</text>
                  <text x="55" y="62" textAnchor="middle" fontSize="6.5" fill="#ADC4E9">{(apartment.area * 0.4).toFixed(1)} м²</text>
                  
                  <rect x="100" y="10" width="90" height="50" fill="#1F4FA8" fillOpacity="0.28" stroke="#6B94D6" strokeWidth="0.75"/>
                  <text x="145" y="33" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">Спальня</text>
                  <text x="145" y="46" textAnchor="middle" fontSize="6.5" fill="#ADC4E9">{(apartment.area * 0.25).toFixed(1)} м²</text>
                  
                  <rect x="100" y="60" width="50" height="40" fill="#4B78C2" fillOpacity="0.38" stroke="#6B94D6" strokeWidth="0.75"/>
                  <text x="125" y="82" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">Кухня</text>
                  <text x="125" y="92" textAnchor="middle" fontSize="6" fill="#ADC4E9">{(apartment.area * 0.18).toFixed(1)} м²</text>
                  
                  <rect x="150" y="60" width="40" height="40" fill="#6B94D6" fillOpacity="0.38" stroke="#6B94D6" strokeWidth="0.75"/>
                  <text x="170" y="84" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">С/У</text>
                  
                  <rect x="10" y="90" width="90" height="50" fill="#1F4FA8" fillOpacity="0.28" stroke="#6B94D6" strokeWidth="0.75"/>
                  <text x="55" y="118" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">{apartment.rooms > 1 ? 'Спальня 2' : 'Прихожая'}</text>
                  
                  {apartment.balcony && (
                    <g>
                      <rect x="100" y="100" width="90" height="20" fill="none" stroke="#6B94D6" strokeWidth="0.75" strokeDasharray="3,2"/>
                      <text x="145" y="114" textAnchor="middle" fontSize="6" fill="#ADC4E9">Балкон</text>
                    </g>
                  )}
                </svg>
              </motion.div>
            </div>
            
            {/* Zoom controls */}
            <div className="absolute right-4 bottom-32 flex flex-col gap-2">
              <motion.button
                type="button"
                onClick={handleZoomIn}
                whileTap={{ scale: 0.9 }}
                className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/15 flex items-center justify-center touch-manipulation"
              >
                <ZoomIn className="w-5 h-5 text-white" />
              </motion.button>
              <motion.button
                type="button"
                onClick={handleZoomOut}
                whileTap={{ scale: 0.9 }}
                className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/15 flex items-center justify-center touch-manipulation"
              >
                <ZoomOut className="w-5 h-5 text-white" />
              </motion.button>
              <div className="text-center text-white/70 text-[11px] font-medium">{Math.round(zoom * 100)}%</div>
            </div>
            
            <div 
              className="px-4 py-4 bg-black/40 backdrop-blur-md border-t border-white/10"
              style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 16px)' }}
            >
              <div className="flex items-center justify-center gap-3">
                <div className="bg-white/10 rounded-xl px-4 py-2 text-center min-w-[80px]">
                  <p className="text-[10px] text-white/60 uppercase tracking-wide">Площадь</p>
                  <p className="text-white font-bold">{apartment.area} м²</p>
                </div>
                <div className="bg-white/10 rounded-xl px-4 py-2 text-center min-w-[80px]">
                  <p className="text-[10px] text-white/60 uppercase tracking-wide">Комнат</p>
                  <p className="text-white font-bold">{apartment.rooms}</p>
                </div>
                <div className="bg-white/10 rounded-xl px-4 py-2 text-center min-w-[80px]">
                  <p className="text-[10px] text-white/60 uppercase tracking-wide">Этаж</p>
                  <p className="text-white font-bold">{apartment.floor}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Header */}
      <header 
        className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-otau-neutral-100 px-4"
        style={{ paddingTop: 'env(safe-area-inset-top, 12px)' }}
      >
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="w-10 h-10 rounded-full bg-otau-neutral-100 flex items-center justify-center active:bg-otau-neutral-200 touch-manipulation"
              onClick={onBack}
            >
              <ArrowLeft className="w-5 h-5 text-otau-neutral-700" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-otau-neutral-900">Квартира №{apartment.number}</h1>
              <p className="text-sm text-otau-neutral-500">{complexName}</p>
            </div>
          </div>
          
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-otau-neutral-100 flex items-center justify-center active:bg-otau-neutral-200 touch-manipulation"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${isFavorite ? 'text-otau-accent-500 fill-otau-accent-500' : 'text-otau-neutral-500'}`} 
            />
          </button>
        </div>
      </header>
      
      <div className="px-4 py-5">
        {/* Floor plan — tap anywhere to open fullscreen */}
        <motion.div 
          role="button"
          tabIndex={0}
          className="relative bg-otau-neutral-50 rounded-3xl h-[260px] mb-5 flex items-center justify-center overflow-hidden cursor-pointer active:bg-otau-neutral-100 transition-colors"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={openFullPlan}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              openFullPlan()
            }
          }}
        >
          <svg viewBox="0 0 200 150" className="w-full h-full p-6 pointer-events-none">
            <rect x="10" y="10" width="180" height="130" fill="none" stroke="#1F4FA8" strokeWidth="2"/>
            
            <rect x="10" y="10" width="90" height="80" fill="#EEF3FB" stroke="#1F4FA8" strokeWidth="1"/>
            <text x="55" y="55" textAnchor="middle" fontSize="8" fill="#1F4FA8">Гостиная</text>
            <text x="55" y="68" textAnchor="middle" fontSize="6" fill="#6B7384">{(apartment.area * 0.4).toFixed(1)} м²</text>
            
            <rect x="100" y="10" width="90" height="50" fill="#EEF3FB" stroke="#1F4FA8" strokeWidth="1"/>
            <text x="145" y="40" textAnchor="middle" fontSize="8" fill="#1F4FA8">Спальня</text>
            <text x="145" y="53" textAnchor="middle" fontSize="6" fill="#6B7384">{(apartment.area * 0.25).toFixed(1)} м²</text>
            
            <rect x="100" y="60" width="50" height="40" fill="#D6E2F4" stroke="#1F4FA8" strokeWidth="1"/>
            <text x="125" y="85" textAnchor="middle" fontSize="7" fill="#1F4FA8">Кухня</text>
            
            <rect x="150" y="60" width="40" height="40" fill="#ADC4E9" stroke="#1F4FA8" strokeWidth="1"/>
            <text x="170" y="85" textAnchor="middle" fontSize="6" fill="#1F4FA8">С/У</text>
            
            <rect x="10" y="90" width="90" height="50" fill="#EEF3FB" stroke="#1F4FA8" strokeWidth="1"/>
            <text x="55" y="120" textAnchor="middle" fontSize="8" fill="#1F4FA8">{apartment.rooms > 1 ? 'Спальня 2' : 'Прихожая'}</text>
            
            {apartment.balcony && (
              <g>
                <rect x="100" y="100" width="90" height="20" fill="none" stroke="#1F4FA8" strokeWidth="1" strokeDasharray="3,2"/>
                <text x="145" y="114" textAnchor="middle" fontSize="6" fill="#6B7384">Балкон</text>
              </g>
            )}
          </svg>
          
          <motion.button 
            type="button"
            className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-full shadow-md active:bg-otau-neutral-50 touch-manipulation z-10"
            onClick={(e) => {
              e.stopPropagation()
              openFullPlan()
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Maximize className="w-4 h-4 text-otau-primary-500" />
            <span className="text-xs font-semibold text-otau-primary-500">Увеличить</span>
          </motion.button>
        </motion.div>
        
        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          <div className="bg-otau-neutral-50 rounded-2xl p-3 text-center">
            <Building2 className="w-5 h-5 text-otau-primary-500 mx-auto mb-1" />
            <p className="text-xs text-otau-neutral-500">Этаж</p>
            <p className="text-base font-bold text-otau-neutral-900">{apartment.floor}</p>
          </div>
          <div className="bg-otau-neutral-50 rounded-2xl p-3 text-center">
            <Ruler className="w-5 h-5 text-otau-primary-500 mx-auto mb-1" />
            <p className="text-xs text-otau-neutral-500">Площадь</p>
            <p className="text-base font-bold text-otau-neutral-900">{apartment.area}м²</p>
          </div>
          <div className="bg-otau-neutral-50 rounded-2xl p-3 text-center">
            <Home className="w-5 h-5 text-otau-primary-500 mx-auto mb-1" />
            <p className="text-xs text-otau-neutral-500">Комнат</p>
            <p className="text-base font-bold text-otau-neutral-900">{apartment.rooms}</p>
          </div>
          <div className="bg-otau-neutral-50 rounded-2xl p-3 text-center">
            <Compass className="w-5 h-5 text-otau-primary-500 mx-auto mb-1" />
            <p className="text-xs text-otau-neutral-500">Сторона</p>
            <p className="text-base font-bold text-otau-neutral-900">Юг</p>
          </div>
        </div>
        
        {/* Price card */}
        <div className="bg-gradient-to-br from-otau-primary-500 to-otau-primary-700 rounded-3xl p-5 mb-5 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/70 text-sm">Стоимость квартиры</p>
              <p className="text-2xl font-bold">{formatPrice(apartment.price)}</p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-sm">за м²</p>
              <p className="text-lg font-medium">{formatPrice(apartment.pricePerSqm)}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <span className="px-3 py-1.5 bg-white/20 rounded-full text-xs font-medium">Рассрочка</span>
            <span className="px-3 py-1.5 bg-white/20 rounded-full text-xs font-medium">Ипотека</span>
            <span className="px-3 py-1.5 bg-white/20 rounded-full text-xs font-medium">100%</span>
          </div>
        </div>
        
        {/* Calculator */}
        <div className="bg-otau-neutral-50 rounded-3xl p-5 mb-5">
          <h2 className="text-lg font-bold text-otau-neutral-900 mb-4">Калькулятор ипотеки</h2>
          
          {/* Down payment */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-otau-neutral-600">Первоначальный взнос</span>
              <span className="text-sm font-bold text-otau-neutral-900">{downPayment}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              value={downPayment}
              onChange={(e) => setDownPayment(parseInt(e.target.value))}
              className="w-full h-2 bg-otau-neutral-200 rounded-full appearance-none cursor-pointer accent-otau-primary-500"
            />
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-otau-neutral-400">10%</span>
              <span className="text-xs font-medium text-otau-primary-500">
                {formatPrice(downPaymentAmount)}
              </span>
              <span className="text-xs text-otau-neutral-400">70%</span>
            </div>
          </div>
          
          {/* Term */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-otau-neutral-600">Срок кредита</span>
              <span className="text-sm font-bold text-otau-neutral-900">{loanTerm} лет</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={loanTerm}
              onChange={(e) => setLoanTerm(parseInt(e.target.value))}
              className="w-full h-2 bg-otau-neutral-200 rounded-full appearance-none cursor-pointer accent-otau-primary-500"
            />
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-otau-neutral-400">5 лет</span>
              <span className="text-xs text-otau-neutral-400">30 лет</span>
            </div>
          </div>
          
          {/* Result */}
          <div className="bg-white rounded-2xl p-4 border border-otau-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-otau-neutral-500">Ежемесячный платёж</p>
                <p className="text-xl font-bold text-otau-primary-500">
                  ~{formatPrice(Math.round(monthlyPayment))}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-otau-neutral-400">Ставка от</p>
                <p className="text-base font-medium text-otau-neutral-700">7.5%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-otau-neutral-100 px-4 py-3"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 16px)' }}
      >
        <button
          type="button"
          className="w-full h-14 bg-otau-primary-500 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 mb-3 active:bg-otau-primary-600 touch-manipulation"
          style={{ boxShadow: '0 8px 24px rgba(31,79,168,0.25)' }}
        >
          Забронировать онлайн
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="flex gap-3">
          <button
            type="button"
            className="flex-1 h-12 border-2 border-otau-neutral-200 rounded-xl flex items-center justify-center gap-2 text-otau-neutral-700 active:bg-otau-neutral-50 touch-manipulation"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">Позвонить</span>
          </button>
          <button
            type="button"
            className="flex-1 h-12 border-2 border-otau-neutral-200 rounded-xl flex items-center justify-center gap-2 text-otau-neutral-700 active:bg-otau-neutral-50 touch-manipulation"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Написать</span>
          </button>
        </div>
      </div>
    </div>
  )
}
