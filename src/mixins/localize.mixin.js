import ru from '@/locales/ru.json'
import en from '@/locales/en.json'

export default {
  methods: {
    localize(key) {
      const locales = {
        'ru-RU': ru,
        'en-US': en,
      }
      const locale = this.info.locale || 'ru-RU'
      return locales[locale][key] || `[Localize error]: key ${key} not found`
    },
  },
}
