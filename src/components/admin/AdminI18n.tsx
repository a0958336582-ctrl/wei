import React, { useState } from 'react';
import { Language } from '../../types';
import { Globe, Save, Check, RefreshCw } from 'lucide-react';

export const AdminI18n: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<Language>('zh-TW');
  const [savedNotice, setSavedNotice] = useState(false);

  // Editable sample entries
  const [lexicon, setLexicon] = useState({
    'zh-TW': {
      brandTagline: '高雄小港・巨星巡迴・極致奢華之巔',
      bossSlogan: '「來高雄看演唱會、談生意、住飯店，找我神鷹哥就對了！」',
      shuttleNotice: '凡持有神鷹大飯店當日住宿預訂者，可於訂房時或入住前向櫃檯免費登記專車接送。',
      vipPerkHeader: '神鷹住客專利：免排隊、專車直達世運與巨蛋、深夜鮮鮑海鮮粥',
    },
    'en-US': {
      brandTagline: 'Kaohsiung Xiaogang ・ Concert VIP Luxury Sanctuary',
      bossSlogan: '"Coming to Kaohsiung for world-class concerts or business? Trust Shen Ying!"',
      shuttleNotice: 'All guests holding a valid reservation can register for complimentary private concert shuttles.',
      vipPerkHeader: 'Shen Ying Patent: Skip queues, direct stadium coach, and midnight seafood congee.',
    },
    'ko-KR': {
      brandTagline: '가오슝 샤오강 ・ K-POP & 글로벌 콘서트 VIP 럭셔리 레지던스',
      bossSlogan: '"가오슝으로 세계적인 콘서트를 보러 오시거나 비즈니스로 오신다면 저 션잉(神鷹哥)을 찾으십시오!"',
      shuttleNotice: '션잉 그랜드 호텔 예약 고객님은 객실 예약 시 콘서트 무료 셔틀 탑승을 신청하실 수 있습니다.',
      vipPerkHeader: '션잉 투숙객 특전: 대기 없는 전용 셔틀, 경기장 직통, 전복 해물죽 야식 무료 제공',
    },
  });

  const handleTextChange = (key: string, val: string) => {
    setLexicon({
      ...lexicon,
      [selectedLang]: {
        ...lexicon[selectedLang],
        [key]: val,
      },
    });
  };

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-[#0B0B0B] border border-white/20 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            三語系靜態文案管理 (i18n Lexicon System)
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            線上即時校對與維護前台繁體中文 (zh-TW)、English (en-US)、한국어 (ko-KR) 核心宣傳詞條
          </p>
        </div>

        <button
          onClick={handleSave}
          className="btn-primary text-xs py-2 px-6 flex items-center gap-1.5"
        >
          {savedNotice ? <Check className="w-4 h-4 text-green-400" /> : <Save className="w-4 h-4" />}
          <span>{savedNotice ? '文案已儲存生效！' : '儲存文案設定'}</span>
        </button>
      </div>

      {/* Language Switch Tabs */}
      <div className="flex space-x-2 border-b border-white/15 pb-3">
        <button
          onClick={() => setSelectedLang('zh-TW')}
          className={`px-4 py-2 text-xs uppercase tracking-wider border transition-all ${
            selectedLang === 'zh-TW'
              ? 'border-white bg-white text-black font-bold'
              : 'border-white/20 text-neutral-400 hover:text-white'
          }`}
        >
          🇹🇼 繁體中文 (zh-TW)
        </button>
        <button
          onClick={() => setSelectedLang('en-US')}
          className={`px-4 py-2 text-xs uppercase tracking-wider border transition-all ${
            selectedLang === 'en-US'
              ? 'border-white bg-white text-black font-bold'
              : 'border-white/20 text-neutral-400 hover:text-white'
          }`}
        >
          🇺🇸 English (en-US)
        </button>
        <button
          onClick={() => setSelectedLang('ko-KR')}
          className={`px-4 py-2 text-xs uppercase tracking-wider border transition-all ${
            selectedLang === 'ko-KR'
              ? 'border-white bg-white text-black font-bold'
              : 'border-white/20 text-neutral-400 hover:text-white'
          }`}
        >
          🇰🇷 한국어 (ko-KR)
        </button>
      </div>

      {/* Lexicon Editors */}
      <div className="bg-black border border-white/15 p-6 space-y-5 text-xs">
        
        <div className="space-y-1.5">
          <label className="text-neutral-400 block font-semibold">
            飯店核心 Slogan (brand.tagline)
          </label>
          <input
            type="text"
            value={lexicon[selectedLang].brandTagline}
            onChange={(e) => handleTextChange('brandTagline', e.target.value)}
            className="w-full bg-[#0B0B0B] border border-white/20 p-2.5 text-white"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-neutral-400 block font-semibold">
            神鷹哥霸氣語錄 (boss.quote)
          </label>
          <textarea
            rows={2}
            value={lexicon[selectedLang].bossSlogan}
            onChange={(e) => handleTextChange('bossSlogan', e.target.value)}
            className="w-full bg-[#0B0B0B] border border-white/20 p-2.5 text-white"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-neutral-400 block font-semibold">
            演唱會免費專車搭乘須知 (concerts.shuttleNotice)
          </label>
          <textarea
            rows={2}
            value={lexicon[selectedLang].shuttleNotice}
            onChange={(e) => handleTextChange('shuttleNotice', e.target.value)}
            className="w-full bg-[#0B0B0B] border border-white/20 p-2.5 text-white"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-neutral-400 block font-semibold">
            房客獨家禮遇標題 (concerts.vipPerkHeader)
          </label>
          <input
            type="text"
            value={lexicon[selectedLang].vipPerkHeader}
            onChange={(e) => handleTextChange('vipPerkHeader', e.target.value)}
            className="w-full bg-[#0B0B0B] border border-white/20 p-2.5 text-white"
          />
        </div>

      </div>

    </div>
  );
};
