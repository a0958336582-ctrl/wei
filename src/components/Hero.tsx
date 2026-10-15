import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Calendar, Users, Music2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenBookingModal: (prefill?: { checkIn?: string; checkOut?: string; guests?: number; concertId?: string }) => void;
  onExploreConcerts: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onOpenBookingModal,
  onExploreConcerts,
}) => {
  const t = translations[lang];

  // Quick search bar local states
  const [checkIn, setCheckIn] = useState('2026-10-18');
  const [checkOut, setCheckOut] = useState('2026-10-19');
  const [guests, setGuests] = useState(2);
  const [wantConcertShuttle, setWantConcertShuttle] = useState(true);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBookingModal({
      checkIn,
      checkOut,
      guests,
      concertId: wantConcertShuttle ? 'c-01' : undefined,
    });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-black">
      {/* Background Cinematic Visual & Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hotel_facade_1790842670081.jpg"
          alt="Shen Ying Grand Hotel Kaohsiung"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.45] contrast-[1.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-transparent to-black" />
      </div>

      {/* Floating subtle grid lines for Maserati precision engineering look */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-15">
        <div className="max-w-7xl mx-auto h-full border-x border-white/20 grid grid-cols-4">
          <div className="border-r border-white/10 h-full" />
          <div className="border-r border-white/10 h-full" />
          <div className="border-r border-white/10 h-full" />
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12">
        <div className="max-w-3xl space-y-6">
          
          {/* Subtitle / Supercar Precision Badge */}
          <div className="inline-flex items-center space-x-2 border border-white/25 px-3 py-1 bg-black/60 backdrop-blur-sm">
            <span className="w-2 h-2 bg-[#E31B23]"></span>
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-neutral-300">
              {t.hero.subtitle}
            </span>
          </div>

          {/* Majestic Hero Title */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[0.14em] text-white leading-tight">
              {t.hero.titleLine1}
            </h1>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.12em] text-neutral-200">
              {t.hero.titleLine2}
            </h2>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-2xl">
            {t.hero.desc}
          </p>

          {/* Boss Trust Badge & Member Advantage */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="flex items-center space-x-2 text-xs text-[#FFC72C] bg-[#FFC72C]/10 border border-[#FFC72C]/40 px-3 py-1.5 font-medium tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.hero.memberBadge}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-neutral-300 bg-white/5 border border-white/15 px-3 py-1.5 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>董事長「神鷹哥」親自督軍品質保證</span>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={() => onOpenBookingModal()}
              className="btn-primary"
            >
              <span>{t.hero.ctaBook}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            <button
              onClick={onExploreConcerts}
              className="btn-outline flex items-center justify-center gap-2"
            >
              <Music2 className="w-4 h-4 text-[#E31B23]" />
              <span>{t.hero.ctaConcert}</span>
            </button>
          </div>

        </div>

        {/* Quick Online Booking Console */}
        <div className="mt-14 max-w-5xl bg-[#0B0B0B]/90 border border-white/20 backdrop-blur-md p-6 sm:p-7 shadow-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-4 flex items-center justify-between">
            <span className="font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-white inline-block"></span>
              {lang === 'zh-TW' ? '神鷹快速訂房與演唱會接駁通道' : lang === 'ko-KR' ? '실시간 빠른 예약 & 콘서트 셔틀 신청' : 'EXPRESS BOOKING & CONCERT RADAR ENGINE'}
            </span>
            <span className="hidden sm:inline text-neutral-400">
              {lang === 'zh-TW' ? '小港機場站 8分鐘｜世運主場館專車直送' : 'Xiaogang Airport 8 Min | Stadium Direct'}
            </span>
          </div>

          <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Check-in */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-white" />
                {t.booking.checkIn}
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-black border border-white/25 px-3 py-2.5 text-xs text-white focus:border-white focus:outline-none"
              />
            </div>

            {/* Check-out */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-white" />
                {t.booking.checkOut}
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-black border border-white/25 px-3 py-2.5 text-xs text-white focus:border-white focus:outline-none"
              />
            </div>

            {/* Guests */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-white" />
                {t.booking.guests}
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-black border border-white/25 px-3 py-2.5 text-xs text-white focus:border-white focus:outline-none"
              >
                <option value={1}>1 位貴賓 (1 Guest)</option>
                <option value={2}>2 位貴賓 (2 Guests)</option>
                <option value={3}>3 位貴賓 (3 Guests)</option>
                <option value={4}>4 位貴賓 (4 Guests)</option>
              </select>
            </div>

            {/* Concert Shuttle Option */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Music2 className="w-3.5 h-3.5 text-[#E31B23]" />
                {lang === 'zh-TW' ? '免費演唱會接駁' : lang === 'ko-KR' ? '무료 콘서트 셔틀' : 'Concert Shuttle'}
              </label>
              <button
                type="button"
                onClick={() => setWantConcertShuttle(!wantConcertShuttle)}
                className={`w-full py-2.5 px-3 text-xs border transition-all text-left flex items-center justify-between ${
                  wantConcertShuttle
                    ? 'border-[#00205B] bg-[#00205B]/40 text-white font-medium'
                    : 'border-white/25 bg-black text-neutral-400'
                }`}
              >
                <span>{wantConcertShuttle ? (lang === 'zh-TW' ? '✓ 預約免費接駁' : '✓ Request Shuttle') : (lang === 'zh-TW' ? '✕ 無需接駁' : '✕ No Shuttle')}</span>
                <span className="text-[10px] px-1 bg-red-600 text-white font-bold">0元</span>
              </button>
            </div>

            {/* Search Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full btn-navy flex items-center justify-center py-2.5 h-[42px]"
              >
                <span>{t.booking.roomSelect}</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Maserati 4 Numbers High-Contrast Stat Strip */}
      <div className="relative z-10 border-y border-white/15 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/15">
            {t.hero.stats.map((stat, idx) => (
              <div key={idx} className={`pt-4 md:pt-0 ${idx > 0 ? 'md:pl-6' : ''}`}>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-3xl sm:text-4xl font-light tracking-tight text-white font-mono">
                    {stat.num}
                  </span>
                  <span className="text-xs uppercase font-semibold tracking-wider text-neutral-400">
                    {stat.unit}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 uppercase tracking-widest mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
