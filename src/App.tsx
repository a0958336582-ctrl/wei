import React, { useState, useEffect } from 'react';
import { Language, Member, Booking, Concert, Room } from './types';
import { translations } from './data/translations';
import { hotelRooms as initialRooms } from './data/rooms';
import { upcomingConcerts as initialConcerts } from './data/concerts';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BossSection } from './components/BossSection';
import { ConcertRadar } from './components/ConcertRadar';
import { RoomsSection } from './components/RoomsSection';
import { MemberClub } from './components/MemberClub';
import { BookingModal } from './components/BookingModal';
import { MyReservationsModal } from './components/MyReservationsModal';
import { MemberLoginModal } from './components/MemberLoginModal';
import { VenueGuideModal } from './components/VenueGuideModal';
import { Footer } from './components/Footer';
import { AdminLayout } from './components/admin/AdminLayout';

// Default initial seeded booking
const INITIAL_BOOKINGS: Booking[] = [
  {
    bookingId: 'SYH-2026-8866',
    createdAt: '2026-10-01T08:00:00.000Z',
    roomId: 'room-obsidian-king',
    roomName: '神鷹曜黑尊爵套房',
    checkInDate: '2026-10-18',
    checkOutDate: '2026-10-19',
    nights: 1,
    guestsCount: 2,
    guestName: '神鷹貴賓 (VIP Guest)',
    guestPhone: '0912-345-678',
    guestEmail: 'vip@shenying-grandhotel.com',
    isMember: true,
    memberTier: 'GOLD',
    originalTotal: 6800,
    discountAmount: 1020,
    finalTotal: 5780,
    concertInterestedId: 'c-01',
    concertShuttleNeeded: true,
    specialRequests: '高樓層看機場跑道，需世運主場館 BLACKPINK 專車接送',
    status: 'CONFIRMED',
  },
  {
    bookingId: 'SYH-2026-9921',
    createdAt: '2026-10-01T09:30:00.000Z',
    roomId: 'room-trident-penthouse',
    roomName: '三叉戟海港天際總統套房',
    checkInDate: '2026-10-24',
    checkOutDate: '2026-10-26',
    nights: 2,
    guestsCount: 4,
    guestName: '李總裁 (President Lee)',
    guestPhone: '0988-999-777',
    guestEmail: 'lee.corp@taiwan.com',
    isMember: true,
    memberTier: 'BLACK_DIAMOND',
    originalTotal: 37600,
    discountAmount: 9400,
    finalTotal: 28200,
    concertInterestedId: 'c-02',
    concertShuttleNeeded: true,
    specialRequests: '五月天世運專車與機場超跑接駁',
    status: 'CONFIRMED',
  },
];

const INITIAL_MEMBERS: Member[] = [
  {
    id: 'm-diamond-01',
    name: '神鷹至尊貴賓 (VVIP)',
    email: 'vvip@shenying-grandhotel.com',
    phone: '0988-888-888',
    tier: 'BLACK_DIAMOND',
    memberNumber: 'SYH-BLACK-0001',
    points: 28000,
    discountRate: 0.25,
  },
  {
    id: 'm-gold-02',
    name: '陳雅婷 (Chen)',
    email: 'chen@example.com',
    phone: '0922-888-999',
    tier: 'GOLD',
    memberNumber: 'SYH-GOLD-6688',
    points: 5800,
    discountRate: 0.15,
  },
  {
    id: 'm-silver-03',
    name: '林冠宇 (Lin)',
    email: 'lin@example.com',
    phone: '0912-345-678',
    tier: 'SILVER',
    memberNumber: 'SYH-VIP-8812',
    points: 1200,
    discountRate: 0.10,
  },
];

