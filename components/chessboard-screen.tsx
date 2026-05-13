'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ArrowLeft, X, Maximize2 } from 'lucide-react'
import { 
  apartments as allApartments, 
  formatPrice,
  type Apartment,
} from '@/lib/mock-data'

interface ChessboardScreenProps {
  complexId: string
  onBack: () => void
  onApartmentClick: (apartment: Apartment) => void
}

const generateBuildingGrid = (complexId: string) => {
  const floors = 12
  const unitsPerFloor = 8
  const grid: (Apartment | null)[][] = []
  
  const existingApartments = allApartments.filter(a => a.complexId === complexId)
  
  for (let floor = floors; floor >= 1; floor--) {
    const row: (Apartment | null)[] = []
    for (let unit = 1; unit <= unitsPerFloor; unit++) {
      const existing = existingApartments.find(a => a.floor === floor && parseInt(a.number) % 10 === unit)
      if (existing) {
        row.push(existing)
      } else {
        const rooms = Math.random() > 0.5 ? (Math.random() > 0.5 ? 2 : 1) : 3
        const area = rooms === 1 ? 38 + Math.random() * 10 : rooms === 2 ? 55 + Math.random() * 15 : 85 + Math.random() * 20
        const status: Apartment['status'] = Math.random() > 0.3 ? 'available' : (Math.random() > 0.5 ? 'reserved' : 'sold')
        
        row.push({
          id: `${complexId}-${floor}-${unit}`,
          complexId,
          building: 1,
          floor,
          number: `${floor}${unit.toString().padStart(2, '0')}`,
          rooms,
          area: Math.round(area * 10) / 10,
          ceilingHeight: 2.8,
          price: Math.round(area * (400000 + Math.random() * 50000)),
          pricePerSqm: 435000,
          status,
          direction: 'south',
          balcony: Math.random() > 0.3,
          layout: '/layouts/1room-a.svg',
        })
      }
    }
    grid.push(row)
  }
  
  return grid
}

