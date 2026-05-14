'use client'

import { Heart, MapPin, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { residentialComplexes, formatPriceShort, getStatusLabel, getStatusColor } from '@/lib/mock-data'

interface FavoritesScreenProps {
  onComplexClick: (complexId: string) => void
}

export function FavoritesScreen({ onComplexClick }: FavoritesScreenProps) {
  const favorites = residentialComplexes.slice(0, 2)

  return (
    <div className="min-h-full bg-otau-neutral-50 pb-8">
      {/* Header */}
      <header 
        className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-otau-neutral-100 px-4"
        style={{ paddingTop: 'env(safe-area-inset-top, 12px)' }}
      >
        <div className="py-3">
          <h1 className="text-2xl font-bold text-otau-neutral-900">Избранное</h1>
          <p className="text-sm text-otau-neutral-500 mt-1">{favorites.length} объекта</p>
        </div>
      </header>
      
      <div className="px-4 pt-4">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 rounded-full bg-otau-neutral-100 flex items-center justify-center mb-4">
              <Heart className="w-10 h-10 text-otau-neutral-300" />
            </div>
            <h2 className="text-lg font-bold text-otau-neutral-900 mb-2">Пока пусто</h2>
            <p className="text-sm text-otau-neutral-500 text-center">
              Добавляйте понравившиеся квартиры<br />в избранное для быстрого доступа
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {favorites.map((complex) => (
              <div
                key={complex.id}
                className="bg-white rounded-3xl overflow-hidden border border-otau-neutral-100"
                style={{ boxShadow: '0 1px 2px rgba(11,14,22,0.04), 0 8px 24px rgba(11,14,22,0.05)' }}
              >
                <div 
                  role="button"
                  tabIndex={0}
                  className="w-full text-left touch-manipulation cursor-pointer"
                  onClick={() => onComplexClick(complex.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onComplexClick(complex.id)
                    }
                  }}
                >
                  <div className="relative h-[160px]">
                    <Image
                      src={complex.images[0]}
                      alt={complex.name}
                      fill
                      className="object-cover"
                    />
                    <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(complex.status)}`}>
                      {getStatusLabel(complex.status)}
                    </span>
                    
                    <button
                      type="button"
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center active:bg-white touch-manipulation"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      <Heart className="w-5 h-5 text-otau-accent-500 fill-otau-accent-500" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-otau-neutral-900 mb-1">{complex.name}</h3>
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
                        <p className="text-xs text-otau-neutral-500">Доступно</p>
                        <p className="text-sm font-medium text-otau-neutral-700">
                          {complex.availableApartments} квартир
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex border-t border-otau-neutral-100">
                  <button 
                    type="button"
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-sm text-otau-primary-500 font-semibold border-r border-otau-neutral-100 active:bg-otau-neutral-50 touch-manipulation transition-colors"
                    onClick={() => onComplexClick(complex.id)}
                  >
                    Выбрать квартиру
                  </button>
                  <button 
                    type="button"
                    className="flex items-center justify-center gap-2 px-6 py-3 text-sm text-otau-neutral-400 active:bg-otau-neutral-50 touch-manipulation transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
