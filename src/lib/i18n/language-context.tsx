import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { translations, type Language, type TranslationKey } from './translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (key: TranslationKey, params?: Record<string, string>) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lol_meta_lang') as Language
      if (saved === 'en' || saved === 'vi') return saved
    }
    return 'en'
  })

  useEffect(() => {
    localStorage.setItem('lol_meta_lang', language)
    document.documentElement.lang = language
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'vi' : 'en'))
  }

  const t = (key: TranslationKey, params?: Record<string, string>): string => {
    const dict = translations[language] ?? translations.en
    let str: string = dict[key] ?? translations.en[key] ?? key

    if (params) {
      Object.entries(params).forEach(([k, val]) => {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), val)
      })
    }

    return str
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
