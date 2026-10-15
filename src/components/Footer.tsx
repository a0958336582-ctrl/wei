import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { MapPin, Phone, Mail, Globe, ArrowUp, Music, Shield } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onOpenBookingModal: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onOpenBookingModal,
  onOpenAdmin,
}) => {
  const t = translations[lang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white border-t border-white/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/15">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 border border-white flex items-center justify-center bg-[#00205B]">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2v20M7 5v8a5 5 0 0 0 10 0V5M4 8l3-3 3 3M14 8l3-3 3 3" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-[0.2em] text-white uppercase">
                SHEN YING GRAND HOTEL
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>
            <div className="pt-2 flex items-center space-x-3 text-xs text-neutral-400">
              <span className="border border-white/20 px-2.5 py-1">高雄小港</span>
              <span className="border border-white/20 px-2.5 py-1">五星級奢華</span>
              <span className="border border-white/20 px-2.5 py-1 text-[#FFC72C]">演唱會 VIP 首選</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-white">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a href="#boss" className="hover:text-white transition-colors">
                  {t.nav.aboutBoss}
                </a>
              </li>
              <li>
                <a href="#concerts" className="hover:text-white transition-colors">
                  {t.nav.concertRadar}
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  {t.nav.rooms}
                </a>
              </li>
              <li>
                <a href="#members" className="hover:text-white transition-colors">
                  {t.nav.memberPerks}
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="text-amber-400 hover:text-white transition-colors font-medium flex items-center gap-1 mt-1"
                >
                  <span>★ 後台智慧營運系統 (Admin)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Concert Hub */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-white">
              {t.footer.concertInfo}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>高雄國家體育場 (世運主場館) 專車</li>
              <li>漢神巨蛋演唱會特快接駁</li>
              <li>高雄流行音樂中心港灣連線</li>
              <li>全台首創房客專屬演唱會戰情室</li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-white">
              {t.footer.contactUs}
            </h4>
            <div className="space-y-2 text-xs text-neutral-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                <span>{t.brand.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <span>(07) 888-8888</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <span className="truncate">reservation@shenying.com.tw</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>{t.footer.copyright}</p>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 hover:text-white transition-colors border border-white/15 px-3 py-1.5"
          >
            <span>TOP 回到頂部</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
