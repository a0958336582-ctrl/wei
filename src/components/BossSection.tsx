import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Award, Bus, Radio, Sparkles, CheckCircle2, Star, Eye } from 'lucide-react';

interface BossSectionProps {
  lang: Language;
  onOpenBookingModal: () => void;
}

export const BossSection: React.FC<BossSectionProps> = ({
  lang,
  onOpenBookingModal,
}) => {
  const t = translations[lang];
  const [showOriginalMeme, setShowOriginalMeme] = useState(false);

  return (
    <section id="boss" className="py-24 bg-[#0B0B0B] text-white border-b border-white/15 relative overflow-hidden">
      {/* Decorative Trident Grid Background */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-blue-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-2 mb-16">
          <div className="inline-flex items-center space-x-2 border border-white/20 px-3 py-1 bg-black">
            <span className="w-1.5 h-1.5 bg-[#00205B]"></span>
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-neutral-400">
              {t.boss.tag}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-[0.14em] text-white">
            {t.boss.title}
          </h2>
          <div className="w-20 h-0.5 bg-white/40"></div>
        </div>

        {/* Boss Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Boss Image Column */}
          <div className="lg:col-span-5 relative group">
            <div className="relative border border-white/25 p-2 bg-black">
              {/* Photo Display */}
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                <img
                  src={
                    showOriginalMeme
                      ? 'https://picx.zhimg.com/v2-485ea44fe790655f0566088dd8d041dc_b.jpg'
                      : '/src/assets/images/shen_ying_boss_1790842702859.jpg'
                  }
                  alt="神鷹哥 董事長 Chairman Shen Ying"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to local generated boss image if remote image link is blocked
                    (e.target as HTMLImageElement).src = '/src/assets/images/shen_ying_boss_1790842702859.jpg';
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                {/* Badge on Photo */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="bg-black/90 border border-white/20 px-3 py-1.5 backdrop-blur-sm">
                    <span className="text-[11px] font-bold tracking-widest uppercase text-white flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-[#FFC72C] fill-[#FFC72C]" />
                      神鷹哥 SHEN YING
                    </span>
                    <p className="text-[10px] text-neutral-400 tracking-wider">
                      {lang === 'zh-TW' ? '飯店創辦人兼總舵手' : 'Founder & Chairman'}
                    </p>
                  </div>

                  {/* Toggle Portrait / Classic Meme button */}
                  <button
                    onClick={() => setShowOriginalMeme(!showOriginalMeme)}
                    className="text-[10px] tracking-wider uppercase px-2.5 py-1.5 bg-[#00205B] hover:bg-[#0A2342] text-white border border-white/30 flex items-center gap-1 transition-colors"
                    title="切換神鷹哥經典寫真"
                  >
                    <Eye className="w-3 h-3" />
                    <span>{showOriginalMeme ? '總裁風采' : '原汁原味'}</span>
                  </button>
                </div>
              </div>

              {/* Decorative Corner Trim */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-white"></div>
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-white"></div>
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-white"></div>
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-white"></div>
            </div>

            <div className="mt-3 text-center text-xs text-neutral-400 font-mono tracking-wider">
              {lang === 'zh-TW'
                ? '「小港在地扛霸子，親手打造高雄最奢華演唱會行館」'
                : 'Xiaogang Legend ・ Crafting Kaohsiung\'s Premier Luxury Sanctuary'}
            </div>
          </div>

          {/* Boss Words & Value Props */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* The Boss Quote Block */}
            <div className="relative border-l-2 border-white pl-6 py-2 bg-white/5 border border-r-0 border-t-0 border-b-0">
              <p className="text-base sm:text-lg italic font-normal tracking-wide text-neutral-100 leading-relaxed">
                {t.boss.quote}
              </p>
              <div className="mt-3 text-xs tracking-[0.2em] uppercase text-[#FFC72C] font-semibold">
                — {t.boss.signature}
              </div>
            </div>

            {/* Story Paragraphs */}
            <div className="space-y-4 text-sm text-neutral-300 font-light leading-relaxed">
              <p>{t.boss.story1}</p>
              <p className="text-white font-normal">{t.boss.story2}</p>
            </div>

            {/* 3 Pillars of Boss Shen Ying */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/15">
              
              <div className="border border-white/15 p-4 bg-black/50 hover:border-white transition-all">
                <div className="w-8 h-8 bg-white/10 flex items-center justify-center text-white mb-3">
                  <Bus className="w-4 h-4 text-[#FFC72C]" />
                </div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-1.5">
                  {t.boss.perk1Title}
                </h4>
                <p className="text-xs text-neutral-400 leading-normal">
                  {t.boss.perk1Desc}
                </p>
              </div>

              <div className="border border-white/15 p-4 bg-black/50 hover:border-white transition-all">
                <div className="w-8 h-8 bg-white/10 flex items-center justify-center text-white mb-3">
                  <Radio className="w-4 h-4 text-[#E31B23]" />
                </div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-1.5">
                  {t.boss.perk2Title}
                </h4>
                <p className="text-xs text-neutral-400 leading-normal">
                  {t.boss.perk2Desc}
                </p>
              </div>

              <div className="border border-white/15 p-4 bg-black/50 hover:border-white transition-all">
                <div className="w-8 h-8 bg-white/10 flex items-center justify-center text-white mb-3">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-1.5">
                  {t.boss.perk3Title}
                </h4>
                <p className="text-xs text-neutral-400 leading-normal">
                  {t.boss.perk3Desc}
                </p>
              </div>

            </div>

            {/* Action */}
            <div className="pt-2">
              <button
                onClick={onOpenBookingModal}
                className="btn-primary"
              >
                {lang === 'zh-TW' ? '跟神鷹哥訂房・享專屬尊寵' : lang === 'ko-KR' ? '션잉 회장 직할 예약 ・ VIP 혜택' : 'RESERVE WITH CHAIRMAN SHEN YING'}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
