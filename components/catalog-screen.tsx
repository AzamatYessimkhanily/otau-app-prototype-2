'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { List, Map, SlidersHorizontal, X, MapPin, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { 
  residentialComplexes, 
  formatPriceShort,
  getStatusLabel,
  getStatusColor,
} from '@/lib/mock-data'

interface CatalogScreenProps {
  onComplexClick: (complexId: string) => void
  onBack: () => void
}

export function CatalogScreen({ onComplexClick }: CatalogScreenProps) {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPin, setSelectedPin] = useState<string | null>(null)
  
  return (
    <div className="min-h-full bg-otau-neutral-50 pb-24">
      {/* Header */}
      <header 
        className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-otau-neutral-100 px-4"
        style={{ paddingTop: 'env(safe-area-inset-top, 12px)' }}
      >
        <div className="flex items-center justify-between py-3 mb-3">
          <h1 className="text-2xl font-bold text-otau-neutral-900">Каталог</h1>
          
          {/* View toggle */}
          <div className="flex bg-otau-neutral-100 rounded-xl p-1">
            <button
              type="button"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 touch-manipulation ${
                viewMode === 'list' 
                  ? 'bg-white text-otau-neutral-900 shadow-sm' 
                  : 'text-otau-neutral-500'
              }`}
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
              Список
            </button>
            <button
              type="button"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 touch-manipulation ${
                viewMode === 'map' 
                  ? 'bg-white text-otau-neutral-900 shadow-sm' 
                  : 'text-otau-neutral-500'
              }`}
              onClick={() => setViewMode('map')}
            >
              <Map className="w-4 h-4" />
              Карта
            </button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-3">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 bg-otau-primary-50 text-otau-primary-600 rounded-full text-sm font-medium whitespace-nowrap active:bg-otau-primary-100 touch-manipulation"
            onClick={() => setShowFilters(true)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Фильтры
          </button>
          
          {['Район', 'Цена', 'Комнаты', 'Сдача'].map((filter) => (
            <button
              key={filter}
              type="button"
              className="flex items-center gap-1 px-3 py-2 bg-white rounded-full text-sm font-medium text-otau-neutral-700 whitespace-nowrap border border-otau-neutral-200 active:bg-otau-neutral-50 touch-manipulation"
            >
              {filter}
              <ChevronDown className="w-4 h-4" />
            </button>
          ))}
        </div>
      </header>
      
      <AnimatePresence mode="wait">
        {viewMode === 'list' ? (
          <motion.div
            key="list"
            className="px-4 pt-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm text-otau-neutral-500 mb-4">
              Найдено {residentialComplexes.length} жилых комплекса
            </p>
            
            <div className="space-y-4">
              {residentialComplexes.map((complex, index) => (
                <motion.button
                  key={complex.id}
                  type="button"
                  className="w-full bg-white rounded-3xl overflow-hidden text-left shadow-sm active:scale-[0.98] transition-transform touch-manipulation"
                  onClick={() => onComplexClick(complex.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="relative h-[180px]">
                    <Image
                      src={complex.images[0]}
                      alt={complex.name}
                      fill
                      className="object-cover"
                    />
                    <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(complex.status)}`}>
                      {getStatusLabel(complex.status)}
                    </span>
                    {complex.discount && (
                      <span className="absolute top-4 right-4 px-3 py-1.5 bg-otau-accent-500 text-white rounded-full text-xs font-bold">
                        -{complex.discount}%
                      </span>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-otau-neutral-900">{complex.name}</h3>
                      <span className="text-xs text-otau-neutral-500 bg-otau-neutral-100 px-2 py-1 rounded-full">
                        {complex.availableApartments} кв.
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-sm text-otau-neutral-500 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{complex.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-otau-neutral-500">Цена от</p>
                        <p className="text-lg font-bold text-otau-primary-500">
                          {formatPriceShort(complex.priceFrom)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-otau-neutral-500">Сдача</p>
                        <p className="text-sm font-medium text-otau-neutral-700">{complex.completionDate}</p>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="map"
            className="relative h-[calc(100vh-200px)]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Map */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-otau-primary-50 to-otau-neutral-100"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231F4FA8' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            >
              {/* Pins */}
              {residentialComplexes.map((complex, i) => (
                <button
                  key={complex.id}
                  type="button"
                  className={`absolute transform -translate-x-1/2 -translate-y-full touch-manipulation ${
                    selectedPin === complex.id ? 'z-20' : 'z-10'
                  }`}
                  style={{
                    left: `${25 + i * 25}%`,
                    top: `${30 + i * 15}%`,
                  }}
                  onClick={() => setSelectedPin(selectedPin === complex.id ? null : complex.id)}
                >
                  <motion.div 
                    className="relative"
                    animate={{ scale: selectedPin === complex.id ? 1.2 : 1 }}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                      selectedPin === complex.id 
                        ? 'bg-otau-primary-500' 
                        : 'bg-white border-2 border-otau-primary-500'
                    }`}>
                      <span className={`text-xs font-bold ${selectedPin === complex.id ? 'text-white' : 'text-otau-primary-500'}`}>
                        {formatPriceShort(complex.priceFrom).replace(' млн', '')}
                      </span>
                    </div>
                    <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent ${
                      selectedPin === complex.id ? 'border-t-otau-primary-500' : 'border-t-white'
                    }`} />
                  </motion.div>
                </button>
              ))}
            </div>
            
            {/* Selected card */}
            <AnimatePresence>
              {selectedPin && (
                <motion.div
                  className="absolute bottom-4 left-4 right-4"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                  {residentialComplexes.filter(c => c.id === selectedPin).map(complex => (
                    <button
                      key={complex.id}
                      type="button"
                      className="w-full flex items-center gap-4 bg-white p-4 rounded-2xl text-left shadow-lg active:scale-[0.98] transition-transform touch-manipulation"
                      onClick={() => onComplexClick(complex.id)}
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={complex.images[0]}
                          alt={complex.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-otau-neutral-900">{complex.name}</h3>
                        <p className="text-sm text-otau-neutral-500 mb-1">{complex.district}</p>
                        <p className="text-lg font-bold text-otau-primary-500">
                          от {formatPriceShort(complex.priceFrom)}
                        </p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Filters sheet */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[28px] px-5 pt-4"
              style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 32px)' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="w-12 h-1 bg-otau-neutral-200 rounded-full mx-auto mb-4" />
              
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-otau-neutral-900">Фильтры</h2>
                <button type="button" onClick={() => setShowFilters(false)} className="p-2 touch-manipulation">
                  <X className="w-6 h-6 text-otau-neutral-500" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-otau-neutral-700 mb-3 block">Район</label>
                  <div className="flex flex-wrap gap-2">
                    {['Шымкент', 'Туркестан', 'Алматы'].map(city => (
                      <button 
                        key={city} 
                        type="button"
                        className="px-4 py-2 bg-otau-neutral-100 rounded-full text-sm font-medium text-otau-neutral-700 active:bg-otau-neutral-200 touch-manipulation"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-otau-neutral-700 mb-3 block">Количество комнат</label>
                  <div className="flex gap-2">
                    {['Студия', '1', '2', '3', '4+'].map(rooms => (
                      <button 
                        key={rooms} 
                        type="button"
                        className="flex-1 py-3 bg-otau-neutral-100 rounded-xl text-sm font-medium text-otau-neutral-700 active:bg-otau-neutral-200 touch-manipulation"
                      >
                        {rooms}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button 
                  type="button"
                  className="w-full h-14 bg-otau-primary-500 text-white font-semibold rounded-2xl active:bg-otau-primary-600 touch-manipulation"
                  onClick={() => setShowFilters(false)}
                >
                  Показать результаты
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
