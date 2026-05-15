import React, { useState, useMemo } from 'react';
import { Region } from '../../models/transaction.model';

interface TransactionFormProps {
    regions: Region[];
    onSubmit: (regionId: number, hour: string, minute: string) => Promise<void>;
    isSubmitting: boolean;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ regions, onSubmit, isSubmitting }) => {
    const [hour, setHour] = useState("20");
    const [minute, setMinute] = useState("00");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // סינון המדינות לפי מה שהמשתמש מקליד (Case Insensitive)
    const filteredRegions = useMemo(() => {
        return regions.filter(r => 
            r.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [regions, searchTerm]);

    const handleNumberInput = (val: string, max: number, setter: (v: string) => void) => {
        const cleaned = val.replace(/[^0-9]/g, '');
        if (cleaned === '' || (Number(cleaned) <= max && cleaned.length <= 2)) {
            setter(cleaned);
        }
    };

    const handleSelectRegion = (region: Region) => {
        setSelectedRegion(region);
        setSearchTerm(region.name); // מציג את שם המדינה בתיבה
        setIsDropdownOpen(false);
    };

    return (
        <div className="w-full max-w-[360px] flex flex-col gap-4">
            
            {/* Search Input מחובר ל-Regions */}
            <div className="relative mt-4">
                <label className="absolute -top-2.5 left-4 bg-white px-1 text-[11px] text-[#7B61FF] font-bold z-10 uppercase tracking-tighter">
                    Region
                </label>
                <div className="flex items-center border-2 border-[#5B4D8D] rounded-lg px-4 py-3 bg-white focus-within:ring-2 ring-[#7B61FF]/20">
                    <input 
                        type="text" 
                        placeholder="Search country..." 
                        className="flex-1 outline-none text-gray-700 placeholder-gray-300 text-lg"
                        value={searchTerm}
                        onFocus={() => setIsDropdownOpen(true)}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setIsDropdownOpen(true);
                        }}
                    />
                    {searchTerm && (
                        <button 
                            onClick={() => {setSearchTerm(""); setSelectedRegion(null);}} 
                            className="text-gray-400 hover:text-red-500 ml-2"
                        >
                            ⓧ
                        </button>
                    )}
                </div>

                {/* Dropdown התוצאות */}
                {isDropdownOpen && filteredRegions.length > 0 && (
                    <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                        {filteredRegions.map(r => (
                            <li 
                                key={r.id}
                                onClick={() => handleSelectRegion(r)}
                                className="px-4 py-3 hover:bg-[#D9D3E9] cursor-pointer text-gray-700 border-b border-gray-50 last:border-none"
                            >
                                {r.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* כרטיס הזנת זמן (Time Picker) */}
            <div className="bg-[#D9D3E9] rounded-[40px] p-8 shadow-sm">
                <h3 className="text-[#5B4D8D] text-sm font-bold mb-6">Enter time</h3>
                
                <div className="flex items-center justify-between mb-2">
                    <div className="flex flex-col gap-2 flex-1 items-center">
                        <div className="w-full bg-[#EBE7F5] border-2 border-[#5B4D8D] rounded-2xl py-6 flex items-center justify-center focus-within:bg-white transition-colors">
                            <input 
                                className="bg-transparent text-center text-5xl font-light text-[#2D1F5B] outline-none w-full"
                                value={hour}
                                onChange={(e) => handleNumberInput(e.target.value, 23, setHour)}
                            />
                        </div>
                        <span className="text-[12px] text-gray-500 font-medium self-start ml-2">Hour</span>
                    </div>

                    <span className="text-5xl font-light text-[#2D1F5B] px-3 pb-8">:</span>

                    <div className="flex flex-col gap-2 flex-1 items-center">
                        <div className="w-full bg-[#E6E4EB] rounded-2xl py-6 flex items-center justify-center focus-within:bg-white transition-colors">
                            <input 
                                className="bg-transparent text-center text-5xl font-light text-[#2D1F5B] outline-none w-full"
                                value={minute}
                                onChange={(e) => handleNumberInput(e.target.value, 59, setMinute)}
                            />
                        </div>
                        <span className="text-[12px] text-gray-500 font-medium self-start ml-2">Minute</span>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-10">
                    <button type="button" className="text-[#5B4D8D] text-xl opacity-80 hover:opacity-100">🕒</button>
                    <div className="flex gap-8">
                        <button type="button" className="text-[#5B4D8D] font-bold text-sm hover:opacity-70">Cancel</button>
                        <button 
                            type="button"
                            onClick={() => selectedRegion && onSubmit(selectedRegion.id, hour, minute)}
                            disabled={isSubmitting || !selectedRegion}
                            className="text-[#5B4D8D] font-bold text-sm hover:opacity-70 disabled:text-gray-400"
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};