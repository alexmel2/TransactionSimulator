import React from 'react';
import {Region} from  '../../models/transaction.model'
interface RegionSelectProps {
    regions: Region[];
    selectedId: number;
    onRegionChange: (id: number) => void;
    isLoading?: boolean;
}

export const RegionSelect: React.FC<RegionSelectProps> = ({ 
    regions, 
    selectedId, 
    onRegionChange, 
    isLoading 
}) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[10px] text-[#7B61FF] font-bold uppercase tracking-[0.2em]">
                Select Region
            </label>
            <select 
                disabled={isLoading}
                value={selectedId}
                onChange={(e) => onRegionChange(Number(e.target.value))}
                className="w-full bg-white/20 border-2 border-[#7B61FF] rounded-xl p-3 outline-none focus:bg-white/40 transition-all"
            >
                {regions.map(r => (
                    <option key={r.id} value={r.id} className="text-gray-900">{r.name}</option>
                ))}
            </select>
        </div>
    );
};