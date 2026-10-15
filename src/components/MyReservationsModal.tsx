import React, { useState } from 'react';
import { Language, Booking } from '../types';
import { translations } from '../data/translations';
import { X, Search, Calendar, MapPin, Bus, Trash2, CheckCircle2 } from 'lucide-react';

interface MyReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
}

export const MyReservationsModal: React.FC<MyReservationsModalProps> = ({
  isOpen,
  onClose,
  lang,
  bookings,
  onCancelBooking,
}) => {
  const t = translations[lang];
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredBookings = searchQuery.trim()
    ? bookings.filter((b) =>
        b.bookingId.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        b.guestName.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        b.guestPhone.includes(searchQuery.trim())
      )
    : bookings;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0B0B0B] border border-white/25 shadow-2xl my-8 text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/15 bg-black">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border border-white flex items-center justify-center bg-[#00205B]">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white">
                {t.booking.searchBooking}
              </h3>
              <p className="text-[11px] text-neutral-400">
                查看、管理或驗證您在神鷹大飯店的預訂與免費演唱會專車憑證
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

        {/* Search Bar */}
        <div className="p-6 border-b border-white/10 bg-black/40">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.booking.searchPlaceholder}
              className="w-full bg-black border border-white/25 pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-white focus:outline-none"
            />
          </div>
        </div>

        {/* Bookings List */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {filteredBookings.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <p className="text-sm text-neutral-400">
                {searchQuery ? t.booking.noBookingFound : '目前尚未有已確認的預訂紀錄。'}
              </p>
              <p className="text-xs text-neutral-500">
                您可以在官網首頁或客房專區挑選心儀房型，享受神鷹會員專屬折抵！
              </p>
            </div>
          ) : (
            filteredBookings.map((b) => (
              <div
                key={b.bookingId}
                className="bg-black border border-white/20 p-5 space-y-4 hover:border-white transition-all"
              >
                {/* Reference Code & Status */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">
                      預訂憑證編號
                    </span>
                    <span className="text-base sm:text-lg font-mono font-bold text-white tracking-widest">
                      {b.bookingId}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider bg-green-500/20 text-green-400 border border-green-500/40">
                      {b.status} 已確認
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-500 block mb-0.5">預訂房型</span>
                    <span className="text-white font-medium">{b.roomName}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block mb-0.5">入住日期</span>
                    <span className="text-white font-medium">
                      {b.checkInDate} ~ {b.checkOutDate} ({b.nights} 晚)
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block mb-0.5">住客與人數</span>
                    <span className="text-white font-medium">
                      {b.guestName} ({b.guestsCount} 人)
                    </span>
                  </div>
                </div>

                {/* Concert Shuttle Status */}
                {b.concertShuttleNeeded && (
                  <div className="bg-[#00205B]/30 border border-[#00205B] p-2.5 text-xs flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bus className="w-4 h-4 text-[#FFC72C]" />
                      <span className="text-neutral-200">
                        已預約【免費演唱會接駁專車直達世運/巨蛋】
                      </span>
                    </div>
                    <span className="text-green-400 font-medium">席位已保留</span>
                  </div>
                )}

                {/* Bottom Total & Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-neutral-400">實付金額：</span>
                    <span className="font-mono font-bold text-white text-sm ml-1">
                      NT$ {b.finalTotal.toLocaleString()}
                    </span>
                    {b.discountAmount > 0 && (
                      <span className="text-[#FFC72C] text-[11px] ml-2">
                        (已省 NT$ {b.discountAmount.toLocaleString()})
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      if (confirm('確定要取消此筆預訂嗎？')) {
                        onCancelBooking(b.bookingId);
                      }
                    }}
                    className="text-neutral-400 hover:text-red-400 flex items-center gap-1 text-[11px] transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>取消預訂</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-black border-t border-white/15 flex justify-end">
          <button
            onClick={onClose}
            className="btn-outline text-xs py-2 px-6"
          >
            關閉視窗
          </button>
        </div>

      </div>
    </div>
  );
};
