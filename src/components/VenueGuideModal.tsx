import React from 'react';
import { Language, Concert } from '../types';
import { translations } from '../data/translations';
import { X, MapPin, Navigation, Bus, Clock, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface VenueGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  concert: Concert | null;
  onBookShuttle: (concertId: string) => void;
}

export const VenueGuideModal: React.FC<VenueGuideModalProps> = ({
  isOpen,
  onClose,
  lang,
  concert,
  onBookShuttle,
}) => {
  const t = translations[lang];

  if (!isOpen || !concert) return null;

  const artistName = lang === 'en-US' ? concert.artistEn : lang === 'ko-KR' ? concert.artistKo : concert.artist;
  const venueTitle = concert.venueName[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0B0B0B] border border-white/25 shadow-2xl my-8 text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/15 bg-black">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border border-white flex items-center justify-center bg-[#00205B]">
              <Navigation className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold uppercase tracking-wider text-white">
                {lang === 'zh-TW' ? '高雄場館全攻略與避堵指南' : 'Kaohsiung Venue Guide & Transit Map'}
              </h3>
              <p className="text-[11px] text-neutral-400">
                {artistName} ｜ {venueTitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Key venue specs */}
          <div className="bg-black border border-white/15 p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-neutral-500 uppercase block mb-1">場館地址</span>
              <span className="text-white font-medium">{concert.venueAddress}</span>
            </div>
            <div>
              <span className="text-neutral-500 uppercase block mb-1">從小港飯店車程</span>
              <span className="text-[#FFC72C] font-semibold">約 {concert.estimatedTransitMin} 分鐘</span>
            </div>
            <div>
              <span className="text-neutral-500 uppercase block mb-1">神鷹專車出發班次</span>
              <span className="text-white font-medium">{concert.shuttleTime}</span>
            </div>
          </div>

          {/* Transit Comparison: Hotel Direct Coach vs General MRT */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-neutral-300">
              【散場交通比一比】為什麼神鷹房客都選專車？
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              <div className="p-4 border border-green-500/40 bg-green-950/20 space-y-2">
                <span className="font-bold text-green-400 flex items-center gap-1.5 uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  神鷹大飯店房客專屬禮賓車 (0元)
                </span>
                <ul className="space-y-1 text-neutral-300 text-[11px]">
                  <li>✓ 專屬南管制區上車點，步行 3 分鐘即達</li>
                  <li>✓ 避開 5 萬人人潮，直行高速快速道路直達小港</li>
                  <li>✓ 全程冷氣舒適一人一座，客房專屬瓶裝水</li>
                  <li>✓ 返抵飯店立刻享用暖胃鮮甜海鮮宵夜粥</li>
                </ul>
              </div>

              <div className="p-4 border border-red-500/30 bg-red-950/10 space-y-2">
                <span className="font-bold text-red-400 flex items-center gap-1.5 uppercase">
                  <ShieldAlert className="w-4 h-4" />
                  一般大眾捷運與路面排隊
                </span>
                <ul className="space-y-1 text-neutral-400 text-[11px]">
                  <li>✕ 世運捷運站散場通常需管制排隊 60~90 分鐘</li>
                  <li>✕ 散場叫車極難，Uber/計程車經常加價 3~4 倍</li>
                  <li>✕ 捷運人潮擁擠無座位，疲憊不堪</li>
                  <li>✕ 深夜回到飯店市區餐飲多數已打烊</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Hotel VIP Inclusions */}
          <div className="border border-white/15 p-4 bg-black space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#FFC72C] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              神鷹房客獨享專利禮遇
            </span>
            <ul className="space-y-1.5 text-xs text-neutral-300">
              {concert.hotelGuestPerks[lang].map((p, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-[#FFC72C] font-mono">0{idx + 1}.</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-black border-t border-white/15 flex items-center justify-between">
          <span className="text-xs text-neutral-400">
            預訂客房即可免費勾選專車接送
          </span>
          <button
            onClick={() => {
              onClose();
              onBookShuttle(concert.id);
            }}
            className="btn-primary text-xs py-2 px-6"
          >
            預訂此場次客房與專車
          </button>
        </div>

      </div>
    </div>
  );
};
