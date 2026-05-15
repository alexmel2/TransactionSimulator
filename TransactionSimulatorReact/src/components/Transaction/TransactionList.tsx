import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Transaction, Region } from '../../models/transaction.model';

// ייבוא ה-CSS הכרחי
import 'swiper/css';
import 'swiper/css/navigation';

interface ITransactionListProps {
    transactions?: Transaction[];
    regions?: Region[];
    isLoading: boolean;
}

export const TransactionList: React.FC<ITransactionListProps> = ({ 
    transactions = [], 
    regions = [],
    isLoading 
}) => {

    const getRegionName = (id: number) => {
        return regions.find(r => r.id === id)?.name || 'France';
    };

    if (isLoading && transactions.length === 0) {
        return <div className="py-10 text-center text-gray-400">Loading history...</div>;
    }

    return (
        <div className="w-full max-w-7xl mx-auto py-10">
            {/* כותרת הקרוסלה */}
            <h2 className="text-[22px] font-bold text-[#1a1a1a] mb-10 px-4">
                Approved Transactions
            </h2>

            {/* Container יחסי שמאפשר לחצים לצאת החוצה */}
            <div className="relative group px-12">
                
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={25}
                    slidesPerView={1.2}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2.2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="!static" // חשוב כדי שהחצים יתמקמו לפי ה-div העוטף
                >
                    {transactions.map((t) => (
                        <SwiperSlide key={t.id || t.transactionId}>
                            {/* עיצוב הכרטיס הלבן מהתמונה */}
                            <div className="bg-white border border-[#eeeeee] rounded-[15px] p-10 h-[180px] shadow-[0_2px_15px_rgba(0,0,0,0.04)] flex flex-col justify-center transition-shadow hover:shadow-md">
                                <div className="text-[26px] font-bold text-[#1a1a1a] mb-1">
                                    Time: {new Date(t.submittedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                </div>
                                <div className="text-[15px] text-[#888888] font-medium">
                                    Time Zone: {getRegionName(t.regionId)}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* חץ ניווט שמאלה (Left Arrow) */}
                <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white border border-[#f0f0f0] rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all hover:bg-gray-50 active:scale-95 disabled:opacity-30 disabled:cursor-auto">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                {/* חץ ניווט ימינה (Right Arrow) */}
                <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white border border-[#f0f0f0] rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all hover:bg-gray-50 active:scale-95 disabled:opacity-30 disabled:cursor-auto">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
                
            </div>
        </div>
    );
};