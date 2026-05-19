import { getRequestConfig } from 'next-intl/server'
import { routing, type Locale } from './routing'
import deepMerge from 'deepmerge'

import enMessages from '@/locales/en.json'
import ptMessages from '@/locales/pt.json'
import esMessages from '@/locales/es.json'
import idMessages from '@/locales/id.json'

const messages: Record<string, any> = {
	en: enMessages,
	pt: ptMessages,
	es: esMessages,
	id: idMessages,
}

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale

	if (!locale || !routing.locales.includes(locale as Locale)) {
		locale = routing.defaultLocale
	}

	if (locale === 'en') {
		return { locale, messages: enMessages }
	}

	const localeMessages = messages[locale] || enMessages
	const mergedMessages = deepMerge(enMessages, localeMessages, {
		arrayMerge: (_destinationArray, sourceArray) => sourceArray,
	})

	return { locale, messages: mergedMessages }
})
