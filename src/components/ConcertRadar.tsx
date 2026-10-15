import React, { useState } from 'react';
import { Language, Concert } from '../types';
import { translations } from '../data/translations';
import { upcomingConcerts } from '../data/concerts';
import { Music, MapPin, Clock, Bus, Check, ArrowRight, ShieldAlert, Sparkles, Navigation, Info } from 'lucide-react';

interface ConcertRadarProps {
  lang: Language;
  onSelectConcertToBook: (concertId: string) => void;
  onOpenVenueGuide: (concert: Concert) => void;
}

export const ConcertRadar: React.FC<ConcertRadarProps> = ({
  lang,
  onSelectConcertToBook,
  onOpenVenueGuide,
}) => {
  const t = translations[lang];
  const [selectedVenue, setSelectedVenue] = useState<'all' | 'stadium' | 'arena' | 'kmc'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredConcerts = upcomingConcerts.filter((c) => {
    const venueMatch = selectedVenue === 'all' || c.venue === selectedVenue;
    const catMatch = selectedCategory === 'all' || c.category === selectedCategory;
    return venueMatch && catMatch;
  });

  return (
    <section id="concerts" className="py-24 bg-black text-white border-b border-white/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 border border-white/20 px-3 py-1 bg-black">
              <span className="w-1.5 h-1.5 bg-[#E31B23] animate-ping"></span>
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white">
                {t.concerts.tag}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-[0.14em] text-white">
              {t.concerts.title}
            </h2>
            <p className="text-sm text-neutral-400 font-light max-w-2xl leading-relaxed">
              {t.concerts.subtitle}
            </p>
          </div>

          <div className="mt-6 md:mt-0 bg-white/5 border border-white/15 px-4 py-3 text-xs text-neutral-300 flex items-center gap-3">
            <Bus className="w-5 h-5 text-[#FFC72C] flex-shrink-0" />
            <div>
              <p className="font-semibold text-white">
                {lang === 'zh-TW' ? '凡入住神鷹大飯店・全場次專車免費搭乘' : lang === 'ko-KR' ? '호텔 투숙 고객 전원 ・ 전 공연 셔틀 무료' : 'Complimentary Concert Shuttles for All Guests'}
              </p>
              <p className="text-[11px] text-neutral-400">
                {lang === 'zh-TW' ? '免去排隊擠捷運，散場專車直達小港' : 'Skip the crowd, direct return to hotel'}
              </p>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/15">
          {/* Venue Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedVenue('all')}
              className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all ${
                selectedVenue === 'all'
                  ? 'border-white bg-white text-black font-semibold'
                  : 'border-white/20 text-neutral-400 hover:border-white hover:text-white'
              }`}
            >
              {t.concerts.filterAll}
            </button>
            <button
              onClick={() => setSelectedVenue('stadium')}
              className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all ${
                selectedVenue === 'stadium'
                  ? 'border-white bg-white text-black font-semibold'
                  : 'border-white/20 text-neutral-400 hover:border-white hover:text-white'
              }`}
            >
              {t.concerts.filterStadium}
            </button>
            <button
              onClick={() => setSelectedVenue('arena')}
              className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all ${
                selectedVenue === 'arena'
                  ? 'border-white bg-white text-black font-semibold'
                  : 'border-white/20 text-neutral-400 hover:border-white hover:text-white'
              }`}
            >
              {t.concerts.filterArena}
            </button>
            <button
              onClick={() => setSelectedVenue('kmc')}
              className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all ${
                selectedVenue === 'kmc'
                  ? 'border-white bg-white text-black font-semibold'
                  : 'border-white/20 text-neutral-400 hover:border-white hover:text-white'
              }`}
            >
              {t.concerts.filterKmc}
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 text-xs">
            {['all', 'K-POP', 'WESTERN', 'MANDOPOP', 'FESTIVAL'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-[11px] tracking-wider uppercase border transition-colors ${
                  selectedCategory === cat
                    ? 'border-[#00205B] bg-[#00205B] text-white font-medium'
                    : 'border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? (lang === 'zh-TW' ? '全部音樂類型' : 'All Genres') : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Concert Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConcerts.map((c) => {
            const artistName = lang === 'en-US' ? c.artistEn : lang === 'ko-KR' ? c.artistKo : c.artist;
            const tourTitle = lang === 'en-US' ? c.tourNameEn : lang === 'ko-KR' ? c.tourNameKo : c.tourName;
            const perks = c.hotelGuestPerks[lang];
            const venueStr = c.venueName[lang];

            return (
              <div
                key={c.id}
                className="bg-[#0B0B0B] border border-white/15 flex flex-col justify-between hover:border-white transition-all duration-300 group"
              >
                {/* Card Top: Badges & Headliner */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 border border-white/30 text-white bg-black">
                      {c.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      {c.status === 'hot' && (
                        <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 bg-[#E31B23] text-white">
                          HOT
                        </span>
                      )}
                      <span className="text-[11px] font-mono text-neutral-400">
                        {c.date}
                      </span>
                    </div>
                  </div>

                  {/* Title & Artist */}
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-wider text-white group-hover:text-blue-200 transition-colors">
                      {artistName}
                    </h3>
                    <p className="text-xs text-neutral-400 tracking-wide mt-1">
                      {tourTitle}
                    </p>
                  </div>

                  {/* Venue & Timing */}
                  <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-neutral-300">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                      <span className="truncate">{venueStr}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                      <span>{c.time} 開演 (車程約 {c.estimatedTransitMin} 分鐘)</span>
                    </div>
                    <div className="flex items-start space-x-2 text-[#FFC72C] bg-[#FFC72C]/5 p-2 border border-[#FFC72C]/20">
                      <Bus className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      <div className="text-[11px]">
                        <span className="font-semibold">{t.concerts.shuttleDeparture}: </span>
                        <span>{c.shuttleTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Guest Free Perks List */}
                  <div className="pt-2">
                    <div className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2 flex items-center gap-1 font-semibold">
                      <Sparkles className="w-3 h-3 text-[#FFC72C]" />
                      {t.concerts.freePerkBadge}
                    </div>
                    <ul className="space-y-1.5 text-xs text-neutral-300">
                      {perks.slice(0, 3).map((perk, pIdx) => (
                        <li key={pIdx} className="flex items-start space-x-2">
                          <Check className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 border-t border-white/10 space-y-2 mt-4">
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-3">
                    <button
                      onClick={() => onOpenVenueGuide(c)}
                      className="hover:text-white flex items-center gap-1 transition-colors underline underline-offset-4"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>{t.concerts.viewGuide}</span>
                    </button>
                    <span className="text-[#FFC72C] font-semibold">接駁 0 元</span>
                  </div>

                  <button
                    onClick={() => onSelectConcertToBook(c.id)}
                    className="w-full btn-outline hover:btn-primary text-xs py-2.5 flex items-center justify-center gap-2"
                  >
                    <span>{t.concerts.reserveShuttle}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notice Strip */}
        <div className="mt-12 p-4 bg-[#0B0B0B] border border-white/15 text-xs text-neutral-400 flex items-center justify-between flex-wrap gap-4">
          <p>{t.concerts.shuttleIncludedNotice}</p>
          <div className="flex items-center space-x-2 text-white font-medium">
            <span>小港飯店直達世運南管制專用道</span>
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
          </div>
        </div>

      </div>
    </section>
  );
};
