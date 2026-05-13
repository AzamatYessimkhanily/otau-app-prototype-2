'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronRight, ScanFace, Smartphone, MessageCircle } from 'lucide-react'
import Image from 'next/image'

interface AuthScreenProps {
  onComplete: () => void
}

export function AuthScreen({ onComplete }: AuthScreenProps) {
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<'phone' | 'code'>('phone')
  const [code, setCode] = useState(['', '', '', ''])
  
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '')
    if (digits.length <= 1) return digits
    if (digits.length <= 4) return `(${digits.slice(1)}`
    if (digits.length <= 7) return `(${digits.slice(1, 4)}) ${digits.slice(4)}`
    if (digits.length <= 9) return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`
  }
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const cleaned = value.replace(/[^\d()-\s]/g, '')
    setPhone(formatPhone('7' + cleaned.replace(/\D/g, '')))
  }
  
  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    
    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      nextInput?.focus()
    }
    
    // Auto-submit when all digits entered
    if (newCode.every(d => d) && newCode.join('').length === 4) {
      setIsLoading(true)
      setTimeout(onComplete, 1000)
    }
  }
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      prevInput?.focus()
    }
  }
  
  const handleSubmitPhone = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep('code')
    }, 1000)
  }
  
  // formatPhone strips the leading '7' country code, so the visible value carries
  // 10 digits when fully filled (XXX) XXX-XX-XX
  const isValidPhone = phone.replace(/\D/g, '').length === 10
  
  return (
    <motion.div 
      className="h-full flex flex-col bg-gradient-to-b from-white to-otau-neutral-50 px-6"
      style={{ 
        paddingTop: 'max(env(safe-area-inset-top), 48px)',
        paddingBottom: 'max(env(safe-area-inset-bottom), 24px)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo */}
      <div className="flex justify-center mb-10">
        <Image 
          src="/logo.png" 
          alt="OTAU" 
          width={180} 
          height={90}
          className="h-16 w-auto"
          priority
        />
      </div>
      
      {step === 'phone' ? (
        <>
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-[28px] font-bold text-otau-neutral-900 mb-3 tracking-tight">
              Добро пожаловать
            </h1>
            <p className="text-[15px] text-otau-neutral-500 leading-relaxed">
              Введите номер телефона для входа
            </p>
          </div>
          
          {/* Phone input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-otau-neutral-700 mb-2.5">
              Номер телефона
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2.5 pointer-events-none">
                <span className="text-xl">🇰🇿</span>
                <span className="text-otau-neutral-800 font-semibold">+7</span>
                <div className="w-px h-6 bg-otau-neutral-200" />
              </div>
              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(___) ___-__-__"
                className="w-full h-[58px] pl-28 pr-4 bg-white border-2 border-otau-neutral-200 rounded-2xl text-[17px] text-otau-neutral-900 font-medium placeholder:text-otau-neutral-300 focus:outline-none focus:ring-2 focus:ring-otau-primary-500/20 focus:border-otau-primary-500 transition-all"
              />
            </div>
          </div>
          
          {/* Submit */}
          <button
            type="button"
            className={`w-full h-[58px] rounded-2xl font-bold text-[17px] flex items-center justify-center gap-2 transition-all touch-manipulation ${
              isValidPhone
                ? 'bg-otau-primary-500 text-white active:bg-otau-primary-600'
                : 'bg-otau-neutral-100 text-otau-neutral-400'
            }`}
            onClick={handleSubmitPhone}
            disabled={!isValidPhone || isLoading}
            style={isValidPhone ? {
              boxShadow: '0 8px 22px rgba(31,79,168,0.28)',
            } : {}}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Получить код
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
          
          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-otau-neutral-200" />
            <span className="text-xs text-otau-neutral-400 font-medium uppercase tracking-wider">или</span>
            <div className="flex-1 h-px bg-otau-neutral-200" />
          </div>
          
          {/* Alternative methods */}
          <button
            type="button"
            className="w-full h-[58px] bg-white border border-otau-neutral-200 rounded-2xl font-semibold text-[15px] text-otau-neutral-700 flex items-center justify-center gap-3 active:bg-otau-neutral-50 transition-colors touch-manipulation mb-3"
            onClick={onComplete}
          >
            <ScanFace className="w-5 h-5 text-otau-primary-500" strokeWidth={1.75} />
            Войти по биометрии (Face ID)
          </button>
          
          <button
            type="button"
            className="w-full h-[58px] bg-white border border-otau-neutral-200 rounded-2xl font-semibold text-[15px] text-otau-neutral-700 flex items-center justify-center gap-3 active:bg-otau-neutral-50 transition-colors touch-manipulation"
            onClick={onComplete}
          >
            <MessageCircle className="w-5 h-5 text-green-600" strokeWidth={1.75} />
            Войти через WhatsApp
          </button>
        </>
      ) : (
        <>
          {/* Back button */}
          <button
            type="button"
            className="absolute left-4 w-10 h-10 rounded-full bg-otau-neutral-100 flex items-center justify-center active:bg-otau-neutral-200 touch-manipulation transition-colors"
            style={{ top: 'calc(env(safe-area-inset-top, 12px) + 8px)' }}
            onClick={() => setStep('phone')}
          >
            <ChevronRight className="w-5 h-5 text-otau-neutral-600 rotate-180" />
          </button>
          
          {/* Code entry title */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-otau-primary-50 flex items-center justify-center mx-auto mb-6">
              <Smartphone className="w-7 h-7 text-otau-primary-500" strokeWidth={1.75} />
            </div>
            <h1 className="text-[28px] font-bold text-otau-neutral-900 mb-3 tracking-tight">
              Введите код
            </h1>
            <p className="text-[15px] text-otau-neutral-500 leading-relaxed">
              Мы отправили SMS с кодом на номер<br />
              <span className="text-otau-neutral-800 font-semibold">+7 {phone}</span>
            </p>
          </div>
          
          {/* Code inputs */}
          <div className="flex justify-center gap-3 mb-8">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-16 h-[72px] text-center text-[28px] font-bold rounded-2xl border-2 transition-all focus:outline-none ${
                  digit 
                    ? 'bg-otau-primary-50 border-otau-primary-500 text-otau-primary-600' 
                    : 'bg-white border-otau-neutral-200 text-otau-neutral-900 focus:border-otau-primary-500'
                }`}
              />
            ))}
          </div>
          
          {/* Resend */}
          <button
            type="button"
            className="text-center text-otau-primary-500 font-semibold text-[15px] active:opacity-70 touch-manipulation mx-auto block transition-opacity"
          >
            Отправить код повторно
          </button>
          
          {isLoading && (
            <div className="flex justify-center mt-8">
              <div className="w-8 h-8 border-3 border-otau-primary-200 border-t-otau-primary-500 rounded-full animate-spin" />
            </div>
          )}
        </>
      )}
      
      {/* Terms */}
      <p className="mt-auto text-center text-xs text-otau-neutral-400 leading-relaxed pt-8">
        Создавая аккаунт, вы соглашаетесь с{' '}
        <span className="text-otau-primary-500 font-medium">Условиями использования</span>
        {' '}и{' '}
        <span className="text-otau-primary-500 font-medium">Политикой конфиденциальности</span>
      </p>
    </motion.div>
  )
}