export function ChessboardScreen({ complexId, onBack, onApartmentClick }: ChessboardScreenProps) {
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null)
  const [activeRoomFilter, setActiveRoomFilter] = useState<number | null>(null)
  
  const buildingGrid = generateBuildingGrid(complexId)
  
  const getRoomColor = (rooms: number) => {
    switch (rooms) {
      case 1: return 'bg-blue-100 border-blue-300'
      case 2: return 'bg-green-100 border-green-300'
      case 3: return 'bg-purple-100 border-purple-300'
      default: return 'bg-orange-100 border-orange-300'
    }
  }
  
  const getStatusBg = (status: Apartment['status']) => {
    switch (status) {
      case 'available': return 'bg-green-500'
      case 'reserved': return 'bg-yellow-500'
      case 'sold': return 'bg-otau-neutral-300'
    }
  }
  
  return (
    <div className="h-full bg-otau-neutral-50 flex flex-col">
      {/* Header */}
      <header 
        className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-otau-neutral-100 px-4"
        style={{ paddingTop: 'env(safe-area-inset-top, 12px)' }}
      >
        <div className="flex items-center gap-4 py-3 mb-3">
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-otau-neutral-100 flex items-center justify-center active:bg-otau-neutral-200 touch-manipulation"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5 text-otau-neutral-700" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-otau-neutral-900">Шахматка</h1>
            <p className="text-sm text-otau-neutral-500">Корпус 1</p>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-otau-neutral-600">Свободна</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-xs text-otau-neutral-600">Бронь</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-otau-neutral-300" />
              <span className="text-xs text-otau-neutral-600">Продана</span>
            </div>
          </div>
          
          <button type="button" className="p-2 touch-manipulation">
            <Maximize2 className="w-5 h-5 text-otau-neutral-500" />
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2 pb-3">
          {[null, 1, 2, 3].map(rooms => (
            <button
              key={rooms ?? 'all'}
              type="button"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all touch-manipulation ${
                activeRoomFilter === rooms
                  ? 'bg-otau-primary-500 text-white'
                  : 'bg-otau-neutral-100 text-otau-neutral-600 active:bg-otau-neutral-200'
              }`}
              onClick={() => setActiveRoomFilter(rooms)}
            >
              {rooms === null ? 'Все' : `${rooms}-комн`}
            </button>
          ))}
        </div>
      </header>
      
      {/* Grid */}
      <div className="flex-1 overflow-auto p-4">
        <div className="min-w-[550px]">
          <div className="flex">
            {/* Floor labels */}
            <div className="w-10 flex-shrink-0">
              <div className="h-6" />
              {buildingGrid.map((_, index) => (
                <div 
                  key={index} 
                  className="h-14 flex items-center justify-center text-xs font-medium text-otau-neutral-500"
                >
                  {12 - index}
                </div>
              ))}
            </div>
            
            {/* Cells */}
            <div className="flex-1">
              <div className="flex gap-1 mb-1">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex-1 h-5 flex items-center justify-center text-[10px] text-otau-neutral-400">
                    {i + 1}
                  </div>
                ))}
              </div>
              
              <div className="space-y-1">
                {buildingGrid.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex gap-1">
                    {row.map((apartment, cellIndex) => {
                      if (!apartment) return <div key={cellIndex} className="flex-1 h-12" />
                      
                      const isFiltered = activeRoomFilter !== null && apartment.rooms !== activeRoomFilter
                      
                      return (
                        <button
                          key={apartment.id}
                          type="button"
                          className={`flex-1 h-12 rounded-lg border-2 flex flex-col items-center justify-center transition-all touch-manipulation ${
                            isFiltered 
                              ? 'opacity-20' 
                              : apartment.status === 'sold'
                                ? 'bg-otau-neutral-100 border-otau-neutral-200 opacity-50'
                                : getRoomColor(apartment.rooms)
                          }`}
                          onClick={() => {
                            if (apartment.status !== 'sold' && !isFiltered) {
                              setSelectedApartment(apartment)
                            }
                          }}
                          disabled={apartment.status === 'sold' || isFiltered}
                        >
                          <div className={`w-2 h-2 rounded-full mb-0.5 ${getStatusBg(apartment.status)}`} />
                          <span className="text-[10px] font-bold text-otau-neutral-700">
                            {apartment.rooms}к
                          </span>
                          <span className="text-[8px] text-otau-neutral-500">
                            {apartment.area}м²
                          </span>
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sheet */}
      <AnimatePresence>
        {selectedApartment && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedApartment(null)}
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
              
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-otau-neutral-900">
                    Квартира №{selectedApartment.number}
                  </h2>
                  <p className="text-sm text-otau-neutral-500">
                    {selectedApartment.rooms}-комнатная, {selectedApartment.floor} этаж
                  </p>
                </div>
                <button type="button" onClick={() => setSelectedApartment(null)} className="p-2 touch-manipulation">
                  <X className="w-6 h-6 text-otau-neutral-400" />
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-4 gap-2 mb-5">
                <div className="bg-otau-neutral-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-otau-neutral-500">Площадь</p>
                  <p className="text-sm font-bold text-otau-neutral-900">{selectedApartment.area} м²</p>
                </div>
                <div className="bg-otau-neutral-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-otau-neutral-500">Этаж</p>
                  <p className="text-sm font-bold text-otau-neutral-900">{selectedApartment.floor}</p>
                </div>
                <div className="bg-otau-neutral-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-otau-neutral-500">Потолки</p>
                  <p className="text-sm font-bold text-otau-neutral-900">{selectedApartment.ceilingHeight}м</p>
                </div>
                <div className="bg-otau-neutral-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-otau-neutral-500">Балкон</p>
                  <p className="text-sm font-bold text-otau-neutral-900">{selectedApartment.balcony ? 'Да' : 'Нет'}</p>
                </div>
              </div>
              
              {/* Price */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-sm text-otau-neutral-500">Стоимость</p>
                  <p className="text-2xl font-bold text-otau-primary-500">
                    {formatPrice(selectedApartment.price)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-otau-neutral-500">за м²</p>
                  <p className="text-base font-medium text-otau-neutral-700">
                    {formatPrice(selectedApartment.pricePerSqm)}
                  </p>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex-1 h-14 bg-otau-primary-500 text-white font-semibold rounded-2xl active:bg-otau-primary-600 touch-manipulation"
                  onClick={() => onApartmentClick(selectedApartment)}
                  style={{ boxShadow: '0 8px 24px rgba(31,79,168,0.25)' }}
                >
                  Подробнее
                </button>
                <button
                  type="button"
                  className="flex-1 h-14 border-2 border-otau-neutral-200 font-semibold rounded-2xl text-otau-neutral-700 active:bg-otau-neutral-50 touch-manipulation"
                >
                  Забронировать
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
