'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowLeft, Heart, MapPin, Building2, Home, Calendar, Car, Shield, Baby, Dumbbell, ChevronRight, Phone, CalendarDays, Share2, Play } from 'lucide-react'
import Image from 'next/image'
import { 
  residentialComplexes, 
  formatPriceShort,
  getStatusLabel,
  getStatusColor,
  type Apartment,
} from '@/lib/mock-data'

interface ComplexDetailScreenProps {
  complexId: string
  onBack: () => void
  onApartmentClick: (apartment: Apartment) => void
  onChessboardClick: () => void
}

const tabs = [
  { id: 'overview', label: 'Обзор' },
  { id: 'chessboard', label: 'Шахматка' },
  { id: 'infrastructure', label: 'Инфра' },
  { id: 'progress', label: 'Стройка' },
  { id: 'docs', label: 'Документы' },
]

const features = [
  { icon: Car, label: 'Паркинг', count: '2 уровня' },
  { icon: Shield, label: 'Охрана 24/7', count: 'Видео' },
  { icon: Baby, label: 'Детская', count: '2 площадки' },
  { icon: Dumbbell, label: 'Фитнес', count: '500м²' },
]

const infrastructure = [
  { name: 'Школа №45', distance: '300м', type: 'school' },
  { name: 'Детский сад "Солнышко"', distance: '150м', type: 'kindergarten' },
  { name: 'Magnum', distance: '200м', type: 'shop' },
  { name: 'Центральный парк', distance: '500м', type: 'park' },
]

