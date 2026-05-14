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

/** В потоке flex-колонки (см. app/page.tsx), не fixed — не перекрывает карту/контент и стабильнее в PWA. */
export function BottomTabBar({ activeTab, onTabChange, unreadMessages = 0 }: BottomTabBarProps) {
  return (
    <div
      className="shrink-0 w-full border-t border-otau-neutral-100/50 bg-white/95 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] backdrop-blur-2xl"
      style={{
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 12px)',
      }}
    >
      <nav className="flex h-[68px] items-center justify-around px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon

          return (
            <button
              key={tab.id}
              type="button"
              className="relative flex h-full flex-1 flex-col items-center justify-center touch-manipulation transition-opacity active:opacity-70"
              onClick={() => onTabChange(tab.id)}
            >
              <div
                className={`relative flex h-8 w-12 items-center justify-center rounded-full transition-colors duration-200 ${
                  isActive ? 'bg-otau-primary-50' : ''
                }`}
              >
                <Icon
                  className={`h-6 w-6 transition-colors duration-200 ${
                    isActive ? 'text-otau-primary-500' : 'text-otau-neutral-400'
                  }`}
                  strokeWidth={isActive ? 2.1 : 1.6}
                  fill={isActive && tab.id === 'favorites' ? 'currentColor' : 'none'}
                />
                {tab.id === 'chat' && unreadMessages > 0 && (
                  <span className="absolute -top-0.5 right-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-otau-accent-500 px-1 text-[10px] font-bold text-white">
                    {unreadMessages > 9 ? '9+' : unreadMessages}
                  </span>
                )}
              </div>
              <span
                className={`mt-0.5 text-[11px] transition-colors duration-200 ${
                  isActive ? 'font-semibold text-otau-primary-500' : 'font-medium text-otau-neutral-400'
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
