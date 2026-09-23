# IAEVA Multilingual Implementation Guide

This document provides guidelines for maintaining and extending the multilingual support in the IAEVA landing page.

## Table of Contents

- [IAEVA Multilingual Implementation Guide](#iaeva-multilingual-implementation-guide)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
  - [Adding or Updating Translations](#adding-or-updating-translations)
  - [Using Translations in Components](#using-translations-in-components)
    - [Dynamic Content and Interpolation](#dynamic-content-and-interpolation)
    - [Pluralization](#pluralization)
  - [SEO Best Practices](#seo-best-practices)
  - [Adding a New Language](#adding-a-new-language)
  - [Testing Translation Changes](#testing-translation-changes)

## Project Structure

The multilingual setup is based on i18next and follows this structure:

```
src/
└── i18n/
    ├── index.ts             # Main i18n configuration
    ├── languages.ts         # Available languages definition
    └── locales/             # Translation files by language
        ├── es/              # Spanish translations
        │   ├── common.json  # Shared elements (navbar, footer)
        │   ├── home.json    # Home page translations
        │   ├── ...          # Other page-specific translations
        │
        └── fr/              # French translations
            ├── common.json
            ├── home.json
            └── ...
```

## Adding or Updating Translations

Each page or major component has its own translation namespace. The current namespaces are:

- `common` - Shared elements across pages (navbar, footer, buttons)
- `home` - Home page content
- `contact` - Contact page content
- `use_cases` - Use cases page content
- `roi_calculator` - ROI calculator page content
- `not_found` - 404 page content

To update translations:

1. Locate the appropriate JSON file in `src/i18n/locales/{language}/{namespace}.json`
2. Modify or add new translation keys and values
3. Ensure all language files have the same structure and keys

Example translation file structure:

```json
{
  "section_name": {
    "title": "Section Title",
    "description": "Section description text"
  },
  "another_section": {
    "button": "Click Me",
    "info": "Additional information"
  }
}
```

## Using Translations in Components

To use translations in a component:

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  // For a single namespace
  const { t } = useTranslation('namespace');
  
  // For multiple namespaces
  const { t } = useTranslation(['primary_namespace', 'secondary_namespace']);
  
  return (
    <div>
      <h1>{t('section.title')}</h1>
      <p>{t('section.description')}</p>
      
      {/* When using multiple namespaces */}
      <button>{t('secondary_namespace:button.label')}</button>
    </div>
  );
};
```

### Dynamic Content and Interpolation

For dynamic content:

```tsx
// With variables
const { t } = useTranslation('common');
return <p>{t('welcome_message', { name: userName })}</p>;

// In the translation file:
// "welcome_message": "Welcome, {{name}}!"
```

### Pluralization

```json
{
  "results": "{{count}} result",
  "results_plural": "{{count}} results"
}
```

```tsx
// When count is 1: "1 result"
// When count is 2+: "2 results"
t('results', { count: 2 })
```

## SEO Best Practices

For proper multilingual SEO, use the SEO component:

```tsx
import SEO from '@/components/shared/SEO';

const MyPage = () => {
  const { t } = useTranslation('my_page');
  
  return (
    <>
      <SEO 
        title={t('meta.title')}
        description={t('meta.description')}
        keywords={t('meta.keywords')}
        pageName="page-path"
      />
      {/* Page content */}
    </>
  );
};
```

Each page's translation file should include a `meta` section:

```json
{
  "meta": {
    "title": "Page Title | IAEVA",
    "description": "SEO description for the page",
    "keywords": "keyword1, keyword2, keyword3"
  }
}
```

## Adding a New Language

To add a new language:

1. Update `src/i18n/languages.ts`:

```ts
export const LANGUAGES = {
  es: { nativeName: 'Español', flag: '🇪🇸' },
  fr: { nativeName: 'Français', flag: '🇫🇷' },
  en: { nativeName: 'English', flag: '🇬🇧' } // New language
};
```

2. Create translation files for all namespaces in `src/i18n/locales/en/`:
   - Copy the structure from an existing language
   - Translate all values

3. Update `src/i18n/index.ts` to include the new language resources:

```ts
// Add imports for the new language
import commonEN from './locales/en/common.json';
import contactEN from './locales/en/contact.json';
// ...

// Add to resources
const resources = {
  es: {
    // ...
  },
  fr: {
    // ...
  },
  en: {
    common: commonEN,
    contact: contactEN,
    // ...
  }
};
```

## Testing Translation Changes

After updating translations:

1. Switch between languages using the language switcher
2. Check all pages in each language to verify translations appear correctly
3. Verify SEO tags (use browser dev tools to inspect `<head>` section)
4. Test dynamic content with different values
5. Test on mobile devices for layout issues with different text lengths 