export function ComplexDetailScreen({ 
  complexId, 
  onBack, 
  onChessboardClick,
}: ComplexDetailScreenProps) {
  const complex = residentialComplexes.find(c => c.id === complexId)
  const [activeTab, setActiveTab] = useState('overview')
  const [isFavorite, setIsFavorite] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  if (!complex) return null

  return (
    <div className="h-full bg-gradient-to-b from-otau-neutral-50 to-white">
      <div 
        ref={scrollRef}
        className="h-full overflow-y-auto overscroll-contain"
      >
        {/* Hero */}
        <div className="relative z-0 h-[52vh] overflow-hidden">
          {complex.images.map((image, index) => (
            <motion.div
              key={image}
              className="absolute inset-0"
              initial={false}
              animate={{ 
                opacity: currentImage === index ? 1 : 0,
                scale: currentImage === index ? 1 : 1.05,
              }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={image}
                alt={`${complex.name} ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          ))}
          
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-transparent to-black/40 pointer-events-none" />
          
          {/* Nav */}
          <div 
            className="absolute left-4 right-4 flex items-center justify-between z-20"
            style={{ top: 'max(env(safe-area-inset-top), 12px)' }}
          >
            <motion.button
              type="button"
              className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-xl flex items-center justify-center border border-white/20 active:bg-black/50 touch-manipulation"
              onClick={onBack}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </motion.button>
            
            <div className="flex gap-2">
              <motion.button
                type="button"
                className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-xl flex items-center justify-center border border-white/20 active:bg-black/50 touch-manipulation"
                whileTap={{ scale: 0.9 }}
              >
                <Share2 className="w-5 h-5 text-white" />
              </motion.button>
              <motion.button
                type="button"
                className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-xl flex items-center justify-center border border-white/20 active:bg-black/50 touch-manipulation"
                onClick={() => setIsFavorite(!isFavorite)}
                whileTap={{ scale: 0.9 }}
              >
                <Heart 
                  className={`w-5 h-5 transition-colors ${isFavorite ? 'text-otau-accent-500 fill-otau-accent-500' : 'text-white'}`} 
                />
              </motion.button>
            </div>
          </div>
          
          {/* Status badge */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 z-20"
            style={{ top: 'calc(env(safe-area-inset-top, 12px) + 8px)' }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${getStatusColor(complex.status)}`}>
              {getStatusLabel(complex.status)}
            </span>
          </motion.div>
          
          {/* Карусель + 3D: выше зоны перекрытия белой карточкой (-mt-10), иначе точки «пропадают» под ней */}
          <div
            className="absolute inset-x-0 z-20 flex items-center justify-between gap-2 px-3 sm:px-4 pointer-events-none bottom-24 pb-[env(safe-area-inset-bottom)]"
          >
            <div className="w-24 flex-shrink-0" aria-hidden />
            <div className="flex flex-1 justify-center gap-2 pointer-events-auto min-w-0">
              {complex.images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`h-2.5 rounded-full transition-all duration-300 touch-manipulation shadow-sm ring-1 ring-black/20 ${
                    index === currentImage ? 'w-7 bg-white' : 'w-2 bg-white/70'
                  }`}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
            {complex.virtualTourUrl ? (
              <motion.a
                href={complex.virtualTourUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto flex-shrink-0 px-4 py-2.5 bg-white/25 backdrop-blur-xl rounded-full flex items-center gap-2 border border-white/40 shadow-md active:bg-white/35 touch-manipulation"
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-4 h-4 text-white fill-white" />
                <span className="text-sm font-semibold text-white whitespace-nowrap">3D тур</span>
              </motion.a>
            ) : (
              <div className="w-24 flex-shrink-0" aria-hidden />
            )}
          </div>
        </div>
        
        {/* Content */}
        <motion.div 
          className="relative z-10 -mt-10 bg-white rounded-t-[32px] min-h-[60vh] pb-36"
          style={{ boxShadow: '0 -12px 40px rgba(0,0,0,0.1)' }}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          {/* Handle indicator */}
          <div className="flex justify-center pt-3 pb-4">
            <div className="w-10 h-1 rounded-full bg-otau-neutral-200" />
          </div>
          
          <div className="px-5">
            {/* Title & Location */}
            <div className="mb-5">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="text-[26px] font-bold text-otau-neutral-900 leading-tight">
                  {complex.name}
                </h1>
                {complex.discount && (
                  <span className="px-3 py-1.5 bg-otau-accent-500 text-white text-xs font-bold rounded-full flex-shrink-0">
                    -{complex.discount}%
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-otau-neutral-500">
                <MapPin className="w-4 h-4" />
                <span className="text-[15px]">{complex.location}</span>
              </div>
            </div>
            
            {/* Price card */}
            <div className="bg-gradient-to-r from-otau-primary-50 to-otau-primary-100/50 rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-otau-primary-600 font-medium mb-1">Цена от</p>
                  <p className="text-[28px] font-bold text-otau-primary-600">
                    {formatPriceShort(complex.priceFrom)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-otau-primary-600 font-medium mb-1">Доступно</p>
                  <p className="text-xl font-bold text-otau-primary-600">
                    {complex.availableApartments} <span className="text-base font-medium">квартир</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: Building2, label: 'Этажей', value: complex.floors },
                { icon: Home, label: 'Корпусов', value: complex.buildings },
                { icon: Calendar, label: 'Сдача', value: complex.completionDate.split(' ')[0] },
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="bg-otau-neutral-50 rounded-2xl p-4 text-center border border-otau-neutral-100"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <stat.icon className="w-6 h-6 text-otau-primary-500 mx-auto mb-2" />
                  <p className="text-xs text-otau-neutral-500 mb-0.5">{stat.label}</p>
                  <p className="text-lg font-bold text-otau-neutral-900">{stat.value}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5 mb-6 pb-1">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  type="button"
                  className={`px-5 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all touch-manipulation ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-otau-primary-500 to-otau-primary-600 text-white shadow-lg shadow-otau-primary-500/25'
                      : 'bg-otau-neutral-100 text-otau-neutral-600 active:bg-otau-neutral-200'
                  }`}
                  onClick={() => {
                    setActiveTab(tab.id)
                    if (tab.id === 'chessboard') onChessboardClick()
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
            
            {/* Tab Content */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Description */}
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-otau-neutral-900 mb-3">О комплексе</h2>
                  <p className="text-[15px] text-otau-neutral-600 leading-relaxed">
                    {complex.description}
                  </p>
                </div>
                
                {/* Features */}
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-otau-neutral-900 mb-4">Преимущества</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {features.map((feature, index) => (
                      <motion.div 
                        key={feature.label}
                        className="flex items-center gap-3 bg-otau-neutral-50 rounded-2xl p-4 border border-otau-neutral-100"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <div className="w-12 h-12 rounded-xl bg-otau-primary-100 flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-6 h-6 text-otau-primary-500" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-otau-neutral-900">{feature.label}</p>
                          <p className="text-xs text-otau-neutral-500">{feature.count}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Gallery */}
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-otau-neutral-900 mb-4">Галерея</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {complex.images.slice(1).map((image, index) => (
                      <motion.button 
                        key={index} 
                        type="button"
                        className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm active:scale-[0.98] transition-transform touch-manipulation"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <Image
                          src={image}
                          alt={`${complex.name} ${index + 2}`}
                          fill
                          className="object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'infrastructure' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                {infrastructure.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center justify-between bg-otau-neutral-50 rounded-2xl p-4 border border-otau-neutral-100"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-otau-primary-100 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-otau-primary-500" />
                      </div>
                      <span className="text-[15px] font-semibold text-otau-neutral-900">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-otau-primary-500 bg-otau-primary-50 px-3 py-1 rounded-full">{item.distance}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {activeTab === 'progress' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {complex.images.map((image, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-otau-neutral-50 rounded-2xl p-3 border border-otau-neutral-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-3 shadow-sm">
                      <Image
                        src={image}
                        alt={`Ход строительства ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between px-1">
                      <p className="text-sm font-semibold text-otau-neutral-700">
                        {new Date(Date.now() - index * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU', { 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                      <span className="text-xs text-otau-primary-500 font-medium bg-otau-primary-50 px-2 py-1 rounded-full">
                        {100 - index * 15}% готовности
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {activeTab === 'docs' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                {['Разрешение на строительство', 'Проектная декларация', 'Технические условия', 'Акт ввода в эксплуатацию'].map((doc, index) => (
                  <motion.button 
                    key={index}
                    type="button"
                    className="w-full flex items-center justify-between bg-otau-neutral-50 rounded-2xl p-4 active:bg-otau-neutral-100 touch-manipulation transition-colors border border-otau-neutral-100"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-[15px] font-semibold text-otau-neutral-900">{doc}</span>
                    <ChevronRight className="w-5 h-5 text-otau-neutral-400" />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Bottom CTA */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-2xl border-t border-otau-neutral-100/50 px-5 py-4"
        style={{ 
          paddingBottom: 'max(env(safe-area-inset-bottom), 20px)',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.05)'
        }}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: 'spring', damping: 25 }}
      >
        <div className="flex gap-3">
          <motion.button
            type="button"
            className="flex-1 h-[56px] bg-gradient-to-r from-otau-primary-500 to-otau-primary-600 text-white font-bold text-[16px] rounded-2xl flex items-center justify-center gap-2 active:opacity-90 touch-manipulation transition-opacity"
            onClick={onChessboardClick}
            whileTap={{ scale: 0.97 }}
            style={{ boxShadow: '0 12px 32px rgba(31,79,168,0.3)' }}
          >
            Выбрать квартиру
            <ChevronRight className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            type="button"
            className="w-[56px] h-[56px] bg-otau-neutral-100 border border-otau-neutral-200 rounded-2xl flex items-center justify-center active:bg-otau-neutral-200 touch-manipulation transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <Phone className="w-5 h-5 text-otau-neutral-700" />
          </motion.button>
          
          <motion.button
            type="button"
            className="w-[56px] h-[56px] bg-otau-neutral-100 border border-otau-neutral-200 rounded-2xl flex items-center justify-center active:bg-otau-neutral-200 touch-manipulation transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <CalendarDays className="w-5 h-5 text-otau-neutral-700" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
