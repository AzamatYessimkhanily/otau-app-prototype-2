'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SplashScreen } from '@/components/splash-screen'
import { Onboarding } from '@/components/onboarding'
import { AuthScreen } from '@/components/auth-screen'
import { HomeScreen } from '@/components/home-screen'
import { CatalogScreen } from '@/components/catalog-screen'
import { ComplexDetailScreen } from '@/components/complex-detail-screen'
import { ChessboardScreen } from '@/components/chessboard-screen'
import { ApartmentDetailScreen } from '@/components/apartment-detail-screen'
import { ProfileScreen } from '@/components/profile-screen'
import { FavoritesScreen } from '@/components/favorites-screen'
import { ChatScreen } from '@/components/chat-screen'
import { BottomTabBar } from '@/components/bottom-tab-bar'
import { residentialComplexes, type Apartment } from '@/lib/mock-data'

type Screen = 
  | 'splash'
  | 'onboarding'
  | 'auth'
  | 'home'
  | 'catalog'
  | 'complex-detail'
  | 'chessboard'
  | 'apartment-detail'
  | 'favorites'
  | 'profile'
  | 'chat'

type TabId = 'home' | 'catalog' | 'favorites' | 'profile' | 'chat'

export default function OtauApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash')
  const [activeTab, setActiveTab] = useState<TabId>('home')
  const [selectedComplexId, setSelectedComplexId] = useState<string | null>(null)
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null)
  const [screenHistory, setScreenHistory] = useState<Screen[]>([])
  
  const navigateTo = useCallback((screen: Screen) => {
    setScreenHistory(prev => [...prev, currentScreen])
    setCurrentScreen(screen)
  }, [currentScreen])
  
  const goBack = useCallback(() => {
    if (screenHistory.length > 0) {
      const prevScreen = screenHistory[screenHistory.length - 1]
      setScreenHistory(prev => prev.slice(0, -1))
      setCurrentScreen(prevScreen)
    } else {
      setCurrentScreen('home')
    }
  }, [screenHistory])
  
  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab)
    setScreenHistory([])
    switch (tab) {
      case 'home':
        setCurrentScreen('home')
        break
      case 'catalog':
        setCurrentScreen('catalog')
        break
      case 'favorites':
        setCurrentScreen('favorites')
        break
      case 'profile':
        setCurrentScreen('profile')
        break
      case 'chat':
        setCurrentScreen('chat')
        break
    }
  }, [])
  
  const handleComplexClick = useCallback((complexId: string) => {
    setSelectedComplexId(complexId)
    navigateTo('complex-detail')
  }, [navigateTo])
  
  const handleApartmentClick = useCallback((apartment: Apartment) => {
    setSelectedApartment(apartment)
    navigateTo('apartment-detail')
  }, [navigateTo])
  
  const showBottomBar = ['home', 'catalog', 'favorites', 'profile', 'chat'].includes(currentScreen)
  
  const selectedComplex = selectedComplexId 
    ? residentialComplexes.find(c => c.id === selectedComplexId) 
    : null

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-otau-neutral-50">
      <AnimatePresence mode="wait">
        {currentScreen === 'splash' && (
          <motion.div
            key="splash"
            className="absolute inset-0"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SplashScreen onComplete={() => setCurrentScreen('onboarding')} />
          </motion.div>
        )}
        
        {currentScreen === 'onboarding' && (
          <motion.div
            key="onboarding"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Onboarding onComplete={() => setCurrentScreen('auth')} />
          </motion.div>
        )}
        
        {currentScreen === 'auth' && (
          <motion.div
            key="auth"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AuthScreen onComplete={() => setCurrentScreen('home')} />
          </motion.div>
        )}
        
        {currentScreen === 'home' && (
          <motion.div
            key="home"
            className="absolute inset-0 overflow-y-auto overscroll-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <HomeScreen 
              onComplexClick={handleComplexClick}
              onCatalogClick={() => handleTabChange('catalog')}
            />
          </motion.div>
        )}
        
        {currentScreen === 'catalog' && (
          <motion.div
            key="catalog"
            className="absolute inset-0 overflow-y-auto overscroll-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <CatalogScreen 
              onComplexClick={handleComplexClick}
              onBack={() => handleTabChange('home')}
            />
          </motion.div>
        )}
        
        {currentScreen === 'complex-detail' && selectedComplexId && (
          <motion.div
            key="complex-detail"
            className="absolute inset-0 overflow-y-auto overscroll-contain"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <ComplexDetailScreen 
              complexId={selectedComplexId}
              onBack={goBack}
              onApartmentClick={handleApartmentClick}
              onChessboardClick={() => navigateTo('chessboard')}
            />
          </motion.div>
        )}
        
        {currentScreen === 'chessboard' && selectedComplexId && (
          <motion.div
            key="chessboard"
            className="absolute inset-0 overflow-y-auto overscroll-contain"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <ChessboardScreen 
              complexId={selectedComplexId}
              onBack={goBack}
              onApartmentClick={handleApartmentClick}
            />
          </motion.div>
        )}
        
        {currentScreen === 'apartment-detail' && selectedApartment && selectedComplex && (
          <motion.div
            key="apartment-detail"
            className="absolute inset-0 overflow-y-auto overscroll-contain"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <ApartmentDetailScreen 
              apartment={selectedApartment}
              complexName={selectedComplex.name}
              onBack={goBack}
            />
          </motion.div>
        )}
        
        {currentScreen === 'favorites' && (
          <motion.div
            key="favorites"
            className="absolute inset-0 overflow-y-auto overscroll-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <FavoritesScreen onComplexClick={handleComplexClick} />
          </motion.div>
        )}
        
        {currentScreen === 'profile' && (
          <motion.div
            key="profile"
            className="absolute inset-0 overflow-y-auto overscroll-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <ProfileScreen 
              onServiceClick={() => {}}
              onClubClick={() => {}}
            />
          </motion.div>
        )}
        
        {currentScreen === 'chat' && (
          <motion.div
            key="chat"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <ChatScreen />
          </motion.div>
        )}
      </AnimatePresence>
      
      {showBottomBar && (
        <BottomTabBar 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          unreadMessages={2}
        />
      )}
    </div>
  )
}
