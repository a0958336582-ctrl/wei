import React, { useState } from 'react';
import { Room } from '../../types';
import { hotelRooms as initialRooms } from '../../data/rooms';
import { BedDouble, Edit3, DollarSign, Sparkles, Check, Save } from 'lucide-react';

interface AdminRoomsProps {
  rooms: Room[];
  onUpdateRoomPrice: (roomId: string, newBasePrice: number, newDiscountRate: number) => void;
}

export const AdminRooms: React.FC<AdminRoomsProps> = ({
  rooms,
  onUpdateRoomPrice,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editDiscountRate, setEditDiscountRate] = useState<number>(0);

  const startEdit = (room: Room) => {
    setEditingId(room.id);
    setEditPrice(room.basePrice);
    setEditDiscountRate(Math.round(room.memberDiscountRate * 100));
  };

  const saveEdit = (roomId: string) => {
    onUpdateRoomPrice(roomId, editPrice, editDiscountRate / 100);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0B0B0B] border border-white/20 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider text-white">
            神鷹大飯店 客房定價與會員折扣率控管
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            即時動態調整小港飯店牌價、黑鑽/金鷹/銀鷹專屬折扣與庫存狀態
          </p>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((room) => {
          const isEditing = editingId === room.id;
          const memberPrice = Math.round(room.basePrice * (1 - room.memberDiscountRate));

          return (
            <div
              key={room.id}
              className="bg-black border border-white/15 p-6 flex flex-col justify-between space-y-5 hover:border-white transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold uppercase text-white">
                      {room.name['zh-TW']}
                    </h3>
                    <p className="text-xs text-[#FFC72C] mt-0.5 font-mono">
                      {room.subTitle['zh-TW']}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 border border-white/20 text-neutral-400">
                    {room.sizeM2} m² ｜ {room.capacity} 人
                  </span>
                </div>

                <p className="text-xs text-neutral-400 font-light leading-relaxed line-clamp-2">
                  {room.description['zh-TW']}
                </p>

                {/* Specs */}
                <div className="bg-[#0B0B0B] border border-white/10 p-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block">隔音技術</span>
                    <span className="text-neutral-300 font-medium">STC 55 超靜音</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block">景觀視角</span>
                    <span className="text-neutral-300 font-medium">小港跑道 / 港灣日落</span>
                  </div>
                </div>

                {/* Pricing Editor or Display */}
                {isEditing ? (
                  <div className="bg-neutral-900/80 border border-blue-500/40 p-4 space-y-3">
                    <div>
                      <label className="text-[11px] text-neutral-300 block mb-1">
                        每晚基礎牌價 (NT$)
                      </label>
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(Number(e.target.value))}
                        className="w-full bg-black border border-white/25 px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-300 block mb-1">
                        會員專屬折扣比例 (%)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={50}
                        value={editDiscountRate}
                        onChange={(e) => setEditDiscountRate(Number(e.target.value))}
                        className="w-full bg-black border border-white/25 px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-baseline justify-between pt-2 border-t border-white/10">
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase block">原定價</span>
                      <span className="text-lg font-mono font-bold text-white">
                        NT$ {room.basePrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-[#FFC72C] uppercase block">
                        會員折扣價 ({Math.round(room.memberDiscountRate * 100)}% OFF)
                      </span>
                      <span className="text-lg font-mono font-bold text-[#FFC72C]">
                        NT$ {memberPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="pt-2 border-t border-white/10 flex justify-end">
                {isEditing ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="btn-outline text-xs py-1.5 px-4"
                    >
                      取消
                    </button>
                    <button
                      onClick={() => saveEdit(room.id)}
                      className="btn-primary text-xs py-1.5 px-5 flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>儲存定價</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEdit(room)}
                    className="btn-outline text-xs py-1.5 px-4 flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>調整售價與折扣</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
