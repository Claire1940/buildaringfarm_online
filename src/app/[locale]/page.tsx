import { getLatestArticles } from '@/lib/getLatestArticles'
import type { Language } from '@/lib/content'
import HomePageClient from './HomePageClient'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  const latestArticles = await getLatestArticles(locale as Language, 30)

  return <HomePageClient latestArticles={latestArticles} locale={locale} />
}
