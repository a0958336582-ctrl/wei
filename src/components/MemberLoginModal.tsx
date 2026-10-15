import React, { useState } from 'react';
import { Language, Member } from '../types';
import { translations } from '../data/translations';
import { X, Crown, Sparkles, UserCheck, Shield, Check } from 'lucide-react';

interface MemberLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onLoginMember: (member: Member) => void;
}

export const MemberLoginModal: React.FC<MemberLoginModalProps> = ({
  isOpen,
  onClose,
  lang,
  onLoginMember,
}) => {
  const t = translations[lang];
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  // Preset demo accounts for fast luxury testing
  const demoAccounts: Member[] = [
    {
      id: 'm-silver',
      name: '林冠宇 (Lin)',
      email: 'lin@example.com',
      phone: '0912-345-678',
      tier: 'SILVER',
      memberNumber: 'SYH-VIP-8812',
      points: 1200,
      discountRate: 0.10,
    },
    {
      id: 'm-gold',
      name: '陳雅婷 (Chen)',
      email: 'chen@example.com',
      phone: '0922-888-999',
      tier: 'GOLD',
      memberNumber: 'SYH-GOLD-6688',
      points: 5800,
      discountRate: 0.15,
    },
    {
      id: 'm-diamond',
      name: '神鷹至尊貴賓 (VVIP)',
      email: 'vvip@shenying-grandhotel.com',
      phone: '0988-888-888',
      tier: 'BLACK_DIAMOND',
      memberNumber: 'SYH-BLACK-0001',
      points: 28000,
      discountRate: 0.25,
    },
  ];

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newMember: Member = {
      id: 'm-' + Date.now(),
      name: name.trim(),
      email: email.trim() || 'guest@shenying-grandhotel.com',
      phone: phone.trim() || '0900-000-000',
      tier: 'GOLD', // Give new registrations Gold tier perk as welcome gift!
      memberNumber: 'SYH-GOLD-' + Math.floor(1000 + Math.random() * 9000),
      points: 1000,
      discountRate: 0.15,
    };
    onLoginMember(newMember);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0B0B0B] border border-white/25 shadow-2xl my-8 text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/15 bg-black">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border border-white flex items-center justify-center bg-[#00205B]">
              <Crown className="w-4 h-4 text-[#FFC72C]" />
            </div>
            <div>
              <h3 className="text-base font-bold uppercase tracking-wider text-white">
                {isRegister ? '免費註冊神鷹尊榮俱樂部' : '神鷹會員登入'}
              </h3>
              <p className="text-[11px] text-neutral-400">
                EAGLE PRIVILEGE CLUB ・ KAOHSIUNG
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
        <div className="p-6 space-y-6">
          
          {/* Quick Demo Logins */}
          <div className="space-y-3">
            <span className="text-[10px] text-neutral-400 uppercase tracking-widest block font-semibold">
              快速體驗專屬會員優惠（點擊一鍵登入）
            </span>
            <div className="grid grid-cols-1 gap-2">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => {
                    onLoginMember(acc);
                    onClose();
                  }}
                  className="p-3 bg-black border border-white/15 hover:border-white hover:bg-[#00205B]/30 transition-all text-left flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white">{acc.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 font-semibold ${
                        acc.tier === 'BLACK_DIAMOND'
                          ? 'bg-[#FFC72C]/20 text-[#FFC72C] border border-[#FFC72C]/40'
                          : acc.tier === 'GOLD'
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                          : 'bg-white/10 text-slate-300 border border-white/20'
                      }`}>
                        {acc.tier.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 font-mono">
                      {acc.memberNumber} ｜ 全房型享 {Math.round(acc.discountRate * 100)}% 折抵
                    </p>
                  </div>
                  <UserCheck className="w-4 h-4 text-white" />
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-white/15"></div>
            <span className="flex-shrink mx-4 text-[10px] text-neutral-500 uppercase tracking-widest">
              或自訂填寫資料
            </span>
            <div className="flex-grow border-t border-white/15"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-neutral-400 block mb-1">
                會員姓名 *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例如：王大明"
                className="w-full bg-black border border-white/25 px-3 py-2 text-xs text-white focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-neutral-400 block mb-1">
                手機號碼 *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0912-345-678"
                className="w-full bg-black border border-white/25 px-3 py-2 text-xs text-white focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-neutral-400 block mb-1">
                電子郵件
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-black border border-white/25 px-3 py-2 text-xs text-white focus:border-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary text-xs py-3 mt-2"
            >
              {isRegister ? '立即加入並享受 15% 迎賓折扣' : '登入會員'}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
