import { defineStore } from 'pinia'
import type { CountryConfig } from '~/types/shipping'

// Import all translations and configs
import bgConfig from '~/config/shipping/bg'
import bgTranslations from '~/locales/bg/translations'
import enTranslations from '~/locales/en/translations'

interface MessageFormatObject {
  body?: {
    static?: string
  }
}

interface LocaleConfig extends CountryConfig {
  translations: { [key: string]: string | MessageFormatObject }
}

const countryConfigs: { [key: string]: LocaleConfig } = {
  en: {
    locale: 'en',
    currency: 'USD',
    currencySymbol: '$',
    currencyPosition: 'prefix',
    delivery_tax: 19.99,
    shipping_methods: {
      door: {
        id: 'door',
        name: 'To Address',
        enabled: true
      }
    },
    provinces: [],
    packages: {},
    translations: enTranslations
  },
  bg: {
    ...bgConfig,
    translations: bgTranslations
  }
}

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    currentLocale: '',
    config: null as LocaleConfig | null
  }),
  actions: {
    async initializeLocale() {
      if (typeof window !== 'undefined') {
        const subdomain = window.location.host.split('.')[0]
        const locale = (!subdomain || subdomain === 'www') ? 'bg' : subdomain
        this.setLocale(locale)
      }
    },
    setLocale(locale: string) {
      console.log('Setting locale:', locale)
      if (countryConfigs[locale]) {
        this.currentLocale = locale
        this.config = countryConfigs[locale]
        console.log('Loaded translations:', this.config.translations)
      } else {
        this.currentLocale = 'bg'
        this.config = countryConfigs['bg']
        console.log('Fallback to BG translations:', this.config.translations)
      }
    },
    t(key: string): string {
      if (!this.config?.translations) {
        console.warn('No translations loaded for key:', key)
        return key
      }
      const translation = this.config.translations[key]
      if (!translation) {
        console.warn('Missing translation for key:', key)
        return key
      }
      // Handle both string and message format object cases
      if (typeof translation === 'string') {
        return translation
      }
      // If it's a message format object, return the static text
      if (translation.body?.static) {
        return translation.body.static
      }
      console.warn('Invalid translation format for key:', key)
      return key
    },
    formatPrice(amount: number): string {
      if (!this.config) return `${amount}`
      const formattedAmount = amount.toFixed(2)
      return this.config.currencyPosition === 'suffix' 
        ? `${formattedAmount} ${this.config.currencySymbol}`
        : `${this.config.currencySymbol}${formattedAmount}`
    }
  }
}) 