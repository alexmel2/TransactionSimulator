import React from 'react';
import { Transaction } from '../../models/transaction.model';

interface DashboardProps {
    transactions: Transaction[];
    isLoading: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ transactions, isLoading }) => {
    
    // חישוב המטריקות מתוך מערך העסקאות הקיים
    const totalTransactions = transactions.length;
    const approvedCount = transactions.filter(t => t.status === 'Approved').length;
    const rejectedCount = transactions.filter(t => t.status === 'Rejected').length;
    
    // חישוב אחוז האישורים (כולל הגנה מפני חלוקה באפס)
    const approvalRate = totalTransactions > 0 
        ? Math.round((approvedCount / totalTransactions) * 100) 
        : 0;

    // מצב טעינה (Skeleton Loader) התואם למבנה הכרטיסים
    if (isLoading) {
        return (
            <div className="w-full space-y-8 animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-32 bg-white rounded-2xl border border-gray-100 p-6" />
                    ))}
                </div>
                <div className="h-12 bg-white rounded-2xl border border-gray-100 w-full" />
            </div>
        );
    }

  
};