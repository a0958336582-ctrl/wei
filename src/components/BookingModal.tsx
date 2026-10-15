import React, { useState, useEffect } from 'react';
import { Language, Room, Concert, Member, Booking } from '../types';
import { translations } from '../data/translations';
import { hotelRooms } from '../data/rooms';
import { upcomingConcerts } from '../data/concerts';
import { X, Calendar, User, Music, Check, ShieldCheck, Sparkles, Copy, CheckCheck, Bus, MapPin } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  currentMember: Member | null;
  initialRoomId?: string;
  initialConcertId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  onBookingSuccess: (newBooking: Booking) => void;
  onRegisterMemberQuick: (name: string, email: string, phone: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  currentMember,
  initialRoomId,
  initialConcertId,
  initialCheckIn = '2026-10-18',
  initialCheckOut = '2026-10-19',
  initialGuests = 2,
  onBookingSuccess,
  onRegisterMemberQuick,
}) => {
  const t = translations[lang];

  // Form states
  const [selectedRoomId, setSelectedRoomId] = useState<string>(initialRoomId || hotelRooms[0].id);
  const [checkIn, setCheckIn] = useState<string>(initialCheckIn);
  const [checkOut, setCheckOut] = useState<string>(initialCheckOut);
  const [guestsCount, setGuestsCount] = useState<number>(initialGuests);
  const [selectedConcertId, setSelectedConcertId] = useState<string>(initialConcertId || 'c-01');
  const [needShuttle, setNeedShuttle] = useState<boolean>(true);
  const [guestName, setGuestName] = useState<string>(currentMember?.name || '');
  const [guestEmail, setGuestEmail] = useState<string>(currentMember?.email || '');
  const [guestPhone, setGuestPhone] = useState<string>(currentMember?.phone || '');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [joinClubOnBooking, setJoinClubOnBooking] = useState<boolean>(!currentMember);
  
  // Status states
  const [step, setStep] = useState<'form' | 'processing' | 'confirmed'>('form');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (initialRoomId) setSelectedRoomId(initialRoomId);
    if (initialConcertId) setSelectedConcertId(initialConcertId);
    if (initialCheckIn) setCheckIn(initialCheckIn);
    if (initialCheckOut) setCheckOut(initialCheckOut);
    if (initialGuests) setGuestsCount(initialGuests);
    if (currentMember) {
      setGuestName(currentMember.name);
      setGuestEmail(currentMember.email);
      setGuestPhone(currentMember.phone);
      setJoinClubOnBooking(false);
    }
  }, [initialRoomId, initialConcertId, initialCheckIn, initialCheckOut, initialGuests, currentMember, isOpen]);

  if (!isOpen) return null;

  // Selected room details
  const selectedRoom = hotelRooms.find((r) => r.id === selectedRoomId) || hotelRooms[0];
  const selectedConcert = upcomingConcerts.find((c) => c.id === selectedConcertId);

  // Nights calculation
  const calculateNights = () => {
    try {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diff = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 1;
    } catch {
      return 1;
    }
  };

  const nights = calculateNights();

  // Pricing calculations
  const basePricePerNight = selectedRoom.basePrice;
  const originalTotal = basePricePerNight * nights;

  // If member or chosen to join, apply discount
  const isMemberDiscountApplicable = Boolean(currentMember || joinClubOnBooking);
  const discountRate = currentMember ? currentMember.discountRate : (joinClubOnBooking ? 0.15 : 0);
  const discountAmount = Math.round(originalTotal * discountRate);
  const finalTotal = originalTotal - discountAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      alert(lang === 'zh-TW' ? '請填寫住客姓名' : 'Please enter guest name');
      return;
    }
    if (!guestPhone.trim()) {
      alert(lang === 'zh-TW' ? '請填寫聯絡電話' : 'Please enter phone number');
      return;
    }

    setStep('processing');

    // Simulate instant reservation generation
    setTimeout(() => {
      const randomId = 'SYH-2026-' + Math.floor(1000 + Math.random() * 9000);
      const bookingData: Booking = {
        bookingId: randomId,
        createdAt: new Date().toISOString(),
        roomId: selectedRoom.id,
        roomName: selectedRoom.name[lang],
        checkInDate: checkIn,
        checkOutDate: checkOut,
        nights,
        guestsCount,
        guestName,
        guestPhone,
        guestEmail,
        isMember: isMemberDiscountApplicable,
        memberTier: currentMember?.tier || (joinClubOnBooking ? 'GOLD' : undefined),
        originalTotal,
        discountAmount,
        finalTotal,
        concertInterestedId: selectedConcertId !== 'none' ? selectedConcertId : undefined,
        concertShuttleNeeded: needShuttle && selectedConcertId !== 'none',
        specialRequests,
        status: 'CONFIRMED',
      };

      // Quick register if requested
      if (joinClubOnBooking && !currentMember) {
        onRegisterMemberQuick(guestName, guestEmail || 'vip@shenying-grandhotel.com', guestPhone);
      }

      setConfirmedBooking(bookingData);
      onBookingSuccess(bookingData);
      setStep('confirmed');
    }, 1200);
  };

  const handleCopyCode = () => {
    if (!confirmedBooking) return;
    navigator.clipboard.writeText(confirmedBooking.bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAndClose = () => {
    setStep('form');
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0B0B0B] border border-white/25 shadow-2xl my-8 text-white">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/15 bg-black">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border border-white flex items-center justify-center bg-[#00205B]">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white">
                {t.booking.title}
              </h3>
              <p className="text-[11px] text-neutral-400 tracking-wider">
                SHEN YING GRAND HOTEL KAOHSIUNG ・ XIAOGANG
              </p>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Processing State */}
        {step === 'processing' && (
          <div className="p-16 flex flex-col items-center justify-center space-y-6 text-center">
            <div className="w-16 h-16 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            <div className="space-y-2">
              <h4 className="text-lg font-bold uppercase tracking-widest text-white">
                {t.booking.processing}
              </h4>
              <p className="text-xs text-neutral-400">
                正在為您鎖定優惠房價、免費演唱會專車座席與迎賓禮遇...
              </p>
            </div>
          </div>
        )}

        {/* Confirmed Success State */}
        {step === 'confirmed' && confirmedBooking && (
          <div className="p-8 sm:p-10 space-y-8">
            <div className="border border-green-500/40 bg-green-500/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 text-black flex items-center justify-center flex-shrink-0">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white uppercase tracking-wider">
                    {t.booking.successTitle}
                  </h4>
                  <p className="text-xs text-neutral-300 mt-1">
                    {t.booking.successMessage}
                  </p>
                </div>
              </div>
            </div>

            {/* Voucher Card */}
            <div className="bg-black border border-white/20 p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/15">
                <div>
                  <span className="text-[11px] text-neutral-400 uppercase tracking-widest block">
                    {t.booking.bookingIdLabel}
                  </span>
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-widest">
                    {confirmedBooking.bookingId}
                  </span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="btn-outline text-xs py-2 px-4 flex items-center gap-1.5"
                >
                  {copied ? <CheckCheck className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? '已複製！' : t.booking.copyId}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-neutral-500 uppercase block mb-1">預訂房型</span>
                  <span className="text-white font-medium">{confirmedBooking.roomName}</span>
                </div>
                <div>
                  <span className="text-neutral-500 uppercase block mb-1">入住與退房</span>
                  <span className="text-white font-medium">
                    {confirmedBooking.checkInDate} ~ {confirmedBooking.checkOutDate} ({confirmedBooking.nights} 晚)
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 uppercase block mb-1">住客資訊</span>
                  <span className="text-white font-medium">
                    {confirmedBooking.guestName} ({confirmedBooking.guestsCount} 人)
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 uppercase block mb-1">實付總額</span>
                  <span className="text-white font-mono font-bold text-sm">
                    NT$ {confirmedBooking.finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Concert Shuttle Voucher Strip */}
              {confirmedBooking.concertShuttleNeeded && (
                <div className="bg-[#00205B]/30 border border-[#00205B] p-4 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <Bus className="w-5 h-5 text-[#FFC72C]" />
                    <div>
                      <span className="font-semibold text-white block">
                        已為您預約【免費演唱會接駁專車】
                      </span>
                      <span className="text-neutral-300 text-[11px]">
                        出發當日請於飯店 1F 禮賓部櫃檯出示此憑證上車。
                      </span>
                    </div>
                  </div>
                  <span className="text-[#FFC72C] font-mono font-bold">0 元免費包含</span>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={resetAndClose}
                className="btn-primary"
              >
                {t.booking.closeModal}
              </button>
            </div>
          </div>
        )}

        {/* Main Booking Form */}
        {step === 'form' && (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
            
            {/* Step 1: Dates & Room */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-neutral-300 border-b border-white/10 pb-2">
                {t.booking.stepDates}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">
                    {t.booking.checkIn}
                  </label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-black border border-white/20 px-3 py-2 text-xs text-white focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">
                    {t.booking.checkOut}
                  </label>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-black border border-white/20 px-3 py-2 text-xs text-white focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">
                    {t.booking.guests}
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-black border border-white/20 px-3 py-2 text-xs text-white focus:border-white focus:outline-none"
                  >
                    <option value={1}>1 位貴賓</option>
                    <option value={2}>2 位貴賓</option>
                    <option value={3}>3 位貴賓</option>
                    <option value={4}>4 位貴賓</option>
                  </select>
                </div>
              </div>

              {/* Room Selection Dropdown Cards */}
              <div className="space-y-2">
                <label className="text-xs text-neutral-400 block">
                  {t.booking.roomSelect}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hotelRooms.map((room) => {
                    const isSelected = selectedRoomId === room.id;
                    const rDiscount = currentMember ? currentMember.discountRate : (joinClubOnBooking ? 0.15 : 0);
                    const calcPrice = Math.round(room.basePrice * (1 - rDiscount));

                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`p-3.5 border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-white bg-[#00205B]/30'
                            : 'border-white/15 bg-black hover:border-white/40'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold uppercase text-white">
                            {room.name[lang]}
                          </p>
                          <p className="text-[11px] text-neutral-400">
                            {room.sizeM2} m² ｜ {room.capacity} 人
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-mono font-bold text-white">
                            NT$ {calcPrice.toLocaleString()}
                          </p>
                          <span className="text-[10px] text-[#FFC72C]">
                            {isMemberDiscountApplicable ? '享會員折扣' : '/ 晚'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 2: Concert Perks Selection */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-neutral-300 border-b border-white/10 pb-2 flex items-center justify-between">
                <span>{t.booking.concertSelection}</span>
                <span className="text-[#FFC72C] text-[11px] font-normal">住客 0 元禮遇</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">
                    {t.booking.selectConcert}
                  </label>
                  <select
                    value={selectedConcertId}
                    onChange={(e) => setSelectedConcertId(e.target.value)}
                    className="w-full bg-black border border-white/20 px-3 py-2 text-xs text-white focus:border-white focus:outline-none"
                  >
                    <option value="none">-- 純住宿渡假 (不觀看演唱會) --</option>
                    {upcomingConcerts.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.date} ｜ {c.artist} ({c.venueName[lang]})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center space-x-2 text-xs text-neutral-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={needShuttle}
                      disabled={selectedConcertId === 'none'}
                      onChange={(e) => setNeedShuttle(e.target.checked)}
                      className="w-4 h-4 accent-[#00205B]"
                    />
                    <span>{t.booking.needShuttle}</span>
                  </label>
                </div>
              </div>

              {selectedConcert && selectedConcertId !== 'none' && (
                <div className="bg-black/60 border border-white/15 p-3.5 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-neutral-300">
                    <span className="font-semibold text-white">專車接駁資訊：</span>
                    <span className="text-[#FFC72C]">{selectedConcert.shuttleTime}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    ※ 飯店至場館直達專用通道，散場專車隨到隨發，省下至少 45 分鐘排隊擠捷運時間！
                  </p>
                </div>
              )}
            </div>

            {/* Step 3: Guest Details & Member Discount */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-neutral-300 border-b border-white/10 pb-2">
                {t.booking.stepGuest}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">
                    {t.booking.guestName} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="請輸入真實姓名"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-black border border-white/20 px-3 py-2 text-xs text-white focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">
                    {t.booking.guestPhone} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="例如：0912-345-678"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-black border border-white/20 px-3 py-2 text-xs text-white focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">
                    {t.booking.guestEmail}
                  </label>
                  <input
                    type="email"
                    placeholder="接收預訂確認函"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-black border border-white/20 px-3 py-2 text-xs text-white focus:border-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="text-xs text-neutral-400 block mb-1">
                  {t.booking.specialRequests}
                </label>
                <input
                  type="text"
                  placeholder="例如：需要高樓層看跑道、安靜房型、過敏防蟎枕..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-black border border-white/20 px-3 py-2 text-xs text-white focus:border-white focus:outline-none"
                />
              </div>

              {/* Member Status & Checkbox */}
              <div className="border border-white/15 p-4 bg-black/60">
                {currentMember ? (
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-[#FFC72C]" />
                      <span className="text-white font-medium">
                        尊榮會員：{currentMember.name} ({currentMember.tier})
                      </span>
                    </div>
                    <span className="text-[#FFC72C] font-semibold">
                      立享 {Math.round(currentMember.discountRate * 100)}% 專屬折抵
                    </span>
                  </div>
                ) : (
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={joinClubOnBooking}
                      onChange={(e) => setJoinClubOnBooking(e.target.checked)}
                      className="w-4 h-4 mt-0.5 accent-[#00205B]"
                    />
                    <div className="text-xs">
                      <span className="text-white font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#FFC72C]" />
                        {t.booking.applyMemberDiscount} (本單現省 15%！)
                      </span>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        同意自動註冊神鷹俱樂部會員，享有未來全房型專屬特惠、演唱會專車優先席與迎賓小點。
                      </p>
                    </div>
                  </label>
                )}
              </div>
            </div>

            {/* Step 4: Price Summary & Submission */}
            <div className="bg-black border border-white/20 p-5 space-y-3">
              <div className="flex justify-between text-xs text-neutral-400">
                <span>{t.booking.originalPrice} ({selectedRoom.name[lang]} × {nights} 晚)</span>
                <span>NT$ {originalTotal.toLocaleString()}</span>
              </div>

              {isMemberDiscountApplicable && (
                <div className="flex justify-between text-xs text-[#FFC72C]">
                  <span>{t.booking.memberDiscount} ({Math.round(discountRate * 100)}% OFF)</span>
                  <span>- NT$ {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-xs text-green-400">
                <span>高雄演唱會直達接駁車 (房客專享)</span>
                <span>0 元 (免費提供)</span>
              </div>

              <div className="pt-3 border-t border-white/15 flex justify-between items-baseline">
                <span className="text-sm uppercase tracking-wider text-white font-bold">
                  {t.booking.netPayable}
                </span>
                <div className="text-right">
                  <span className="text-2xl font-mono font-bold text-white">
                    NT$ {finalTotal.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-neutral-500 block">
                    (含稅與服務費，入住當日現場結清)
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs text-neutral-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>免預付訂金・入住前 24 小時免費取消</span>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-1/2 sm:w-auto btn-outline text-xs py-3 px-6"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="w-1/2 sm:w-auto btn-primary text-xs py-3 px-8"
                >
                  {t.booking.submitBooking}
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
