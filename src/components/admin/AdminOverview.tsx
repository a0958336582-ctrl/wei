import React from 'react';
import { Booking, Member, Concert, Language } from '../../types';
import { hotelRooms } from '../../data/rooms';
import { DollarSign, CalendarCheck, Bus, Users, Globe, TrendingUp, Sparkles, MapPin, Clock } from 'lucide-react';

interface AdminOverviewProps {
  bookings: Booking[];
  members: Member[];
  concerts: Concert[];
  onNavigateTab: (tab: any) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  bookings,
  members,
  concerts,
  onNavigateTab,
}) => {
  // Calculations
  const totalRevenue = bookings.reduce((sum, b) => b.status !== 'CANCELLED' ? sum + b.finalTotal : sum, 0);
  const activeBookings = bookings.filter((b) => b.status !== 'CANCELLED');
  const shuttleBookings = bookings.filter((b) => b.concertShuttleNeeded && b.status !== 'CANCELLED');
  const totalGuests = bookings.reduce((sum, b) => b.status !== 'CANCELLED' ? sum + b.guestsCount : sum, 0);

  // Language & origin distribution mock based on realistic concert demographics
  const languageStats = [
    { lang: '繁體中文 (台灣客源)', percentage: 58, count: '1,420 訪客', color: 'bg-white' },
    { lang: '한국어 (韓國追星族)', percentage: 26, count: '638 訪客', color: 'bg-[#FFC72C]' },
    { lang: 'English (國際歐美商務客)', percentage: 16, count: '392 訪客', color: 'bg-[#00205B]' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-[#0B0B0B] border border-white/20 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 animate-pulse"></span>
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-semibold">
              高雄小港營運即時監控中心
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white mt-1">
            神鷹大飯店 營運指標與演唱會專車實時數據
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            緊鄰小港國際機場 ｜ 世運主場館與高雄巨蛋全天候專車調度中
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigateTab('bookings')}
            className="btn-primary text-xs py-2.5 px-5"
          >
            處理待核銷訂單 ({activeBookings.length})
          </button>
        </div>
      </div>

      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="bg-black border border-white/15 p-5 space-y-3">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs uppercase tracking-wider">累計訂房營收</span>
            <div className="p-2 bg-white/5 border border-white/10 text-green-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
              NT$ {totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center space-x-1.5 text-[11px] text-green-400 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>會員折扣已提振 32% 轉換率</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-black border border-white/15 p-5 space-y-3">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs uppercase tracking-wider">總預訂訂單</span>
            <div className="p-2 bg-white/5 border border-white/10 text-blue-400">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
              {bookings.length} <span className="text-sm font-normal text-neutral-400">筆</span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              有效入住中：{activeBookings.length} 間套房
            </p>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-black border border-white/15 p-5 space-y-3">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs uppercase tracking-wider">演唱會專車預約率</span>
            <div className="p-2 bg-white/5 border border-white/10 text-[#FFC72C]">
              <Bus className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
              {shuttleBookings.length} <span className="text-sm font-normal text-neutral-400">房預約</span>
            </div>
            <p className="text-[11px] text-[#FFC72C] mt-1">
              專車滿載率 94.2%（預備加開班次）
            </p>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-black border border-white/15 p-5 space-y-3">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs uppercase tracking-wider">神鷹俱樂部會員</span>
            <div className="p-2 bg-white/5 border border-white/10 text-purple-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
              {members.length + 128} <span className="text-sm font-normal text-neutral-400">名</span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              黑鑽至尊：18 位 ｜ 金鷹：84 位
            </p>
          </div>
        </div>

      </div>

      {/* Middle Grid: Concert Shuttle Tracker & Language Origin Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Concert Shuttles Dispatch Status (7 cols) */}
        <div className="lg:col-span-7 bg-[#0B0B0B] border border-white/15 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Bus className="w-4 h-4 text-[#FFC72C]" />
                近期大型演唱會直達禮賓車調度表
              </h3>
              <p className="text-[11px] text-neutral-400">
                房客憑房卡或預訂編號免費登車，現場配備神鷹禮賓專車隊
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('concerts')}
              className="text-xs text-neutral-300 hover:text-white underline underline-offset-4"
            >
              管理檔期
            </button>
          </div>

          <div className="space-y-3">
            {concerts.slice(0, 4).map((c) => (
              <div
                key={c.id}
                className="bg-black border border-white/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] px-2 py-0.5 bg-[#00205B] text-white font-mono uppercase">
                      {c.category}
                    </span>
                    <span className="text-xs font-bold text-white">{c.artist}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-500" />
                      {c.date} ({c.time})
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-500" />
                      {c.venueName['zh-TW']}
                    </span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-semibold text-[#FFC72C]">
                    專車班次：{c.shuttleTime.split(' ')[0]}
                  </div>
                  <span className="text-[10px] text-neutral-500 block">
                    車程約 {c.estimatedTransitMin} 分鐘直達
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visitor Language Breakdown & Room Inventory (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Language Breakdown */}
          <div className="bg-[#0B0B0B] border border-white/15 p-6 space-y-5">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                三語系訪客與國際客源分佈
              </h3>
              <p className="text-[11px] text-neutral-400">
                依據官網切換語系與訂房來源國家統計
              </p>
            </div>

            <div className="space-y-4">
              {languageStats.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-300">{item.lang}</span>
                    <span className="font-mono text-white font-bold">{item.percentage}% ({item.count})</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-900 overflow-hidden">
                    <div
                      className={`h-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-white/5 border border-white/10 text-[11px] text-neutral-300">
              💡 <strong>韓籍旅客備註：</strong>世運主場館 K-POP 巡演期間，韓文語系流量激增 45%，建議維持繁中/英文/韓文同步即時更新。
            </div>
          </div>

          {/* Quick Room Occupancy preview */}
          <div className="bg-[#0B0B0B] border border-white/15 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                套房房況即時總覽
              </h3>
              <button
                onClick={() => onNavigateTab('rooms')}
                className="text-xs text-neutral-400 hover:text-white"
              >
                調控價格
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {hotelRooms.map((r) => (
                <div key={r.id} className="flex justify-between items-center p-2.5 bg-black border border-white/10">
                  <span className="text-neutral-300">{r.name['zh-TW']}</span>
                  <div className="text-right">
                    <span className="font-mono font-semibold text-white">NT$ {r.basePrice.toLocaleString()}</span>
                    <span className="text-[10px] text-[#FFC72C] ml-2">(會員 {Math.round((1 - r.memberDiscountRate) * 100)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
