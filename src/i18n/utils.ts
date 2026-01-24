import en from './en.json';
import pt from './pt.json';

const translations = { en, pt };

export function getTranslations(lang: 'en' | 'pt') {
  return translations[lang];
}

export function t(lang: 'en' | 'pt', key: string): string {
  const keys = key.split('.');
  let result: any = translations[lang];
  for (const k of keys) {
    result = result?.[k];
  }
  return result || key;
}
