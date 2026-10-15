import React, { useState } from 'react';
import { Language, Member } from '../types';
import { translations } from '../data/translations';
import { Globe, User, Calendar, ShieldCheck, LogOut, Menu, X, Sparkles, SlidersHorizontal } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  currentMember: Member | null;
  onOpenLoginModal: () => void;
  onLogout: () => void;
  onOpenBookingModal: (roomId?: string) => void;
  onOpenMyBookingsModal: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  currentMember,
  onOpenLoginModal,
  onLogout,
  onOpenBookingModal,
  onOpenMyBookingsModal,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = translations[lang];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'zh-TW', label: '繁體中文', flag: '🇹🇼' },
    { code: 'en-US', label: 'English', flag: '🇺🇸' },
    { code: 'ko-KR', label: '한국어', flag: '🇰🇷' },
  ];

  const getTierBadge = (tier?: string) => {
    switch (tier) {
      case 'BLACK_DIAMOND':
        return 'border-[#FFC72C] text-[#FFC72C] bg-[#FFC72C]/10';
      case 'GOLD':
        return 'border-amber-400 text-amber-400 bg-amber-400/10';
      default:
        return 'border-slate-300 text-slate-200 bg-white/10';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 border border-white flex items-center justify-center transition-colors group-hover:bg-[#00205B] group-hover:border-[#00205B]">
              {/* Trident Geometric Emblem */}
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2v20M7 5v8a5 5 0 0 0 10 0V5M4 8l3-3 3 3M14 8l3-3 3 3" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-[0.2em] text-white uppercase leading-none">
                SHEN YING
              </span>
              <span className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase mt-1">
                {lang === 'zh-TW' ? '高雄小港・神鷹國際' : lang === 'ko-KR' ? '가오슝 샤오강 션잉' : 'GRAND HOTEL KAOHSIUNG'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-[0.15em] font-medium text-neutral-300">
            <a href="#boss" className="hover:text-white transition-colors py-1 border-b border-transparent hover:border-white">
              {t.nav.aboutBoss}
            </a>
            <a href="#concerts" className="hover:text-white transition-colors py-1 border-b border-transparent hover:border-white flex items-center gap-1.5 text-white">
              <span className="w-1.5 h-1.5 bg-[#E31B23] animate-pulse"></span>
              {t.nav.concertRadar}
            </a>
            <a href="#rooms" className="hover:text-white transition-colors py-1 border-b border-transparent hover:border-white">
              {t.nav.rooms}
            </a>
            <a href="#members" className="hover:text-white transition-colors py-1 border-b border-transparent hover:border-white">
              {t.nav.memberPerks}
            </a>
          </nav>

          {/* Right Action Tools: Language, Member, Book */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-2 text-xs tracking-wider text-neutral-300 hover:text-white px-3 py-2 border border-white/20 hover:border-white transition-all bg-black/40"
              >
                <Globe className="w-3.5 h-3.5 text-neutral-400" />
                <span>{languages.find((l) => l.code === lang)?.label}</span>
                <span className="text-[10px] text-neutral-500">▼</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-[#0B0B0B] border border-white/20 shadow-2xl py-1 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        onLanguageChange(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs tracking-wider flex items-center justify-between hover:bg-[#00205B] hover:text-white transition-colors ${
                        lang === l.code ? 'text-white font-bold bg-white/5' : 'text-neutral-400'
                      }`}
                    >
                      <span>{l.label}</span>
                      <span>{l.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* My Bookings Lookup */}
            <button
              onClick={onOpenMyBookingsModal}
              className="text-xs tracking-wider text-neutral-300 hover:text-white px-3 py-2 border border-white/20 hover:border-white transition-all flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              <span>{t.nav.myBooking}</span>
            </button>

            {/* Member Profile or Sign In */}
            {currentMember ? (
              <div className="flex items-center space-x-2 pl-1">
                <div className={`px-2.5 py-1 text-[11px] uppercase tracking-wider font-semibold border ${getTierBadge(currentMember.tier)} flex items-center gap-1`}>
                  <Sparkles className="w-3 h-3" />
                  <span>{currentMember.tier.replace('_', ' ')}</span>
                </div>
                <button
                  onClick={onLogout}
                  title={t.nav.logout}
                  className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLoginModal}
                className="text-xs tracking-wider text-neutral-300 hover:text-white px-3 py-2 border border-white/20 hover:border-white transition-all flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-neutral-400" />
                <span>{t.nav.memberLogin}</span>
              </button>
            )}

            {/* Admin Console Portal Trigger Button */}
            <button
              onClick={onOpenAdmin}
              className="text-xs tracking-wider text-amber-300 hover:text-white px-3 py-2 border border-amber-400/40 hover:border-amber-300 bg-amber-400/10 transition-all flex items-center gap-1.5"
              title="進入飯店營運後台系統"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-300" />
              <span className="font-semibold">{lang === 'zh-TW' ? '後台管理' : lang === 'ko-KR' ? '관리자 백엔드' : 'Admin'}</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => onOpenBookingModal()}
              className="btn-primary"
            >
              {t.nav.bookNow}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => onOpenBookingModal()}
              className="px-3 py-1.5 text-xs font-semibold uppercase bg-white text-black tracking-wider"
            >
              {t.nav.bookNow}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-white/20 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0B0B] border-b border-white/20 px-6 py-6 space-y-5">
          <div className="grid grid-cols-3 gap-2 pb-4 border-b border-white/10">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  onLanguageChange(l.code);
                }}
                className={`py-2 text-xs text-center border ${
                  lang === l.code ? 'border-white bg-white text-black font-semibold' : 'border-white/20 text-neutral-400'
                }`}
              >
                {l.flag} {l.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col space-y-4 text-sm uppercase tracking-widest text-neutral-300">
            <a
              href="#boss"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white"
            >
              {t.nav.aboutBoss}
            </a>
            <a
              href="#concerts"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white flex items-center justify-between"
            >
              <span>{t.nav.concertRadar}</span>
              <span className="text-[10px] bg-[#E31B23] text-white px-2 py-0.5">HOT</span>
            </a>
            <a
              href="#rooms"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white"
            >
              {t.nav.rooms}
            </a>
            <a
              href="#members"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white"
            >
              {t.nav.memberPerks}
            </a>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyBookingsModal();
              }}
              className="w-full text-center py-3 text-xs uppercase tracking-widest border border-white/30 text-white"
            >
              {t.nav.myBooking}
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full text-center py-3 text-xs uppercase tracking-widest border border-amber-400/40 text-amber-300 bg-amber-400/10 flex items-center justify-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{lang === 'zh-TW' ? '進入後台管理系統' : 'Admin Console'}</span>
            </button>

            {currentMember ? (
              <div className="flex items-center justify-between py-2 px-3 border border-white/20">
                <span className="text-xs text-neutral-300">
                  {currentMember.name} ({currentMember.tier})
                </span>
                <button onClick={onLogout} className="text-xs text-red-400">
                  {t.nav.logout}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLoginModal();
                }}
                className="w-full text-center py-3 text-xs uppercase tracking-widest border border-white/30 text-white"
              >
                {t.nav.memberLogin}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
