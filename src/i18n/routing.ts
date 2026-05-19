import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
	// Supported locales
	locales: ['en', 'pt', 'es', 'id'],

	// Default locale
	defaultLocale: 'en',

	// No prefix for default locale
	localePrefix: 'as-needed',

	// Enable automatic locale detection
	localeDetection: true,
})

export type Locale = (typeof routing.locales)[number]
