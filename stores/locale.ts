import { defineStore } from 'pinia'

// Import all translations and configs
import bgTranslations from '~/locales/bg/translations'
import bgConfig from '~/locales/bg/config'
import esTranslations from '~/locales/es/translations'
import esConfig from '~/locales/es/config'
import enTranslations from '~/locales/en/translations'
import enConfig from '~/locales/en/config'
import roTranslations from '~/locales/ro/translations'
import roConfig from '~/locales/ro/config'

interface PackageItem {
  sku: string;
  name: string;
  qty: number;
  price: number;
}

interface Package {
  name: string;
  regularPrice: number;
  image: string;
  badge?: string;
  items: PackageItem[];
}

interface CountryConfig {
  locale: string;
  currency: string;
  currencySymbol: string;
  currencyPosition: 'prefix' | 'suffix';
  delivery_tax: number;
  provinces: Array<{
    code: string;
    name: string;
  }>;
  packages: {
    [key: string]: Package;
  };
}

const countryConfigs: { [key: string]: CountryConfig & { translations: { [key: string]: string } } } = {
  en: {
    ...enConfig,
    translations: enTranslations
  },
  bg: {
    ...bgConfig,
    translations: bgTranslations
  },
  es: {
    ...esConfig,
    translations: esTranslations
  },
  ro: {
    ...roConfig,
    translations: roTranslations
  }
}

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    currentLocale: '',
    config: null as (CountryConfig & { translations: { [key: string]: string } }) | null
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
      if (countryConfigs[locale]) {
        this.currentLocale = locale
        this.config = countryConfigs[locale]
      } else {
        this.currentLocale = 'bg'
        this.config = countryConfigs['bg']
      }
    },
    t(key: string): string {
      return this.config?.translations[key] || key
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