'use client'

import { Home, Search, Heart, User, MessageCircle } from 'lucide-react'

type TabId = 'home' | 'catalog' | 'favorites' | 'profile' | 'chat'

interface BottomTabBarProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  unreadMessages?: number
}

const tabs: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Главная', icon: Home },
  { id: 'catalog', label: 'Каталог', icon: Search },
  { id: 'favorites', label: 'Избранное', icon: Heart },
  { id: 'profile', label: 'Моё', icon: User },
  { id: 'chat', label: 'Чат', icon: MessageCircle },
]

export function BottomTabBar({ activeTab, onTabChange, unreadMessages = 0 }: BottomTabBarProps) {
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-2xl border-t border-otau-neutral-100/50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 8px)',
      }}
    >
      <nav className="flex items-center justify-around h-[68px] px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon
          
          return (
            <button
              key={tab.id}
              type="button"
              className="flex flex-col items-center justify-center flex-1 h-full relative touch-manipulation active:opacity-70 transition-opacity"
              onClick={() => onTabChange(tab.id)}
            >
              <div 
                className={`relative w-12 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
                  isActive ? 'bg-otau-primary-50' : ''
                }`}
              >
                <Icon 
                  className={`w-6 h-6 transition-colors duration-200 ${
                    isActive ? 'text-otau-primary-500' : 'text-otau-neutral-400'
                  }`}
                  strokeWidth={isActive ? 2.1 : 1.6}
                  fill={isActive && tab.id === 'favorites' ? 'currentColor' : 'none'}
                />
                {tab.id === 'chat' && unreadMessages > 0 && (
                  <span 
                    className="absolute -top-0.5 right-0 min-w-[18px] h-[18px] bg-otau-accent-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1"
                  >
                    {unreadMessages > 9 ? '9+' : unreadMessages}
                  </span>
                )}
              </div>
              <span 
                className={`text-[11px] mt-0.5 transition-colors duration-200 ${
                  isActive ? 'text-otau-primary-500 font-semibold' : 'text-otau-neutral-400 font-medium'
                }`}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
