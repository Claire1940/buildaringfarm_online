"use client";

import { Suspense, lazy } from "react";
import {
  ArrowRight,
  BadgeDollarSign,
  BookOpen,
  Clock,
  Coins,
  FlaskConical,
  Gift,
  Leaf,
  Sprout,
  Wrench,
} from "lucide-react";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { SidebarAd } from "@/components/ads/SidebarAd";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";

const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`} />
);

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  locale: string;
}

const toolSectionIds = [
  "codes",
  "beginner-guide",
  "seeds-tier-list",
  "mutations-guide",
  "money-farming",
  "upgrades-guide",
  "gear-sprays",
  "update-log",
];

export default function HomePageClient({ latestArticles, locale }: HomePageClientProps) {
  const t = useMessages() as any;
  const mobileBannerAd = getPreferredMobileBannerSelection();

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      <aside className="hidden xl:block fixed top-20 w-40 z-10" style={{ left: "calc((100vw - 896px) / 2 - 180px)" }}>
        <SidebarAd type="sidebar-160x300" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300} />
      </aside>

      <aside className="hidden xl:block fixed top-20 w-40 z-10" style={{ right: "calc((100vw - 896px) / 2 - 180px)" }}>
        <SidebarAd type="sidebar-160x600" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600} />
      </aside>

      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6">
            <Sprout className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
            <span className="text-xs md:text-sm font-medium">{t.hero.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">{t.hero.title}</h1>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">{t.hero.description}</p>

          <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
            <button
              onClick={() => scrollToSection("beginner-guide")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)] text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              {t.hero.getFreeCodesCTA}
            </button>
            <a
              href="https://www.roblox.com/games/107646426076756/Build-A-Ring-Farm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 border border-border hover:bg-white/10 rounded-lg font-semibold text-base md:text-lg transition-colors"
            >
              {t.hero.playOnRobloxCTA}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      <section className="px-4 py-10 md:py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature videoId="E56z-x9TrZQ" title="Build A Ring Farm Gameplay" />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title} <span className="text-[hsl(var(--nav-theme-light))]">{t.tools.titleHighlight}</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">{t.tools.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {t.tools.cards.map((card: any, index: number) => (
              <button
                key={index}
                onClick={() => scrollToSection(toolSectionIds[index])}
                className="group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              >
                <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                  <DynamicIcon name={card.icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
                </div>
                <h3 className="mb-1.5 text-sm md:text-base font-semibold">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={12} />

      <section id="codes" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">{t.modules.ringFarmCodes.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8">{t.modules.ringFarmCodes.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.ringFarmCodes.items.map((item: any, index: number) => (
              <div key={index} className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[hsl(var(--nav-theme-light))]">{item.code}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{item.status}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.reward}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="beginner-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">{t.modules.ringFarmBeginnerGuide.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8">{t.modules.ringFarmBeginnerGuide.intro}</p>
          <div className="space-y-3">
            {t.modules.ringFarmBeginnerGuide.steps.map((step: any, index: number) => (
              <div key={index} className="flex gap-3 p-4 md:p-5 bg-white/5 border border-border rounded-xl">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[hsl(var(--nav-theme)/0.2)] border border-[hsl(var(--nav-theme)/0.4)] text-[hsl(var(--nav-theme-light))] font-bold">{index + 1}</div>
                <div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="seeds-tier-list" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">{t.modules.ringFarmSeedsTierList.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8">{t.modules.ringFarmSeedsTierList.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.ringFarmSeedsTierList.tiers.map((tier: any, index: number) => (
              <div key={index} className="p-5 bg-white/5 border border-border rounded-xl">
                <div className="flex items-center gap-2 mb-2"><Leaf className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" /><h3 className="font-semibold">{tier.name}</h3></div>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="mutations-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">{t.modules.ringFarmMutationsGuide.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8">{t.modules.ringFarmMutationsGuide.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.ringFarmMutationsGuide.entries.map((entry: any, index: number) => (
              <div key={index} className="p-5 bg-white/5 border border-border rounded-xl">
                <div className="flex items-center gap-2 mb-2"><FlaskConical className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" /><h3 className="font-semibold">{entry.name}</h3></div>
                <p className="text-sm text-muted-foreground">{entry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="money-farming" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">{t.modules.ringFarmMoneyFarming.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8">{t.modules.ringFarmMoneyFarming.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.ringFarmMoneyFarming.cards.map((card: any, index: number) => (
              <div key={index} className="p-5 bg-white/5 border border-border rounded-xl">
                <div className="flex items-center gap-2 mb-2"><Coins className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" /><h3 className="font-semibold">{card.name}</h3></div>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="upgrades-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">{t.modules.ringFarmUpgradesGuide.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8">{t.modules.ringFarmUpgradesGuide.intro}</p>
          <div className="space-y-3">
            {t.modules.ringFarmUpgradesGuide.upgrades.map((item: any, index: number) => (
              <div key={index} className="p-5 bg-white/5 border border-border rounded-xl">
                <div className="flex items-center gap-2 mb-2"><Wrench className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" /><h3 className="font-semibold">{item.name}</h3></div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gear-sprays" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">{t.modules.ringFarmGearAndSprays.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8">{t.modules.ringFarmGearAndSprays.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.ringFarmGearAndSprays.items.map((item: any, index: number) => (
              <div key={index} className="p-5 bg-white/5 border border-border rounded-xl">
                <div className="flex items-center gap-2 mb-2"><Gift className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" /><h3 className="font-semibold">{item.name}</h3></div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="update-log" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">{t.modules.ringFarmUpdateLog.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8">{t.modules.ringFarmUpdateLog.intro}</p>
          <div className="space-y-4">
            {t.modules.ringFarmUpdateLog.entries.map((entry: any, index: number) => (
              <div key={index} className="p-5 bg-white/5 border border-border rounded-xl">
                <div className="flex items-center gap-2 mb-2"><Clock className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" /><span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{entry.date}</span></div>
                <h3 className="font-semibold mb-1">{entry.title}</h3>
                <p className="text-sm text-muted-foreground">{entry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {mobileBannerAd && <AdBanner type={mobileBannerAd.type} adKey={mobileBannerAd.adKey} className="md:hidden" />}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} className="hidden md:flex" />

      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection title={t.faq.title} titleHighlight={t.faq.titleHighlight} subtitle={t.faq.subtitle} questions={t.faq.questions} />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection title={t.cta.title} description={t.cta.description} joinCommunity={t.cta.joinCommunity} joinGame={t.cta.joinGame} />
      </Suspense>

      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} className="md:hidden" />
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} className="hidden md:flex" />
    </div>
  );
}
