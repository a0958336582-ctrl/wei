export type Language = 'zh-TW' | 'en-US' | 'ko-KR';

export interface Concert {
  id: string;
  artist: string;
  artistEn: string;
  artistKo: string;
  tourName: string;
  tourNameEn: string;
  tourNameKo: string;
  date: string;
  time: string;
  venue: 'stadium' | 'arena' | 'kmc';
  venueName: {
    'zh-TW': string;
    'en-US': string;
    'ko-KR': string;
  };
  venueAddress: string;
  category: 'K-POP' | 'WESTERN' | 'MANDOPOP' | 'FESTIVAL';
  status: 'upcoming' | 'hot' | 'sold_out' | 'limited';
  hotelGuestPerks: {
    'zh-TW': string[];
    'en-US': string[];
    'ko-KR': string[];
  };
  shuttleTime: string;
  estimatedTransitMin: number;
}

export interface Room {
  id: string;
  slug: string;
  name: {
    'zh-TW': string;
    'en-US': string;
    'ko-KR': string;
  };
  subTitle: {
    'zh-TW': string;
    'en-US': string;
    'ko-KR': string;
  };
  description: {
    'zh-TW': string;
    'en-US': string;
    'ko-KR': string;
  };
  sizeM2: number;
  capacity: number;
  bedType: {
    'zh-TW': string;
    'en-US': string;
    'ko-KR': string;
  };
  view: {
    'zh-TW': string;
    'en-US': string;
    'ko-KR': string;
  };
  basePrice: number;
  memberDiscountRate: number; // e.g. 0.15 for 15% off
  images: string[];
  specs: {
    label: { 'zh-TW': string; 'en-US': string; 'ko-KR': string };
    value: string;
  }[];
  amenities: {
    'zh-TW': string[];
    'en-US': string[];
    'ko-KR': string[];
  };
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: 'SILVER' | 'GOLD' | 'BLACK_DIAMOND';
  memberNumber: string;
  points: number;
  discountRate: number;
}

export interface Booking {
  bookingId: string;
  createdAt: string;
  roomId: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guestsCount: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  isMember: boolean;
  memberTier?: string;
  originalTotal: number;
  discountAmount: number;
  finalTotal: number;
  concertInterestedId?: string;
  concertShuttleNeeded: boolean;
  specialRequests?: string;
  status: 'CONFIRMED' | 'CHECKED_IN' | 'COMPLETED' | 'CANCELLED';
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: 'SUPER_ADMIN' | 'HOTEL_MANAGER' | 'CONCERT_OPERATOR';
  avatar?: string;
}

export type AdminTab = 'overview' | 'bookings' | 'concerts' | 'rooms' | 'members' | 'i18n';
