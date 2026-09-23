export const LANGUAGES = {
  es: { nativeName: 'Español', flag: '🇪🇸' },
  fr: { nativeName: 'Français', flag: '🇫🇷' }
};

export const DEFAULT_LANGUAGE = 'es';

export type Language = keyof typeof LANGUAGES; 