import React, { useState } from 'react';
import { Member } from '../../types';
import { Crown, Search, UserCheck, Shield, Sparkles, Plus, Award } from 'lucide-react';

interface AdminMembersProps {
  members: Member[];
  onUpdateMemberTier: (memberId: string, newTier: Member['tier']) => void;
  onAddMember: (newMember: Member) => void;
}

export const AdminMembers: React.FC<AdminMembersProps> = ({
  members,
  onUpdateMemberTier,
  onAddMember,
}) => {
  const [search, setSearch] = useState('');
  const [filterTier, setFilterTier] = useState<string>('all');

  const filtered = members.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search) ||
      m.memberNumber.toLowerCase().includes(search.toLowerCase());
    const matchTier = filterTier === 'all' || m.tier === filterTier;
    return matchSearch && matchTier;
  });

  const getTierBadge = (tier: Member['tier']) => {
    switch (tier) {
      case 'BLACK_DIAMOND':
        return <span className="px-2.5 py-0.5 text-[10px] font-bold border border-[#FFC72C] text-[#FFC72C] bg-[#FFC72C]/10">黑鑽至尊 25% OFF</span>;
      case 'GOLD':
        return <span className="px-2.5 py-0.5 text-[10px] font-bold border border-amber-400 text-amber-300 bg-amber-400/10">金鷹尊爵 15% OFF</span>;
      default:
        return <span className="px-2.5 py-0.5 text-[10px] font-bold border border-slate-300 text-slate-300 bg-white/5">銀鷹會員 10% OFF</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-[#0B0B0B] border border-white/20 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider text-white">
            神鷹俱樂部 會員 CRM 管理
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            管理貴賓會籍、調升黑鑽/金鷹會員等級、發放專屬演唱會禮遇
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-[#0B0B0B] border border-white/15 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜尋會員編號、姓名、手機..."
            className="w-full bg-black border border-white/20 pl-9 pr-4 py-2 text-xs text-white focus:border-white focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          {['all', 'BLACK_DIAMOND', 'GOLD', 'SILVER'].map((tr) => (
            <button
              key={tr}
              onClick={() => setFilterTier(tr)}
              className={`px-3 py-1.5 text-xs uppercase border transition-colors ${
                filterTier === tr
                  ? 'border-white bg-white text-black font-semibold'
                  : 'border-white/15 text-neutral-400 hover:text-white'
              }`}
            >
              {tr === 'all' ? '全部會員' : tr.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-black border border-white/15 overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/20 bg-neutral-950 text-neutral-400 uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4 font-semibold">會員編號</th>
              <th className="py-3.5 px-4 font-semibold">貴賓姓名與電話</th>
              <th className="py-3.5 px-4 font-semibold">當前等級與折扣</th>
              <th className="py-3.5 px-4 font-semibold">積點餘額</th>
              <th className="py-3.5 px-4 font-semibold text-right">變更會員等級 (提升禮遇)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filtered.map((m) => (
              <tr key={m.id} className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-mono font-bold text-white whitespace-nowrap">
                  {m.memberNumber}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="font-semibold text-white">{m.name}</div>
                  <div className="text-neutral-400 text-[11px] font-mono">{m.phone}</div>
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {getTierBadge(m.tier)}
                </td>
                <td className="py-4 px-4 whitespace-nowrap font-mono text-neutral-200">
                  {m.points.toLocaleString()} 點
                </td>
                <td className="py-4 px-4 whitespace-nowrap text-right space-x-1.5">
                  <button
                    onClick={() => onUpdateMemberTier(m.id, 'SILVER')}
                    className={`px-2 py-1 text-[10px] border transition-colors ${
                      m.tier === 'SILVER' ? 'bg-white text-black font-bold' : 'border-white/20 text-neutral-400 hover:text-white'
                    }`}
                  >
                    銀鷹 9折
                  </button>
                  <button
                    onClick={() => onUpdateMemberTier(m.id, 'GOLD')}
                    className={`px-2 py-1 text-[10px] border transition-colors ${
                      m.tier === 'GOLD' ? 'bg-amber-400 text-black font-bold' : 'border-white/20 text-neutral-400 hover:text-white'
                    }`}
                  >
                    金鷹 85折
                  </button>
                  <button
                    onClick={() => onUpdateMemberTier(m.id, 'BLACK_DIAMOND')}
                    className={`px-2 py-1 text-[10px] border transition-colors ${
                      m.tier === 'BLACK_DIAMOND' ? 'bg-[#FFC72C] text-black font-bold' : 'border-white/20 text-neutral-400 hover:text-white'
                    }`}
                  >
                    黑鑽 75折
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
