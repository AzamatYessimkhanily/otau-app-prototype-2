'use client'

import { motion } from 'framer-motion'
import { 
  CreditCard, FileText, Building2, MessageCircle, 
  Gift, Home as HomeIcon, Settings, ChevronRight, LogOut, Bell, Shield
} from 'lucide-react'
import { currentUser, formatPriceShort } from '@/lib/mock-data'
import { UserAvatar } from '@/components/user-avatar'

interface ProfileScreenProps {
  onServiceClick: () => void
  onClubClick: () => void
}

const menuItems = [
  { icon: CreditCard, label: 'Платежи', badge: '2 предстоящих', color: 'blue' },
  { icon: FileText, label: 'Документы', badge: '5 файлов', color: 'green' },
  { icon: Building2, label: 'Ход стройки', badge: 'Обновлено', color: 'orange' },
  { icon: MessageCircle, label: 'Чат с менеджером', badge: '', color: 'purple' },
]

const colorMap = {
  blue: 'bg-blue-50 text-blue-500',
  green: 'bg-green-50 text-green-500',
  orange: 'bg-orange-50 text-orange-500',
  purple: 'bg-purple-50 text-purple-500',
}

export function ProfileScreen({ onServiceClick, onClubClick }: ProfileScreenProps) {
  const { myApartment } = currentUser
  const paidPercentage = Math.round((myApartment.paidAmount / myApartment.price) * 100)

  return (
    <div className="min-h-full bg-gradient-to-b from-otau-neutral-50 to-white pb-28">
      {/* Header */}
      <header 
        className="relative bg-gradient-to-br from-otau-primary-600 via-otau-primary-500 to-otau-primary-700 px-5 pb-10 rounded-b-[36px] overflow-hidden"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 16px)' }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8 pt-2">
            <h1 className="text-2xl font-bold text-white">Личный кабинет</h1>
            <div className="flex gap-2">
              <button 
                type="button" 
                className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center active:bg-white/25 touch-manipulation border border-white/10 transition-colors"
              >
                <Bell className="w-5 h-5 text-white" strokeWidth={1.75} />
              </button>
              <button 
                type="button" 
                className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center active:bg-white/25 touch-manipulation border border-white/10 transition-colors"
              >
                <Settings className="w-5 h-5 text-white" strokeWidth={1.75} />
              </button>
            </div>
          </div>
          
          {/* User info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <UserAvatar
                name={currentUser.fullName}
                src={currentUser.avatar}
                size={72}
                wrapperClassName="ring-4 ring-white/20 ring-offset-2 ring-offset-otau-primary-500"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-[3px] border-otau-primary-500 flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-0.5">{currentUser.fullName}</h2>
              <p className="text-white/70 text-sm mb-1">{currentUser.phone}</p>
              <span className="inline-flex items-center px-2.5 py-0.5 bg-white/15 rounded-full text-xs text-white/90 font-medium">
                Резидент OTAU
              </span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="px-5 -mt-5">
        {/* My Apartment Card */}
        <div 
          className="bg-white rounded-3xl p-5 mb-4 border border-otau-neutral-100"
          style={{ boxShadow: '0 1px 2px rgba(11,14,22,0.04), 0 12px 28px rgba(11,14,22,0.06)' }}
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-xs text-otau-neutral-400 uppercase tracking-wide font-semibold mb-1">Моя квартира</p>
              <h3 className="text-lg font-bold text-otau-neutral-900 mb-0.5">{myApartment.complexName}</h3>
              <p className="text-sm text-otau-neutral-500">
                {myApartment.rooms}-комн • {myApartment.area} м² • {myApartment.floor} этаж
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-otau-primary-50 to-otau-primary-100 flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-10 h-10">
                <rect x="5" y="5" width="30" height="30" fill="none" stroke="#1F4FA8" strokeWidth="1.5" rx="2"/>
                <rect x="5" y="5" width="15" height="18" fill="#EEF3FB" stroke="#1F4FA8" strokeWidth="0.75"/>
                <rect x="20" y="5" width="15" height="12" fill="#EEF3FB" stroke="#1F4FA8" strokeWidth="0.75"/>
                <rect x="20" y="17" width="15" height="18" fill="#D6E2F4" stroke="#1F4FA8" strokeWidth="0.75"/>
              </svg>
            </div>
          </div>
          
          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-otau-neutral-600">Готовность дома</span>
              <span className="text-sm font-bold text-otau-primary-500">{myApartment.constructionProgress}%</span>
            </div>
            <div className="h-3 bg-otau-neutral-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-otau-primary-500 to-otau-primary-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${myApartment.constructionProgress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-otau-neutral-50 to-otau-primary-50/30 rounded-xl">
            <span className="text-sm font-medium text-otau-neutral-600">Планируемая сдача</span>
            <span className="text-sm font-bold text-otau-primary-600 bg-white px-3 py-1 rounded-full">{myApartment.deliveryDate}</span>
          </div>
        </div>
        
        {/* Payment status */}
        <div 
          className="bg-gradient-to-br from-otau-primary-700 via-otau-primary-600 to-otau-primary-500 rounded-3xl p-5 mb-5 text-white overflow-hidden relative"
        >
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-white/70 text-xs uppercase tracking-wide font-semibold mb-1">Оплачено</p>
                <p className="text-[28px] font-bold">{formatPriceShort(myApartment.paidAmount)}</p>
              </div>
              <div className="text-right">
                <p className="text-white/70 text-xs uppercase tracking-wide font-semibold mb-1">Всего</p>
                <p className="text-xl font-semibold text-white/90">{formatPriceShort(myApartment.price)}</p>
              </div>
            </div>
            
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden mb-2">
              <motion.div 
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${paidPercentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-white/70 text-xs font-medium">{paidPercentage}% от стоимости</p>
              <p className="text-white/70 text-xs font-medium">Осталось: {formatPriceShort(myApartment.price - myApartment.paidAmount)}</p>
            </div>
          </div>
        </div>
        
        {/* Menu */}
        <div 
          className="bg-white rounded-3xl overflow-hidden mb-5 border border-otau-neutral-100"
          style={{ boxShadow: '0 1px 2px rgba(11,14,22,0.04), 0 8px 20px rgba(11,14,22,0.04)' }}
        >
          {menuItems.map((item, index) => (
            <button 
              key={item.label}
              type="button"
              className={`w-full flex items-center justify-between p-4 text-left active:bg-otau-neutral-50 touch-manipulation transition-colors ${
                index !== menuItems.length - 1 ? 'border-b border-otau-neutral-100' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorMap[item.color as keyof typeof colorMap]}`}>
                  <item.icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <span className="text-[15px] font-semibold text-otau-neutral-900">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="text-xs text-otau-neutral-400 bg-otau-neutral-100 px-2 py-0.5 rounded-full">{item.badge}</span>
                )}
                <ChevronRight className="w-5 h-5 text-otau-neutral-300" />
              </div>
            </button>
          ))}
        </div>
        
        {/* Service & Club */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button 
            type="button"
            className="bg-white rounded-2xl p-5 text-left touch-manipulation border border-otau-neutral-100 active:bg-otau-neutral-50 transition-colors"
            style={{ boxShadow: '0 1px 2px rgba(11,14,22,0.04), 0 8px 20px rgba(11,14,22,0.04)' }}
            onClick={onServiceClick}
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
              <HomeIcon className="w-5.5 h-5.5 text-blue-600" strokeWidth={1.75} />
            </div>
            <h3 className="text-[15px] font-bold text-otau-neutral-900 mb-1 tracking-tight">OTAU Service</h3>
            <p className="text-xs text-otau-neutral-500">Заявки в УК, оплата ЖКХ</p>
          </button>
          
          <button 
            type="button"
            className="bg-white rounded-2xl p-5 text-left touch-manipulation border border-otau-neutral-100 active:bg-otau-neutral-50 transition-colors"
            style={{ boxShadow: '0 1px 2px rgba(11,14,22,0.04), 0 8px 20px rgba(11,14,22,0.04)' }}
            onClick={onClubClick}
          >
            <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mb-3">
              <Gift className="w-5.5 h-5.5 text-violet-600" strokeWidth={1.75} />
            </div>
            <h3 className="text-[15px] font-bold text-otau-neutral-900 mb-1 tracking-tight">OTAU Club</h3>
            <p className="text-xs text-otau-neutral-500">Скидки и привилегии</p>
          </button>
        </div>
        
        {/* Logout */}
        <button 
          type="button"
          className="w-full flex items-center justify-center gap-2 py-4 text-otau-accent-500 font-semibold active:opacity-70 touch-manipulation transition-opacity"
        >
          <LogOut className="w-5 h-5" />
          <span>Выйти из аккаунта</span>
        </button>
      </div>
    </div>
  )
}
