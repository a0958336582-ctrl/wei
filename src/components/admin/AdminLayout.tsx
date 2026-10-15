import React, { useState } from 'react';
import { Booking, Member, Concert, Room, AdminTab, AdminUser } from '../../types';
import { AdminOverview } from './AdminOverview';
import { AdminBookings } from './AdminBookings';
import { AdminConcerts } from './AdminConcerts';
import { AdminRooms } from './AdminRooms';
import { AdminMembers } from './AdminMembers';
import { AdminI18n } from './AdminI18n';
import { LayoutDashboard, CalendarCheck, Music, BedDouble, Users, Globe, ArrowLeft, ShieldCheck, Bell } from 'lucide-react';

interface AdminLayoutProps {
  onReturnToClient: () => void;
  bookings: Booking[];
  members: Member[];
  concerts: Concert[];
  rooms: Room[];
  onUpdateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  onAddManualBooking: (newBooking: Booking) => void;
  onDeleteBooking: (bookingId: string) => void;
  onAddConcert: (concert: Concert) => void;
  onUpdateConcert: (concert: Concert) => void;
  onDeleteConcert: (concertId: string) => void;
  onUpdateRoomPrice: (roomId: string, newBasePrice: number, newDiscountRate: number) => void;
  onUpdateMemberTier: (memberId: string, newTier: Member['tier']) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  onReturnToClient,
  bookings,
  members,
  concerts,
  rooms,
  onUpdateBookingStatus,
  onAddManualBooking,
  onDeleteBooking,
  onAddConcert,
  onUpdateConcert,
  onDeleteConcert,
  onUpdateRoomPrice,
  onUpdateMemberTier,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  const adminUser: AdminUser = {
    id: 'u-boss-01',
    username: 'shen_ying_boss',
    name: '神鷹董事長 (Shen Ying)',
    role: 'SUPER_ADMIN',
  };

  const menuItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'overview',
      label: '營運指標總覽',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'bookings',
      label: '訂房與專車訂單',
      icon: <CalendarCheck className="w-4 h-4" />,
      badge: bookings.filter((b) => b.status === 'CONFIRMED').length,
    },
    {
      id: 'concerts',
      label: '演唱會與專車檔期',
      icon: <Music className="w-4 h-4" />,
      badge: concerts.length,
    },
    {
      id: 'rooms',
      label: '客房定價與折扣',
      icon: <BedDouble className="w-4 h-4" />,
    },
    {
      id: 'members',
      label: '神鷹會員 CRM',
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: 'i18n',
      label: '三語系文案管理',
      icon: <Globe className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-[#00205B] selection:text-white">
      
      {/* Admin Top Navigation */}
      <header className="h-16 border-b border-white/20 bg-[#0B0B0B] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        
        {/* Left: Branding & Back to site */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onReturnToClient}
            className="flex items-center space-x-1.5 text-xs text-neutral-300 hover:text-white border border-white/20 hover:border-white px-3 py-1.5 transition-all bg-black"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="font-semibold">返回前台官網</span>
          </button>

          <div className="h-6 w-px bg-white/20 hidden sm:block"></div>

          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 bg-[#00205B] border border-white/30 flex items-center justify-center font-bold text-xs text-white">
              SY
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                神鷹大飯店 後台智慧營運系統
              </span>
              <span className="text-[10px] text-neutral-400 block tracking-widest uppercase font-mono">
                XIAOGANG KAOHSIUNG ADMIN CONSOLE
              </span>
            </div>
          </div>
        </div>

        {/* Right: Current Operator */}
        <div className="flex items-center space-x-3 text-xs">
          <div className="hidden md:flex items-center space-x-2 text-neutral-300 bg-black border border-white/15 px-3 py-1.5">
            <ShieldCheck className="w-4 h-4 text-[#FFC72C]" />
            <span>目前操作員：<strong>{adminUser.name}</strong></span>
            <span className="text-[10px] px-1.5 py-0.2 bg-[#00205B] text-white">最高特權</span>
          </div>

          <div className="text-[11px] font-mono text-neutral-400 hidden sm:block">
            {new Date().toLocaleDateString()}
          </div>
        </div>

      </header>

      {/* Main Admin Body: Sidebar + Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 bg-[#0B0B0B] border-r border-white/15 p-4 flex-shrink-0">
          <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-500 mb-3 px-3">
            功能導覽模組
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium tracking-wide transition-all ${
                    isActive
                      ? 'bg-white text-black font-bold'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 font-mono font-bold ${
                        isActive ? 'bg-black text-white' : 'bg-[#00205B] text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Notice Card */}
          <div className="mt-8 p-3.5 bg-black border border-white/15 space-y-2 text-[11px]">
            <div className="text-white font-semibold flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-[#FFC72C]" />
              <span>神鷹專車即時調度提醒</span>
            </div>
            <p className="text-neutral-400 leading-normal">
              世運主場館 BLACKPINK 與 五月天 檔期專車即將滿座，如有加開需求請於「演唱會與專車檔期」新增班次。
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-black overflow-x-hidden">
          {activeTab === 'overview' && (
            <AdminOverview
              bookings={bookings}
              members={members}
              concerts={concerts}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'bookings' && (
            <AdminBookings
              bookings={bookings}
              onUpdateBookingStatus={onUpdateBookingStatus}
              onAddManualBooking={onAddManualBooking}
              onDeleteBooking={onDeleteBooking}
            />
          )}

          {activeTab === 'concerts' && (
            <AdminConcerts
              concerts={concerts}
              onAddConcert={onAddConcert}
              onUpdateConcert={onUpdateConcert}
              onDeleteConcert={onDeleteConcert}
            />
          )}

          {activeTab === 'rooms' && (
            <AdminRooms
              rooms={rooms}
              onUpdateRoomPrice={onUpdateRoomPrice}
            />
          )}

          {activeTab === 'members' && (
            <AdminMembers
              members={members}
              onUpdateMemberTier={onUpdateMemberTier}
              onAddMember={() => {}}
            />
          )}

          {activeTab === 'i18n' && <AdminI18n />}
        </main>

      </div>

    </div>
  );
};
