import React from 'react';
import { Language, Member } from '../types';
import { translations } from '../data/translations';
import { Crown, Sparkles, Check, ArrowRight, UserCheck, Shield, Award } from 'lucide-react';

interface MemberClubProps {
  lang: Language;
  currentMember: Member | null;
  onOpenLoginModal: () => void;
  onSelectTierSimulation: (tier: 'SILVER' | 'GOLD' | 'BLACK_DIAMOND') => void;
  onOpenBookingModal: () => void;
}

export const MemberClub: React.FC<MemberClubProps> = ({
  lang,
  currentMember,
  onOpenLoginModal,
  onSelectTierSimulation,
  onOpenBookingModal,
}) => {
  const t = translations[lang];

  const tiersData = [
    {
      id: 'SILVER' as const,
      data: t.members.tiers.silver,
      badgeColor: 'border-slate-400 text-slate-300 bg-white/5',
      rate: '10% OFF',
      highlight: false,
    },
    {
      id: 'GOLD' as const,
      data: t.members.tiers.gold,
      badgeColor: 'border-amber-400 text-amber-300 bg-amber-400/10',
      rate: '15% OFF',
      highlight: true,
    },
    {
      id: 'BLACK_DIAMOND' as const,
      data: t.members.tiers.diamond,
      badgeColor: 'border-[#FFC72C] text-[#FFC72C] bg-[#FFC72C]/15',
      rate: '25% OFF',
      highlight: false,
    },
  ];

  return (
    <section id="members" className="py-24 bg-black text-white border-b border-white/15 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-950/20 via-black to-black pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 border border-white/20 px-3 py-1 bg-[#0B0B0B]">
            <Crown className="w-3.5 h-3.5 text-[#FFC72C]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white">
              {t.members.tag}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-[0.14em] text-white">
            {t.members.title}
          </h2>
          <p className="text-sm text-neutral-400 font-light leading-relaxed">
            {t.members.subtitle}
          </p>
        </div>

        {/* Current Member Status Bar */}
        {currentMember ? (
          <div className="mb-10 bg-[#0B0B0B] border border-white/25 p-6 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/10 border border-white/30 flex items-center justify-center text-[#FFC72C]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs uppercase text-neutral-400 tracking-wider">
                    {t.members.currentTier}
                  </span>
                  <span className="font-bold text-white text-sm uppercase">
                    {currentMember.tier.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs text-neutral-300 font-mono mt-0.5">
                  會員尊號：{currentMember.name} ｜ 會員編號：{currentMember.memberNumber} ｜ 享全房型現折 {Math.round(currentMember.discountRate * 100)}%
                </p>
              </div>
            </div>

            <button
              onClick={onOpenBookingModal}
              className="btn-primary py-2.5 px-6 text-xs"
            >
              {lang === 'zh-TW' ? '立即使用折扣訂房' : 'Book with Member Discount'}
            </button>
          </div>
        ) : (
          <div className="mb-10 bg-[#0B0B0B] border border-white/20 p-5 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-[#FFC72C]" />
              <span className="text-xs text-neutral-200">
                {lang === 'zh-TW'
                  ? '尚未加入會員？免費註冊即可立即領取訂房 9折 ~ 75折 優惠券與演唱會優先接駁！'
                  : 'Join free today to immediately unlock 10%~25% room discount and priority concert shuttle.'}
              </span>
            </div>
            <button
              onClick={onOpenLoginModal}
              className="btn-navy py-2 px-5 text-xs whitespace-nowrap"
            >
              {t.members.registerBtn}
            </button>
          </div>
        )}

        {/* 3 Tiers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiersData.map((tier) => {
            const isCurrent = currentMember?.tier === tier.id;

            return (
              <div
                key={tier.id}
                className={`bg-[#0B0B0B] border transition-all duration-300 flex flex-col justify-between ${
                  tier.highlight
                    ? 'border-[#00205B] shadow-[0_0_30px_rgba(0,32,91,0.35)] relative scale-100 md:-translate-y-2'
                    : 'border-white/15 hover:border-white/40'
                }`}
              >
                {tier.highlight && (
                  <div className="bg-[#00205B] text-white text-[10px] uppercase font-bold tracking-widest text-center py-1">
                    {lang === 'zh-TW' ? '★ 最受演唱會貴賓推薦' : '★ Most Recommended for Concert VIPs'}
                  </div>
                )}

                <div className="p-8 space-y-6">
                  {/* Badge & Discount */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold tracking-widest uppercase px-3 py-1 border ${tier.badgeColor}`}>
                      {tier.data.name}
                    </span>
                    <span className="text-xl font-bold font-mono text-white">
                      {tier.rate}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-bold uppercase tracking-wider text-white">
                      {tier.data.discount}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      {lang === 'zh-TW' ? '全館頂級房型適用・無淡旺季限制' : 'Applies to all suites year-round'}
                    </p>
                  </div>

                  {/* Perks List */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold block">
                      {lang === 'zh-TW' ? '尊享禮遇清單' : 'Tier Privileges'}
                    </span>
                    <ul className="space-y-2 text-xs text-neutral-300">
                      {tier.data.perks.map((perk, pIdx) => (
                        <li key={pIdx} className="flex items-start space-x-2">
                          <Check className="w-3.5 h-3.5 text-[#FFC72C] mt-0.5 flex-shrink-0" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tier Simulator / Action Button */}
                <div className="p-8 pt-0 border-t border-white/10 mt-6">
                  <button
                    onClick={() => {
                      onSelectTierSimulation(tier.id);
                    }}
                    className={`w-full py-3 text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      isCurrent
                        ? 'bg-white text-black'
                        : 'border border-white/30 text-white hover:bg-[#00205B] hover:border-[#00205B]'
                    }`}
                  >
                    {isCurrent ? (
                      <>
                        <UserCheck className="w-4 h-4 mr-1" />
                        <span>{lang === 'zh-TW' ? '目前使用此身分' : 'Current Active Tier'}</span>
                      </>
                    ) : (
                      <>
                        <span>{lang === 'zh-TW' ? `模擬啟用此等級 (${tier.rate})` : `Switch to ${tier.id}`}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
