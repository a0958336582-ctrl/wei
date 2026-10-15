import React, { useState } from 'react';
import { Concert, Language } from '../../types';
import { Plus, Edit2, Trash2, Bus, MapPin, Calendar, Clock, Globe, Sparkles, X, Check } from 'lucide-react';

interface AdminConcertsProps {
  concerts: Concert[];
  onAddConcert: (concert: Concert) => void;
  onUpdateConcert: (concert: Concert) => void;
  onDeleteConcert: (concertId: string) => void;
}

export const AdminConcerts: React.FC<AdminConcertsProps> = ({
  concerts,
  onAddConcert,
  onUpdateConcert,
  onDeleteConcert,
}) => {
  const [editingConcert, setEditingConcert] = useState<Concert | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeLangTab, setActiveLangTab] = useState<Language>('zh-TW');

  // Form states for multi-language fields
  const [formData, setFormData] = useState<Partial<Concert>>({});

  const handleOpenAdd = () => {
    const blank: Concert = {
      id: 'c-' + Date.now(),
      artist: '',
      artistEn: '',
      artistKo: '',
      tourName: '',
      tourNameEn: '',
      tourNameKo: '',
      date: '2026-11-15',
      time: '19:30',
      venue: 'stadium',
      venueName: {
        'zh-TW': '高雄國家體育場 (世運主場館)',
        'en-US': 'Kaohsiung National Stadium',
        'ko-KR': '가오슝 국가체육장 (스윈 주경기장)',
      },
      venueAddress: '高雄市左營區世運大道 100 號',
      category: 'K-POP',
      status: 'upcoming',
      shuttleTime: '17:00 (飯店大門出發)',
      estimatedTransitMin: 28,
      hotelGuestPerks: {
        'zh-TW': ['房客免費搭乘專屬直達大巴', '散場 VIP 專用通道接送', '客房內附贈應援禮包與暖心海鮮宵夜'],
        'en-US': ['Complimentary VIP stadium coach', 'Fast-track return pickup', 'In-room cheering kit & midnight congee'],
        'ko-KR': ['투숙객 전용 리무진 셔틀 무료 탑승', '퇴장 후 VIP 전용 승차장 픽업', '응원 키트 및 야식 해물죽 무료 제공'],
      },
    };
    setFormData(blank);
    setEditingConcert(null);
    setIsModalOpen(true);
    setActiveLangTab('zh-TW');
  };

  const handleOpenEdit = (c: Concert) => {
    setFormData({ ...c });
    setEditingConcert(c);
    setIsModalOpen(true);
    setActiveLangTab('zh-TW');
  };

  const handleVenueChange = (venueKey: 'stadium' | 'arena' | 'kmc') => {
    const venueMap = {
      stadium: {
        'zh-TW': '高雄國家體育場 (世運主場館)',
        'en-US': 'Kaohsiung National Stadium',
        'ko-KR': '가오슝 국가체육장 (스윈 주경기장)',
        address: '高雄市左營區世運大道 100 號',
        mins: 28,
      },
      arena: {
        'zh-TW': '高雄巨蛋 (Kaohsiung Arena)',
        'en-US': 'Kaohsiung Arena',
        'ko-KR': '가오슝 아레나',
        address: '高雄市左營區博愛二路 757 號',
        mins: 22,
      },
      kmc: {
        'zh-TW': '高雄流行音樂中心 (海音館)',
        'en-US': 'Kaohsiung Music Center',
        'ko-KR': '가오슝 팝뮤직센터',
        address: '高雄市鹽埕區真愛路 1 號',
        mins: 18,
      },
    };
    setFormData({
      ...formData,
      venue: venueKey,
      venueName: venueMap[venueKey],
      venueAddress: venueMap[venueKey].address,
      estimatedTransitMin: venueMap[venueKey].mins,
    });
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.artist || !formData.date) {
      alert('請填寫藝人名稱與演期');
      return;
    }

    const fullConcert: Concert = {
      id: formData.id || 'c-' + Date.now(),
      artist: formData.artist || '',
      artistEn: formData.artistEn || formData.artist || '',
      artistKo: formData.artistKo || formData.artist || '',
      tourName: formData.tourName || '',
      tourNameEn: formData.tourNameEn || formData.tourName || '',
      tourNameKo: formData.tourNameKo || formData.tourName || '',
      date: formData.date || '2026-10-18',
      time: formData.time || '19:30',
      venue: formData.venue || 'stadium',
      venueName: formData.venueName || {
        'zh-TW': '高雄國家體育場 (世運主場館)',
        'en-US': 'Kaohsiung National Stadium',
        'ko-KR': '가오슝 국가체육장',
      },
      venueAddress: formData.venueAddress || '高雄市',
      category: formData.category || 'K-POP',
      status: formData.status || 'upcoming',
      shuttleTime: formData.shuttleTime || '17:00 (飯店出發)',
      estimatedTransitMin: formData.estimatedTransitMin || 25,
      hotelGuestPerks: formData.hotelGuestPerks || {
        'zh-TW': ['房客免費專屬高乘載接駁大巴直達', '散場免排捷運，VIP 專車待命回程', '深夜返抵飯店免費享用神鷹主廚鮮鮑海鮮粥'],
        'en-US': ['Complimentary stadium shuttle', 'Bypass subway lines with VIP return coach', 'Midnight congee served upon arrival'],
        'ko-KR': ['투숙객 전용 경기장 직통 셔틀 버스 무료', '퇴장 후 지하철 대기 없는 전용 픽업', '특제 전복 해물죽 무료 제공'],
      },
    };

    if (editingConcert) {
      onUpdateConcert(fullConcert);
    } else {
      onAddConcert(fullConcert);
    }
    setIsModalOpen(false);
  };

  // Helper auto-translate filler
  const handleAutoTranslate = () => {
    if (!formData.artist) return;
    setFormData((prev) => ({
      ...prev,
      artistEn: prev.artistEn || prev.artist + ' WORLD TOUR',
      artistKo: prev.artistKo || prev.artist + ' 가오슝 라이브',
      tourNameEn: prev.tourNameEn || prev.tourName + ' Live in Kaohsiung',
      tourNameKo: prev.tourNameKo || prev.tourName + ' 가오슝 스타디움 투어',
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0B0B0B] border border-white/20 p-6">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider text-white">
            高雄演唱會雷達與專車檔期維護
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            支援「繁中 / English / 한국어」三語系同步編輯，發布後前台即刻生效
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn-primary text-xs py-2.5 px-5 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>新增演唱會場次 (三語系)</span>
        </button>
      </div>

      {/* Concerts Table */}
      <div className="bg-black border border-white/15 overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/20 bg-neutral-950 text-neutral-400 uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4 font-semibold">演期與類型</th>
              <th className="py-3.5 px-4 font-semibold">巡演藝人與主題 (三語系)</th>
              <th className="py-3.5 px-4 font-semibold">場館資訊</th>
              <th className="py-3.5 px-4 font-semibold">神鷹專車出發班次</th>
              <th className="py-3.5 px-4 font-semibold">狀態標籤</th>
              <th className="py-3.5 px-4 font-semibold text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {concerts.map((c) => (
              <tr key={c.id} className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="font-mono font-bold text-white">{c.date}</div>
                  <div className="text-neutral-400 text-[11px]">{c.time} 開演</div>
                  <span className="inline-block mt-1 px-2 py-0.5 text-[10px] bg-[#00205B] text-white">
                    {c.category}
                  </span>
                </td>

                <td className="py-4 px-4">
                  <div className="font-bold text-white text-sm">{c.artist}</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">{c.tourName}</div>
                  <div className="text-[10px] text-neutral-500 font-mono flex items-center gap-2 mt-1">
                    <span>EN: {c.artistEn}</span>
                    <span>•</span>
                    <span>KO: {c.artistKo}</span>
                  </div>
                </td>

                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="text-white font-medium">{c.venueName['zh-TW']}</div>
                  <div className="text-[11px] text-[#FFC72C]">車程約 {c.estimatedTransitMin} 分鐘</div>
                </td>

                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="text-white font-medium flex items-center gap-1">
                    <Bus className="w-3.5 h-3.5 text-[#FFC72C]" />
                    <span>{c.shuttleTime}</span>
                  </div>
                  <span className="text-[10px] text-green-400">房客 0 元免費搭乘</span>
                </td>

                <td className="py-4 px-4 whitespace-nowrap">
                  {c.status === 'hot' && (
                    <span className="px-2 py-0.5 text-[10px] bg-[#E31B23] text-white font-bold">HOT 熱門</span>
                  )}
                  {c.status === 'upcoming' && (
                    <span className="px-2 py-0.5 text-[10px] bg-white/10 text-neutral-300 border border-white/20">即將登場</span>
                  )}
                </td>

                <td className="py-4 px-4 whitespace-nowrap text-right space-x-2">
                  <button
                    onClick={() => handleOpenEdit(c)}
                    className="p-1.5 border border-white/20 hover:border-white text-neutral-300 hover:text-white"
                    title="編輯"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`確定刪除 ${c.artist} 檔期？`)) {
                        onDeleteConcert(c.id);
                      }
                    }}
                    className="p-1.5 border border-white/20 hover:border-red-400 text-neutral-400 hover:text-red-400"
                    title="刪除"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Multi-Language Add/Edit Concert Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0B0B0B] border border-white/25 shadow-2xl p-6 text-white space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  {editingConcert ? '編輯演唱會檔期 (三語系)' : '新增演唱會檔期 (三語系)'}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-neutral-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleSaveSubmit} className="space-y-5 text-xs">
              
              {/* Basic Schedule & Venue settings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-black p-4 border border-white/10">
                <div>
                  <label className="text-neutral-400 block mb-1">演出日期 *</label>
                  <input
                    type="date"
                    required
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/20 px-3 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">開演時間 *</label>
                  <input
                    type="time"
                    required
                    value={formData.time || ''}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/20 px-3 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">音樂分類</label>
                  <select
                    value={formData.category || 'K-POP'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-neutral-900 border border-white/20 px-3 py-1.5 text-white"
                  >
                    <option value="K-POP">K-POP (韓流)</option>
                    <option value="WESTERN">WESTERN (西洋巨星)</option>
                    <option value="MANDOPOP">MANDOPOP (華語流行)</option>
                    <option value="FESTIVAL">FESTIVAL (大型祭典)</option>
                  </select>
                </div>
              </div>

              {/* Venue Selector */}
              <div>
                <label className="text-neutral-400 block mb-1.5">演出場館</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'stadium', label: '高雄國家體育場 (世運)' },
                    { id: 'arena', label: '高雄巨蛋 (Arena)' },
                    { id: 'kmc', label: '高雄流行音樂中心 (高流)' },
                  ].map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => handleVenueChange(v.id as any)}
                      className={`p-2 text-center border transition-all ${
                        formData.venue === v.id
                          ? 'border-white bg-[#00205B] text-white font-bold'
                          : 'border-white/15 bg-black text-neutral-400'
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shuttle time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">神鷹專車出發班次時間</label>
                  <input
                    type="text"
                    placeholder="如：17:00 / 17:30 (飯店門口直達)"
                    value={formData.shuttleTime || ''}
                    onChange={(e) => setFormData({ ...formData, shuttleTime: e.target.value })}
                    className="w-full bg-black border border-white/20 px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">狀態標籤</label>
                  <select
                    value={formData.status || 'upcoming'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-black border border-white/20 px-3 py-2 text-white"
                  >
                    <option value="upcoming">即將登場 (Upcoming)</option>
                    <option value="hot">HOT 超熱門售罄預警</option>
                  </select>
                </div>
              </div>

              {/* Multi-language Tabs Editor */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between border-b border-white/15 pb-2">
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setActiveLangTab('zh-TW')}
                      className={`px-3 py-1 text-xs border ${
                        activeLangTab === 'zh-TW'
                          ? 'border-white bg-white text-black font-bold'
                          : 'border-white/20 text-neutral-400'
                      }`}
                    >
                      🇹🇼 繁體中文
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveLangTab('en-US')}
                      className={`px-3 py-1 text-xs border ${
                        activeLangTab === 'en-US'
                          ? 'border-white bg-white text-black font-bold'
                          : 'border-white/20 text-neutral-400'
                      }`}
                    >
                      🇺🇸 English
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveLangTab('ko-KR')}
                      className={`px-3 py-1 text-xs border ${
                        activeLangTab === 'ko-KR'
                          ? 'border-white bg-white text-black font-bold'
                          : 'border-white/20 text-neutral-400'
                      }`}
                    >
                      🇰🇷 한국어
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAutoTranslate}
                    className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>自動輔助填充三語系</span>
                  </button>
                </div>

                {/* Tab 1: zh-TW */}
                {activeLangTab === 'zh-TW' && (
                  <div className="space-y-3 p-4 bg-black border border-white/10">
                    <div>
                      <label className="text-neutral-400 block mb-1">藝人 / 樂團名稱 (繁中) *</label>
                      <input
                        type="text"
                        required
                        placeholder="例如：BLACKPINK 全球巡迴"
                        value={formData.artist || ''}
                        onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/20 px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">巡演名稱 / 主題描述 (繁中)</label>
                      <input
                        type="text"
                        placeholder="例如：2026 高雄國家體育場 (世運主場館) 震撼開唱"
                        value={formData.tourName || ''}
                        onChange={(e) => setFormData({ ...formData, tourName: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/20 px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                )}

                {/* Tab 2: en-US */}
                {activeLangTab === 'en-US' && (
                  <div className="space-y-3 p-4 bg-black border border-white/10">
                    <div>
                      <label className="text-neutral-400 block mb-1">Artist / Band Name (English)</label>
                      <input
                        type="text"
                        placeholder="e.g. BLACKPINK WORLD TOUR KAOHSIUNG"
                        value={formData.artistEn || ''}
                        onChange={(e) => setFormData({ ...formData, artistEn: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/20 px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">Tour Title (English)</label>
                      <input
                        type="text"
                        placeholder="e.g. Live at Kaohsiung National Stadium"
                        value={formData.tourNameEn || ''}
                        onChange={(e) => setFormData({ ...formData, tourNameEn: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/20 px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                )}

                {/* Tab 3: ko-KR */}
                {activeLangTab === 'ko-KR' && (
                  <div className="space-y-3 p-4 bg-black border border-white/10">
                    <div>
                      <label className="text-neutral-400 block mb-1">아티스트 / 밴드명 (한국어)</label>
                      <input
                        type="text"
                        placeholder="예: 블랙핑크 월드 투어 가오슝"
                        value={formData.artistKo || ''}
                        onChange={(e) => setFormData({ ...formData, artistKo: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/20 px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">투어 및 공연 타이틀 (한국어)</label>
                      <input
                        type="text"
                        placeholder="예: 가오슝 국가체육장 5만 5천석 초대형 라이브"
                        value={formData.tourNameKo || ''}
                        onChange={(e) => setFormData({ ...formData, tourNameKo: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/20 px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-3 pt-3 border-t border-white/15">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-outline py-2 px-5 text-xs"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="btn-primary py-2 px-6 text-xs"
                >
                  儲存並即時發布
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
