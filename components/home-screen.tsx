'use client'

import { motion } from 'framer-motion'
import { Bell, Search, MapPin, ChevronRight, Sparkles, TrendingUp, Percent, Calendar, Gift, Clock, Flame, Play, Eye, Building2, Tag, Phone, MessageCircle, Award, ShieldCheck, Crown } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { 
  currentUser, 
  residentialComplexes, 
  quickFilters,
  newsItems,
  stories,
  constructionUpdates,
  managers,
  formatPriceShort,
  getStatusLabel,
  getStatusColor,
} from '@/lib/mock-data'
import { UserAvatar } from '@/components/user-avatar'

interface HomeScreenProps {
  onComplexClick: (complexId: string) => void
  onCatalogClick: () => void
}

export function HomeScreen({ onComplexClick, onCatalogClick }: HomeScreenProps) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [currentBanner, setCurrentBanner] = useState(0)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % residentialComplexes.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])
  
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Доброе утро'
    if (hour < 18) return 'Добрый день'
    return 'Добрый вечер'
  }

  return (
    <div className="min-h-full bg-gradient-to-b from-white via-otau-neutral-50 to-otau-neutral-50 pb-6">
      {/* Header */}
      <header 
        className="sticky top-0 z-30 bg-white/90 backdrop-blur-2xl border-b border-otau-neutral-100/50"
        style={{ paddingTop: 'env(safe-area-inset-top, 12px)' }}
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div whileTap={{ scale: 0.95 }}>
                <UserAvatar
                  name={currentUser.fullName}
                  src={currentUser.avatar}
                  size={48}
                  wrapperClassName="ring-2 ring-otau-primary-100 ring-offset-2"
                />
              </motion.div>
              <div>
                <p className="text-sm text-otau-neutral-500">{getGreeting()},</p>
                <p className="text-base font-bold text-otau-neutral-900">{currentUser.name}</p>
              </div>
            </div>
            
            <motion.button 
              type="button"
              className="relative w-12 h-12 flex items-center justify-center rounded-full bg-otau-neutral-100 active:bg-otau-neutral-200 touch-manipulation"
              whileTap={{ scale: 0.96 }}
            >
              <Bell className="w-5 h-5 text-otau-neutral-700" strokeWidth={1.75} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-otau-accent-500 rounded-full border-2 border-white" />
            </motion.button>
          </div>
          
          {/* Search */}
          <button 
            type="button"
            className="w-full h-12 px-5 bg-otau-neutral-100 rounded-2xl flex items-center gap-3 active:bg-otau-neutral-200 touch-manipulation transition-colors border border-transparent hover:border-otau-neutral-200"
            onClick={onCatalogClick}
          >
            <Search className="w-5 h-5 text-otau-neutral-400" strokeWidth={1.75} />
            <span className="text-[15px] text-otau-neutral-400">Найти ЖК или квартиру...</span>
          </button>
        </div>
      </header>
      
      <div className="px-4 pt-4">
        {/* Stories row — short editorial highlights */}
        <section className="-mx-4 mb-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4">
            {stories.map((story) => (
              <button
                key={story.id}
                type="button"
                className="flex flex-col items-center gap-1.5 flex-shrink-0 touch-manipulation active:opacity-80 transition-opacity"
              >
                <div className={`relative w-[68px] h-[68px] rounded-full p-[2px] bg-gradient-to-br ${story.accent}`}>
                  <div className="w-full h-full rounded-full bg-white p-[2px]">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-otau-neutral-700 max-w-[72px] truncate">
                  {story.title}
                </span>
              </button>
            ))}
          </div>
        </section>
        
        {/* Hero Banner — calm crossfade, clean overlay */}
        <div 
          className="relative h-[220px] rounded-3xl overflow-hidden mb-4"
          style={{ boxShadow: '0 1px 2px rgba(11,14,22,0.04), 0 16px 40px rgba(11,14,22,0.10)' }}
        >
          {residentialComplexes.map((complex, index) => (
            <motion.div
              key={complex.id}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: index === currentBanner ? 1 : 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <Image
                src={complex.images[0]}
                alt={complex.name}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              <button
                type="button"
                className="absolute inset-0 text-left p-5 flex flex-col justify-end touch-manipulation"
                onClick={() => onComplexClick(complex.id)}
              >
                <div className="flex items-center gap-2 mb-2">
                  {complex.discount && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-otau-accent-500 text-white text-[11px] font-bold rounded-full">
                      <Sparkles className="w-3 h-3" />
                      -{complex.discount}%
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/15 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wider rounded-full border border-white/20">
                    <TrendingUp className="w-3 h-3" />
                    ТОП продаж
                  </span>
                </div>
                <h3 className="text-white text-[22px] font-bold mb-1 tracking-tight">{complex.name}</h3>
                <p className="text-white/75 text-[13px]">{complex.location}</p>
              </button>
            </motion.div>
          ))}
          
          {/* Dots */}
          <div className="absolute bottom-4 right-4 flex gap-1.5 pointer-events-none">
            {residentialComplexes.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentBanner ? 'w-5 bg-white' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Brand stats strip — quiet trust signal */}
        <div className="grid grid-cols-3 bg-white border border-otau-neutral-100 rounded-2xl mb-4 overflow-hidden">
          <div className="px-3 py-3 text-center">
            <p className="text-[20px] font-bold text-otau-neutral-900 tracking-tight">12+</p>
            <p className="text-[11px] text-otau-neutral-500 mt-0.5">лет на рынке</p>
          </div>
          <div className="px-3 py-3 text-center border-x border-otau-neutral-100">
            <p className="text-[20px] font-bold text-otau-neutral-900 tracking-tight">8</p>
            <p className="text-[11px] text-otau-neutral-500 mt-0.5">сданных ЖК</p>
          </div>
          <div className="px-3 py-3 text-center">
            <p className="text-[20px] font-bold text-otau-neutral-900 tracking-tight">8 400+</p>
            <p className="text-[11px] text-otau-neutral-500 mt-0.5">семей у нас</p>
          </div>
        </div>
        
        {/* Quick Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 mb-4 pb-0.5">
          {quickFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`px-5 py-2.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors touch-manipulation ${
                activeFilter === filter.id
                  ? 'bg-otau-neutral-900 text-white'
                  : 'bg-white text-otau-neutral-700 active:bg-otau-neutral-100 border border-otau-neutral-200/70'
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        {/* Recommended */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-otau-neutral-900">Рекомендуем</h2>
            <motion.button 
              type="button"
              className="flex items-center gap-1 text-sm font-semibold text-otau-primary-500 active:opacity-70 touch-manipulation"
              onClick={onCatalogClick}
              whileTap={{ scale: 0.95 }}
            >
              Все <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
          
          {/* Cards */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
            {residentialComplexes.map((complex) => (
              <button
                key={complex.id}
                type="button"
                className="flex-shrink-0 w-[280px] bg-white rounded-3xl overflow-hidden text-left transition-shadow touch-manipulation border border-otau-neutral-100"
                style={{ boxShadow: '0 1px 2px rgba(11,14,22,0.04), 0 8px 24px rgba(11,14,22,0.05)' }}
                onClick={() => onComplexClick(complex.id)}
              >
                <div className="relative h-[170px]">
                  <Image
                    src={complex.images[0]}
                    alt={complex.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(complex.status)}`}>
                    {getStatusLabel(complex.status)}
                  </span>
                  {complex.discount && (
                    <span className="absolute top-3 right-3 px-3 py-1 bg-otau-accent-500 text-white rounded-full text-xs font-bold shadow-lg">
                      -{complex.discount}%
                    </span>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="text-[17px] font-bold text-otau-neutral-900 mb-1 tracking-tight">{complex.name}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-otau-neutral-500 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{complex.district}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[17px] font-bold text-otau-primary-500">
                      от {formatPriceShort(complex.priceFrom)}
                    </p>
                    <span className="text-[11px] text-otau-neutral-500 bg-otau-neutral-100 px-2 py-1 rounded-full font-medium">
                      {complex.availableApartments} кв.
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
        
        {/* Construction progress — horizontal scroll */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-otau-neutral-900">Прогресс стройки</h2>
              <p className="text-xs text-otau-neutral-500 mt-0.5">Свежие отчёты с площадок</p>
            </div>
            <motion.button 
              type="button"
              className="flex items-center gap-1 text-sm font-semibold text-otau-primary-500 active:opacity-70 touch-manipulation"
              whileTap={{ scale: 0.95 }}
            >
              Все <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
          
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
            {constructionUpdates.map((update, index) => (
              <button
                key={update.complexId + index}
                type="button"
                className="flex-shrink-0 w-[260px] bg-white rounded-3xl overflow-hidden text-left touch-manipulation border border-otau-neutral-100"
                style={{ boxShadow: '0 1px 2px rgba(11,14,22,0.04), 0 8px 24px rgba(11,14,22,0.05)' }}
                onClick={() => onComplexClick(update.complexId)}
              >
                <div className="relative h-[140px]">
                  <Image
                    src={update.image}
                    alt={update.complexName}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-full">
                    <Building2 className="w-3 h-3 text-white" />
                    <span className="text-[11px] font-semibold text-white">{update.stage}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-sm font-bold mb-1 truncate">{update.complexName}</p>
                    <p className="text-white/70 text-[11px]">{update.updatedAt}</p>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-otau-neutral-500 font-medium">Готовность</span>
                    <span className="text-xs font-bold text-otau-primary-500">{update.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-otau-neutral-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-otau-primary-500 to-otau-primary-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${update.progress}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
        
        {/* Personal manager — concierge card */}
        <section className="mb-8">
          <div className="bg-white border border-otau-neutral-100 rounded-3xl p-4 flex items-center gap-3">
            <UserAvatar
              name={managers[0].name}
              src={managers[0].avatar}
              size={52}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <p className="text-[11px] uppercase tracking-wider font-bold text-otau-primary-600">Ваш менеджер</p>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              </div>
              <p className="text-[15px] font-bold text-otau-neutral-900 truncate tracking-tight">{managers[0].name}</p>
              <p className="text-[12px] text-otau-neutral-500 truncate">{managers[0].position}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                className="w-11 h-11 rounded-full bg-otau-neutral-100 flex items-center justify-center active:bg-otau-neutral-200 touch-manipulation transition-colors"
              >
                <Phone className="w-5 h-5 text-otau-neutral-700" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                className="w-11 h-11 rounded-full bg-otau-primary-500 flex items-center justify-center active:bg-otau-primary-600 touch-manipulation transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-white" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </section>
        
        {/* Promo Cards — refined bento, no gradients on small cards */}
        <section className="mb-8">
          <h2 className="text-[20px] font-bold text-otau-neutral-900 mb-4 tracking-tight">Акции и предложения</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Big card */}
            <button
              type="button"
              className="col-span-2 bg-otau-neutral-900 rounded-3xl p-5 text-left relative overflow-hidden touch-manipulation"
            >
              <div 
                className="absolute inset-0 opacity-90"
                style={{ background: 'radial-gradient(120% 80% at 100% 0%, rgba(200,38,30,0.55) 0%, rgba(11,14,22,0) 60%), linear-gradient(135deg, #1A1F2E 0%, #0B0E16 100%)' }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-otau-accent-500/95 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                    <Flame className="w-3 h-3" />
                    Hot
                  </span>
                  <span className="text-[11px] text-white/60 font-medium">До 15%</span>
                </div>
                <h3 className="text-[22px] font-bold text-white mb-1 tracking-tight">Чёрная пятница</h3>
                <p className="text-white/70 text-[13px] mb-3 leading-relaxed">Особые условия на квартиры в Otau City</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-white/50" />
                  <span className="text-white/60 text-[12px] font-medium">Осталось 3 дня</span>
                </div>
              </div>
            </button>
            
            <button
              type="button"
              className="bg-white border border-otau-neutral-200/70 rounded-2xl p-4 text-left touch-manipulation"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
                <Percent className="w-4.5 h-4.5 text-emerald-600" strokeWidth={2} />
              </div>
              <h4 className="text-[15px] font-bold text-otau-neutral-900 tracking-tight">Рассрочка 0%</h4>
              <p className="text-otau-neutral-500 text-xs mt-0.5">До 36 месяцев</p>
            </button>
            
            <button
              type="button"
              className="bg-white border border-otau-neutral-200/70 rounded-2xl p-4 text-left touch-manipulation"
            >
              <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center mb-3">
                <Gift className="w-4.5 h-4.5 text-violet-600" strokeWidth={2} />
              </div>
              <h4 className="text-[15px] font-bold text-otau-neutral-900 tracking-tight">Подарки</h4>
              <p className="text-otau-neutral-500 text-xs mt-0.5">Кухня в подарок</p>
            </button>
          </div>
        </section>
        
        {/* Video tour CTA — single wide editorial card */}
        <section className="mb-8">
          <button
            type="button"
            className="relative w-full h-[170px] rounded-3xl overflow-hidden text-left touch-manipulation"
            style={{ boxShadow: '0 1px 2px rgba(11,14,22,0.04), 0 16px 40px rgba(11,14,22,0.10)' }}
            onClick={() => {
              const tour = residentialComplexes.find((c) => c.id === 'muqagali')?.virtualTourUrl
              if (tour) window.open(tour, '_blank', 'noopener,noreferrer')
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
              alt="Видеотур"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-between px-6">
              <div className="max-w-[60%]">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/15 backdrop-blur-md rounded-full mb-3 border border-white/20">
                  <Eye className="w-3 h-3 text-white" />
                  <span className="text-[10px] font-semibold text-white tracking-wider">3D-ТУР · 4K</span>
                </span>
                <h3 className="text-white text-[20px] font-bold leading-tight mb-1 tracking-tight">Виртуальный тур по MUQAGALI</h3>
                <p className="text-white/75 text-[12px]">Посмотрите квартиру до визита в офис</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-xl">
                <Play className="w-5 h-5 text-otau-primary-600 ml-0.5" fill="currentColor" />
              </div>
            </div>
          </button>
        </section>
        
        {/* News & articles — editorial bento layout */}
        <section className="mb-8">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-otau-neutral-900">Журнал OTAU</h2>
              <p className="text-xs text-otau-neutral-500 mt-0.5">Истории, советы и события</p>
            </div>
            <motion.button 
              type="button"
              className="flex items-center gap-1 text-sm font-semibold text-otau-primary-500 active:opacity-70 touch-manipulation"
              whileTap={{ scale: 0.95 }}
            >
              Все <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
          
          {/* Featured news — large hero card */}
          {(() => {
            const featured = newsItems.find(n => n.isFeatured) ?? newsItems[0]
            return (
              <button
                type="button"
                className="relative w-full h-[260px] rounded-3xl overflow-hidden text-left touch-manipulation mb-3 group"
                style={{ boxShadow: '0 1px 2px rgba(11,14,22,0.04), 0 12px 32px rgba(11,14,22,0.08)' }}
              >
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-otau-neutral-900 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    <Tag className="w-3 h-3" />
                    {featured.category}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 bg-white/15 backdrop-blur-md text-white rounded-full text-[10px] font-semibold uppercase tracking-wider border border-white/20">
                    Главное
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white text-[22px] font-bold leading-snug mb-2 line-clamp-2 tracking-tight">
                    {featured.title}
                  </h3>
                  <p className="text-white/80 text-[13px] leading-relaxed line-clamp-2 mb-3">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-[12px] text-white/70 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime} мин
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <span>{featured.publishedAt}</span>
                  </div>
                </div>
              </button>
            )
          })()}
          
          {/* Secondary news — bento 2-col grid */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            {newsItems.filter(n => !n.isFeatured).slice(0, 2).map((news) => (
              <button
                key={news.id}
                type="button"
                className="relative h-[180px] rounded-2xl overflow-hidden text-left touch-manipulation bg-white border border-otau-neutral-100"
              >
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 bg-white/20 backdrop-blur-md text-white rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/20">
                    {news.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-white text-[13px] font-bold leading-tight line-clamp-3 mb-1.5 tracking-tight">
                    {news.title}
                  </h4>
                  <p className="text-white/60 text-[10px] font-medium">{news.publishedAt}</p>
                </div>
              </button>
            ))}
          </div>
          
          {/* List-style articles below */}
          <div className="space-y-2.5">
            {newsItems.filter(n => !n.isFeatured).slice(2).map((news) => (
              <button
                key={news.id}
                type="button"
                className="w-full bg-white rounded-2xl p-3 text-left border border-otau-neutral-100 touch-manipulation flex gap-3 active:bg-otau-neutral-50/60 transition-colors"
              >
                <div className="relative w-[84px] h-[84px] rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 py-0.5 flex flex-col justify-between">
                  <div>
                    <span className="inline-block text-otau-primary-600 text-[10px] font-bold uppercase tracking-wider mb-1">
                      {news.category}
                    </span>
                    <h4 className="text-[14px] font-bold text-otau-neutral-900 leading-tight line-clamp-2 tracking-tight">
                      {news.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-otau-neutral-400 font-medium">
                    <Clock className="w-3 h-3" />
                    <span>{news.readTime} мин</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-otau-neutral-300" />
                    <span>{news.publishedAt}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
        
        {/* Quick Services — subtle, light icons */}
        <section className="mb-8">
          <h2 className="text-[20px] font-bold text-otau-neutral-900 mb-4 tracking-tight">Быстрые действия</h2>
          
          <div className="grid grid-cols-4 gap-2.5">
            {[
              { icon: Calendar, label: 'Запись', bg: 'bg-blue-50', color: 'text-blue-600' },
              { icon: MapPin, label: 'Офисы', bg: 'bg-orange-50', color: 'text-orange-600' },
              { icon: Gift, label: 'Акции', bg: 'bg-pink-50', color: 'text-pink-600' },
              { icon: Bell, label: 'Новости', bg: 'bg-violet-50', color: 'text-violet-600' },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                className="flex flex-col items-center gap-2 py-3.5 bg-white rounded-2xl border border-otau-neutral-200/70 touch-manipulation active:bg-otau-neutral-50 transition-colors"
              >
                <div className={`w-11 h-11 ${item.bg} rounded-xl flex items-center justify-center`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} strokeWidth={1.75} />
                </div>
                <span className="text-[12px] font-medium text-otau-neutral-700">{item.label}</span>
              </button>
            ))}
          </div>
        </section>
        
        {/* Awards & trust badges — horizontal strip */}
        <section className="mb-8">
          <h2 className="text-[20px] font-bold text-otau-neutral-900 mb-4 tracking-tight">Доверие и награды</h2>
          
          <div className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
            {[
              { icon: Award, label: 'Property Awards 2024', sub: 'Лучший застройщик', tone: 'bg-amber-50 text-amber-700' },
              { icon: ShieldCheck, label: 'ISO 9001', sub: 'Система качества', tone: 'bg-blue-50 text-blue-700' },
              { icon: TrendingUp, label: 'NPS 9.2/10', sub: '4 800 отзывов', tone: 'bg-emerald-50 text-emerald-700' },
              { icon: Building2, label: 'Halyk Finance', sub: 'Эскроу-партнёр', tone: 'bg-violet-50 text-violet-700' },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex-shrink-0 w-[180px] bg-white border border-otau-neutral-200/70 rounded-2xl p-3.5"
              >
                <div className={`w-9 h-9 rounded-xl ${badge.tone} flex items-center justify-center mb-2.5`}>
                  <badge.icon className="w-4.5 h-4.5" strokeWidth={1.75} />
                </div>
                <p className="text-[13px] font-bold text-otau-neutral-900 tracking-tight leading-tight">{badge.label}</p>
                <p className="text-[11px] text-otau-neutral-500 mt-0.5">{badge.sub}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* OTAU Premium — elegant dark concierge upsell */}
        <section className="mb-8">
          <button
            type="button"
            className="relative w-full rounded-3xl overflow-hidden text-left touch-manipulation"
            style={{ 
              background: 'linear-gradient(135deg, #0B0E16 0%, #1A1F2E 55%, #2A1F0A 100%)',
              boxShadow: '0 1px 2px rgba(11,14,22,0.06), 0 16px 40px rgba(11,14,22,0.18)',
            }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)', transform: 'translate(40%, -40%)' }} />
            <div className="relative p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)' }}>
                <Crown className="w-6 h-6 text-white" strokeWidth={1.75} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1" style={{ color: '#D4AF37' }}>OTAU Premium</p>
                <h3 className="text-white text-[17px] font-bold tracking-tight mb-0.5">Персональный консьерж 24/7</h3>
                <p className="text-white/60 text-[12px]">Закрытые предложения, ранний доступ к лотам</p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40 flex-shrink-0" />
            </div>
          </button>
        </section>
        
        {/* Recently Viewed */}
        <section className="pb-4">
          <h2 className="text-[20px] font-bold text-otau-neutral-900 mb-4 tracking-tight">Вы недавно смотрели</h2>
          
          <div className="space-y-2.5">
            {residentialComplexes.slice(0, 2).map((complex) => (
              <button
                key={complex.id}
                type="button"
                className="w-full flex items-center gap-4 bg-white p-3 rounded-2xl text-left transition-colors touch-manipulation border border-otau-neutral-100 active:bg-otau-neutral-50/60"
                onClick={() => onComplexClick(complex.id)}
              >
                <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={complex.images[0]}
                    alt={complex.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-bold text-otau-neutral-900 truncate tracking-tight">{complex.name}</h3>
                  <p className="text-[13px] text-otau-neutral-500 mt-0.5">{complex.district}</p>
                  <p className="text-[15px] font-bold text-otau-primary-500 mt-0.5">
                    от {formatPriceShort(complex.priceFrom)}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-otau-neutral-300 flex-shrink-0" />
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
