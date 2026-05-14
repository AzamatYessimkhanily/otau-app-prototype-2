'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, Mic, Phone, MoreVertical, Check, CheckCheck } from 'lucide-react'
import { managers } from '@/lib/mock-data'
import { UserAvatar } from '@/components/user-avatar'

const initialMessages = [
  {
    id: '1',
    senderId: 'manager-1',
    text: 'Добрый день, Алихан! Рады приветствовать вас в OTAU App. Я ваш персональный менеджер. Чем могу помочь?',
    timestamp: new Date(Date.now() - 3600000),
    isRead: true,
  },
  {
    id: '2',
    senderId: 'user',
    text: 'Здравствуйте! Хотел бы узнать подробнее об Otau City',
    timestamp: new Date(Date.now() - 3000000),
    isRead: true,
  },
  {
    id: '3',
    senderId: 'manager-1',
    text: 'Отличный выбор! Otau City — жилой комплекс в мкр. Нурсат 2, ул. Назарбекова 29/1–29/4. Сдача ориентировочно в 3 квартале 2026. Есть квартиры от 1 до 3 комнат — подберём под ваш бюджет.',
    timestamp: new Date(Date.now() - 2400000),
    isRead: true,
  },
  {
    id: '4',
    senderId: 'manager-1',
    text: 'Могу отправить вам подборку квартир под ваши требования. Какой бюджет рассматриваете?',
    timestamp: new Date(Date.now() - 2000000),
    isRead: true,
  },
]

export function ChatScreen() {
  const [messages, setMessages] = useState(initialMessages)
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const manager = managers[0]
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const handleSend = () => {
    if (!inputText.trim()) return
    
    const newMessage = {
      id: Date.now().toString(),
      senderId: 'user',
      text: inputText,
      timestamp: new Date(),
      isRead: false,
    }
    
    setMessages(prev => [...prev, newMessage])
    setInputText('')
    setIsTyping(true)
    
    // Simulate manager typing
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        senderId: 'manager-1',
        text: 'Спасибо за информацию! Дайте мне пару минут, подготовлю для вас варианты.',
        timestamp: new Date(),
        isRead: false,
      }])
    }, 2000)
  }
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-otau-neutral-50 to-white">
      {/* Header */}
      <header 
        className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-otau-neutral-100/50 shadow-sm"
        style={{ paddingTop: 'env(safe-area-inset-top, 12px)' }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <UserAvatar
                name={manager.name}
                src={manager.avatar}
                size={48}
                wrapperClassName="ring-2 ring-otau-primary-100 ring-offset-2"
              />
              <span 
                className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"
              />
            </div>
            <div>
              <h2 className="text-base font-bold text-otau-neutral-900">{manager.name}</h2>
              <p className="text-xs text-green-500 font-medium">Онлайн</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              className="w-11 h-11 rounded-full bg-otau-primary-50 flex items-center justify-center active:bg-otau-primary-100 touch-manipulation transition-colors"
            >
              <Phone className="w-5 h-5 text-otau-primary-500" />
            </button>
            <button 
              type="button" 
              className="w-11 h-11 rounded-full bg-otau-neutral-100 flex items-center justify-center active:bg-otau-neutral-200 touch-manipulation transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-otau-neutral-600" />
            </button>
          </div>
        </div>
      </header>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
        <div className="space-y-4">
          {messages.map((message, index) => {
            const isUser = message.senderId === 'user'
            const showAvatar = !isUser && (index === 0 || messages[index - 1].senderId !== message.senderId)
            
            return (
              <motion.div
                key={message.id}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                {!isUser && showAvatar && (
                  <div className="mr-2 flex-shrink-0 shadow-sm rounded-full">
                    <UserAvatar
                      name={manager.name}
                      src={manager.avatar}
                      size={32}
                    />
                  </div>
                )}
                {!isUser && !showAvatar && <div className="w-10 flex-shrink-0" />}
                
                <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
                  <div 
                    className={`px-4 py-3 ${
                      isUser 
                        ? 'bg-gradient-to-br from-otau-primary-500 to-otau-primary-600 text-white rounded-2xl rounded-br-md shadow-md' 
                        : 'bg-white text-otau-neutral-800 rounded-2xl rounded-bl-md shadow-sm border border-otau-neutral-100'
                    }`}
                  >
                    <p className="text-[15px] leading-relaxed">{message.text}</p>
                  </div>
                  <div className={`flex items-center gap-1 mt-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <p className="text-[11px] text-otau-neutral-400">
                      {formatTime(message.timestamp)}
                    </p>
                    {isUser && (
                      message.isRead 
                        ? <CheckCheck className="w-3.5 h-3.5 text-otau-primary-500" />
                        : <Check className="w-3.5 h-3.5 text-otau-neutral-400" />
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
          
          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mr-2 flex-shrink-0">
                <UserAvatar
                  name={manager.name}
                  src={manager.avatar}
                  size={32}
                />
              </div>
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-otau-neutral-100">
                <div className="flex gap-1">
                  <motion.span 
                    className="w-2 h-2 bg-otau-neutral-400 rounded-full"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  />
                  <motion.span 
                    className="w-2 h-2 bg-otau-neutral-400 rounded-full"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.span 
                    className="w-2 h-2 bg-otau-neutral-400 rounded-full"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input area — lifted above bottom tab bar */}
      <div 
        className="sticky bottom-0 bg-white/95 backdrop-blur-xl border-t border-otau-neutral-100/50 px-4 py-3"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 84px)' }}
      >
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            className="w-11 h-11 rounded-full bg-otau-neutral-100 flex items-center justify-center flex-shrink-0 active:bg-otau-neutral-200 touch-manipulation transition-colors"
          >
            <Paperclip className="w-5 h-5 text-otau-neutral-500" />
          </button>
          
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Написать сообщение..."
              className="w-full h-12 px-5 bg-otau-neutral-100 rounded-full text-[15px] text-otau-neutral-900 placeholder:text-otau-neutral-400 focus:outline-none focus:ring-2 focus:ring-otau-primary-500/30 focus:bg-white transition-all border border-transparent focus:border-otau-primary-200"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
          </div>
          
          {inputText.trim() ? (
            <motion.button 
              type="button"
              className="w-11 h-11 rounded-full bg-otau-primary-500 flex items-center justify-center flex-shrink-0 active:bg-otau-primary-600 touch-manipulation transition-colors"
              style={{ boxShadow: '0 4px 14px rgba(31,79,168,0.30)' }}
              onClick={handleSend}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <Send className="w-5 h-5 text-white ml-0.5" />
            </motion.button>
          ) : (
            <button 
              type="button" 
              className="w-11 h-11 rounded-full bg-otau-neutral-100 flex items-center justify-center flex-shrink-0 active:bg-otau-neutral-200 touch-manipulation transition-colors"
            >
              <Mic className="w-5 h-5 text-otau-neutral-500" strokeWidth={1.75} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