export default function App() {
  // Mode: 'client' (Official Website) or 'admin' (Backend Management Portal)
  const [viewMode, setViewMode] = useState<'client' | 'admin'>('client');

  // Trilingual state: zh-TW (default), en-US, ko-KR
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('syh_lang');
    if (saved === 'zh-TW' || saved === 'en-US' || saved === 'ko-KR') {
      return saved;
    }
    return 'zh-TW';
  });

  // Current logged in member state
  const [currentMember, setCurrentMember] = useState<Member | null>(() => {
    const saved = localStorage.getItem('syh_member');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return INITIAL_MEMBERS[1]; // Start as Gold member for instant luxury experience
  });

  // Dynamic Members list
  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('syh_all_members');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_MEMBERS;
      }
    }
    return INITIAL_MEMBERS;
  });

  // Stored Bookings state
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('syh_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_BOOKINGS;
      }
    }
    return INITIAL_BOOKINGS;
  });

  // Concerts state (editable in admin)
  const [concerts, setConcerts] = useState<Concert[]>(() => {
    const saved = localStorage.getItem('syh_concerts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialConcerts;
      }
    }
    return initialConcerts;
  });

  // Rooms state (rates editable in admin)
  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem('syh_rooms');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialRooms;
      }
    }
    return initialRooms;
  });

  // Modals state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingPrefills, setBookingPrefills] = useState<{
    roomId?: string;
    concertId?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }>({});

  const [isMyBookingsModalOpen, setIsMyBookingsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedConcertForGuide, setSelectedConcertForGuide] = useState<Concert | null>(null);

  // Sync lang changes to localStorage and HTML lang attribute
  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('syh_lang', newLang);
    document.documentElement.lang = newLang;
  };

  // Sync member changes
  const handleLoginMember = (member: Member) => {
    setCurrentMember(member);
    localStorage.setItem('syh_member', JSON.stringify(member));

    // Also add to members catalog if not exists
    if (!members.some((m) => m.id === member.id)) {
      const updated = [member, ...members];
      setMembers(updated);
      localStorage.setItem('syh_all_members', JSON.stringify(updated));
    }
  };

  const handleLogout = () => {
    setCurrentMember(null);
    localStorage.removeItem('syh_member');
  };

  const handleSelectTierSimulation = (tier: 'SILVER' | 'GOLD' | 'BLACK_DIAMOND') => {
    const discountMap = {
      SILVER: 0.10,
      GOLD: 0.15,
      BLACK_DIAMOND: 0.25,
    };
    const updated: Member = {
      id: currentMember?.id || 'm-sim-' + Date.now(),
      name: currentMember?.name || '神鷹尊貴會員',
      email: currentMember?.email || 'vip@shenying-grandhotel.com',
      phone: currentMember?.phone || '0988-888-888',
      tier,
      memberNumber: `SYH-${tier.slice(0, 4)}-` + Math.floor(1000 + Math.random() * 9000),
      points: tier === 'BLACK_DIAMOND' ? 25000 : tier === 'GOLD' ? 5000 : 1500,
      discountRate: discountMap[tier],
    };
    handleLoginMember(updated);
  };

  // Quick member register during booking
  const handleRegisterMemberQuick = (name: string, email: string, phone: string) => {
    const newM: Member = {
      id: 'm-' + Date.now(),
      name,
      email,
      phone,
      tier: 'GOLD',
      memberNumber: 'SYH-GOLD-' + Math.floor(1000 + Math.random() * 9000),
      points: 1000,
      discountRate: 0.15,
    };
    handleLoginMember(newM);
  };

  // Save new booking
  const handleBookingSuccess = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('syh_bookings', JSON.stringify(updated));
  };

  // Cancel booking
  const handleCancelBooking = (bookingId: string) => {
    const updated = bookings.filter((b) => b.bookingId !== bookingId);
    setBookings(updated);
    localStorage.setItem('syh_bookings', JSON.stringify(updated));
  };

  // Admin Booking actions
  const handleUpdateBookingStatus = (bookingId: string, status: Booking['status']) => {
    const updated = bookings.map((b) => b.bookingId === bookingId ? { ...b, status } : b);
    setBookings(updated);
    localStorage.setItem('syh_bookings', JSON.stringify(updated));
  };

  const handleAddManualBooking = (newBooking: Booking) => {
    handleBookingSuccess(newBooking);
  };

  // Admin Concert actions
  const handleAddConcert = (newConcert: Concert) => {
    const updated = [newConcert, ...concerts];
    setConcerts(updated);
    localStorage.setItem('syh_concerts', JSON.stringify(updated));
  };

  const handleUpdateConcert = (updatedConcert: Concert) => {
    const updated = concerts.map((c) => c.id === updatedConcert.id ? updatedConcert : c);
    setConcerts(updated);
    localStorage.setItem('syh_concerts', JSON.stringify(updated));
  };

  const handleDeleteConcert = (concertId: string) => {
    const updated = concerts.filter((c) => c.id !== concertId);
    setConcerts(updated);
    localStorage.setItem('syh_concerts', JSON.stringify(updated));
  };

  // Admin Room actions
  const handleUpdateRoomPrice = (roomId: string, newBasePrice: number, newDiscountRate: number) => {
    const updated = rooms.map((r) => r.id === roomId ? { ...r, basePrice: newBasePrice, memberDiscountRate: newDiscountRate } : r);
    setRooms(updated);
    localStorage.setItem('syh_rooms', JSON.stringify(updated));
  };

  // Admin Member actions
  const handleUpdateMemberTier = (memberId: string, newTier: Member['tier']) => {
    const discountMap = {
      SILVER: 0.10,
      GOLD: 0.15,
      BLACK_DIAMOND: 0.25,
    };
    const updated = members.map((m) => m.id === memberId ? { ...m, tier: newTier, discountRate: discountMap[newTier] } : m);
    setMembers(updated);
    localStorage.setItem('syh_all_members', JSON.stringify(updated));
    if (currentMember?.id === memberId) {
      setCurrentMember({ ...currentMember, tier: newTier, discountRate: discountMap[newTier] });
    }
  };

  // Triggers for booking modal
  const openBookingWithPrefill = (prefill?: {
    roomId?: string;
    concertId?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }) => {
    setBookingPrefills(prefill || {});
    setIsBookingModalOpen(true);
  };

  const scrollToConcerts = () => {
    const el = document.getElementById('concerts');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Render Admin Backend if viewMode === 'admin'
  if (viewMode === 'admin') {
    return (
      <AdminLayout
        onReturnToClient={() => setViewMode('client')}
        bookings={bookings}
        members={members}
        concerts={concerts}
        rooms={rooms}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        onAddManualBooking={handleAddManualBooking}
        onDeleteBooking={handleCancelBooking}
        onAddConcert={handleAddConcert}
        onUpdateConcert={handleUpdateConcert}
        onDeleteConcert={handleDeleteConcert}
        onUpdateRoomPrice={handleUpdateRoomPrice}
        onUpdateMemberTier={handleUpdateMemberTier}
      />
    );
  }

  // Render Official Client Website
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#00205B] selection:text-white">
      {/* Top Banner indicating easy toggle to Admin */}
      <div className="bg-[#0B0B0B] border-b border-amber-400/30 px-4 py-1.5 text-[11px] flex items-center justify-between text-neutral-300">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
          <span>神鷹巨鷹國際大飯店 官方旗艦網站（已切換至即時前台）</span>
        </div>
        <button
          onClick={() => setViewMode('admin')}
          className="text-amber-300 hover:text-white underline underline-offset-2 flex items-center gap-1 font-medium"
        >
          <span>切換至【後台智慧營運系統】</span>
          <span>→</span>
        </button>
      </div>

      {/* Maserati Luxury Sticky Navigation */}
      <Navbar
        lang={lang}
        onLanguageChange={handleLanguageChange}
        currentMember={currentMember}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        onOpenBookingModal={() => openBookingWithPrefill()}
        onOpenMyBookingsModal={() => setIsMyBookingsModalOpen(true)}
        onOpenAdmin={() => setViewMode('admin')}
      />

      {/* Hero Section */}
      <Hero
        lang={lang}
        onOpenBookingModal={openBookingWithPrefill}
        onExploreConcerts={scrollToConcerts}
      />

      {/* Boss "神鷹哥" Feature & Story Section */}
      <BossSection
        lang={lang}
        onOpenBookingModal={() => openBookingWithPrefill()}
      />

      {/* Free Concert Radar & Perks Section */}
      <ConcertRadar
        lang={lang}
        onSelectConcertToBook={(concertId) => {
          openBookingWithPrefill({ concertId });
        }}
        onOpenVenueGuide={(concert) => {
          setSelectedConcertForGuide(concert);
        }}
      />

      {/* Maserati Obsidian Luxury Rooms Section */}
      <RoomsSection
        lang={lang}
        currentMember={currentMember}
        onBookRoom={(roomId) => {
          openBookingWithPrefill({ roomId });
        }}
      />

      {/* Eagle Privilege VIP Member Club */}
      <MemberClub
        lang={lang}
        currentMember={currentMember}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onSelectTierSimulation={handleSelectTierSimulation}
        onOpenBookingModal={() => openBookingWithPrefill()}
      />

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenBookingModal={() => openBookingWithPrefill()}
        onOpenAdmin={() => setViewMode('admin')}
      />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        lang={lang}
        currentMember={currentMember}
        initialRoomId={bookingPrefills.roomId}
        initialConcertId={bookingPrefills.concertId}
        initialCheckIn={bookingPrefills.checkIn}
        initialCheckOut={bookingPrefills.checkOut}
        initialGuests={bookingPrefills.guests}
        onBookingSuccess={handleBookingSuccess}
        onRegisterMemberQuick={handleRegisterMemberQuick}
      />

      {/* My Bookings Lookup Modal */}
      <MyReservationsModal
        isOpen={isMyBookingsModalOpen}
        onClose={() => setIsMyBookingsModalOpen(false)}
        lang={lang}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
      />

      {/* Member Sign-In / Register Modal */}
      <MemberLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        lang={lang}
        onLoginMember={handleLoginMember}
      />

      {/* Venue Guide & Transit Comparison Modal */}
      <VenueGuideModal
        isOpen={Boolean(selectedConcertForGuide)}
        onClose={() => setSelectedConcertForGuide(null)}
        lang={lang}
        concert={selectedConcertForGuide}
        onBookShuttle={(concertId) => {
          openBookingWithPrefill({ concertId });
        }}
      />
    </div>
  );
}
