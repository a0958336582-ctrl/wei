import React, { useState } from 'react';
import { Language, Room, Member } from '../types';
import { translations } from '../data/translations';
import { hotelRooms } from '../data/rooms';
import { Check, Users, Maximize, Eye, Sparkles, ArrowRight, ShieldCheck, BedDouble } from 'lucide-react';

interface RoomsSectionProps {
  lang: Language;
  currentMember: Member | null;
  onBookRoom: (roomId: string) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({
  lang,
  currentMember,
  onBookRoom,
}) => {
  const t = translations[lang];
  const [activeRoomId, setActiveRoomId] = useState<string>(hotelRooms[0].id);

  // Determine effective discount rate based on whether user is member or simulated default 15%
  const effectiveDiscountRate = currentMember ? currentMember.discountRate : 0.15;

  return (
    <section id="rooms" className="py-24 bg-[#0B0B0B] text-white border-b border-white/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 border border-white/20 px-3 py-1 bg-black">
              <span className="w-1.5 h-1.5 bg-[#00205B]"></span>
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white">
                {t.rooms.tag}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-[0.14em] text-white">
              {t.rooms.title}
            </h2>
            <p className="text-sm text-neutral-400 font-light max-w-2xl leading-relaxed">
              {t.rooms.subtitle}
            </p>
          </div>

          {/* Member Discount Badge */}
          <div className="mt-4 md:mt-0 flex items-center space-x-2 px-3.5 py-2 bg-[#FFC72C]/10 border border-[#FFC72C]/30 text-[#FFC72C] text-xs">
            <Sparkles className="w-4 h-4" />
            <span>
              {currentMember
                ? `${currentMember.tier.replace('_', ' ')} 尊享 ${Math.round(currentMember.discountRate * 100)}% 現折優惠`
                : '註冊神鷹會員立享 15%~25% 專屬房價折抵'}
            </span>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {hotelRooms.map((room) => {
            const name = room.name[lang];
            const subTitle = room.subTitle[lang];
            const description = room.description[lang];
            const bed = room.bedType[lang];
            const view = room.view[lang];
            const amenities = room.amenities[lang];

            const discountRate = currentMember ? currentMember.discountRate : room.memberDiscountRate;
            const memberPrice = Math.round(room.basePrice * (1 - discountRate));
            const savedAmount = room.basePrice - memberPrice;

            return (
              <div
                key={room.id}
                className="bg-black border border-white/15 flex flex-col justify-between hover:border-white transition-all duration-300 group"
              >
                <div>
                  {/* Room Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 border-b border-white/10">
                    <img
                      src={room.images[0]}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    
                    {/* View Tag */}
                    <div className="absolute top-4 left-4 bg-black/80 border border-white/20 px-3 py-1 text-[11px] uppercase tracking-wider text-neutral-200 backdrop-blur-sm">
                      {view}
                    </div>

                    {/* Capacity & Area */}
                    <div className="absolute bottom-4 left-4 flex items-center space-x-3 text-xs text-neutral-300">
                      <span className="flex items-center gap-1 bg-black/80 px-2.5 py-1 border border-white/15">
                        <Maximize className="w-3.5 h-3.5" />
                        {room.sizeM2} m²
                      </span>
                      <span className="flex items-center gap-1 bg-black/80 px-2.5 py-1 border border-white/15">
                        <Users className="w-3.5 h-3.5" />
                        {room.capacity} {lang === 'zh-TW' ? '人入住' : 'Guests'}
                      </span>
                    </div>
                  </div>

                  {/* Room Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                        {name}
                      </h3>
                      <p className="text-xs text-[#FFC72C] tracking-wide mt-1">
                        {subTitle}
                      </p>
                    </div>

                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {description}
                    </p>

                    {/* Maserati Specs Table */}
                    <div className="grid grid-cols-2 gap-2 py-3 border-y border-white/10 text-xs">
                      {room.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="space-y-0.5">
                          <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                            {spec.label[lang]}
                          </span>
                          <p className="text-neutral-200 font-medium truncate">
                            {spec.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Signature Amenities */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold block">
                        {lang === 'zh-TW' ? '專屬尊寵禮遇' : 'Signature Inclusions'}
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-neutral-300">
                        {amenities.slice(0, 4).map((amenity, aIdx) => (
                          <li key={aIdx} className="flex items-start space-x-2">
                            <Check className="w-3.5 h-3.5 text-[#00205B] bg-white rounded-none p-0.5 mt-0.5 flex-shrink-0" />
                            <span className="truncate">{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="p-6 pt-4 border-t border-white/15 bg-[#0B0B0B]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-xs text-neutral-500 line-through">
                        NT$ {room.basePrice.toLocaleString()}
                      </span>
                      <span className="text-2xl font-bold font-mono text-white tracking-tight">
                        NT$ {memberPrice.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {t.rooms.perNight}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#FFC72C] font-medium flex items-center gap-1">
                      <span>{t.rooms.memberPrice}</span>
                      <span>({t.rooms.save} NT$ {savedAmount.toLocaleString()})</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onBookRoom(room.id)}
                    className="btn-primary"
                  >
                    <span>{t.rooms.bookThis}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2" />
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
