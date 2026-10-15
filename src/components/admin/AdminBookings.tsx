import React, { useState } from 'react';
import { Booking, Room } from '../../types';
import { hotelRooms } from '../../data/rooms';
import { upcomingConcerts } from '../../data/concerts';
import { Search, Filter, Plus, Bus, CheckCircle, Clock, XCircle, AlertCircle, FileText, X } from 'lucide-react';

interface AdminBookingsProps {
  bookings: Booking[];
  onUpdateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  onAddManualBooking: (newBooking: Booking) => void;
  onDeleteBooking: (bookingId: string) => void;
}

export const AdminBookings: React.FC<AdminBookingsProps> = ({
  bookings,
  onUpdateBookingStatus,
  onAddManualBooking,
  onDeleteBooking,
}) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterShuttleOnly, setFilterShuttleOnly] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Manual Add Form states
  const [mName, setMName] = useState('');
  const [mPhone, setMPhone] = useState('');
  const [mEmail, setMEmail] = useState('');
  const [mRoomId, setMRoomId] = useState(hotelRooms[0].id);
  const [mCheckIn, setMCheckIn] = useState('2026-10-18');
  const [mCheckOut, setMCheckOut] = useState('2026-10-19');
  const [mGuests, setMGuests] = useState(2);
  const [mConcertId, setMConcertId] = useState('c-01');
  const [mNeedShuttle, setMNeedShuttle] = useState(true);
  const [mIsMember, setMIsMember] = useState(true);
  const [mSpecial, setMSpecial] = useState('');

  const filtered = bookings.filter((b) => {
    const matchSearch =
      b.bookingId.toLowerCase().includes(search.toLowerCase()) ||
      b.guestName.toLowerCase().includes(search.toLowerCase()) ||
      b.guestPhone.includes(search);
    const matchStatus = filterStatus === 'all' || b.status === filterStatus;
    const matchShuttle = !filterShuttleOnly || b.concertShuttleNeeded;
    return matchSearch && matchStatus && matchShuttle;
  });

  const handleManualAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mName.trim() || !mPhone.trim()) return;

    const room = hotelRooms.find((r) => r.id === mRoomId) || hotelRooms[0];
    const discountRate = mIsMember ? 0.15 : 0;
    const orig = room.basePrice;
    const disc = Math.round(orig * discountRate);

    const newBooking: Booking = {
      bookingId: 'SYH-ADMIN-' + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString(),
      roomId: room.id,
      roomName: room.name['zh-TW'],
      checkInDate: mCheckIn,
      checkOutDate: mCheckOut,
      nights: 1,
      guestsCount: mGuests,
      guestName: mName.trim(),
      guestPhone: mPhone.trim(),
      guestEmail: mEmail.trim() || 'walkin@shenying-grandhotel.com',
      isMember: mIsMember,
      memberTier: mIsMember ? 'GOLD' : undefined,
      originalTotal: orig,
      discountAmount: disc,
      finalTotal: orig - disc,
      concertInterestedId: mConcertId !== 'none' ? mConcertId : undefined,
      concertShuttleNeeded: mNeedShuttle && mConcertId !== 'none',
      specialRequests: mSpecial.trim(),
      status: 'CONFIRMED',
    };

    onAddManualBooking(newBooking);
    setIsAddModalOpen(false);
    // Reset form
    setMName('');
    setMPhone('');
    setMSpecial('');
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'CHECKED_IN':
        return <span className="px-2 py-0.5 text-[11px] bg-blue-500/20 text-blue-400 border border-blue-500/40">已入住 IN</span>;
      case 'COMPLETED':
        return <span className="px-2 py-0.5 text-[11px] bg-neutral-800 text-neutral-400 border border-neutral-700">已退房 OUT</span>;
      case 'CANCELLED':
        return <span className="px-2 py-0.5 text-[11px] bg-red-500/20 text-red-400 border border-red-500/40">已取消</span>;
      default:
        return <span className="px-2 py-0.5 text-[11px] bg-green-500/20 text-green-400 border border-green-500/40">已確認 OK</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0B0B0B] border border-white/20 p-6">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider text-white">
            神鷹大飯店 訂房與演唱會專車名單管理
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            即時查詢住客名冊、核銷專車乘車碼、變更入住狀態
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary text-xs py-2.5 px-5 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>人工登記新增預訂</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0B0B0B] border border-white/15 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜尋預訂編號、姓名、電話..."
            className="w-full bg-black border border-white/20 pl-9 pr-4 py-2 text-xs text-white focus:border-white focus:outline-none"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {['all', 'CONFIRMED', 'CHECKED_IN', 'COMPLETED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs uppercase border transition-colors ${
                filterStatus === st
                  ? 'border-white bg-white text-black font-semibold'
                  : 'border-white/15 text-neutral-400 hover:text-white'
              }`}
            >
              {st === 'all' ? '全部訂單' : st}
            </button>
          ))}

          <button
            onClick={() => setFilterShuttleOnly(!filterShuttleOnly)}
            className={`px-3 py-1.5 text-xs border flex items-center gap-1.5 transition-colors ${
              filterShuttleOnly
                ? 'border-[#FFC72C] bg-[#FFC72C]/20 text-[#FFC72C] font-semibold'
                : 'border-white/15 text-neutral-400'
            }`}
          >
            <Bus className="w-3.5 h-3.5" />
            <span>僅看演唱會接駁 ({bookings.filter(b => b.concertShuttleNeeded).length})</span>
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-black border border-white/15 overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/20 bg-neutral-950 text-neutral-400 uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4 font-semibold">預訂編號</th>
              <th className="py-3.5 px-4 font-semibold">住客資料</th>
              <th className="py-3.5 px-4 font-semibold">房型與日期</th>
              <th className="py-3.5 px-4 font-semibold">專車接駁登記</th>
              <th className="py-3.5 px-4 font-semibold">金額 / 會員折抵</th>
              <th className="py-3.5 px-4 font-semibold">狀態</th>
              <th className="py-3.5 px-4 font-semibold text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-neutral-500">
                  查無符合條件的訂單記錄
                </td>
              </tr>
            ) : (
              filtered.map((b) => (
                <tr key={b.bookingId} className="hover:bg-white/5 transition-colors">
                  {/* ID */}
                  <td className="py-4 px-4 font-mono font-bold text-white whitespace-nowrap">
                    {b.bookingId}
                    <span className="text-[10px] text-neutral-500 block font-normal">
                      {new Date(b.createdAt).toLocaleDateString()}
                    </span>
                  </td>

                  {/* Guest */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="font-semibold text-white">{b.guestName}</div>
                    <div className="text-neutral-400 text-[11px]">{b.guestPhone}</div>
                    {b.isMember && (
                      <span className="text-[10px] text-[#FFC72C] font-mono">
                        ★ {b.memberTier || 'GOLD'} 會員
                      </span>
                    )}
                  </td>

                  {/* Room & Dates */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="text-neutral-200 font-medium">{b.roomName}</div>
                    <div className="text-neutral-400 text-[11px]">
                      {b.checkInDate} ~ {b.checkOutDate} ({b.nights} 晚 / {b.guestsCount} 人)
                    </div>
                    {b.specialRequests && (
                      <div className="text-[10px] text-amber-300 max-w-xs truncate" title={b.specialRequests}>
                        備註: {b.specialRequests}
                      </div>
                    )}
                  </td>

                  {/* Shuttle */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    {b.concertShuttleNeeded ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#00205B]/40 text-[#FFC72C] border border-[#00205B]">
                        <Bus className="w-3.5 h-3.5" />
                        <span>已預約 0 元專車 (保證席)</span>
                      </div>
                    ) : (
                      <span className="text-neutral-500">無專車需求</span>
                    )}
                  </td>

                  {/* Total */}
                  <td className="py-4 px-4 whitespace-nowrap font-mono">
                    <div className="text-white font-bold">NT$ {b.finalTotal.toLocaleString()}</div>
                    {b.discountAmount > 0 && (
                      <div className="text-[10px] text-[#FFC72C]">已折 NT$ {b.discountAmount}</div>
                    )}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    {getStatusBadge(b.status)}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 whitespace-nowrap text-right space-x-1.5">
                    {b.status === 'CONFIRMED' && (
                      <button
                        onClick={() => onUpdateBookingStatus(b.bookingId, 'CHECKED_IN')}
                        className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px]"
                      >
                        辦理入住
                      </button>
                    )}
                    {b.status === 'CHECKED_IN' && (
                      <button
                        onClick={() => onUpdateBookingStatus(b.bookingId, 'COMPLETED')}
                        className="px-2 py-1 bg-neutral-700 hover:bg-neutral-600 text-white text-[11px]"
                      >
                        辦理退房
                      </button>
                    )}
                    {b.status !== 'CANCELLED' && (
                      <button
                        onClick={() => {
                          if (confirm(`確定取消 ${b.bookingId} 訂單？`)) {
                            onUpdateBookingStatus(b.bookingId, 'CANCELLED');
                          }
                        }}
                        className="px-2 py-1 border border-white/20 hover:border-red-400 hover:text-red-400 text-neutral-400 text-[11px]"
                      >
                        取消
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Manual Add Booking Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#0B0B0B] border border-white/25 shadow-2xl p-6 text-white space-y-5">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                櫃檯人工登記 / 電話代訂房型
              </h3>
              <button onClick={() => setIsAddModalOpen(false)}>
                <X className="w-5 h-5 text-neutral-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleManualAddSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">住客姓名 *</label>
                  <input
                    type="text"
                    required
                    value={mName}
                    onChange={(e) => setMName(e.target.value)}
                    className="w-full bg-black border border-white/20 px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">聯絡電話 *</label>
                  <input
                    type="tel"
                    required
                    value={mPhone}
                    onChange={(e) => setMPhone(e.target.value)}
                    className="w-full bg-black border border-white/20 px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">房型選擇</label>
                <select
                  value={mRoomId}
                  onChange={(e) => setMRoomId(e.target.value)}
                  className="w-full bg-black border border-white/20 px-3 py-2 text-white"
                >
                  {hotelRooms.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name['zh-TW']} (原價 NT$ {r.basePrice.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">入住日期</label>
                  <input
                    type="date"
                    value={mCheckIn}
                    onChange={(e) => setMCheckIn(e.target.value)}
                    className="w-full bg-black border border-white/20 px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">退房日期</label>
                  <input
                    type="date"
                    value={mCheckOut}
                    onChange={(e) => setMCheckOut(e.target.value)}
                    className="w-full bg-black border border-white/20 px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">觀看演唱會場次</label>
                <select
                  value={mConcertId}
                  onChange={(e) => setMConcertId(e.target.value)}
                  className="w-full bg-black border border-white/20 px-3 py-2 text-white"
                >
                  <option value="none">-- 不觀看演唱會 --</option>
                  {upcomingConcerts.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.date} ｜ {c.artist}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-4 pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mNeedShuttle}
                    onChange={(e) => setMNeedShuttle(e.target.checked)}
                    className="w-4 h-4 accent-[#00205B]"
                  />
                  <span>登記世運/巨蛋專車接送 (0元)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mIsMember}
                    onChange={(e) => setMIsMember(e.target.checked)}
                    className="w-4 h-4 accent-[#00205B]"
                  />
                  <span>套用神鷹會員折扣 (15% OFF)</span>
                </label>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">特殊需求備註</label>
                <input
                  type="text"
                  placeholder="如：高樓層、安靜房型..."
                  value={mSpecial}
                  onChange={(e) => setMSpecial(e.target.value)}
                  className="w-full bg-black border border-white/20 px-3 py-2 text-white"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn-outline py-2 px-5 text-xs"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="btn-primary py-2 px-6 text-xs"
                >
                  確認建立預約
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
